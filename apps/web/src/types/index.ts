export type QuestionType = 'single' | 'multi'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionStatus = 'draft' | 'reviewed' | 'published'
export type VerificationStatus = 'verified' | 'community' | 'uncertain' | 'original'
export type SessionMode = 'drill' | 'exam'
export type FeedbackMode = 'immediate' | 'delayed'
export type Confidence = 1 | 2 | 3 | 4 | 5

export interface ExamDomain {
  id: string
  code: string
  name: string
  weight_pct: number
  sort_order: number
}

export interface Topic {
  id: string
  domain_id: string
  slug: string
  name: string
}

export interface AwsService {
  id: string
  slug: string
  name: string
  category: string
}

export interface QuestionOption {
  id: string
  label: string
  body: string
}

export interface Question {
  id: string
  stem: string
  type: QuestionType
  difficulty: Difficulty
  domain_id: string
  status: QuestionStatus
  provenance: string
  verification_status: VerificationStatus
  topics?: string[]
  services?: string[]
  options: QuestionOption[]
}

export interface GradeResult {
  correct: boolean
  correct_option_ids: string[]
  explanation: string
  selected_ids: string[]
  /** True when the bank has no reliable answer key (study-only item). */
  ungraded?: boolean
}

export interface QuizSession {
  id: string
  user_id: string
  mode: SessionMode
  status: 'active' | 'submitted' | 'abandoned'
  config: Record<string, unknown>
  question_ids: string[]
  answers: Record<string, string[]>
  marked_review: string[]
  current_index: number
  started_at: string
  ends_at: string | null
  submitted_at: string | null
}

export interface DashboardStats {
  totalAttempts: number
  uniqueCompleted: number
  overallAccuracy: number
  streakDays: number
  domainAccuracy: { domain: string; accuracy: number; attempts: number }[]
  weakTopics: { topic: string; accuracy: number; attempts: number }[]
  recentActivity: { at: string; label: string; correct?: boolean }[]
  recommendedNext: string
  readinessEstimate: number
}

export interface ExamResultSummary {
  id: string
  score_pct: number
  correct_count: number
  total_count: number
  duration_seconds: number
  domain_breakdown: { domain: string; correct: number; total: number; accuracy: number }[]
  created_at: string
}

export interface ReviewSchedule {
  id: string
  question_id: string
  ease_factor: number
  interval_days: number
  repetitions: number
  due_at: string
  last_confidence: number | null
}

export interface ContentQuestionFile {
  id: string
  domain: string
  topics: string[]
  services: string[]
  difficulty: Difficulty
  type: QuestionType
  stem: string
  options: { id: string; label: string; body: string; correct: boolean }[]
  explanation: string
  provenance: string
  verification_status: VerificationStatus
  status: QuestionStatus
  reviewed_at: string
}
