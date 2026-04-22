import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, Eye, EyeOff, ArrowRight, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { api, type SignupData } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { isValidEmail } from '@/lib/utils'
import { renderGoogleButton, type GoogleAccount } from '@/lib/googleAuth'
import { useTranslation } from '@/lib/language/i18n'

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
  const { t } = useTranslation()

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
    if (!companyName.trim()) e.companyName = t('auth.signup.errors.companyRequired')
    if (!adminName.trim()) e.adminName = t('auth.signup.errors.nameRequired')
    if (!email.trim()) e.email = t('auth.signup.errors.emailRequired')
    else if (!isValidEmail(email)) e.email = t('auth.signup.errors.invalidEmail')
    if (!phone.trim()) e.phone = t('auth.signup.errors.phoneRequired')
    if (!password) e.password = t('auth.signup.errors.passwordRequired')
    else if (password.length < 6) e.password = t('auth.signup.errors.passwordLength')
    if (password !== confirmPassword) e.confirmPassword = t('auth.errors.passwordMismatch')
    if (!agreeTerms) e.terms = t('auth.signup.errors.termsRequired')
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
      setErrors({ general: res.error?.message || t('auth.signup.errors.registrationFailed') })
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
      setErrors({ general: t('auth.signup.errors.googleConnect') })
      return
    }

    if (!companyName.trim()) {
      setErrors({ companyName: t('auth.signup.errors.companyRequired') })
      return
    }
    if (!phone.trim()) {
      setErrors({ phone: t('auth.signup.errors.phoneRequired') })
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
      setErrors({ general: res.error?.message || t('auth.signup.errors.googleRegistrationFailed') })
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-theme-surface border rounded-xl text-sm text-theme-text-primary placeholder:text-theme-text-muted transition-all focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
      errors[field] ? 'border-red-300 focus:ring-red-500' : 'border-theme-border'
    }`

  const countrySelectClass =
    'h-[46px] rounded-xl border border-theme-border bg-theme-surface px-3 text-sm text-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent'

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
        <div className="surface-panel p-6 md:p-8">
          {mode === 'form' ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-theme-text-primary">{t('auth.signup.title')}</h1>
                <p className="text-sm text-theme-text-muted mt-1">
                  {t('auth.signup.subtitle')}
                </p>
              </div>

              {/* Google Signup */}
              <div className="mb-6 min-h-[44px]" ref={googleButtonRef} />

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-theme-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-theme-surface px-4 text-theme-text-muted">{t('auth.signup.emailDivider')}</span>
                </div>
              </div>

              {/* Manual Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.signup.fields.companyName')}</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t('auth.signup.placeholders.companyName')}
                    className={inputClass('companyName')}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.signup.fields.adminName')}</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder={t('auth.signup.placeholders.fullName')}
                    className={inputClass('adminName')}
                  />
                  {errors.adminName && <p className="text-red-500 text-xs mt-1">{errors.adminName}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('about.contact.email')}</label>
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
                    <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('about.contact.phone')}</label>
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
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.password')}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.signup.placeholders.password')}
                      className={inputClass('password') + ' pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-muted hover:text-theme-text-secondary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.signup.fields.confirmPassword')}</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('auth.signup.placeholders.repeatPassword')}
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
                  <span className="text-xs text-theme-text-secondary">
                    {t('auth.signup.agreePrefix')}{' '}
                    <Link to="/terms" className="text-brand-600 hover:underline">{t('nav.termsOfService')}</Link>
                    {' '}{t('auth.signup.and')}{' '}
                    <Link to="/privacy" className="text-brand-600 hover:underline">{t('nav.privacyPolicy')}</Link>
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
                      {t('landing.actions.createAccount')}
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
                <h2 className="text-xl font-bold text-theme-text-primary">{t('auth.signup.googleTitle')}</h2>
                <p className="text-sm text-theme-text-muted mt-1">
                  {t('auth.signup.googleSubtitle')}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.signup.fields.companyName')}</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t('auth.signup.placeholders.companyName')}
                    className={inputClass('companyName')}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.signup.fields.phoneNumber')}</label>
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

                <div className="p-3 bg-theme-bg-secondary rounded-xl border border-theme-border">
                  <div className="text-xs text-theme-text-muted">{t('auth.signup.connectedGoogle')}</div>
                  <div className="text-sm font-medium text-theme-text-primary">{googleData?.fullName}</div>
                  <div className="text-xs text-theme-text-muted">{googleData?.email}</div>
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
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.signup.completeSetup')}
                </button>

                <button
                  onClick={() => setMode('form')}
                  className="w-full text-center text-sm text-theme-text-muted hover:text-theme-text-primary py-2"
                >
                  {t('auth.signup.backToOptions')}
                </button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-theme-text-muted mt-6">
            {t('auth.signup.hasAccount')}{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">
              {t('common.signIn')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
