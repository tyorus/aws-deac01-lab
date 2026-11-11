<script setup lang="ts">
import { computed, ref } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { useSessionStore } from '@/stores/session'
import { recordLocalAttempt } from '@/services/analytics'
import { scheduleReview, defaultSm2State, confidenceToQuality } from '@/services/sm2'

const session = useSessionStore()
const domain = ref('')
const service = ref('')
const topic = ref('')
const difficulty = ref('')
const feedback = ref<'immediate' | 'delayed'>('immediate')
const count = ref(10)
const confidence = ref(3)
const busy = ref(false)
const message = ref('')
const bookmarks = ref<string[]>(JSON.parse(localStorage.getItem('dea-bookmarks') || '[]'))
const incorrect = ref<string[]>(JSON.parse(localStorage.getItem('dea-incorrect') || '[]'))

const selected = computed(() => {
  const q = session.currentQuestion
  if (!q || !session.current) return []
  return session.current.answers[q.id] ?? []
})

const showFeedback = computed(
  () => feedback.value === 'immediate' && Boolean(session.lastGrade),
)

async function start() {
  busy.value = true
  message.value = ''
  try {
    await session.startDrill({
      domain: domain.value || undefined,
      service: service.value || undefined,
      topic: topic.value || undefined,
      difficulty: difficulty.value || undefined,
      count: count.value,
      feedback: feedback.value,
      mode: 'drill',
    })
  } catch (e) {
    message.value = e instanceof Error ? e.message : String(e)
  } finally {
    busy.value = false
  }
}

function onSelect(ids: string[]) {
  if (!session.currentQuestion) return
  session.selectAnswer(session.currentQuestion.id, ids)
}

async function check() {
  const q = session.currentQuestion
  if (!q) return
  const grade = await session.gradeCurrent(confidence.value)
  if (!grade) return
  recordLocalAttempt({
    at: new Date().toISOString(),
    questionId: q.id,
    domain: q.domain_id,
    topic: q.topics?.[0],
    service: q.services?.[0],
    correct: grade.correct,
    difficulty: q.difficulty,
  })
  if (!grade.correct) {
    incorrect.value = [...new Set([q.id, ...incorrect.value])]
    localStorage.setItem('dea-incorrect', JSON.stringify(incorrect.value))
  }
  const schedules = JSON.parse(localStorage.getItem('dea-srs') || '{}') as Record<
    string,
    { easeFactor: number; intervalDays: number; repetitions: number; dueAt: string }
  >
  const prev = schedules[q.id] ?? defaultSm2State()
  const next = scheduleReview(prev, confidenceToQuality(confidence.value))
  schedules[q.id] = {
    easeFactor: next.easeFactor,
    intervalDays: next.intervalDays,
    repetitions: next.repetitions,
    dueAt: next.dueAt.toISOString(),
  }
  localStorage.setItem('dea-srs', JSON.stringify(schedules))
}

function next() {
  if (!session.current) return
  session.lastGrade = null
  session.goTo(session.current.current_index + 1)
}

function prev() {
  if (!session.current) return
  session.lastGrade = null
  session.goTo(session.current.current_index - 1)
}

function toggleBookmark() {
  const q = session.currentQuestion
  if (!q) return
  const set = new Set(bookmarks.value)
  if (set.has(q.id)) set.delete(q.id)
  else set.add(q.id)
  bookmarks.value = [...set]
  localStorage.setItem('dea-bookmarks', JSON.stringify(bookmarks.value))
}

async function reviewIncorrect() {
  if (!incorrect.value.length) {
    message.value = 'No incorrect questions saved yet.'
    return
  }
  await session.startDrill({
    questionIds: incorrect.value,
    count: incorrect.value.length,
    feedback: 'immediate',
    mode: 'drill',
  })
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Question drill</h1>
      <p class="text-sm text-[var(--color-ink-muted)] mt-1">Filter by domain, service, topic, or difficulty.</p>
    </div>

    <form
      v-if="!session.current || session.current.mode !== 'drill' || session.current.status !== 'active'"
      class="grid md:grid-cols-3 gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
      @submit.prevent="start"
    >
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Domain code</span>
        <input v-model="domain" placeholder="D1 / D2 / D3 / D4" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Service slug</span>
        <input v-model="service" placeholder="glue / redshift / kinesis" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Topic</span>
        <input v-model="topic" placeholder="orchestration" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Difficulty</span>
        <select v-model="difficulty" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Feedback</span>
        <select v-model="feedback" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
          <option value="immediate">Immediate</option>
          <option value="delayed">Delayed</option>
        </select>
      </label>
      <label class="text-sm">
        <span class="text-[var(--color-ink-muted)]">Count</span>
        <input v-model.number="count" type="number" min="1" max="65" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <div class="md:col-span-3 flex flex-wrap gap-2">
        <button type="submit" class="rounded-md bg-[var(--color-accent)] text-white px-4 py-2 text-sm font-medium" :disabled="busy">
          Start practice
        </button>
        <button type="button" class="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm" @click="reviewIncorrect">
          Review incorrect
        </button>
      </div>
      <p v-if="message" class="md:col-span-3 text-sm text-[var(--color-danger)]">{{ message }}</p>
    </form>

    <div v-else-if="session.currentQuestion" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--color-ink-muted)]">
        <span>
          Question {{ session.current!.current_index + 1 }} /
          {{ session.current!.question_ids.length }}
        </span>
        <div class="flex gap-2">
          <button type="button" class="rounded-md border border-[var(--color-border)] px-3 py-1.5" @click="toggleBookmark">
            {{ bookmarks.includes(session.currentQuestion.id) ? 'Bookmarked' : 'Bookmark' }}
          </button>
          <button type="button" class="rounded-md border border-[var(--color-border)] px-3 py-1.5" @click="session.clear()">
            End
          </button>
        </div>
      </div>

      <QuestionCard
        :question="session.currentQuestion"
        :selected="selected"
        :grade="session.lastGrade"
        :show-feedback="showFeedback"
        :disabled="Boolean(session.lastGrade) && feedback === 'immediate'"
        @select="onSelect"
      />

      <div class="flex flex-wrap items-center gap-3">
        <label class="text-sm text-[var(--color-ink-muted)] flex items-center gap-2">
          Confidence
          <input v-model.number="confidence" type="range" min="1" max="5" />
          <span class="tabular-nums w-4">{{ confidence }}</span>
        </label>
        <button type="button" class="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm" @click="prev">Previous</button>
        <button
          v-if="feedback === 'immediate' && !session.lastGrade"
          type="button"
          class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm"
          @click="check"
        >
          Check answer
        </button>
        <button
          v-else
          type="button"
          class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm"
          @click="async () => { if (feedback === 'delayed' && !session.lastGrade) await check(); next() }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
