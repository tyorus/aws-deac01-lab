import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { isSupabaseConfigured } from '@/services/supabase'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      meta: { guest: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/pages/ForgotPasswordPage.vue'),
      meta: { guest: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/pages/ResetPasswordPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: () => import('@/pages/DashboardPage.vue') },
        { path: 'drill', name: 'drill', component: () => import('@/pages/DrillPage.vue') },
        { path: 'exam', name: 'exam', component: () => import('@/pages/ExamPage.vue') },
        { path: 'review', name: 'review', component: () => import('@/pages/ReviewPage.vue') },
        { path: 'knowledge', name: 'knowledge', component: () => import('@/pages/KnowledgePage.vue') },
        {
          path: 'knowledge/:path(.*)',
          name: 'knowledge-doc',
          component: () => import('@/pages/KnowledgePage.vue'),
        },
        { path: 'analytics', name: 'analytics', component: () => import('@/pages/AnalyticsPage.vue') },
        { path: 'bookmarks', name: 'bookmarks', component: () => import('@/pages/BookmarksPage.vue') },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (auth.loading) await auth.init()

  // Allow local study without forcing login when Supabase env is missing
  if (!isSupabaseConfigured) return true

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
  return true
})

export default router
