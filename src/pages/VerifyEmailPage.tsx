import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, X, Loader2, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useTranslation } from '@/lib/language/i18n'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { t } = useTranslation()

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState(t('verifyEmail.messages.verifying'))
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (token) {
      verifyToken(token)
    } else {
      setStatus('error')
      setMessage(t('verifyEmail.messages.noToken'))
    }
  }, [token])

  const verifyToken = async (emailToken: string) => {
    const res = await api.verifyEmail(emailToken)
    if (res.success) {
      setStatus('success')
      setMessage(t('verifyEmail.messages.success'))
    } else {
      setStatus('error')
      setMessage(res.error?.message || t('verifyEmail.messages.failed'))
    }
  }

  const handleResend = async () => {
    setResending(true)
    // In production: get email from stored state or query param
    await new Promise((r) => setTimeout(r, 1000))
    setResending(false)
    setResent(true)
  }

  return (
    <div className="min-h-screen bg-theme-bg-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="surface-panel p-8 text-center">
          {status === 'verifying' && (
            <>
              <div className="w-16 h-16 rounded-full bg-theme-primary/10 flex items-center justify-center mx-auto mb-5">
                <Loader2 className="w-8 h-8 text-theme-primary animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-theme-text-primary mb-2">{t('verifyEmail.verifyingTitle')}</h2>
              <p className="text-theme-text-muted">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-theme-success/10 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-theme-success" />
              </div>
              <h2 className="text-xl font-bold text-theme-text-primary mb-2">{t('verifyEmail.successTitle')}</h2>
              <p className="text-theme-text-muted mb-6">{message}</p>
              <div className="space-y-3">
                <Link
                  to="/subscription"
                  className="w-full btn-primary justify-center inline-flex"
                >
                  {t('verifyEmail.choosePlan')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="w-full btn-ghost justify-center inline-flex"
                >
                  {t('common.signIn')}
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-theme-text-primary mb-2">{t('verifyEmail.errorTitle')}</h2>
              <p className="text-theme-text-muted mb-6">{message}</p>

              {!resent ? (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full btn-primary justify-center disabled:opacity-50 inline-flex"
                >
                  {resending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      {t('verifyEmail.resend')}
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 bg-theme-success/10 rounded-xl text-theme-success text-sm">
                  {t('verifyEmail.resent')}
                </div>
              )}

              <p className="mt-4 text-sm text-theme-text-muted">
                {t('verifyEmail.needHelp')}{' '}
                <a href="mailto:support@waterbilling.com" className="text-brand-600 hover:underline">
                  {t('verifyEmail.contactSupport')}
                </a>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
