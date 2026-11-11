<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const password = ref('')
const busy = ref(false)
const message = ref('')

async function submit() {
  busy.value = true
  message.value = ''
  try {
    await auth.updatePassword(password.value)
    message.value = 'Password updated.'
    await router.push('/login')
  } catch (e) {
    message.value = e instanceof Error ? e.message : 'Update failed'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <AuthCard title="Choose a new password">
    <form class="space-y-3" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="text-[var(--color-ink-muted)]">New password</span>
        <input v-model="password" type="password" required minlength="6" class="mt-1 w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2" />
      </label>
      <p v-if="message" class="text-sm text-[var(--color-danger)]">{{ message }}</p>
      <button type="submit" class="w-full rounded-md bg-[var(--color-accent)] text-white py-2.5 font-medium" :disabled="busy">
        Update password
      </button>
    </form>
  </AuthCard>
</template>
