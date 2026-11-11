/** Predefined study login (not a real Supabase account). */
export const DEMO_CREDENTIALS = {
  email: 'demo@dea-c01.local',
  password: 'Demo1234!',
} as const

export const DEMO_USER_KEY = 'dea-demo-user'

export function isDemoLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password
  )
}

export type DemoUser = {
  id: string
  email: string
  role: 'demo'
}

export function readDemoUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DemoUser
    if (parsed?.email === DEMO_CREDENTIALS.email) return parsed
  } catch {
    /* ignore */
  }
  return null
}

export function writeDemoUser(): DemoUser {
  const user: DemoUser = {
    id: 'demo-local-user',
    email: DEMO_CREDENTIALS.email,
    role: 'demo',
  }
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
  return user
}

export function clearDemoUser() {
  localStorage.removeItem(DEMO_USER_KEY)
}
