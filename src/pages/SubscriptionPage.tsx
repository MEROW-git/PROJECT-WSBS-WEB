import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { api, type Plan } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import StepIndicator from '@/components/StepIndicator'

const plans: Plan[] = [
  {
    plan_id: 'starter',
    plan_name: 'Starter',
    description: 'Perfect for small utilities.',
    price_monthly: 29,
    price_yearly: 290,
    max_users: 3,
    max_customers: 500,
    features: ['3 users', '500 customers', 'Basic billing', 'Email support'],
    is_active: true,
  },
  {
    plan_id: 'professional',
    plan_name: 'Professional',
    description: 'For growing utilities.',
    price_monthly: 79,
    price_yearly: 790,
    max_users: 10,
    max_customers: 5000,
    features: ['10 users', '5,000 customers', 'Mobile app', 'Priority support', 'Advanced reports'],
    is_active: true,
  },
  {
    plan_id: 'enterprise',
    plan_name: 'Enterprise',
    description: 'Large-scale operations.',
    price_monthly: 199,
    price_yearly: 1990,
    max_users: 50,
    max_customers: 50000,
    features: ['50 users', '50,000 customers', 'API access', 'Dedicated manager', '24/7 support'],
    is_active: true,
  },
]

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
  }, [isAuthenticated, navigate])

  const handleActivate = async () => {
    if (!selectedPlan) return
    setLoading(true)
    setError('')

    const res = await api.createSubscription(selectedPlan, billingCycle)
    setLoading(false)

    if (res.success) {
      navigate('/onboarding')
    } else {
      setError(res.error?.message || 'Failed to activate subscription.')
    }
  }

  const steps = [
    { id: 'signup', label: 'Create Account', completed: true },
    { id: 'verify', label: 'Verify Email', completed: true },
    { id: 'subscribe', label: 'Choose Plan', completed: false },
    { id: 'ready', label: 'Get Started', completed: false },
  ]

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="container-main max-w-5xl">
        {/* Steps */}
        <div className="mb-10">
          <StepIndicator steps={steps} currentStep={2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Choose Your Plan</h1>
            <p className="text-slate-600 max-w-lg mx-auto">
              Select a plan that fits your utility company. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 p-1.5 bg-white rounded-xl shadow-sm border border-slate-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === 'monthly' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Yearly
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.plan_id
              const price = billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly

              return (
                <button
                  key={plan.plan_id}
                  onClick={() => setSelectedPlan(plan.plan_id)}
                  className={`relative text-left rounded-2xl p-6 border-2 transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/50 shadow-lg shadow-brand-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {plan.plan_id === 'professional' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="font-bold text-slate-900 mb-1">{plan.plan_name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{plan.description}</p>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900">${price}</span>
                    <span className="text-slate-400 text-sm">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-5 w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                    isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </div>
                </button>
              )
            })}
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleActivate}
              disabled={!selectedPlan || loading}
              className="btn-primary disabled:opacity-50 inline-flex"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Start Free Trial
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 mt-3">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
