import type { GradeResult, QuestionOption } from '@/types'
import { getRawById } from '@/services/localQuestions'

export function stripAnswerKeys(
  options: { id: string; label: string; body: string; correct?: boolean }[],
): QuestionOption[] {
  return options.map(({ id, label, body }) => ({ id, label, body }))
}

export function gradeLocally(questionId: string, selectedIds: string[]): GradeResult {
  const raw = getRawById(questionId)
  if (!raw) {
    return {
      correct: false,
      correct_option_ids: [],
      explanation: 'Question answer key not found in local content pack.',
      selected_ids: selectedIds,
    }
  }
  const correct = raw.options.filter((o) => o.correct).map((o) => o.id)
  const selected = [...selectedIds].sort()
  const expected = [...correct].sort()
  const ok =
    selected.length === expected.length && selected.every((id, i) => id === expected[i])
  return {
    correct: ok,
    correct_option_ids: correct,
    explanation: raw.explanation,
    selected_ids: selectedIds,
  }
}
