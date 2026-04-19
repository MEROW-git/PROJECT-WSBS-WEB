import { create } from 'zustand'
import { api, type User, type Company, type Subscription } from '@/lib/api'

interface OnboardingStep {
  id: string
  label: string
  completed: boolean
}

interface AuthState {
  // Auth
  user: User | null
  company: Company | null
  subscription: Subscription | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  // Onboarding
  onboardingSteps: OnboardingStep[]
  currentStep: number

  // Actions
  setUser: (user: User | null) => void
  setCompany: (company: Company | null) => void
  setSubscription: (sub: Subscription | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  login: (token: string, user: User) => void
  logout: () => void
  completeStep: (stepId: string) => void
  setCurrentStep: (step: number) => void
  checkAuth: () => Promise<boolean>
}

const initialSteps: OnboardingStep[] = [
  { id: 'signup', label: 'Create Account', completed: false },
  { id: 'verify', label: 'Verify Email', completed: false },
  { id: 'subscribe', label: 'Choose Plan', completed: false },
  { id: 'ready', label: 'Get Started', completed: false },
]

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  company: null,
  subscription: null,
  token: localStorage.getItem('wb_token'),
  isAuthenticated: false,
  isLoading: true,
  onboardingSteps: [...initialSteps],
  currentStep: 0,

  // Actions
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),
  setSubscription: (subscription) => set({ subscription }),
  setToken: (token) => {
    api.setToken(token)
    set({ token, isAuthenticated: !!token })
  },
  setLoading: (isLoading) => set({ isLoading }),

  login: (token, user) => {
    api.setToken(token)
    set({
      token,
      user,
      isAuthenticated: true,
      isLoading: false,
    })
  },

  logout: () => {
    api.setToken(null)
    set({
      user: null,
      company: null,
      subscription: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      onboardingSteps: initialSteps.map(s => ({ ...s, completed: false })),
      currentStep: 0,
    })
  },

  completeStep: (stepId) =>
    set((state) => ({
      onboardingSteps: state.onboardingSteps.map((s) =>
        s.id === stepId ? { ...s, completed: true } : s
      ),
      currentStep: state.currentStep + 1,
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  checkAuth: async () => {
    const token = get().token
    if (!token) {
      set({ isLoading: false, isAuthenticated: false })
      return false
    }

    try {
      const res = await api.me()
      if (res.success && res.data) {
        set({ user: res.data, isAuthenticated: true, isLoading: false })
        return true
      }
    } catch {
      // Token invalid
    }

    api.setToken(null)
    set({ token: null, isAuthenticated: false, isLoading: false })
    return false
  },
}))
