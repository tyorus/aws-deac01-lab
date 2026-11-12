<script setup lang="ts">
import { computed, ref } from 'vue'
import { getRawById } from '@/services/localQuestions'
import { renderMarkdown } from '@/services/markdown'
import { useSessionStore } from '@/stores/session'

interface SrsEntry {
  easeFactor: number
  intervalDays: number
  repetitions: number
  dueAt: string
}

const session = useSessionStore()
const bookmarks = ref<string[]>(JSON.parse(localStorage.getItem('dea-bookmarks') || '[]'))
const incorrect = ref<string[]>(JSON.parse(localStorage.getItem('dea-incorrect') || '[]'))
const srs = ref<Record<string, SrsEntry>>(JSON.parse(localStorage.getItem('dea-srs') || '{}'))
const flashIndex = ref(0)
const flipped = ref(false)

const dueIds = computed(() =>
  Object.entries(srs.value)
    .filter(([, v]) => new Date(v.dueAt).getTime() <= Date.now())
    .map(([id]) => id),
)

const flashIds = computed(() => {
  const ids = dueIds.value.length ? dueIds.value : bookmarks.value.length ? bookmarks.value : incorrect.value
  return ids
})

const currentFlash = computed(() => {
  const id = flashIds.value[flashIndex.value]
  return id ? getRawById(id) : null
})

const flashExplanationHtml = computed(() => {
  const raw = currentFlash.value?.explanation || ''
  const cleaned = raw.replace(/^\*\*Pembahasan:\*\*\s*/i, '').trim()
  return renderMarkdown(cleaned)
})

async function startDue() {
  if (!dueIds.value.length) return
  await session.startDrill({ questionIds: dueIds.value, count: dueIds.value.length, feedback: 'immediate' })
}

function nextCard() {
  flipped.value = false
  if (!flashIds.value.length) return
  flashIndex.value = (flashIndex.value + 1) % flashIds.value.length
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Smart review</h1>
      <p class="text-sm text-[var(--color-ink-muted)] mt-1">
        SM-2-inspired scheduling, bookmarks, incorrect queue, and flashcards.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-3">
      <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <div class="text-xs uppercase text-[var(--color-ink-muted)]">Due now</div>
        <div class="text-2xl font-semibold mt-1">{{ dueIds.length }}</div>
        <button type="button" class="mt-3 text-sm text-[var(--color-accent)]" :disabled="!dueIds.length" @click="startDue">
          Review due items
        </button>
      </div>
      <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <div class="text-xs uppercase text-[var(--color-ink-muted)]">Bookmarks</div>
        <div class="text-2xl font-semibold mt-1">{{ bookmarks.length }}</div>
        <RouterLink to="/bookmarks" class="mt-3 inline-block text-sm text-[var(--color-accent)]">Open list</RouterLink>
      </div>
      <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <div class="text-xs uppercase text-[var(--color-ink-muted)]">Incorrect</div>
        <div class="text-2xl font-semibold mt-1">{{ incorrect.length }}</div>
        <RouterLink to="/drill" class="mt-3 inline-block text-sm text-[var(--color-accent)]">Drill incorrect</RouterLink>
      </div>
    </div>

    <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 min-h-64">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-medium">Flashcards</h2>
        <button type="button" class="text-sm rounded-md border border-[var(--color-border)] px-3 py-1.5" @click="nextCard">Next</button>
      </div>
      <div v-if="!currentFlash" class="text-sm text-[var(--color-ink-muted)]">No cards in queue. Bookmark questions or miss a few in drill first.</div>
      <button
        v-else
        type="button"
        class="w-full text-left rounded-lg border border-[var(--color-border)] p-4 min-h-40"
        @click="flipped = !flipped"
      >
        <div class="text-xs text-[var(--color-ink-muted)] mb-2">{{ flipped ? 'Explanation' : 'Prompt' }} · click to flip</div>
        <p v-if="!flipped" class="leading-relaxed">{{ currentFlash.stem }}</p>
        <div v-else class="prose-explain leading-relaxed" v-html="flashExplanationHtml" />
      </button>
    </section>
  </div>
</template>
