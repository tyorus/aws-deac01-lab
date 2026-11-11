import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const theme = useThemeStore()
theme.apply()

const auth = useAuthStore()
void auth.init().finally(() => {
  app.mount('#app')
})
