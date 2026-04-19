import { useState } from 'react'
import { Monitor, Download, KeyRound, LogIn, ArrowRight, Check, Copy, CheckCheck, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'

const steps = [
  {
    icon: Download,
    title: 'Download the Desktop App',
    description: 'Download the Water Billing desktop application for your operating system.',
    actions: ['Windows', 'macOS', 'Linux'],
  },
  {
    icon: KeyRound,
    title: 'Find Your Company Code',
    description: 'Your company code was generated when you created your account. You can also find it in your account settings.',
    note: 'Your company code is unique to your organization. All staff members will use the same company code to log in.',
  },
  {
    icon: LogIn,
    title: 'Log In to the Desktop App',
    description: 'Open the desktop app and enter your login credentials.',
    fields: ['Company Code', 'Username or Email', 'Password'],
  },
]

const requirements = [
  'Active subscription (trial or paid)',
  'Company code from your account',
  'Valid username and password',
  'Internet connection for initial setup',
]

const faqs = [
  {
    q: 'Can I use the desktop app on multiple computers?',
    a: 'Yes. Install the desktop app on as many computers as needed. Each staff member logs in with their own username and the shared company code.',
  },
  {
    q: 'What if I forgot my company code?',
    a: 'Your company code is displayed on your account dashboard. You can also contact your admin or our support team to recover it.',
  },
  {
    q: 'Can I change my password?',
    a: 'Yes. Log into the desktop app and go to Settings to change your password. You can also request a password reset from the login screen.',
  },
  {
    q: 'Is my data synced between devices?',
    a: 'Yes. All data is stored securely in the cloud and syncs automatically across all devices. Your desktop app, mobile app, and web dashboard all share the same data.',
  },
]

export default function DesktopGuidePage() {
  const { user } = useAuthStore()
  const [copied, setCopied] = useState(false)
  const companyCode = user?.company_id?.slice(0, 8).toUpperCase() || 'WATER001'

  const handleCopy = () => {
    navigator.clipboard.writeText(companyCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container-main max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-water-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Desktop App Setup Guide
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Follow these steps to get the Water Billing desktop application running on your computer.
          </p>
        </motion.div>

        {/* Company Code Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-brand-700 to-brand-800 rounded-2xl p-6 mb-10 text-white"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-brand-200 text-sm font-medium mb-1">Your Company Code</div>
              <div className="text-2xl font-bold tracking-wider">{companyCode}</div>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors border border-white/20"
            >
              {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-brand-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4">{step.description}</p>

                  {step.actions && (
                    <div className="flex flex-wrap gap-3">
                      {step.actions.map((action) => (
                        <button
                          key={action}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download for {action}
                        </button>
                      ))}
                    </div>
                  )}

                  {step.fields && (
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                      {step.fields.map((field) => (
                        <div key={field} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700 font-medium">{field}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.note && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">{step.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-10"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-4">Before You Start</h2>
          <p className="text-slate-600 mb-5">
            Make sure you have the following ready:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {requirements.map((req) => (
              <div key={req} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-slate-700">{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-br from-slate-900 to-brand-950 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Download the desktop app now and start managing your water billing operations professionally.
          </p>
          <button className="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition-colors shadow-lg inline-flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Desktop App
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-slate-400 text-sm mt-4">
            Need help? Contact us at support@waterbilling.com
          </p>
        </motion.div>
      </div>
    </div>
  )
}
