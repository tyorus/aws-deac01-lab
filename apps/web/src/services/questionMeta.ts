/** Detect AWS-style multi prompts, including `(Choose two.)`. */
const CHOOSE_RE = /\(\s*Choose\s+(two|three|four|five)\.?\s*\)/i

const WORD_TO_N: Record<string, number> = {
  two: 2,
  three: 3,
  four: 4,
  five: 5,
}

export function chooseCountFromStem(stem: string | null | undefined): number {
  const m = String(stem || '').match(CHOOSE_RE)
  if (!m) return 0
  return WORD_TO_N[m[1].toLowerCase()] || 0
}

export function isMultiQuestion(question: { type?: string; stem?: string }): boolean {
  if (question.type === 'multi') return true
  return chooseCountFromStem(question.stem) > 0
}

export function multiSelectHint(stem: string | null | undefined): string {
  const n = chooseCountFromStem(stem)
  if (n > 0) return `Pilih ${n} jawaban.`
  return 'Pilih semua yang benar (bisa lebih dari satu).'
}
