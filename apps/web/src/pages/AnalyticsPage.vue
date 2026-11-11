<script setup lang="ts">
import { onMounted, ref } from 'vue'
import StatCard from '@/components/StatCard.vue'
import {
  analyticsByService,
  getLocalExamHistory,
  loadDashboardStats,
} from '@/services/analytics'
import type { DashboardStats, ExamResultSummary } from '@/types'

const stats = ref<DashboardStats | null>(null)
const byService = ref<ReturnType<typeof analyticsByService>>([])
const exams = ref<ExamResultSummary[]>([])

onMounted(async () => {
  stats.value = await loadDashboardStats()
  byService.value = analyticsByService()
  exams.value = getLocalExamHistory()
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Learning analytics</h1>
      <p class="text-sm text-[var(--color-ink-muted)] mt-1">
        Performance trends from your attempts. Readiness is an internal estimate only.
      </p>
    </div>

    <div v-if="stats" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard label="Accuracy" :value="`${stats.overallAccuracy}%`" />
      <StatCard label="Unique questions" :value="stats.uniqueCompleted" />
      <StatCard label="Streak" :value="`${stats.streakDays}d`" />
      <StatCard label="Readiness (internal)" :value="`${stats.readinessEstimate}%`" hint="Not an official AWS prediction" />
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <h2 class="font-medium mb-3">By domain</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="d in stats?.domainAccuracy || []" :key="d.domain" class="flex justify-between gap-3">
            <span>{{ d.domain }}</span>
            <span class="text-[var(--color-ink-muted)]">{{ d.accuracy }}% · {{ d.attempts }} attempts</span>
          </li>
          <li v-if="!stats?.domainAccuracy.length" class="text-[var(--color-ink-muted)]">No data yet.</li>
        </ul>
      </section>
      <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <h2 class="font-medium mb-3">By AWS service</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="s in byService" :key="s.service" class="flex justify-between gap-3">
            <span>{{ s.service }}</span>
            <span class="text-[var(--color-ink-muted)]">{{ s.accuracy }}% · avg {{ s.avgMs }}ms</span>
          </li>
          <li v-if="!byService.length" class="text-[var(--color-ink-muted)]">No data yet.</li>
        </ul>
      </section>
    </div>

    <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
      <h2 class="font-medium mb-3">Frequently incorrect / weak topics</h2>
      <ul class="text-sm space-y-2">
        <li v-for="t in stats?.weakTopics || []" :key="t.topic" class="flex justify-between">
          <span>{{ t.topic }}</span>
          <span class="text-[var(--color-ink-muted)]">{{ t.accuracy }}%</span>
        </li>
        <li v-if="!stats?.weakTopics.length" class="text-[var(--color-ink-muted)]">Need more graded attempts.</li>
      </ul>
    </section>

    <section class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
      <h2 class="font-medium mb-3">Mock exam history</h2>
      <ul class="text-sm space-y-2">
        <li v-for="e in exams" :key="e.id" class="flex justify-between gap-3">
          <span>{{ new Date(e.created_at).toLocaleString() }}</span>
          <span class="tabular-nums">{{ e.score_pct }}% ({{ e.correct_count }}/{{ e.total_count }})</span>
        </li>
        <li v-if="!exams.length" class="text-[var(--color-ink-muted)]">No mock exams submitted yet.</li>
      </ul>
    </section>
  </div>
</template>
