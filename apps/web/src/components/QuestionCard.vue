<script setup lang="ts">
import { computed } from 'vue'
import type { GradeResult, Question } from '@/types'
import { renderMarkdown } from '@/services/markdown'
import { chooseCountFromStem, isMultiQuestion, multiSelectHint } from '@/services/questionMeta'

const props = defineProps<{
  question: Question
  selected: string[]
  grade?: GradeResult | null
  disabled?: boolean
  showFeedback?: boolean
}>()

const emit = defineEmits<{
  select: [ids: string[]]
}>()

const isMulti = computed(() => isMultiQuestion(props.question))
const expectedCount = computed(() => chooseCountFromStem(props.question.stem))
const chooseHint = computed(() => (isMulti.value ? multiSelectHint(props.question.stem) : ''))

const explanationHtml = computed(() => {
  const raw = props.grade?.explanation || ''
  const cleaned = raw.replace(/^\*\*Pembahasan:\*\*\s*/i, '').trim()
  return renderMarkdown(cleaned)
})

function toggle(id: string) {
  if (props.disabled) return
  if (isMulti.value) {
    const set = new Set(props.selected)
    if (set.has(id)) set.delete(id)
    else set.add(id)
    emit('select', [...set])
  } else {
    emit('select', [id])
  }
}

function optionClass(id: string) {
  const selected = props.selected.includes(id)
  if (props.showFeedback && props.grade) {
    const correct = props.grade.correct_option_ids.includes(id)
    if (correct) return 'border-[var(--color-success)] bg-[var(--color-success)]/10'
    if (selected && !correct) return 'border-[var(--color-danger)] bg-[var(--color-danger)]/10'
  }
  return selected
    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
    : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
}
</script>

<template>
  <article class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5">
    <div class="flex flex-wrap gap-2 text-xs text-[var(--color-ink-muted)] mb-3">
      <span class="px-2 py-0.5 rounded border border-[var(--color-border)]">{{ question.domain_id }}</span>
      <span class="px-2 py-0.5 rounded border border-[var(--color-border)]">{{ question.difficulty }}</span>
      <span
        class="px-2 py-0.5 rounded border"
        :class="isMulti ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border)]'"
      >
        {{ isMulti ? 'multi-select' : 'single' }}
      </span>
    </div>
    <h2 class="text-lg font-medium leading-relaxed">{{ question.stem }}</h2>
    <p v-if="isMulti" class="mt-2 text-sm text-[var(--color-accent)]">
      {{ chooseHint }}
      <span v-if="selected.length" class="text-[var(--color-ink-muted)]"> · {{ selected.length }} dipilih</span>
      <span
        v-if="expectedCount && selected.length > 0 && selected.length !== expectedCount"
        class="text-[var(--color-warn)]"
      >
        · perlu {{ expectedCount }}
      </span>
    </p>
    <div class="mt-4 space-y-2" :role="isMulti ? 'group' : 'radiogroup'" :aria-label="isMulti ? 'Pilihan ganda' : 'Pilihan tunggal'">
      <button
        v-for="opt in question.options"
        :key="opt.id"
        type="button"
        class="w-full text-left rounded-lg border px-3 py-3 transition-colors flex items-start gap-3"
        :class="optionClass(opt.id)"
        :disabled="disabled"
        :aria-pressed="selected.includes(opt.id)"
        :role="isMulti ? 'checkbox' : 'radio'"
        :aria-checked="selected.includes(opt.id)"
        @click="toggle(opt.id)"
      >
        <span
          class="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center border border-current"
          :class="[
            isMulti ? 'rounded-sm' : 'rounded-full',
            selected.includes(opt.id) ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : 'text-[var(--color-ink-muted)]',
          ]"
          aria-hidden="true"
        >
          <svg v-if="selected.includes(opt.id) && isMulti" viewBox="0 0 16 16" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <span v-else-if="selected.includes(opt.id)" class="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span class="min-w-0">
          <span class="font-mono text-xs text-[var(--color-accent)] mr-2">{{ opt.label }}</span>
          <span>{{ opt.body }}</span>
        </span>
      </button>
    </div>
    <div
      v-if="showFeedback && grade"
      class="mt-4 rounded-lg border border-[var(--color-border)] p-3 text-sm"
    >
      <div
        class="font-medium"
        :class="
          grade.ungraded
            ? 'text-[var(--color-warn)]'
            : grade.correct
              ? 'text-[var(--color-success)]'
              : 'text-[var(--color-danger)]'
        "
      >
        <template v-if="grade.ungraded">Study only · belum ada kunci jawaban</template>
        <template v-else>
          {{ grade.correct ? 'Benar' : 'Salah' }}
          <span v-if="isMulti && !grade.correct" class="font-normal text-[var(--color-ink-muted)]">
            · kunci: {{ grade.correct_option_ids.length }} opsi
          </span>
        </template>
      </div>
      <div class="mt-3 border-t border-[var(--color-border)] pt-3">
        <div class="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)] mb-2">
          Pembahasan
        </div>
        <div class="prose-explain" v-html="explanationHtml" />
      </div>
    </div>
  </article>
</template>
