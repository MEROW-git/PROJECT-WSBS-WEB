import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, Eye, EyeOff, ArrowRight, Loader2, Check, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { renderGoogleButton, type GoogleAccount } from '@/lib/googleAuth'
import { authConfig } from '@/config/auth'
import { useTranslation } from '@/lib/language/i18n'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { t } = useTranslation()

  const [mode, setMode] = useState<'login' | 'reset'>('login')
  const [resetStep, setResetStep] = useState<'email' | 'found' | 'code' | 'password'>('email')
  const [companyCode, setCompanyCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [resetCompanyCode, setResetCompanyCode] = useState('')
  const [developmentCode, setDevelopmentCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const googleButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mode !== 'login' || !googleButtonRef.current) return

    renderGoogleButton(
      googleButtonRef.current,
      'continue_with',
      handleGoogleAccount,
      (googleError) => setError(googleError.message)
    ).catch((googleError: Error) => {
      setError(googleError.message)
    })
  }, [mode])

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    if (!companyCode || !username || !password) {
      setError(t('auth.errors.fillAll'))
      return
    }

    setLoading(true)
    const res = await api.login({
      company_code: companyCode.trim(),
      username: username.trim(),
      password,
    })
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      navigate('/subscription')
    } else {
      setError(res.error?.message || t('auth.login.errors.invalid'))
    }
  }

  const handleFindResetEmail = async () => {
    setError('')
    setSuccess('')

    if (!resetEmail) {
      setError(t('auth.reset.errors.emailRequired'))
      return
    }

    setLoading(true)
    const res = await api.findResetAccount({
      email: resetEmail.trim(),
    })
    setLoading(false)

    if (res.success && res.data?.found) {
      setCompanyCode(res.data.company_code)
      setResetStep('found')
      setSuccess(t('auth.reset.messages.emailFound'))
    } else {
      setError(res.error?.message || t('auth.reset.errors.notFound'))
    }
  }

  const handleSendResetCode = async () => {
    setError('')
    setSuccess('')

    if (!resetEmail) {
      setError(t('auth.reset.errors.emailRequired'))
      return
    }

    setLoading(true)
    const res = await api.forgotPassword({
      email: resetEmail.trim(),
    })
    setLoading(false)

    if (res.success) {
      const code = res.data?.development_code || ''
      setDevelopmentCode(code)
      setResetCode(code)
      setResetStep('code')
      setSuccess(t('auth.reset.messages.codeSent').replace('{minutes}', String(res.data?.expires_in_minutes || 15)))
    } else {
      setError(res.error?.message || t('auth.reset.errors.sendFailed'))
    }
  }

  const handleVerifyResetCode = async () => {
    setError('')
    setSuccess('')

    if (!resetEmail || !resetCode) {
      setError(t('auth.reset.errors.codeRequired'))
      return
    }

    setLoading(true)
    const res = await api.verifyResetCode({
      email: resetEmail.trim(),
      code: resetCode.trim(),
    })
    setLoading(false)

    if (res.success && res.data?.verified) {
      setResetCompanyCode(res.data.company_code)
      setCompanyCode(res.data.company_code)
      setResetStep('password')
      setSuccess(t('auth.reset.messages.codeVerified').replace('{companyCode}', res.data.company_code))
    } else {
      setError(res.error?.message || t('auth.reset.errors.invalidCode'))
    }
  }

  const handleResetPassword = async () => {
    setError('')
    setSuccess('')

    if (!resetEmail || !resetCode || !newPassword || !confirmPassword) {
      setError(t('auth.errors.fillAll'))
      return
    }

    if (newPassword.length < 6) {
      setError(t('auth.reset.errors.passwordLength'))
      return
    }

    if (newPassword !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'))
      return
    }

    setLoading(true)
    const res = await api.resetPassword({
      email: resetEmail.trim(),
      code: resetCode.trim(),
      new_password: newPassword,
    })
    setLoading(false)

    if (res.success) {
      setPassword(newPassword)
      setUsername(resetEmail)
      if (resetCompanyCode) {
        setCompanyCode(resetCompanyCode)
      }
      setResetCode('')
      setResetCompanyCode('')
      setDevelopmentCode('')
      setNewPassword('')
      setConfirmPassword('')
      setResetStep('email')
      setMode('login')
      setSuccess(t('auth.reset.messages.passwordReset'))
    } else {
      setError(res.error?.message || t('auth.reset.errors.resetFailed'))
    }
  }

  const handleGoogleAccount = async (account: GoogleAccount) => {
    setError('')
    setLoading(true)

    try {
      const res = await api.loginWithGoogle({
        google_token: account.token,
        email: account.email,
      })

      if (res.success && res.data) {
        login(res.data.token, res.data.user)
        navigate('/subscription')
      } else {
        setError(res.error?.message || t('auth.login.errors.googleFailed'))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.login.errors.googleStartFailed'))
    } finally {
      setLoading(false)
    }
  }

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
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-theme-text-primary">
              {mode === 'login' ? t('auth.login.title') : t('auth.reset.title')}
            </h1>
            <p className="text-sm text-theme-text-muted mt-1">
              {mode === 'login'
                ? t('auth.login.subtitle')
                : !authConfig.enableOtpPasswordReset
                  ? t('auth.reset.superAdminSubtitle')
                : resetStep === 'email'
                  ? t('auth.reset.emailSubtitle')
                  : resetStep === 'found'
                    ? t('auth.reset.foundSubtitle')
                  : resetStep === 'code'
                    ? t('auth.reset.codeSubtitle')
                    : t('auth.reset.passwordSubtitle')}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start gap-2">
              <Check className="w-4 h-4" />
              <div>
                <div>{success}</div>
                {developmentCode && (
                  <div className="mt-1 font-semibold">
                    {t('auth.reset.developmentCode')}: {developmentCode}
                  </div>
                )}
              </div>
            </div>
          )}

          {mode === 'login' && (
            <>
              <div className="mb-6 min-h-[44px]" ref={googleButtonRef} />

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-theme-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-theme-surface px-4 text-theme-text-muted">{t('auth.login.manualDivider')}</span>
                </div>
              </div>
            </>
          )}

          <div className="space-y-4">
            {mode === 'login' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.companyCode')}</label>
                  <input
                    type="text"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    placeholder={t('auth.placeholders.companyCode')}
                    className="input-field text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.usernameOrEmail')}</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('auth.placeholders.username')}
                    className="input-field text-sm"
                  />
                </div>
              </>
            ) : authConfig.enableOtpPasswordReset ? (
              <div>
                <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.accountEmail')}</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@company.com"
                  disabled={resetStep !== 'email'}
                  className="input-field text-sm disabled:opacity-60"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-theme-primary/20 bg-theme-primary/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-theme-text-primary">{t('auth.reset.superAdminTitle')}</div>
                    <p className="mt-1 text-sm text-theme-text-secondary">
                      {t('auth.reset.contactTelegram').replace('{name}', authConfig.passwordResetContact.name)}
                    </p>
                    <a
                      href={authConfig.passwordResetContact.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center font-semibold text-brand-700 hover:text-brand-800 hover:underline"
                    >
                      {authConfig.passwordResetContact.telegram}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {authConfig.enableOtpPasswordReset && mode === 'reset' && resetStep === 'password' && resetCompanyCode && (
                <div className="rounded-xl border border-theme-primary/20 bg-theme-primary/10 p-4">
                <div className="text-xs font-medium text-theme-primary">{t('auth.reset.yourCompanyCode')}</div>
                <div className="mt-1 text-lg font-bold tracking-wider text-theme-text-primary">{resetCompanyCode}</div>
              </div>
            )}

            {mode === 'login' ? (
              <div>
              <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.placeholders.password')}
                  className="input-field text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-muted hover:text-theme-text-secondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              </div>
            ) : authConfig.enableOtpPasswordReset ? (
              <>
                {resetStep === 'code' && (
                  <div>
                    <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.resetCode')}</label>
                    <input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder={t('auth.placeholders.resetCode')}
                      className="input-field text-sm"
                    />
                  </div>
                )}
                {resetStep === 'password' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.newPassword')}</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={t('auth.placeholders.newPassword')}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">{t('auth.fields.confirmNewPassword')}</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t('auth.placeholders.repeatNewPassword')}
                        className="input-field text-sm"
                      />
                    </div>
                  </>
                )}
              </>
            ) : null}

            {mode === 'reset' && !authConfig.enableOtpPasswordReset && (
              <a
                href={authConfig.passwordResetContact.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-primary justify-center"
              >
                {t('auth.reset.contactOnTelegram')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-sm text-theme-text-secondary">{t('auth.login.rememberMe')}</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setSuccess('')
                    setResetEmail(username.includes('@') ? username : '')
                    setResetStep('email')
                    setResetCode('')
                    setResetCompanyCode('')
                    setDevelopmentCode('')
                    setMode('reset')
                  }}
                  className="text-sm text-brand-600 hover:underline font-medium"
                >
                  {t('auth.login.forgotPassword')}
                </button>
              </div>
            )}

            {(mode === 'login' || authConfig.enableOtpPasswordReset) && (
              <button
                onClick={
                  mode === 'login'
                    ? handleSubmit
                    : resetStep === 'email'
                      ? handleFindResetEmail
                      : resetStep === 'found'
                        ? handleSendResetCode
                      : resetStep === 'code'
                        ? handleVerifyResetCode
                        : handleResetPassword
                }
                disabled={loading}
                className="w-full btn-primary justify-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {mode === 'login'
                      ? t('common.signIn')
                      : resetStep === 'email'
                        ? t('auth.reset.findEmail')
                      : resetStep === 'found'
                        ? t('auth.reset.sendCode')
                      : resetStep === 'code'
                        ? t('auth.reset.verifyCode')
                        : t('auth.reset.resetPassword')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            )}

            {authConfig.enableOtpPasswordReset && mode === 'reset' && resetStep === 'code' && (
              <button
                type="button"
                onClick={handleSendResetCode}
                disabled={loading}
                className="w-full text-center text-sm font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50 py-2"
              >
                {t('auth.reset.sendCodeAgain')}
              </button>
            )}

            {mode === 'reset' && (
              <button
                type="button"
                onClick={() => {
                  setError('')
                  setSuccess('')
                  setResetStep('email')
                  setResetCode('')
                  setResetCompanyCode('')
                  setDevelopmentCode('')
                  setMode('login')
                }}
                className="w-full text-center text-sm text-theme-text-muted hover:text-theme-text-primary py-2"
              >
                {t('auth.reset.backToSignIn')}
              </button>
            )}
          </div>

          <p className="text-center text-sm text-theme-text-muted mt-6">
            {t('auth.login.noAccount')}{' '}
            <Link to="/signup" className="text-brand-600 font-semibold hover:underline">
              {t('auth.login.signUp')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
