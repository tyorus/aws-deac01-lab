<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { useSessionStore } from '@/stores/session'
import { recordLocalAttempt } from '@/services/analytics'
import { scheduleReview, defaultSm2State, confidenceToQuality } from '@/services/sm2'
import { filterRawQuestions, getDrillCatalog } from '@/services/localQuestions'
import { examConfig } from '@/generated/index'
import type { QuestionType } from '@/types'

const session = useSessionStore()
const catalog = getDrillCatalog('published')
const domainNames = Object.fromEntries(
  (examConfig.official?.domain_weights || []).map((d: { code: string; name: string }) => [d.code, d.name]),
)

const domain = ref('')
const service = ref('')
const difficulty = ref('')
const questionType = ref<'' | QuestionType>('')
const feedback = ref<'immediate' | 'delayed'>('immediate')
const countMode = ref<'all' | 'custom'>('all')
const customCount = ref(20)
const confidence = ref(3)
const busy = ref(false)
const message = ref('')
const bookmarks = ref<string[]>(JSON.parse(localStorage.getItem('dea-bookmarks') || '[]'))
const incorrect = ref<string[]>(JSON.parse(localStorage.getItem('dea-incorrect') || '[]'))

const matchingCount = computed(() =>
  filterRawQuestions({
    status: 'published',
    domain: domain.value || undefined,
    service: service.value || undefined,
    difficulty: difficulty.value || undefined,
    type: questionType.value || undefined,
  }).length,
)

const domainOptions = computed(() =>
  Object.keys(catalog.domainCounts)
    .sort()
    .map((code) => ({
      code,
      count: catalog.domainCounts[code],
      label: domainNames[code] ? `${code} — ${domainNames[code]}` : code,
    })),
)

const serviceOptions = computed(() => catalog.services)

const effectiveCount = computed(() =>
  countMode.value === 'all' ? matchingCount.value : Math.min(Math.max(1, customCount.value || 1), matchingCount.value || 1),
)

const countPresets = computed(() => {
  const n = matchingCount.value
  const presets = [10, 20, 40, 65].filter((p) => p < n)
  return presets
})

watch(matchingCount, (n) => {
  if (countMode.value === 'custom' && customCount.value > n) customCount.value = Math.max(1, n)
})

const selected = computed(() => {
  const q = session.currentQuestion
  if (!q || !session.current) return []
  return session.current.answers[q.id] ?? []
})

const showFeedback = computed(
  () => feedback.value === 'immediate' && Boolean(session.lastGrade),
)

async function start() {
  if (!matchingCount.value) {
    message.value = 'Tidak ada soal untuk filter ini.'
    return
  }
  busy.value = true
  message.value = ''
  try {
    await session.startDrill({
      domain: domain.value || undefined,
      service: service.value || undefined,
      difficulty: difficulty.value || undefined,
      type: questionType.value || undefined,
      count: effectiveCount.value,
      loadAll: countMode.value === 'all',
      feedback: feedback.value,
      mode: 'drill',
    })
  } catch (e) {
    message.value = e instanceof Error ? e.message : String(e)
  } finally {
    busy.value = false
  }
}

function setDomain(code: string) {
  domain.value = code
  countMode.value = 'all'
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
    loadAll: true,
    feedback: 'immediate',
    mode: 'drill',
  })
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Question drill</h1>
      <p class="text-sm text-[var(--color-ink-muted)] mt-1">
        {{ catalog.total }} soal published · filter domain / service / tipe, lalu load semua atau sebagian.
      </p>
    </div>

    <form
      v-if="!session.current || session.current.mode !== 'drill' || session.current.status !== 'active'"
      class="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
      @submit.prevent="start"
    >
      <div>
        <div class="text-sm text-[var(--color-ink-muted)] mb-2">Domain</div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="!domain ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[var(--color-border)]'"
            @click="setDomain('')"
          >
            Semua ({{ catalog.total }})
          </button>
          <button
            v-for="d in domainOptions"
            :key="d.code"
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="domain === d.code ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[var(--color-border)]'"
            :title="d.label"
            @click="setDomain(d.code)"
          >
            {{ d.code }} ({{ d.count }})
          </button>
        </div>
        <p v-if="domain && domainNames[domain]" class="mt-2 text-xs text-[var(--color-ink-muted)]">
          {{ domainNames[domain] }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-3">
        <label class="text-sm">
          <span class="text-[var(--color-ink-muted)]">Service</span>
          <select v-model="service" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
            <option value="">Any service</option>
            <option v-for="s in serviceOptions" :key="s.slug" :value="s.slug">
              {{ s.slug }} ({{ s.count }})
            </option>
          </select>
        </label>
        <label class="text-sm">
          <span class="text-[var(--color-ink-muted)]">Question type</span>
          <select v-model="questionType" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
            <option value="">Any type</option>
            <option value="single">Single ({{ catalog.typeCounts.single || 0 }})</option>
            <option value="multi">Multi-select ({{ catalog.typeCounts.multi || 0 }})</option>
          </select>
        </label>
        <label class="text-sm">
          <span class="text-[var(--color-ink-muted)]">Difficulty</span>
          <select v-model="difficulty" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
            <option value="">Any</option>
            <option v-for="(n, key) in catalog.difficultyCounts" :key="key" :value="key">
              {{ key }} ({{ n }})
            </option>
          </select>
        </label>
        <label class="text-sm">
          <span class="text-[var(--color-ink-muted)]">Feedback</span>
          <select v-model="feedback" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
            <option value="immediate">Immediate</option>
            <option value="delayed">Delayed</option>
          </select>
        </label>
      </div>

      <div class="rounded-lg border border-[var(--color-border)] p-3 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="text-sm font-medium">Jumlah soal</div>
          <div class="text-sm text-[var(--color-ink-muted)]">
            cocok filter: <span class="tabular-nums text-[var(--color-ink)]">{{ matchingCount }}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="countMode === 'all' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[var(--color-border)]'"
            :disabled="!matchingCount"
            @click="countMode = 'all'"
          >
            Load semua ({{ matchingCount }})
          </button>
          <button
            v-for="p in countPresets"
            :key="p"
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm border-[var(--color-border)]"
            @click="countMode = 'custom'; customCount = p"
          >
            {{ p }}
          </button>
          <button
            type="button"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="countMode === 'custom' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'border-[var(--color-border)]'"
            :disabled="!matchingCount"
            @click="countMode = 'custom'"
          >
            Custom
          </button>
        </div>
        <label v-if="countMode === 'custom'" class="block text-sm max-w-xs">
          <span class="text-[var(--color-ink-muted)]">Custom count (1–{{ matchingCount || 1 }})</span>
          <input
            v-model.number="customCount"
            type="number"
            min="1"
            :max="matchingCount || 1"
            class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2"
          />
        </label>
        <p class="text-xs text-[var(--color-ink-muted)]">
          Session akan memuat <span class="tabular-nums font-medium text-[var(--color-ink)]">{{ effectiveCount }}</span> soal (acak dari filter aktif). Tidak ada batas 65.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="submit"
          class="rounded-md bg-[var(--color-accent)] text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
          :disabled="busy || !matchingCount"
        >
          Start practice ({{ effectiveCount }})
        </button>
        <button type="button" class="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm" @click="reviewIncorrect">
          Review incorrect ({{ incorrect.length }})
        </button>
      </div>
      <p v-if="message" class="text-sm text-[var(--color-danger)]">{{ message }}</p>
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
          class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm disabled:opacity-50"
          :disabled="selected.length === 0"
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
