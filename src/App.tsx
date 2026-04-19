import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import OnboardingSuccessPage from '@/pages/OnboardingSuccessPage'
import DesktopGuidePage from '@/pages/DesktopGuidePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Pages with layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/subscription-policy" element={<SubscriptionPolicyPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/onboarding" element={<OnboardingSuccessPage />} />
          <Route path="/desktop-guide" element={<DesktopGuidePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
