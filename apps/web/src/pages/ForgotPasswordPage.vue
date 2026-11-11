<script setup lang="ts">
import { ref } from 'vue'
import AuthCard from '@/components/AuthCard.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const email = ref('')
const busy = ref(false)
const message = ref('')

async function submit() {
  busy.value = true
  message.value = ''
  try {
    await auth.resetPassword(email.value)
    message.value = 'If that email exists, a reset link was sent.'
  } catch (e) {
    message.value = e instanceof Error ? e.message : 'Request failed'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <AuthCard title="Reset password" subtitle="We will email a secure reset link.">
    <form class="space-y-3" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="text-[var(--color-ink-muted)]">Email</span>
        <input v-model="email" type="email" required class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <p v-if="message" class="text-sm text-[var(--color-ink-muted)]">{{ message }}</p>
      <button type="submit" class="w-full rounded-md bg-[var(--color-accent)] text-white py-2.5 font-medium" :disabled="busy">
        Send reset link
      </button>
    </form>
    <div class="mt-4 text-sm">
      <RouterLink to="/login" class="text-[var(--color-accent)]">Back to sign in</RouterLink>
    </div>
  </AuthCard>
</template>
