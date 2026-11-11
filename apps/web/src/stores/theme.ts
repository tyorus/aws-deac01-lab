import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'dea-theme'

export const useThemeStore = defineStore('theme', () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode = ref<'light' | 'dark'>(
    stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light',
  )

  function apply() {
    document.documentElement.classList.toggle('dark', mode.value === 'dark')
  }

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  watch(mode, (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    apply()
  }, { immediate: true })

  return { mode, toggle, apply }
})
