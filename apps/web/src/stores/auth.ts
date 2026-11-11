import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/services/supabase'
import {
  clearDemoUser,
  isDemoLogin,
  readDemoUser,
  writeDemoUser,
  type DemoUser,
} from '@/services/demoAuth'

const LOCAL_GUEST_KEY = 'dea-local-guest'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const localGuest = ref(false)
  const demoUser = ref<DemoUser | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const displayEmail = computed(
    () => user.value?.email || demoUser.value?.email || (localGuest.value ? 'local guest' : null),
  )

  const isAuthenticated = computed(
    () =>
      Boolean(session.value?.user) ||
      Boolean(demoUser.value) ||
      localGuest.value ||
      !isSupabaseConfigured,
  )

  async function init() {
    loading.value = true
    error.value = null
    try {
      localGuest.value = localStorage.getItem(LOCAL_GUEST_KEY) === '1'
      demoUser.value = readDemoUser()
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
        clearDemoUser()
        demoUser.value = null
      }
      supabase.auth.onAuthStateChange((_event, next) => {
        session.value = next
        user.value = next?.user ?? null
        if (next?.user) {
          localGuest.value = false
          localStorage.removeItem(LOCAL_GUEST_KEY)
          clearDemoUser()
          demoUser.value = null
        }
      })
    } finally {
      loading.value = false
    }
  }

  function enterLocalGuest() {
    clearDemoUser()
    demoUser.value = null
    localStorage.setItem(LOCAL_GUEST_KEY, '1')
    localGuest.value = true
    error.value = null
  }

  function enterDemoUser() {
    localGuest.value = false
    localStorage.removeItem(LOCAL_GUEST_KEY)
    demoUser.value = writeDemoUser()
    error.value = null
  }

  async function register(email: string, password: string) {
    error.value = null
    if (!isSupabaseConfigured) {
      if (isDemoLogin(email, password)) {
        enterDemoUser()
        return { user: null, session: null }
      }
      const err = new Error('Registration requires Supabase. Use the demo login instead.')
      error.value = err.message
      throw err
    }
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
    if (isDemoLogin(email, password)) {
      enterDemoUser()
      return { user: null, session: null }
    }
    if (!isSupabaseConfigured) {
      const err = new Error('Invalid credentials. Use the demo account shown below.')
      error.value = err.message
      throw err
    }
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
    clearDemoUser()
    demoUser.value = null
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
    demoUser,
    displayEmail,
    loading,
    error,
    isAuthenticated,
    init,
    enterLocalGuest,
    enterDemoUser,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
  }
})
