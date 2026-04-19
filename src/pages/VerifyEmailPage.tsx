import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Check, X, Loader2, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('Verifying your email address...')
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (token) {
      verifyToken(token)
    } else {
      setStatus('error')
      setMessage('No verification token found. Please check your email link.')
    }
  }, [token])

  const verifyToken = async (t: string) => {
    const res = await api.verifyEmail(t)
    if (res.success) {
      setStatus('success')
      setMessage('Your email has been verified successfully!')
    } else {
      setStatus('error')
      setMessage(res.error?.message || 'Verification failed. The link may have expired.')
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {status === 'verifying' && (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Verifying Email</h2>
              <p className="text-slate-500">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Email Verified!</h2>
              <p className="text-slate-500 mb-6">{message}</p>
              <div className="space-y-3">
                <Link
                  to="/subscription"
                  className="w-full btn-primary justify-center inline-flex"
                >
                  Choose Your Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="w-full btn-ghost justify-center inline-flex"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Verification Failed</h2>
              <p className="text-slate-500 mb-6">{message}</p>

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
                      Resend Verification Email
                    </>
                  )}
                </button>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl text-green-700 text-sm">
                  Verification email resent! Please check your inbox.
                </div>
              )}

              <p className="mt-4 text-sm text-slate-500">
                Need help?{' '}
                <a href="mailto:support@waterbilling.com" className="text-brand-600 hover:underline">
                  Contact support
                </a>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
