<script setup lang="ts">
defineProps<{ label: string; value: string | number; hint?: string }>()
</script>

<template>
  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
    <div class="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">{{ label }}</div>
    <div class="mt-2 text-2xl font-semibold tabular-nums">{{ value }}</div>
    <div v-if="hint" class="mt-1 text-xs text-[var(--color-ink-muted)]">{{ hint }}</div>
  </div>
</template>
