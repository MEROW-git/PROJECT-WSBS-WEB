import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  HelpCircle,
  Loader2,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { getPlanPrice, pricingConfig, type BillingCycle } from '@/config/pricing'

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const { isAuthenticated, setSubscription } = useAuthStore()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string>(pricingConfig.defaultPlanId)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup')
    }
  }, [isAuthenticated, navigate])

  const selected = useMemo(
    () =>
      pricingConfig.plans.find((plan) => plan.id === selectedPlan) ||
      pricingConfig.plans.find((plan) => plan.id === pricingConfig.defaultPlanId) ||
      pricingConfig.plans[0],
    [selectedPlan]
  )

  const selectedPrice = getPlanPrice(selected, billingCycle)

  const handleActivate = async () => {
    if (!selectedPlan) return
    setLoading(true)
    setError('')

    const res = await api.createSubscription(selectedPlan, billingCycle)
    setLoading(false)

    if (res.success) {
      if (res.data) {
        setSubscription(res.data)
      }
      navigate('/dashboard')
    } else {
      setError(res.error?.message || 'Failed to activate subscription.')
    }
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="container-main max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Subscription Required</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
              Choose the Plan for Your Company
            </h1>
            <p className="text-lg text-slate-600">
              Select a paid plan to complete setup. After activation, you will go to your web dashboard with your company and account information.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1.5 bg-white rounded-xl shadow-sm border border-slate-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Yearly
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {pricingConfig.yearlyDiscountLabel}
                </span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start mb-12">
            {pricingConfig.plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.id
              const price = getPlanPrice(plan, billingCycle)

              return (
                <motion.button
                  type="button"
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative text-left rounded-2xl transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-xl shadow-brand-600/25 lg:-mt-4'
                      : 'bg-white border border-slate-200'
                  } ${isSelected ? 'ring-4 ring-brand-300 ring-offset-2 ring-offset-slate-50' : 'hover:-translate-y-1 hover:shadow-lg'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                          {plan.name}
                        </h3>
                        <p className={`text-sm ${plan.popular ? 'text-brand-100' : 'text-slate-500'}`}>
                          {plan.description}
                        </p>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? plan.popular ? 'border-white bg-white text-brand-700' : 'border-brand-600 bg-brand-600 text-white'
                          : plan.popular ? 'border-white/40' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="h-4 w-4" />}
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                        ${price}
                      </span>
                      <span className={plan.popular ? 'text-brand-200' : 'text-slate-400'}>
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>

                    <div className={`text-sm mb-6 ${plan.popular ? 'text-brand-100' : 'text-slate-500'}`}>
                      <span className="font-semibold">{plan.users}</span> users &middot;{' '}
                      <span className="font-semibold">{plan.customers.toLocaleString()}</span> customers
                    </div>

                    <div className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all mb-8 ${
                      isSelected
                        ? plan.popular ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                        : plan.popular ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isSelected ? 'Selected Plan' : 'Select Plan'}
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-brand-200' : 'text-brand-600'}`} />
                          <span className={`text-sm ${plan.popular ? 'text-brand-50' : 'text-slate-600'}`}>{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 opacity-45">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className={`text-sm ${plan.popular ? 'text-brand-100' : 'text-slate-500'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start mb-12">
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">What Your Subscription Includes</h2>
              <p className="text-slate-600 mb-6">
                These core modules are available after your subscription is active. Plan limits decide how many users and customers your company can manage.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {pricingConfig.subscriptionModules.map((module) => (
                  <div key={module.title} className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
                        <module.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-slate-900">{module.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600">{module.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-full px-3 py-1.5 text-sm font-semibold w-fit mb-4">
                <CheckCircle2 className="h-4 w-4" />
                Ready to activate
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{selected.name}</h2>
              <p className="text-sm text-slate-500 mb-5">{selected.description}</p>
              <div className="mb-5">
                <span className="text-4xl font-bold text-slate-900">${selectedPrice}</span>
                <span className="text-slate-400">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex justify-between gap-4">
                  <span>Users</span>
                  <span className="font-semibold text-slate-900">{selected.users}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Customers</span>
                  <span className="font-semibold text-slate-900">{selected.customers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Billing</span>
                  <span className="font-semibold text-slate-900 capitalize">{billingCycle}</span>
                </div>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleActivate}
                disabled={loading}
                className="w-full btn-primary justify-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Your account opens in the web dashboard after activation.
              </p>
            </aside>
          </div>

          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Subscription Questions</h2>
            <div className="space-y-4">
              {pricingConfig.subscriptionFaqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">{faq.q}</h3>
                      <p className="text-sm text-slate-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
