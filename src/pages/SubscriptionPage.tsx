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
import { useTranslation } from '@/lib/language/i18n'

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const { isAuthenticated, setSubscription } = useAuthStore()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string>(pricingConfig.defaultPlanId)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()

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
      setError(res.error?.message || t('subscription.errors.activateFailed'))
    }
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-theme-bg-secondary">
      <div className="container-main max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow">{t('subscription.eyebrow')}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-3 mb-4">
              {t('subscription.title')}
            </h1>
            <p className="text-lg text-theme-text-secondary">
              {t('subscription.subtitle')}
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 p-1.5 bg-theme-surface rounded-xl shadow-sm border border-theme-border">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-theme-primary text-white shadow-sm'
                    : 'text-theme-text-muted hover:text-theme-text-primary'
                }`}
              >
                {t('pricing.monthly')}
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-theme-primary text-white shadow-sm'
                    : 'text-theme-text-muted hover:text-theme-text-primary'
                }`}
              >
                {t('pricing.yearly')}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-theme-success/10 text-theme-success'
                }`}>
                  {t('pricing.yearlyDiscount')}
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
                      ? 'bg-gradient-to-b from-theme-primary to-theme-primary-hover text-white shadow-glow lg:-mt-4'
                      : 'bg-theme-card border border-theme-border'
                  } ${isSelected ? 'ring-4 ring-theme-primary/30 ring-offset-2 ring-offset-theme-bg-secondary' : 'hover:-translate-y-1 hover:shadow-theme'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="badge-warning">
                        {t('pricing.mostPopular')}
                      </span>
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-theme-text-primary'}`}>
                          {t(plan.nameKey)}
                        </h3>
                        <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-theme-text-muted'}`}>
                          {t(plan.descriptionKey)}
                        </p>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? plan.popular ? 'border-white bg-white text-theme-primary' : 'border-theme-primary bg-theme-primary text-white'
                          : plan.popular ? 'border-white/40' : 'border-theme-border'
                      }`}>
                        {isSelected && <Check className="h-4 w-4" />}
                      </div>
                    </div>

                    <div className="mb-6">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-theme-text-primary'}`}>
                        ${price}
                      </span>
                      <span className={plan.popular ? 'text-white/70' : 'text-theme-text-muted'}>
                        /{billingCycle === 'yearly' ? t('pricing.year') : t('pricing.month')}
                      </span>
                    </div>

                    <div className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-theme-text-muted'}`}>
                      <span className="font-semibold">{plan.users}</span> {t('pricing.users')} &middot;{' '}
                      <span className="font-semibold">{plan.customers.toLocaleString()}</span> {t('pricing.customers')}
                    </div>

                    <div className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all mb-8 ${
                      isSelected
                        ? plan.popular ? 'bg-white text-theme-primary' : 'bg-theme-primary text-white'
                        : plan.popular ? 'bg-white/15 text-white' : 'bg-theme-bg-secondary text-theme-text-secondary'
                    }`}>
                      {isSelected ? t('subscription.selectedPlan') : t('subscription.selectPlan')}
                    </div>

                    <div className="space-y-3">
                      {plan.featureKeys.map((featureKey) => (
                        <div key={featureKey} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white/80' : 'text-theme-primary'}`} />
                          <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-theme-text-secondary'}`}>{t(featureKey)}</span>
                        </div>
                      ))}
                      {plan.notIncludedKeys.map((featureKey) => (
                        <div key={featureKey} className="flex items-start gap-3 opacity-45">
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-theme-text-muted'}`}>{t(featureKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start mb-12">
            <section className="surface-card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-theme-text-primary mb-3">{t('subscription.includesTitle')}</h2>
              <p className="text-theme-text-secondary mb-6">
                {t('subscription.includesText')}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {pricingConfig.subscriptionModules.map((module) => (
                  <div key={module.titleKey} className="surface-soft p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-theme-primary/10 text-theme-primary flex items-center justify-center">
                        <module.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-theme-text-primary">{t(module.titleKey)}</h3>
                    </div>
                    <p className="text-sm text-theme-text-secondary">{t(module.textKey)}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="surface-card p-6 lg:sticky lg:top-24">
              <div className="badge-success w-fit mb-4">
                <CheckCircle2 className="h-4 w-4" />
                {t('subscription.readyToActivate')}
              </div>
              <h2 className="text-xl font-bold text-theme-text-primary mb-2">{t(selected.nameKey)}</h2>
              <p className="text-sm text-theme-text-muted mb-5">{t(selected.descriptionKey)}</p>
              <div className="mb-5">
                <span className="text-4xl font-bold text-theme-text-primary">${selectedPrice}</span>
                <span className="text-theme-text-muted">/{billingCycle === 'yearly' ? t('pricing.year') : t('pricing.month')}</span>
              </div>
              <div className="space-y-2 text-sm text-theme-text-secondary mb-6">
                <div className="flex justify-between gap-4">
                  <span>{t('pricing.usersLabel')}</span>
                  <span className="font-semibold text-theme-text-primary">{selected.users}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{t('pricing.customersLabel')}</span>
                  <span className="font-semibold text-theme-text-primary">{selected.customers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{t('subscription.billing')}</span>
                  <span className="font-semibold text-theme-text-primary capitalize">
                    {billingCycle === 'yearly' ? t('pricing.yearly') : t('pricing.monthly')}
                  </span>
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
                    {t('subscription.subscribe')}
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
              <p className="text-xs text-theme-text-muted mt-3 text-center">
                {t('subscription.afterActivation')}
              </p>
            </aside>
          </div>

          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-8">{t('subscription.questionsTitle')}</h2>
            <div className="space-y-4">
              {pricingConfig.subscriptionFaqs.map((faq) => (
                <div key={faq.questionKey} className="surface-card p-5">
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
          </section>
        </motion.div>
      </div>
    </div>
  )
}
