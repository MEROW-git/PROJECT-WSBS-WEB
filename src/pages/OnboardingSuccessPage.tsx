import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Building2, User, Mail, CreditCard, Monitor, ArrowRight, Copy, CheckCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import StepIndicator from '@/components/StepIndicator'

export default function OnboardingSuccessPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
  }, [isAuthenticated, navigate])

  const companyCode = user?.company_id?.slice(0, 8).toUpperCase() || 'WATER001'
  const companyName = user?.full_name?.split(' ')[0] + ' Water' || 'Your Company'

  const handleCopy = () => {
    navigator.clipboard.writeText(companyCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    { id: 'signup', label: 'Create Account', completed: true },
    { id: 'verify', label: 'Verify Email', completed: true },
    { id: 'subscribe', label: 'Choose Plan', completed: true },
    { id: 'ready', label: 'Get Started', completed: true },
  ]

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="container-main max-w-3xl">
        {/* Steps */}
        <div className="mb-10">
          <StepIndicator steps={steps} currentStep={3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              You're All Set!
            </h1>
            <p className="text-slate-600">
              Your account is created and your subscription is active. Here's everything you need.
            </p>
          </div>

          {/* Account Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Account Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <Building2 className="w-5 h-5 text-brand-600" />
                <div>
                  <div className="text-xs text-slate-500">Company</div>
                  <div className="font-semibold text-slate-900">{companyName}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <User className="w-5 h-5 text-brand-600" />
                <div>
                  <div className="text-xs text-slate-500">Admin</div>
                  <div className="font-semibold text-slate-900">{user?.full_name || 'Admin User'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <Mail className="w-5 h-5 text-brand-600" />
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-semibold text-slate-900">{user?.email || 'admin@company.com'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-xl border border-brand-200">
                <CreditCard className="w-5 h-5 text-brand-600" />
                <div className="flex-1">
                  <div className="text-xs text-brand-600 font-medium">Company Code</div>
                  <div className="font-bold text-brand-900 text-lg tracking-wider">{companyCode}</div>
                  <div className="text-xs text-brand-500 mt-0.5">
                    You'll need this to log into the desktop app
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white border border-brand-200 text-brand-600 hover:bg-brand-100 transition-colors"
                  title="Copy company code"
                >
                  {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Next Steps</h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-700">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Download the Desktop App</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Install the Water Billing desktop application on your office computer.
                  </p>
                  <Link
                    to="/desktop-guide"
                    className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium mt-2 hover:underline"
                  >
                    View Download Instructions
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-700">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Log In with Your Credentials</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Use your company code, username, and password to log into the desktop app.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-700">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Start Managing Your Utility</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Add customers, register meters, and start billing your water connections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/desktop-guide"
              className="btn-primary inline-flex"
            >
              <Monitor className="w-5 h-5 mr-2" />
              Get the Desktop App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              Your 14-day free trial has started. No charges until the trial ends.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
