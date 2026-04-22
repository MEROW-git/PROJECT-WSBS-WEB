import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { getPlanPrice, pricingConfig, type BillingCycle } from '@/config/pricing'
import { useTranslation } from '@/lib/language/i18n'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSelect = (planId: string) => {
    navigate('/signup', { state: { selectedPlan: planId, billingCycle } })
  }

  return (
    <div className="pt-24 pb-16 bg-theme-bg">
      {/* Header */}
      <section className="container-main mb-12">
        <AnimatedSection className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-3 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-theme-text-secondary mb-8">
            {t('pricing.subtitle')}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-theme-bg-secondary rounded-xl border border-theme-border">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-theme-surface text-theme-text-primary shadow-sm'
                  : 'text-theme-text-muted hover:text-theme-text-primary'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-theme-surface text-theme-text-primary shadow-sm'
                  : 'text-theme-text-muted hover:text-theme-text-primary'
              }`}
            >
              {t('pricing.yearly')}
              <span className="text-xs bg-theme-success/10 text-theme-success px-2 py-0.5 rounded-full">
                {t('pricing.yearlyDiscount')}
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
                  ? 'bg-gradient-to-b from-theme-primary to-theme-primary-hover text-white shadow-glow md:-mt-4 md:mb-4'
                  : 'surface-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge-warning">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8">
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-theme-text-primary'}`}>
                  {t(plan.nameKey)}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-white/80' : 'text-theme-text-muted'}`}>
                  {t(plan.descriptionKey)}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-theme-text-primary'}`}>
                    ${getPlanPrice(plan, billingCycle)}
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-theme-text-muted'}>
                    /{billingCycle === 'yearly' ? t('pricing.year') : t('pricing.month')}
                  </span>
                </div>

                <div className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-theme-text-muted'}`}>
                  <span className="font-semibold">{plan.users}</span> {t('pricing.users')} &middot;{' '}
                  <span className="font-semibold">{plan.customers.toLocaleString()}</span> {t('pricing.customers')}
                </div>

                <button
                  onClick={() => handleSelect(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    plan.popular
                      ? 'bg-white text-theme-primary hover:bg-white/90 shadow-lg'
                      : 'bg-theme-primary text-white hover:bg-theme-primary-hover shadow-glow'
                  }`}
                >
                  {t('pricing.choosePlan')}
                </button>

                <div className="space-y-3">
                  {plan.featureKeys.map((featureKey) => (
                    <div key={featureKey} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white/80' : 'text-theme-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-theme-text-secondary'}`}>{t(featureKey)}</span>
                    </div>
                  ))}
                  {plan.notIncludedKeys.map((featureKey) => (
                    <div key={featureKey} className="flex items-start gap-3 opacity-40">
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full border-2 border-current" />
                      <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-theme-text-muted'}`}>{t(featureKey)}</span>
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
          <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-10">
            {t('pricing.faqTitle')}
          </h2>
          <div className="space-y-4">
            {pricingConfig.pricingFaqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-theme-text-primary text-sm mb-1">{t(faq.questionKey)}</h3>
                    <p className="text-sm text-theme-text-secondary">{t(faq.answerKey)}</p>
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
