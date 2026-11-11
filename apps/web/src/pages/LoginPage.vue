<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
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
</script>

<template>
  <AuthCard title="Sign in" subtitle="Continue your DEA-C01 preparation.">
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
    <div class="mt-4 text-sm text-[var(--color-ink-muted)] flex justify-between">
      <RouterLink to="/register" class="text-[var(--color-accent)]">Create account</RouterLink>
      <RouterLink to="/forgot-password" class="text-[var(--color-accent)]">Reset password</RouterLink>
    </div>
  </AuthCard>
</template>
