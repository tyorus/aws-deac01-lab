import assert from 'node:assert/strict'

/** Mirror of apps/web/src/services/sm2.ts for CI without Vue tooling. */
function scheduleReview(state, quality, now = new Date()) {
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

const first = scheduleReview({ easeFactor: 2.5, intervalDays: 0, repetitions: 0 }, 4)
assert.equal(first.repetitions, 1)
assert.equal(first.intervalDays, 1)

const fail = scheduleReview({ easeFactor: 2.5, intervalDays: 6, repetitions: 2 }, 1)
assert.equal(fail.repetitions, 0)
assert.equal(fail.intervalDays, 1)

console.log('SM-2 tests passed')
