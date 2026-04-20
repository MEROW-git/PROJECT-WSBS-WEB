import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from '@/components/Layout'
import LandingPage from '@/pages/LandingPage'
import FeaturesPage from '@/pages/FeaturesPage'
import PricingPage from '@/pages/PricingPage'
import TermsPage from '@/pages/TermsPage'
import PrivacyPage from '@/pages/PrivacyPage'
import SubscriptionPolicyPage from '@/pages/SubscriptionPolicyPage'
import SignupPage from '@/pages/SignupPage'
import LoginPage from '@/pages/LoginPage'
import VerifyEmailPage from '@/pages/VerifyEmailPage'
import SubscriptionPage from '@/pages/SubscriptionPage'
import DashboardPage from '@/pages/DashboardPage'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

function AuthSession() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()

    const keepAlive = () => {
      api.getToken()
    }

    const heartbeatId = window.setInterval(keepAlive, 60 * 1000)
    window.addEventListener('focus', keepAlive)
    document.addEventListener('visibilitychange', keepAlive)

    return () => {
      window.clearInterval(heartbeatId)
      window.removeEventListener('focus', keepAlive)
      document.removeEventListener('visibilitychange', keepAlive)
    }
  }, [checkAuth])

  return null
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location }} replace />
  }

  return children
}

function RedirectIfAuthenticated({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/subscription" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthSession />
      <Routes>
        {/* Auth pages (no layout) */}
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignupPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Pages with layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route
            path="/pricing"
            element={
              <RedirectIfAuthenticated>
                <PricingPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/subscription-policy" element={<SubscriptionPolicyPage />} />
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/onboarding" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
