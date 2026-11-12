<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { examConfig } from '@/generated/index'
import { useSessionStore } from '@/stores/session'
import { gradeLocally } from '@/services/localGrader'
import { renderMarkdown } from '@/services/markdown'
import { recordLocalExam } from '@/services/analytics'
import type { ExamResultSummary } from '@/types'

function explanationHtml(questionId: string, selectedIds: string[]) {
  const raw = gradeLocally(questionId, selectedIds).explanation || ''
  const cleaned = raw.replace(/^\*\*Pembahasan:\*\*\s*/i, '').trim()
  return renderMarkdown(cleaned)
}

const session = useSessionStore()
const presetId = ref('full')
const confirming = ref(false)
const result = ref<{
  result: ExamResultSummary
  questions: typeof session.questions
  answers: Record<string, string[]>
} | null>(null)
const now = ref(Date.now())
let timer: number | undefined

const presets = examConfig.presets

const selected = computed(() => {
  const q = session.currentQuestion
  if (!q || !session.current) return []
  return session.current.answers[q.id] ?? []
})

const remaining = computed(() => {
  if (!session.current?.ends_at) return null
  return Math.max(0, new Date(session.current.ends_at).getTime() - now.value)
})

const remainingLabel = computed(() => {
  if (remaining.value == null) return '—'
  const total = Math.floor(remaining.value / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

onMounted(() => {
  session.restoreRecovery()
  if (!session.current || session.current.mode !== 'exam' || session.current.status !== 'active') {
    result.value = session.restoreLastExam() as typeof result.value
  }
  timer = window.setInterval(() => {
    now.value = Date.now()
    if (remaining.value === 0 && session.current?.status === 'active') {
      void finish()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})

async function start() {
  result.value = null
  session.clearLastExam()
  const preset = presets.find((p) => p.id === presetId.value) ?? presets[0]
  await session.startDrill({
    mode: 'exam',
    count: preset.question_count,
    timedMinutes: preset.duration_minutes,
    feedback: 'delayed',
  })
}

function onSelect(ids: string[]) {
  if (!session.currentQuestion) return
  session.selectAnswer(session.currentQuestion.id, ids)
}

async function finish() {
  confirming.value = false
  const data = await session.submitExam()
  if (!data) return
  result.value = data as typeof result.value
  if (result.value?.result) recordLocalExam(result.value.result)
}

function optionReviewClass(questionId: string, optionId: string) {
  const grade = gradeLocally(questionId, result.value?.answers[questionId] ?? [])
  const selectedIds = result.value?.answers[questionId] ?? []
  if (grade.correct_option_ids.includes(optionId)) return 'border-[var(--color-success)]'
  if (selectedIds.includes(optionId)) return 'border-[var(--color-danger)]'
  return 'border-[var(--color-border)]'
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Exam simulator</h1>
      <p class="text-sm text-[var(--color-ink-muted)] mt-1">
        Defaults follow the official DEA-C01 guide (65 questions / 130 minutes). No explanations during the exam.
      </p>
    </div>

    <div
      v-if="!session.current || session.current.mode !== 'exam' || session.current.status !== 'active'"
      class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 space-y-4"
    >
      <label class="block text-sm max-w-md">
        <span class="text-[var(--color-ink-muted)]">Preset</span>
        <select v-model="presetId" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2">
          <option v-for="p in presets" :key="p.id" :value="p.id">
            {{ p.name }} — {{ p.question_count }}Q / {{ p.duration_minutes }}m
          </option>
        </select>
      </label>
      <button type="button" class="rounded-md bg-[var(--color-accent)] text-white px-4 py-2 text-sm font-medium" @click="start">
        Begin exam
      </button>
    </div>

    <div v-else-if="session.currentQuestion" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div class="font-mono tabular-nums text-lg" :class="remaining !== null && remaining < 300000 ? 'text-[var(--color-danger)]' : ''">
          {{ remainingLabel }}
        </div>
        <div class="text-[var(--color-ink-muted)]">
          {{ session.current.current_index + 1 }} / {{ session.current.question_ids.length }}
        </div>
        <div class="flex gap-2">
          <button type="button" class="rounded-md border border-[var(--color-border)] px-3 py-1.5" @click="session.toggleMark(session.currentQuestion!.id)">
            {{ session.current.marked_review.includes(session.currentQuestion.id) ? 'Unmark' : 'Mark review' }}
          </button>
          <button type="button" class="rounded-md border border-[var(--color-danger)] text-[var(--color-danger)] px-3 py-1.5" @click="confirming = true">
            Submit
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-1">
        <button
          v-for="(id, idx) in session.current.question_ids"
          :key="id"
          type="button"
          class="w-8 h-8 text-xs rounded border"
          :class="[
            idx === session.current.current_index ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]',
            session.current.answers[id]?.length ? 'bg-[var(--color-accent)]/15' : '',
            session.current.marked_review.includes(id) ? 'ring-1 ring-[var(--color-warn)]' : '',
          ]"
          @click="session.goTo(idx)"
        >
          {{ idx + 1 }}
        </button>
      </div>

      <QuestionCard
        :question="session.currentQuestion"
        :selected="selected"
        :show-feedback="false"
        @select="onSelect"
      />

      <div class="flex gap-2">
        <button type="button" class="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm" @click="session.goTo(session.current!.current_index - 1)">Previous</button>
        <button type="button" class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm" @click="session.goTo(session.current!.current_index + 1)">Next</button>
      </div>
    </div>

    <div
      v-if="confirming"
      class="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50"
    >
      <div class="rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-5 max-w-md w-full space-y-3">
        <h2 class="font-semibold">Submit exam?</h2>
        <p class="text-sm text-[var(--color-ink-muted)]">You cannot change answers after submission.</p>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-3 py-2 text-sm" @click="confirming = false">Cancel</button>
          <button type="button" class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm" @click="finish">Submit</button>
        </div>
      </div>
    </div>

    <div v-if="result" class="space-y-4">
      <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5">
        <h2 class="text-xl font-semibold">Result summary</h2>
        <p class="mt-2 text-3xl font-semibold tabular-nums">{{ result.result.score_pct }}%</p>
        <p class="text-sm text-[var(--color-ink-muted)]">
          {{ result.result.correct_count }} / {{ result.result.total_count }} correct ·
          {{ Math.round(result.result.duration_seconds / 60) }} min
        </p>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="d in result.result.domain_breakdown" :key="d.domain" class="flex justify-between">
            <span>{{ d.domain }}</span>
            <span>{{ d.correct }}/{{ d.total }} ({{ d.accuracy }}%)</span>
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h3 class="font-medium">Answer review</h3>
        <article
          v-for="q in result.questions"
          :key="q.id"
          class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
        >
          <p class="font-medium">{{ q.stem }}</p>
          <ul class="mt-3 space-y-2 text-sm">
            <li
              v-for="opt in q.options"
              :key="opt.id"
              class="rounded-md border px-3 py-2"
              :class="optionReviewClass(q.id, opt.id)"
            >
              <span class="font-mono text-xs mr-2">{{ opt.label }}</span>{{ opt.body }}
            </li>
          </ul>
          <div class="mt-3 border-t border-[var(--color-border)] pt-3">
            <div class="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)] mb-2">
              Pembahasan
            </div>
            <div
              class="prose-explain text-sm"
              v-html="explanationHtml(q.id, result.answers[q.id] || [])"
            />
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
