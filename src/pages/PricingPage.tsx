import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { getPlanPrice, pricingConfig, type BillingCycle } from '@/config/pricing'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const navigate = useNavigate()

  const handleSelect = (planId: string) => {
    navigate('/signup', { state: { selectedPlan: planId, billingCycle } })
  }

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="container-main mb-12">
        <AnimatedSection className="text-center max-w-2xl mx-auto">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Choose the paid plan that fits your utility company.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Yearly
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                {pricingConfig.yearlyDiscountLabel}
              </span>
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* Plans */}
      <section className="container-main mb-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingConfig.plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-xl shadow-brand-600/25 md:-mt-4 md:mb-4'
                  : 'bg-white border border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8">
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-brand-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    ${getPlanPrice(plan, billingCycle)}
                  </span>
                  <span className={plan.popular ? 'text-brand-200' : 'text-slate-400'}>
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>

                <div className={`text-sm mb-6 ${plan.popular ? 'text-brand-100' : 'text-slate-500'}`}>
                  <span className="font-semibold">{plan.users}</span> users &middot;{' '}
                  <span className="font-semibold">{plan.customers.toLocaleString()}</span> customers
                </div>

                <button
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    plan.popular
                      ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-lg'
                      : 'bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20'
                  }`}
                >
                  Choose Plan
                </button>

                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-brand-200' : 'text-brand-600'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-brand-50' : 'text-slate-600'}`}>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-3 opacity-40">
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full border-2 border-current" />
                      <span className={`text-sm ${plan.popular ? 'text-brand-200' : 'text-slate-500'}`}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container-main">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {pricingConfig.pricingFaqs.map((faq, i) => (
              <div key={i} className="card p-5">
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
        </AnimatedSection>
      </section>
    </div>
  )
}
