<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <div class="min-h-screen grid place-items-center px-4 py-10 bg-[var(--color-surface)]">
    <div class="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm">
      <div class="mb-6">
        <div class="text-sm text-[var(--color-accent)] font-medium mb-1">DEA-C01 Lab</div>
        <h1 class="text-2xl font-semibold tracking-tight">{{ title }}</h1>
        <p v-if="subtitle" class="mt-1 text-sm text-[var(--color-ink-muted)]">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
  </div>
</template>
