/**
 * API Client for the Water Billing System.
 * 
 * Connects to the Rust backend API.
 * All requests include JWT token when available.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const TOKEN_KEY = 'wb_token'
const LAST_SEEN_KEY = 'wb_session_last_seen'
const TAB_SESSION_KEY = 'wb_tab_session'
const CLOSED_SESSION_TIMEOUT_MS = 15 * 60 * 1000

function getStoredToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  const hasCurrentTabSession = sessionStorage.getItem(TAB_SESSION_KEY) === 'active'
  const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY) || '0')
  const isExpiredAfterClose =
    !hasCurrentTabSession &&
    lastSeen > 0 &&
    Date.now() - lastSeen > CLOSED_SESSION_TIMEOUT_MS

  if (isExpiredAfterClose) {
    clearStoredSession()
    return null
  }

  touchStoredSession()
  return token
}

function touchStoredSession() {
  localStorage.setItem(LAST_SEEN_KEY, String(Date.now()))
  sessionStorage.setItem(TAB_SESSION_KEY, 'active')
}

function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(LAST_SEEN_KEY)
  sessionStorage.removeItem(TAB_SESSION_KEY)
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface LoginCredentials {
  company_code: string
  username: string
  password: string
}

export interface SignupData {
  company_name: string
  admin_name: string
  email: string
  phone: string
  password: string
}

export interface GoogleSignupData {
  company_name: string
  phone: string
  google_token: string
  email: string
  full_name: string
}

export interface GoogleLoginData {
  google_token: string
  email: string
}

export interface ForgotPasswordData {
  email: string
}

export interface FindResetAccountData {
  email: string
}

export interface ResetPasswordData {
  email: string
  code: string
  new_password: string
}

export interface VerifyResetCodeData {
  email: string
  code: string
}

export interface User {
  user_id: string
  company_id: string
  full_name: string
  username: string
  email?: string
  role: string
  phone?: string
  company_name?: string
  company_code?: string
}

export interface Company {
  company_id: string
  company_code: string
  company_name: string
  phone?: string
  email?: string
  status: 'pending' | 'active' | 'suspended' | 'inactive'
}

export interface Plan {
  plan_id: string
  plan_name: string
  description: string
  price_monthly: number
  price_yearly: number
  max_users: number
  max_customers: number
  features: string[]
  is_active: boolean
}

export interface Subscription {
  subscription_id: string
  company_id: string
  plan_id: string
  status: 'trial' | 'active' | 'expired' | 'cancelled'
  start_date: string
  end_date: string
  amount: number
  plan?: Plan
}

class APIClient {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
      touchStoredSession()
    } else {
      clearStoredSession()
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = getStoredToken()
    } else {
      touchStoredSession()
    }
    return this.token
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: data.error?.message || data.message || `Request failed (${response.status})`,
          },
        }
      }

      return { success: true, data: data.data ?? data }
    } catch (err) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: err instanceof Error ? err.message : 'Network error. Please check your connection.',
        },
      }
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials) {
    return this.request<{ token: string; token_type: string; user: User }>('POST', '/auth/login', credentials)
  }

  async register(data: SignupData) {
    return this.request<{ company: Company; user: User; token: string }>('POST', '/auth/register', data)
  }

  async registerWithGoogle(data: GoogleSignupData) {
    return this.request<{ company: Company; user: User; token: string }>('POST', '/auth/google/register', data)
  }

  async loginWithGoogle(data: GoogleLoginData) {
    return this.request<{ token: string; token_type: string; user: User }>('POST', '/auth/google/login', data)
  }

  async findResetAccount(data: FindResetAccountData) {
    return this.request<{ found: boolean; company_code: string }>('POST', '/auth/find-reset-account', data)
  }

  async forgotPassword(data: ForgotPasswordData) {
    return this.request<{ sent: boolean; expires_in_minutes: number; development_code?: string }>('POST', '/auth/forgot-password', data)
  }

  async verifyResetCode(data: VerifyResetCodeData) {
    return this.request<{ verified: boolean; company_code: string }>('POST', '/auth/verify-reset-code', data)
  }

  async resetPassword(data: ResetPasswordData) {
    return this.request<{ reset: boolean }>('POST', '/auth/reset-password', data)
  }

  async verifyEmail(token: string) {
    return this.request<{ verified: boolean; user: User }>('GET', `/auth/verify-email?token=${token}`)
  }

  async resendVerification(email: string) {
    return this.request<void>('POST', '/auth/resend-verification', { email })
  }

  async me() {
    return this.request<User>('GET', '/auth/me')
  }

  // Plans
  async getPlans() {
    return this.request<Plan[]>('GET', '/plans')
  }

  // Subscriptions
  async createSubscription(planId: string, billingCycle: 'monthly' | 'yearly') {
    return this.request<Subscription>('POST', '/subscriptions', { plan_id: planId, billing_cycle: billingCycle })
  }

  async getMySubscription() {
    return this.request<Subscription>('GET', '/subscriptions/my')
  }

  // Company
  async getMyCompany() {
    return this.request<Company>('GET', '/companies/my')
  }
}

export const api = new APIClient()
