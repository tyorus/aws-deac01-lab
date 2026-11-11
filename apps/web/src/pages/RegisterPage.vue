<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import { useAuthStore } from '@/stores/auth'
import { DEMO_CREDENTIALS } from '@/services/demoAuth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const busy = ref(false)
const message = ref('')

async function submit() {
  busy.value = true
  message.value = ''
  try {
    const data = await auth.register(email.value, password.value)
    if (data.session || auth.demoUser) await router.push('/')
    else message.value = 'Check your email to confirm the account, then sign in.'
  } catch (e) {
    message.value = e instanceof Error ? e.message : 'Registration failed'
  } finally {
    busy.value = false
  }
}

async function continueLocal() {
  auth.enterLocalGuest()
  await router.push('/')
}

async function useDemo() {
  await auth.login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)
  await router.push('/')
}
</script>

<template>
  <AuthCard title="Create account" subtitle="Track drills, exams, and spaced review privately.">
    <div class="mb-3 rounded-md border border-[var(--color-border)] bg-[var(--color-accent)]/8 px-3 py-2 text-sm text-[var(--color-ink-muted)]">
      Prefer a ready account?
      <button type="button" class="ml-1 font-medium text-[var(--color-accent)] underline" @click="useDemo">
        Sign in as demo
      </button>
      <span class="block mt-1 text-xs">{{ DEMO_CREDENTIALS.email }} / {{ DEMO_CREDENTIALS.password }}</span>
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
      <p v-if="message" class="text-sm" :class="message.includes('Check') ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'">{{ message }}</p>
      <button type="submit" class="w-full rounded-md bg-[var(--color-accent)] text-white py-2.5 font-medium disabled:opacity-60" :disabled="busy">
        {{ busy ? 'Creating…' : 'Register' }}
      </button>
    </form>
    <button
      type="button"
      class="mt-3 w-full rounded-md border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-accent)]/10"
      @click="continueLocal"
    >
      Continue without account (local study)
    </button>
    <div class="mt-4 text-sm">
      <RouterLink to="/login" class="text-[var(--color-accent)]">Already have an account?</RouterLink>
    </div>
  </AuthCard>
</template>
