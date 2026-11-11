import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/services/supabase'

const LOCAL_GUEST_KEY = 'dea-local-guest'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const localGuest = ref(false)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(
    () => Boolean(session.value?.user) || localGuest.value || !isSupabaseConfigured,
  )

  async function init() {
    loading.value = true
    error.value = null
    try {
      localGuest.value = localStorage.getItem(LOCAL_GUEST_KEY) === '1'
      if (!isSupabaseConfigured) {
        user.value = null
        session.value = null
        return
      }
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      user.value = data.session?.user ?? null
      if (data.session?.user) {
        localGuest.value = false
        localStorage.removeItem(LOCAL_GUEST_KEY)
      }
      supabase.auth.onAuthStateChange((_event, next) => {
        session.value = next
        user.value = next?.user ?? null
        if (next?.user) {
          localGuest.value = false
          localStorage.removeItem(LOCAL_GUEST_KEY)
        }
      })
    } finally {
      loading.value = false
    }
  }

  function enterLocalGuest() {
    localStorage.setItem(LOCAL_GUEST_KEY, '1')
    localGuest.value = true
    error.value = null
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
    localGuest.value = false
    localStorage.removeItem(LOCAL_GUEST_KEY)
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
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
    localGuest,
    loading,
    error,
    isAuthenticated,
    init,
    enterLocalGuest,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
  }
})
