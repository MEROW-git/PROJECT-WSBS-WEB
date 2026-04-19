/**
 * API Client for the Water Billing System.
 * 
 * Connects to the Rust backend API.
 * All requests include JWT token when available.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

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
}

export interface User {
  user_id: string
  company_id: string
  full_name: string
  username: string
  email: string
  role: string
  phone?: string
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
      localStorage.setItem('wb_token', token)
    } else {
      localStorage.removeItem('wb_token')
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('wb_token')
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
