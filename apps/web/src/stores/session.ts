import { defineStore } from 'pinia'
import { computed, ref, toRaw } from 'vue'
import type { FeedbackMode, GradeResult, Question, QuizSession, SessionMode } from '@/types'
import { invokeFunction, isSupabaseConfigured, supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth'
import { loadLocalQuestions, getRawById } from '@/services/localQuestions'
import { gradeLocally, stripAnswerKeys } from '@/services/localGrader'

const RECOVERY_KEY = 'dea-quiz-recovery'
const LAST_EXAM_KEY = 'dea-quiz-last-exam'
const RECOVERY_VERSION = 2

type RecoveryPayloadV2 = {
  v: typeof RECOVERY_VERSION
  session: QuizSession
  feedbackMode: FeedbackMode
  lastGradedQuestionId: string | null
}

export const useSessionStore = defineStore('session', () => {
  const current = ref<QuizSession | null>(null)
  const questions = ref<Question[]>([])
  const lastGrade = ref<GradeResult | null>(null)
  const feedbackMode = ref<FeedbackMode>('immediate')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentQuestion = computed(() => {
    if (!current.value) return null
    const id = current.value.question_ids[current.value.current_index]
    return questions.value.find((q) => q.id === id) ?? null
  })

  function hydrateQuestions(ids: string[], cached?: Question[]): Question[] {
    const fromCache = new Map((cached || []).map((q) => [q.id, q]))
    const out: Question[] = []
    for (const id of ids) {
      const raw = getRawById(id)
      if (raw) {
        out.push({
          id: raw.id,
          stem: raw.stem,
          type: raw.type as Question['type'],
          difficulty: raw.difficulty as Question['difficulty'],
          domain_id: raw.domain,
          status: raw.status as Question['status'],
          provenance: raw.provenance,
          verification_status: raw.verification_status as Question['verification_status'],
          topics: raw.topics,
          services: raw.services,
          options: stripAnswerKeys(raw.options),
        })
        continue
      }
      const fallback = fromCache.get(id)
      if (fallback) out.push(fallback)
    }
    return out
  }

  function readStored(key: string): string | null {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key)
    } catch {
      try {
        return localStorage.getItem(key)
      } catch {
        return null
      }
    }
  }

  function writeStored(key: string, value: string) {
    try {
      localStorage.setItem(key, value)
    } catch {
      // ignore quota
    }
    try {
      sessionStorage.setItem(key, value)
    } catch {
      // ignore quota
    }
  }

  function removeStored(key: string) {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
    try {
      sessionStorage.removeItem(key)
    } catch {
      // ignore
    }
  }

  function persistRecovery() {
    if (!current.value || current.value.status !== 'active') {
      removeStored(RECOVERY_KEY)
      return
    }
    const payload: RecoveryPayloadV2 = {
      v: RECOVERY_VERSION,
      session: JSON.parse(JSON.stringify(toRaw(current.value))) as QuizSession,
      feedbackMode: feedbackMode.value,
      lastGradedQuestionId: lastGrade.value
        ? current.value.question_ids[current.value.current_index] ?? null
        : null,
    }
    writeStored(RECOVERY_KEY, JSON.stringify(payload))
  }

  function restoreRecovery(): boolean {
    if (current.value?.status === 'active' && questions.value.length) return true
    const raw = readStored(RECOVERY_KEY)
    if (!raw) return false
    try {
      const parsed = JSON.parse(raw) as RecoveryPayloadV2 & {
        questions?: Question[]
        session?: QuizSession
        feedbackMode?: FeedbackMode
        lastGradedQuestionId?: string | null
      }
      const sess = parsed.session
      if (!sess || sess.status !== 'active' || !Array.isArray(sess.question_ids)) return false
      if (sess.ends_at && new Date(sess.ends_at).getTime() <= Date.now()) {
        sess.status = 'submitted'
        sess.submitted_at = sess.submitted_at || new Date().toISOString()
        removeStored(RECOVERY_KEY)
        return false
      }
      const hydrated = hydrateQuestions(sess.question_ids, parsed.questions)
      if (!hydrated.length) return false
      sess.question_ids = hydrated.map((q) => q.id)
      if (sess.current_index < 0 || sess.current_index >= sess.question_ids.length) {
        sess.current_index = 0
      }
      current.value = sess
      questions.value = hydrated
      feedbackMode.value = parsed.feedbackMode ?? 'immediate'
      const gradedId = parsed.lastGradedQuestionId
      const currentId = sess.question_ids[sess.current_index]
      if (gradedId && gradedId === currentId) {
        lastGrade.value = gradeLocally(currentId, sess.answers[currentId] ?? [])
      }
      persistRecovery()
      return true
    } catch {
      return false
    }
  }

  async function startDrill(opts: {
    mode?: SessionMode
    domain?: string
    service?: string
    topic?: string
    difficulty?: string
    type?: 'single' | 'multi'
    hasAnswerKey?: boolean
    count?: number
    /** When true (or count >= pool size), load every matching question. */
    loadAll?: boolean
    feedback?: FeedbackMode
    timedMinutes?: number
    questionIds?: string[]
  }) {
    loading.value = true
    error.value = null
    lastGrade.value = null
    feedbackMode.value = opts.feedback ?? 'immediate'
    const auth = useAuthStore()

    try {
      const mode = opts.mode ?? 'drill'
      let pool = await loadLocalQuestions({
        domain: opts.domain,
        service: opts.service,
        topic: opts.topic,
        difficulty: opts.difficulty,
        type: opts.type,
        // Exam simulator only uses gradable items so scores stay meaningful.
        hasAnswerKey: mode === 'exam' ? true : opts.hasAnswerKey,
        status: 'published',
      })

      if (opts.questionIds?.length) {
        const set = new Set(opts.questionIds)
        pool = pool.filter((q) => set.has(q.id))
      }

      if (!pool.length) throw new Error('No published questions match the selected filters.')

      const loadAll = Boolean(opts.loadAll) || opts.count == null || opts.count >= pool.length
      const count = loadAll ? pool.length : Math.max(1, Math.min(opts.count!, pool.length))
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count)
      if (!shuffled.length) throw new Error('No published questions match the selected filters.')

      const now = new Date()
      const ends =
        opts.timedMinutes != null
          ? new Date(now.getTime() + opts.timedMinutes * 60_000).toISOString()
          : null

      const localSession: QuizSession = {
        id: crypto.randomUUID(),
        user_id: auth.user?.id ?? 'local',
        mode,
        status: 'active',
        config: { ...opts },
        question_ids: shuffled.map((q) => q.id),
        answers: {},
        marked_review: [],
        current_index: 0,
        started_at: now.toISOString(),
        ends_at: ends,
        submitted_at: null,
      }

      if (isSupabaseConfigured && auth.user?.id) {
        const { data, error: err } = await supabase
          .from('quiz_sessions')
          .insert({
            id: localSession.id,
            user_id: auth.user.id,
            mode: localSession.mode,
            status: 'active',
            config: localSession.config,
            question_ids: localSession.question_ids,
            answers: {},
            marked_review: [],
            current_index: 0,
            started_at: localSession.started_at,
            ends_at: localSession.ends_at,
          })
          .select('*')
          .single()
        if (!err && data) {
          current.value = data as QuizSession
        } else {
          current.value = localSession
        }
      } else {
        current.value = localSession
      }

      questions.value = shuffled
      if (mode === 'exam') removeStored(LAST_EXAM_KEY)
      persistRecovery()
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  function selectAnswer(questionId: string, optionIds: string[]) {
    if (!current.value) return
    current.value.answers = { ...current.value.answers, [questionId]: optionIds }
    persistRecovery()
    void syncSession()
  }

  function toggleMark(questionId: string) {
    if (!current.value) return
    const set = new Set(current.value.marked_review)
    if (set.has(questionId)) set.delete(questionId)
    else set.add(questionId)
    current.value.marked_review = [...set]
    persistRecovery()
    void syncSession()
  }

  function goTo(index: number) {
    if (!current.value) return
    if (index < 0 || index >= current.value.question_ids.length) return
    current.value.current_index = index
    lastGrade.value = null
    persistRecovery()
    void syncSession()
  }

  async function gradeCurrent(confidence?: number): Promise<GradeResult | null> {
    const q = currentQuestion.value
    const session = current.value
    if (!q || !session) return null
    const selected = session.answers[q.id] ?? []
    const started = performance.now()

    let result: GradeResult
    try {
      if (isSupabaseConfigured && useAuthStore().user?.id) {
        result = await invokeFunction<GradeResult>('grade-attempt', {
          session_id: session.id,
          question_id: q.id,
          selected_ids: selected,
          confidence: confidence ?? null,
          latency_ms: Math.round(performance.now() - started),
          mode: session.mode,
        })
      } else {
        result = gradeLocally(q.id, selected)
        result.selected_ids = selected
      }
    } catch {
      result = gradeLocally(q.id, selected)
      result.selected_ids = selected
    }

    lastGrade.value = result
    persistRecovery()
    return result
  }

  async function submitExam() {
    if (!current.value) return null
    current.value.status = 'submitted'
    current.value.submitted_at = new Date().toISOString()
    persistRecovery()

    const auth = useAuthStore()
    if (isSupabaseConfigured && auth.user?.id) {
      try {
        const data = await invokeFunction<{
          result: unknown
        }>('submit-exam', {
          session_id: current.value.id,
          answers: current.value.answers,
        })
        persistLastExam(data)
        removeStored(RECOVERY_KEY)
        return data
      } catch {
        // fall through to local summary
      }
    }

    const summary = buildLocalExamSummary()
    persistLastExam(summary)
    removeStored(RECOVERY_KEY)
    return summary
  }

  function buildLocalExamSummary() {
    if (!current.value) return null
    const domainMap = new Map<string, { correct: number; total: number }>()
    let correct = 0
    for (const q of questions.value) {
      const selected = current.value.answers[q.id] ?? []
      const grade = gradeLocally(q.id, selected)
      if (grade.correct) correct += 1
      const key = q.domain_id
      const row = domainMap.get(key) ?? { correct: 0, total: 0 }
      row.total += 1
      if (grade.correct) row.correct += 1
      domainMap.set(key, row)
    }
    const started = new Date(current.value.started_at).getTime()
    const ended = new Date(current.value.submitted_at ?? Date.now()).getTime()
    return {
      result: {
        id: crypto.randomUUID(),
        score_pct: questions.value.length
          ? Math.round((correct / questions.value.length) * 1000) / 10
          : 0,
        correct_count: correct,
        total_count: questions.value.length,
        duration_seconds: Math.max(0, Math.round((ended - started) / 1000)),
        domain_breakdown: [...domainMap.entries()].map(([domain, v]) => ({
          domain,
          correct: v.correct,
          total: v.total,
          accuracy: v.total ? Math.round((v.correct / v.total) * 1000) / 10 : 0,
        })),
        created_at: new Date().toISOString(),
      },
      questions: questions.value,
      answers: current.value.answers,
    }
  }

  async function syncSession() {
    const auth = useAuthStore()
    if (!current.value || !isSupabaseConfigured || !auth.user?.id) return
    await supabase
      .from('quiz_sessions')
      .update({
        answers: current.value.answers,
        marked_review: current.value.marked_review,
        current_index: current.value.current_index,
        status: current.value.status,
        submitted_at: current.value.submitted_at,
      })
      .eq('id', current.value.id)
  }

  function persistLastExam(summary: unknown) {
    if (!summary || typeof summary !== 'object') return
    const data = summary as {
      result?: unknown
      answers?: Record<string, string[]>
      questions?: Question[]
    }
    const ids =
      current.value?.question_ids?.length
        ? current.value.question_ids
        : (data.questions || []).map((q) => q.id)
    if (!ids.length) return
    writeStored(
      LAST_EXAM_KEY,
      JSON.stringify({
        result: data.result,
        answers: data.answers ?? current.value?.answers ?? {},
        question_ids: ids,
      }),
    )
  }

  function restoreLastExam() {
    const raw = readStored(LAST_EXAM_KEY)
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as {
        result: unknown
        answers: Record<string, string[]>
        question_ids: string[]
        questions?: Question[]
      }
      const hydrated = hydrateQuestions(parsed.question_ids, parsed.questions)
      if (!hydrated.length || !parsed.result) return null
      return {
        result: parsed.result,
        answers: parsed.answers ?? {},
        questions: hydrated,
      }
    } catch {
      return null
    }
  }

  function clearLastExam() {
    removeStored(LAST_EXAM_KEY)
  }

  function clear() {
    current.value = null
    questions.value = []
    lastGrade.value = null
    removeStored(RECOVERY_KEY)
  }

  return {
    current,
    questions,
    lastGrade,
    feedbackMode,
    loading,
    error,
    currentQuestion,
    startDrill,
    selectAnswer,
    toggleMark,
    goTo,
    gradeCurrent,
    submitExam,
    restoreRecovery,
    persistRecovery,
    restoreLastExam,
    clearLastExam,
    clear,
  }
})
