import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(session.value?.user))

  async function init() {
    loading.value = true
    error.value = null
    try {
      if (!isSupabaseConfigured) {
        user.value = null
        session.value = null
        return
      }
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      user.value = data.session?.user ?? null
      supabase.auth.onAuthStateChange((_event, next) => {
        session.value = next
        user.value = next?.user ?? null
      })
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, password: string) {
    error.value = null
    const { data, error: err } = await supabase.auth.signUp({ email, password })
    if (err) {
      error.value = err.message
      throw err
    }
    session.value = data.session
    user.value = data.user
    return data
  }

  async function login(email: string, password: string) {
    error.value = null
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (err) {
      error.value = err.message
      throw err
    }
    session.value = data.session
    user.value = data.user
    return data
  }

  async function logout() {
    error.value = null
    await supabase.auth.signOut()
    session.value = null
    user.value = null
  }

  async function resetPassword(email: string) {
    error.value = null
    const redirectTo = `${window.location.origin}${window.location.pathname}#/reset-password`
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    if (err) {
      error.value = err.message
      throw err
    }
  }

  async function updatePassword(password: string) {
    error.value = null
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    init,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
  }
})
