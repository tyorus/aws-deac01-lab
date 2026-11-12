<script setup lang="ts">
import { computed } from 'vue'
import type { GradeResult, Question } from '@/types'
import { renderMarkdown } from '@/services/markdown'

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

const isMulti = computed(() => props.question.type === 'multi')

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
      <span class="px-2 py-0.5 rounded border border-[var(--color-border)]">{{ question.type }}</span>
    </div>
    <h2 class="text-lg font-medium leading-relaxed">{{ question.stem }}</h2>
    <p v-if="isMulti" class="mt-2 text-xs text-[var(--color-ink-muted)]">Select all that apply.</p>
    <div class="mt-4 space-y-2">
      <button
        v-for="opt in question.options"
        :key="opt.id"
        type="button"
        class="w-full text-left rounded-lg border px-3 py-3 transition-colors"
        :class="optionClass(opt.id)"
        :disabled="disabled"
        @click="toggle(opt.id)"
      >
        <span class="font-mono text-xs text-[var(--color-accent)] mr-2">{{ opt.label }}</span>
        <span>{{ opt.body }}</span>
      </button>
    </div>
    <div
      v-if="showFeedback && grade"
      class="mt-4 rounded-lg border border-[var(--color-border)] p-3 text-sm"
    >
      <div
        class="font-medium"
        :class="grade.correct ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'"
      >
        {{ grade.correct ? 'Benar' : 'Salah' }}
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
