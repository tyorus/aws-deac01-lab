import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { FeedbackMode, GradeResult, Question, QuizSession, SessionMode } from '@/types'
import { invokeFunction, isSupabaseConfigured, supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth'
import { loadLocalQuestions } from '@/services/localQuestions'
import { gradeLocally } from '@/services/localGrader'

const RECOVERY_KEY = 'dea-quiz-recovery'

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

  function persistRecovery() {
    if (!current.value) {
      localStorage.removeItem(RECOVERY_KEY)
      return
    }
    localStorage.setItem(
      RECOVERY_KEY,
      JSON.stringify({
        session: current.value,
        questions: questions.value,
        feedbackMode: feedbackMode.value,
      }),
    )
  }

  function restoreRecovery(): boolean {
    const raw = localStorage.getItem(RECOVERY_KEY)
    if (!raw) return false
    try {
      const parsed = JSON.parse(raw) as {
        session: QuizSession
        questions: Question[]
        feedbackMode: FeedbackMode
      }
      if (parsed.session.status !== 'active') return false
      current.value = parsed.session
      questions.value = parsed.questions
      feedbackMode.value = parsed.feedbackMode
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
    count?: number
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
      let pool = await loadLocalQuestions({
        domain: opts.domain,
        service: opts.service,
        topic: opts.topic,
        difficulty: opts.difficulty,
        status: 'published',
      })

      if (opts.questionIds?.length) {
        const set = new Set(opts.questionIds)
        pool = pool.filter((q) => set.has(q.id))
      }

      const count = opts.count ?? Math.min(10, pool.length)
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
        mode: opts.mode ?? 'drill',
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

      if (isSupabaseConfigured && auth.isAuthenticated) {
        const { data, error: err } = await supabase
          .from('quiz_sessions')
          .insert({
            id: localSession.id,
            user_id: auth.user!.id,
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
      if (isSupabaseConfigured && useAuthStore().isAuthenticated) {
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
    return result
  }

  async function submitExam() {
    if (!current.value) return null
    current.value.status = 'submitted'
    current.value.submitted_at = new Date().toISOString()
    persistRecovery()

    const auth = useAuthStore()
    if (isSupabaseConfigured && auth.isAuthenticated) {
      try {
        const data = await invokeFunction<{
          result: unknown
        }>('submit-exam', {
          session_id: current.value.id,
          answers: current.value.answers,
        })
        localStorage.removeItem(RECOVERY_KEY)
        return data
      } catch {
        // fall through to local summary
      }
    }

    const summary = buildLocalExamSummary()
    localStorage.removeItem(RECOVERY_KEY)
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
    if (!current.value || !isSupabaseConfigured || !auth.isAuthenticated) return
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

  function clear() {
    current.value = null
    questions.value = []
    lastGrade.value = null
    localStorage.removeItem(RECOVERY_KEY)
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
    clear,
  }
})
