<script setup lang="ts">
import { computed, ref } from 'vue'
import { getRawById } from '@/services/localQuestions'
import { useSessionStore } from '@/stores/session'

const ids = ref<string[]>(JSON.parse(localStorage.getItem('dea-bookmarks') || '[]'))
const session = useSessionStore()
const items = computed(() => ids.value.map((id) => getRawById(id)).filter(Boolean))

function remove(id: string) {
  ids.value = ids.value.filter((x) => x !== id)
  localStorage.setItem('dea-bookmarks', JSON.stringify(ids.value))
}

async function practiceAll() {
  if (!ids.value.length) return
  await session.startDrill({ questionIds: ids.value, count: ids.value.length, feedback: 'immediate' })
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold tracking-tight">Bookmarks</h1>
      <button type="button" class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm" :disabled="!ids.length" @click="practiceAll">
        Practice all
      </button>
    </div>
    <ul class="space-y-3">
      <li
        v-for="q in items"
        :key="q!.id"
        class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4"
      >
        <div class="flex justify-between gap-3">
          <div>
            <div class="font-mono text-xs text-[var(--color-accent)]">{{ q!.id }}</div>
            <p class="mt-1 text-sm leading-relaxed">{{ q!.stem }}</p>
          </div>
          <button type="button" class="text-xs text-[var(--color-ink-muted)]" @click="remove(q!.id)">Remove</button>
        </div>
      </li>
      <li v-if="!items.length" class="text-sm text-[var(--color-ink-muted)]">No bookmarks yet.</li>
    </ul>
  </div>
</template>
