import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Droplets, Eye, EyeOff, ArrowRight, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { api, type SignupData } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { isValidEmail } from '@/lib/utils'

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()

  const [mode, setMode] = useState<'form' | 'google-info'>('form')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form state
  const [companyName, setCompanyName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Google flow extra info
  const [googleData, setGoogleData] = useState<{ token: string; email: string } | null>(null)

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!companyName.trim()) e.companyName = 'Company name is required'
    if (!adminName.trim()) e.adminName = 'Full name is required'
    if (!email.trim()) e.email = 'Email is required'
    else if (!isValidEmail(email)) e.email = 'Invalid email format'
    if (!phone.trim()) e.phone = 'Phone number is required'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters'
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!agreeTerms) e.terms = 'You must agree to the terms'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)

    const data: SignupData = {
      company_name: companyName.trim(),
      admin_name: adminName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    }

    const res = await api.register(data)
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      navigate('/onboarding')
    } else {
      setErrors({ general: res.error?.message || 'Registration failed. Please try again.' })
    }
  }

  const handleGoogle = async () => {
    // In production: redirect to Google OAuth
    // For demo: simulate successful Google auth
    setLoading(true)
    setTimeout(() => {
      setGoogleData({ token: 'google_mock_token', email: 'user@gmail.com' })
      setEmail('user@gmail.com')
      setMode('google-info')
      setLoading(false)
    }, 800)
  }

  const handleGoogleComplete = async () => {
    if (!companyName.trim()) {
      setErrors({ companyName: 'Company name is required' })
      return
    }
    if (!phone.trim()) {
      setErrors({ phone: 'Phone number is required' })
      return
    }

    setLoading(true)
    const res = await api.registerWithGoogle({
      company_name: companyName.trim(),
      phone: phone.trim(),
      google_token: googleData?.token || '',
    })
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      navigate('/onboarding')
    } else {
      setErrors({ general: res.error?.message || 'Google registration failed.' })
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
      errors[field] ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
    }`

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center shadow-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">WaterBilling</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {mode === 'form' ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>

              {/* Google Signup */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-slate-400">or sign up with email</span>
                </div>
              </div>

              {/* Manual Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Blue Water Utility"
                    className={inputClass('companyName')}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Admin Full Name</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Your full name"
                    className={inputClass('adminName')}
                  />
                  {errors.adminName && <p className="text-red-500 text-xs mt-1">{errors.adminName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@company.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 890"
                      className={inputClass('phone')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className={inputClass('password') + ' pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={inputClass('confirmPassword')}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {errors.general}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full btn-primary justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Almost There!</h2>
                <p className="text-sm text-slate-500 mt-1">
                  We just need a few more details to set up your company.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Blue Water Utility"
                    className={inputClass('companyName')}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 890"
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-xs text-slate-500">Connected Google Account</div>
                  <div className="text-sm font-medium text-slate-900">{googleData?.email}</div>
                </div>

                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {errors.general}
                  </div>
                )}

                <button
                  onClick={handleGoogleComplete}
                  disabled={loading}
                  className="w-full btn-primary justify-center disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Setup'}
                </button>

                <button
                  onClick={() => setMode('form')}
                  className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2"
                >
                  Back to signup options
                </button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
