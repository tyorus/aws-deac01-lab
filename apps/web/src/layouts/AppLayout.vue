<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()

const links = [
  { to: '/', label: 'Dashboard', name: 'dashboard' },
  { to: '/drill', label: 'Drill', name: 'drill' },
  { to: '/exam', label: 'Exam', name: 'exam' },
  { to: '/review', label: 'Review', name: 'review' },
  { to: '/knowledge', label: 'Knowledge', name: 'knowledge' },
  { to: '/analytics', label: 'Analytics', name: 'analytics' },
]

const active = computed(() => route.name)

async function onLogout() {
  await auth.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
      <div class="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <RouterLink to="/" class="font-semibold tracking-tight text-lg">
          DEA-C01<span class="text-[var(--color-accent)]"> Lab</span>
        </RouterLink>
        <nav class="hidden md:flex items-center gap-1 text-sm">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="px-3 py-1.5 rounded-md transition-colors"
            :class="
              active === link.name || (link.name === 'knowledge' && String(active).startsWith('knowledge'))
                ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)]'
                : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            "
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <div class="ml-auto flex items-center gap-2">
          <button
            type="button"
            class="text-xs px-2.5 py-1.5 rounded-md border border-[var(--color-border)] text-[var(--color-ink-muted)]"
            @click="theme.toggle()"
          >
            {{ theme.mode === 'dark' ? 'Light' : 'Dark' }}
          </button>
          <span class="hidden sm:inline text-xs text-[var(--color-ink-muted)] truncate max-w-[10rem]">
            {{ auth.user?.email || 'local mode' }}
          </span>
          <button
            v-if="auth.isAuthenticated"
            type="button"
            class="text-xs px-2.5 py-1.5 rounded-md border border-[var(--color-border)]"
            @click="onLogout"
          >
            Logout
          </button>
        </div>
      </div>
      <nav class="md:hidden flex gap-1 px-3 pb-3 overflow-x-auto text-sm">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="shrink-0 px-3 py-1.5 rounded-md border border-[var(--color-border)]"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </header>
    <main class="flex-1 mx-auto w-full max-w-7xl px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>
