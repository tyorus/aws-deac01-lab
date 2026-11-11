import type { DashboardStats, ExamResultSummary } from '@/types'
import { getAllRawQuestions } from '@/services/localQuestions'
import { isSupabaseConfigured, supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth'

const LOCAL_ATTEMPTS_KEY = 'dea-local-attempts'
const LOCAL_EXAMS_KEY = 'dea-local-exams'
const LOCAL_STREAK_KEY = 'dea-local-streak'

export interface LocalAttempt {
  at: string
  questionId: string
  domain: string
  topic?: string
  service?: string
  correct: boolean
  latencyMs?: number
  difficulty?: string
}

export function recordLocalAttempt(attempt: LocalAttempt) {
  const list = readLocalAttempts()
  list.unshift(attempt)
  localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(list.slice(0, 2000)))
  bumpStreak()
}

export function recordLocalExam(result: ExamResultSummary) {
  const list = readLocalExams()
  list.unshift(result)
  localStorage.setItem(LOCAL_EXAMS_KEY, JSON.stringify(list.slice(0, 100)))
}

function readLocalAttempts(): LocalAttempt[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ATTEMPTS_KEY) || '[]') as LocalAttempt[]
  } catch {
    return []
  }
}

function readLocalExams(): ExamResultSummary[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_EXAMS_KEY) || '[]') as ExamResultSummary[]
  } catch {
    return []
  }
}

function bumpStreak() {
  const today = new Date().toISOString().slice(0, 10)
  const raw = localStorage.getItem(LOCAL_STREAK_KEY)
  let data = { last: today, days: 1 }
  if (raw) {
    try {
      data = JSON.parse(raw) as { last: string; days: number }
    } catch {
      /* ignore */
    }
  }
  if (data.last === today) {
    localStorage.setItem(LOCAL_STREAK_KEY, JSON.stringify(data))
    return
  }
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
  data.days = data.last === yesterday ? data.days + 1 : 1
  data.last = today
  localStorage.setItem(LOCAL_STREAK_KEY, JSON.stringify(data))
}

function streakDays(): number {
  try {
    const data = JSON.parse(localStorage.getItem(LOCAL_STREAK_KEY) || '{}') as {
      last?: string
      days?: number
    }
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
    if (data.last !== today && data.last !== yesterday) return 0
    return data.days ?? 0
  } catch {
    return 0
  }
}

export async function loadDashboardStats(): Promise<DashboardStats> {
  const auth = useAuthStore()
  if (isSupabaseConfigured && auth.isAuthenticated) {
    try {
      const { data: attempts } = await supabase
        .from('question_attempts')
        .select('created_at, is_correct, question_id, latency_ms')
        .eq('user_id', auth.user!.id)
        .order('created_at', { ascending: false })
        .limit(500)

      if (attempts?.length) {
        return summarizeAttempts(
          attempts.map((a) => ({
            at: a.created_at,
            questionId: a.question_id,
            domain: 'unknown',
            correct: Boolean(a.is_correct),
            latencyMs: a.latency_ms ?? undefined,
          })),
        )
      }
    } catch {
      /* fall back */
    }
  }
  return summarizeAttempts(readLocalAttempts())
}

function summarizeAttempts(attempts: LocalAttempt[]): DashboardStats {
  const totalAttempts = attempts.length
  const unique = new Set(attempts.map((a) => a.questionId))
  const correct = attempts.filter((a) => a.correct).length
  const overallAccuracy = totalAttempts ? Math.round((correct / totalAttempts) * 1000) / 10 : 0

  const byDomain = new Map<string, { c: number; t: number }>()
  const byTopic = new Map<string, { c: number; t: number }>()
  for (const a of attempts) {
    const d = byDomain.get(a.domain) ?? { c: 0, t: 0 }
    d.t += 1
    if (a.correct) d.c += 1
    byDomain.set(a.domain, d)
    if (a.topic) {
      const t = byTopic.get(a.topic) ?? { c: 0, t: 0 }
      t.t += 1
      if (a.correct) t.c += 1
      byTopic.set(a.topic, t)
    }
  }

  const domainAccuracy = [...byDomain.entries()].map(([domain, v]) => ({
    domain,
    accuracy: v.t ? Math.round((v.c / v.t) * 1000) / 10 : 0,
    attempts: v.t,
  }))

  const weakTopics = [...byTopic.entries()]
    .map(([topic, v]) => ({
      topic,
      accuracy: v.t ? Math.round((v.c / v.t) * 1000) / 10 : 0,
      attempts: v.t,
    }))
    .filter((t) => t.attempts >= 2)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)

  const published = getAllRawQuestions().filter((q) => q.status === 'published').length
  const coverage = published ? unique.size / published : 0
  const readinessEstimate = Math.round(
    Math.min(100, overallAccuracy * 0.6 + coverage * 100 * 0.3 + Math.min(streakDays(), 14) * 0.7),
  )

  let recommendedNext = 'Start a 10-question random drill'
  if (weakTopics[0]) recommendedNext = `Review weak topic: ${weakTopics[0].topic}`
  else if (overallAccuracy < 70 && totalAttempts > 5)
    recommendedNext = 'Run a delayed-feedback drill on medium questions'
  else if (unique.size >= 20) recommendedNext = 'Take a short 20-question mock exam'

  return {
    totalAttempts,
    uniqueCompleted: unique.size,
    overallAccuracy,
    streakDays: streakDays(),
    domainAccuracy,
    weakTopics,
    recentActivity: attempts.slice(0, 8).map((a) => ({
      at: a.at,
      label: a.questionId,
      correct: a.correct,
    })),
    recommendedNext,
    readinessEstimate,
  }
}

export function getLocalExamHistory(): ExamResultSummary[] {
  return readLocalExams()
}

export function analyticsByService(attempts = readLocalAttempts()) {
  const map = new Map<string, { c: number; t: number; time: number }>()
  for (const a of attempts) {
    const key = a.service || 'untagged'
    const row = map.get(key) ?? { c: 0, t: 0, time: 0 }
    row.t += 1
    if (a.correct) row.c += 1
    row.time += a.latencyMs ?? 0
    map.set(key, row)
  }
  return [...map.entries()].map(([service, v]) => ({
    service,
    accuracy: v.t ? Math.round((v.c / v.t) * 1000) / 10 : 0,
    attempts: v.t,
    avgMs: v.t ? Math.round(v.time / v.t) : 0,
  }))
}
