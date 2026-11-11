/** Lightweight SM-2-inspired scheduler (modular; swap later). */

export interface Sm2State {
  easeFactor: number
  intervalDays: number
  repetitions: number
}

export interface Sm2Result extends Sm2State {
  dueAt: Date
}

/** Map confidence 1–5 to SM-2 quality 0–5. */
export function confidenceToQuality(confidence: number): number {
  return Math.max(0, Math.min(5, Math.round(confidence)))
}

export function scheduleReview(
  state: Sm2State,
  quality: number,
  now = new Date(),
): Sm2Result {
  let { easeFactor, intervalDays, repetitions } = state
  const q = Math.max(0, Math.min(5, quality))

  if (q < 3) {
    repetitions = 0
    intervalDays = 1
  } else {
    if (repetitions === 0) intervalDays = 1
    else if (repetitions === 1) intervalDays = 6
    else intervalDays = Math.round(intervalDays * easeFactor)

    repetitions += 1
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const dueAt = new Date(now.getTime() + intervalDays * 86_400_000)
  return { easeFactor, intervalDays, repetitions, dueAt }
}

export const defaultSm2State = (): Sm2State => ({
  easeFactor: 2.5,
  intervalDays: 0,
  repetitions: 0,
})
