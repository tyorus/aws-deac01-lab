<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import { useAuthStore } from '@/stores/auth'
import { DEMO_CREDENTIALS } from '@/services/demoAuth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref(DEMO_CREDENTIALS.email)
const password = ref(DEMO_CREDENTIALS.password)
const busy = ref(false)
const message = ref('')

async function submit() {
  busy.value = true
  message.value = ''
  try {
    await auth.login(email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch (e) {
    message.value = e instanceof Error ? e.message : 'Login failed'
  } finally {
    busy.value = false
  }
}

function fillDemo() {
  email.value = DEMO_CREDENTIALS.email
  password.value = DEMO_CREDENTIALS.password
}

async function continueLocal() {
  auth.enterLocalGuest()
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  await router.push(redirect)
}
</script>

<template>
  <AuthCard title="Sign in" subtitle="Continue your DEA-C01 preparation.">
    <div class="mb-3 rounded-md border border-[var(--color-border)] bg-[var(--color-accent)]/8 px-3 py-2 text-sm">
      <p class="font-medium text-[var(--color-ink)]">Demo account</p>
      <p class="mt-1 text-[var(--color-ink-muted)]">
        Email: <code class="text-[var(--color-ink)]">{{ DEMO_CREDENTIALS.email }}</code><br />
        Password: <code class="text-[var(--color-ink)]">{{ DEMO_CREDENTIALS.password }}</code>
      </p>
      <button
        type="button"
        class="mt-2 text-xs font-medium text-[var(--color-accent)] underline"
        @click="fillDemo"
      >
        Fill demo credentials
      </button>
    </div>
    <form class="space-y-3" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="text-[var(--color-ink-muted)]">Email</span>
        <input v-model="email" type="email" required class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <label class="block text-sm">
        <span class="text-[var(--color-ink-muted)]">Password</span>
        <input v-model="password" type="password" required minlength="6" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <p v-if="message" class="text-sm text-[var(--color-danger)]">{{ message }}</p>
      <button type="submit" class="w-full rounded-md bg-[var(--color-accent)] text-white py-2.5 font-medium disabled:opacity-60" :disabled="busy">
        {{ busy ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
    <button
      type="button"
      class="mt-3 w-full rounded-md border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-accent)]/10"
      @click="continueLocal"
    >
      Continue without account (local study)
    </button>
    <div class="mt-4 text-sm text-[var(--color-ink-muted)] flex justify-between">
      <RouterLink to="/register" class="text-[var(--color-accent)]">Create account</RouterLink>
      <RouterLink to="/forgot-password" class="text-[var(--color-accent)]">Reset password</RouterLink>
    </div>
  </AuthCard>
</template>
