import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, Eye, EyeOff, ArrowRight, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { api, type SignupData } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { isValidEmail } from '@/lib/utils'
import { renderGoogleButton, type GoogleAccount } from '@/lib/googleAuth'

const phoneCountries = [
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', dialCode: '+673' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', dialCode: '+855' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', dialCode: '+856' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', dialCode: '+95' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', dialCode: '+670' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const { login, setCompany } = useAuthStore()

  const [mode, setMode] = useState<'form' | 'google-info'>('form')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const googleButtonRef = useRef<HTMLDivElement>(null)

  // Form state
  const [companyName, setCompanyName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneCountry, setPhoneCountry] = useState(phoneCountries[0])
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Google flow extra info
  const [googleData, setGoogleData] = useState<{ token: string; email: string; fullName: string } | null>(null)

  useEffect(() => {
    if (mode !== 'form' || !googleButtonRef.current) return

    renderGoogleButton(
      googleButtonRef.current,
      'continue_with',
      handleGoogleAccount,
      (error) => setErrors({ general: error.message })
    ).catch((error: Error) => {
      setErrors({ general: error.message })
    })
  }, [mode])

  const formattedPhone = () => {
    const trimmedPhone = phone.trim()
    if (trimmedPhone.startsWith('+')) return trimmedPhone

    const localPhone = trimmedPhone.replace(/^0+/, '')
    return `${phoneCountry.dialCode}${localPhone}`
  }

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
      phone: formattedPhone(),
      password,
    }

    const res = await api.register(data)
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      setCompany(res.data.company)
      navigate('/subscription')
    } else {
      setErrors({ general: res.error?.message || 'Registration failed. Please try again.' })
    }
  }

  const handleGoogleAccount = (account: GoogleAccount) => {
    setErrors({})
    setGoogleData({
      token: account.token,
      email: account.email,
      fullName: account.fullName,
    })
    setEmail(account.email)
    setAdminName(account.fullName)
    setMode('google-info')
  }

  const handleGoogleComplete = async () => {
    setErrors({})

    if (!googleData) {
      setErrors({ general: 'Please connect your Google account first.' })
      return
    }

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
      phone: formattedPhone(),
      google_token: googleData.token,
      email: googleData.email,
      full_name: googleData.fullName,
    })
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      setCompany(res.data.company)
      navigate('/subscription')
    } else {
      setErrors({ general: res.error?.message || 'Google registration failed.' })
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
      errors[field] ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
    }`

  const countrySelectClass =
    'h-[46px] rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

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
                  Create your company account, then choose a subscription plan.
                </p>
              </div>

              {/* Google Signup */}
              <div className="mb-6 min-h-[44px]" ref={googleButtonRef} />

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

                <div className="grid gap-4 sm:grid-cols-2">
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
                    <div className="grid grid-cols-[130px_1fr] gap-2">
                      <select
                        value={phoneCountry.code}
                        onChange={(e) => {
                          const selectedCountry = phoneCountries.find((country) => country.code === e.target.value)
                          if (selectedCountry) setPhoneCountry(selectedCountry)
                        }}
                        className={countrySelectClass}
                      >
                        {phoneCountries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code} {country.dialCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="12 345 678"
                        className={inputClass('phone')}
                      />
                    </div>
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
                  <div className="grid grid-cols-[136px_1fr] gap-2">
                    <select
                      value={phoneCountry.code}
                      onChange={(e) => {
                        const selectedCountry = phoneCountries.find((country) => country.code === e.target.value)
                        if (selectedCountry) setPhoneCountry(selectedCountry)
                      }}
                      className={countrySelectClass}
                    >
                      {phoneCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code} {country.dialCode}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="12 345 678"
                      className={inputClass('phone')}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-xs text-slate-500">Connected Google Account</div>
                  <div className="text-sm font-medium text-slate-900">{googleData?.fullName}</div>
                  <div className="text-xs text-slate-500">{googleData?.email}</div>
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
