<script setup lang="ts">
import { onMounted, ref } from 'vue'
import StatCard from '@/components/StatCard.vue'
import type { DashboardStats } from '@/types'
import { loadDashboardStats } from '@/services/analytics'
import { useSessionStore } from '@/stores/session'

const stats = ref<DashboardStats | null>(null)
const session = useSessionStore()
const recovered = ref(false)

onMounted(async () => {
  recovered.value = session.restoreRecovery()
  stats.value = await loadDashboardStats()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Learning dashboard</h1>
        <p class="text-sm text-[var(--color-ink-muted)] mt-1">
          Track progress across DEA-C01 domains. Readiness is an internal estimate, not an official AWS prediction.
        </p>
      </div>
      <div class="flex gap-2">
        <RouterLink to="/drill" class="rounded-md bg-[var(--color-accent)] text-white px-3 py-2 text-sm font-medium">Start drill</RouterLink>
        <RouterLink to="/exam" class="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm">Mock exam</RouterLink>
      </div>
    </div>

    <div
      v-if="recovered"
      class="rounded-lg border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-4 py-3 text-sm flex items-center justify-between gap-3"
    >
      <span>An in-progress session was recovered.</span>
      <RouterLink :to="session.current?.mode === 'exam' ? '/exam' : '/drill'" class="font-medium text-[var(--color-accent)]">
        Resume
      </RouterLink>
    </div>

    <div v-if="stats" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard label="Attempts" :value="stats.totalAttempts" />
      <StatCard label="Unique completed" :value="stats.uniqueCompleted" />
      <StatCard label="Accuracy" :value="`${stats.overallAccuracy}%`" />
      <StatCard label="Streak" :value="`${stats.streakDays}d`" />
    </div>

    <div v-if="stats" class="grid lg:grid-cols-3 gap-4">
      <section class="lg:col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <h2 class="font-medium mb-3">Domain accuracy</h2>
        <div v-if="!stats.domainAccuracy.length" class="text-sm text-[var(--color-ink-muted)]">No attempts yet.</div>
        <ul class="space-y-2">
          <li v-for="d in stats.domainAccuracy" :key="d.domain" class="flex items-center gap-3 text-sm">
            <div class="w-40 truncate text-[var(--color-ink-muted)]">{{ d.domain }}</div>
            <div class="flex-1 h-2 rounded bg-[var(--color-border)] overflow-hidden">
              <div class="h-full bg-[var(--color-accent)]" :style="{ width: `${d.accuracy}%` }" />
            </div>
            <div class="w-16 text-right tabular-nums">{{ d.accuracy }}%</div>
          </li>
        </ul>
      </section>
      <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 space-y-4">
        <div>
          <h2 class="font-medium">Recommended next</h2>
          <p class="mt-2 text-sm text-[var(--color-ink-muted)]">{{ stats.recommendedNext }}</p>
        </div>
        <div>
          <h2 class="font-medium">Internal readiness</h2>
          <p class="mt-2 text-3xl font-semibold tabular-nums">{{ stats.readinessEstimate }}%</p>
          <p class="text-xs text-[var(--color-ink-muted)] mt-1">Estimate only — not an AWS pass prediction.</p>
        </div>
        <div>
          <h2 class="font-medium mb-2">Weak topics</h2>
          <ul class="text-sm space-y-1">
            <li v-for="t in stats.weakTopics" :key="t.topic" class="flex justify-between gap-2">
              <span>{{ t.topic }}</span>
              <span class="text-[var(--color-ink-muted)]">{{ t.accuracy }}%</span>
            </li>
            <li v-if="!stats.weakTopics.length" class="text-[var(--color-ink-muted)]">Need more attempts.</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
