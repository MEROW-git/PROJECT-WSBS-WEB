import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Gauge, ClipboardList, Receipt, CreditCard,
  BarChart3, LayoutDashboard, ArrowRight, Shield,
  Zap, Clock, ChevronRight, Droplets
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import FeatureCard from '@/components/FeatureCard'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/lib/language/i18n'

const heroFeatures = [
  { icon: Users, key: 'customers' },
  { icon: Gauge, key: 'meters' },
  { icon: Receipt, key: 'billing' },
  { icon: CreditCard, key: 'payments' },
]

const coreFeatures = [
  { icon: Users, key: 'customers' },
  { icon: Gauge, key: 'meters' },
  { icon: ClipboardList, key: 'reading' },
  { icon: Receipt, key: 'billing' },
  { icon: CreditCard, key: 'payments' },
  { icon: BarChart3, key: 'reports' },
]

const audienceCards = [
  { icon: Users, key: 'small' },
  { icon: LayoutDashboard, key: 'medium' },
  { icon: BarChart3, key: 'large' },
]

const benefits = [
  { icon: Zap, key: 'time' },
  { icon: Shield, key: 'records' },
  { icon: Clock, key: 'available' },
  { icon: LayoutDashboard, key: 'dashboard' },
]

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { t } = useTranslation()

  return (
    <div>
      <section className="relative min-h-screen gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[hsl(var(--hero-overlay-primary))]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-[hsl(var(--hero-overlay-secondary))]" />
        </div>

        <div className="relative container-main pt-32 pb-20 min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-water-300 text-sm font-medium mb-6 border border-white/10">
                <Droplets className="w-4 h-4" />
                {t('landing.hero.eyebrow')}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6">
                {t('landing.hero.titleLine1')}
                <span className="block text-gradient mt-1 pb-2">{t('landing.hero.titleLine2')}</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                {t('landing.hero.subtitle')}
              </p>

              {!isLoading && (
                <div className="flex flex-wrap gap-4 mb-10">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="btn-primary">
                        {t('landing.actions.dashboard')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                      <Link to="/subscription" className="btn-secondary">{t('nav.subscription')}</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className="btn-primary">
                        {t('landing.actions.createAccount')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                      <Link to="/pricing" className="btn-secondary">{t('landing.actions.viewPlans')}</Link>
                    </>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {heroFeatures.map((feature) => (
                  <div key={feature.key} className="chip bg-white/10 text-white/80 border-white/10 backdrop-blur-sm">
                    <feature.icon className="w-3.5 h-3.5" />
                    {t(`landing.hero.features.${feature.key}`)}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="glass-dark rounded-2xl p-6 w-[420px] shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Water Billing</div>
                      <div className="text-slate-400 text-xs">{t('common.dashboard')}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                    {t('landing.demo.active')}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    ['customers', '1,248', 'text-brand-400'],
                    ['meters', '1,180', 'text-water-400'],
                    ['revenue', '$12.4K', 'text-emerald-400'],
                  ].map(([key, value, color]) => (
                    <div key={key} className="demo-tile p-3">
                      <div className={`text-lg font-bold ${color}`}>{value}</div>
                      <div className="text-slate-400 text-xs">{t(`landing.demo.${key}`)}</div>
                    </div>
                  ))}
                </div>

                <div className="text-white/60 text-xs mb-3">{t('landing.demo.recentActivity')}</div>
                <div className="space-y-2">
                  {[
                    { key: 'reading', time: 'twoMin', icon: ClipboardList },
                    { key: 'bill', time: 'fifteenMin', icon: Receipt },
                    { key: 'payment', time: 'oneHour', icon: CreditCard },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center gap-3 p-2.5 demo-tile">
                      <item.icon className="w-4 h-4 text-brand-400" />
                      <div className="flex-1">
                        <div className="text-white text-xs font-medium">{t(`landing.demo.activity.${item.key}`)}</div>
                      </div>
                      <div className="text-slate-500 text-xs">{t(`landing.demo.time.${item.time}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="eyebrow">{t('landing.audience.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-4">{t('landing.audience.title')}</h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">{t('landing.audience.text')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {audienceCards.map((item, i) => (
              <AnimatedSection key={item.key} delay={i * 0.1}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-theme-primary/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-theme-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-theme-text-primary mb-3">{t(`landing.audience.${item.key}.title`)}</h3>
                  <p className="text-theme-text-secondary">{t(`landing.audience.${item.key}.text`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="eyebrow">{t('nav.features')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-4">{t('landing.features.title')}</h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">{t('landing.features.text')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => (
              <FeatureCard
                key={feature.key}
                icon={feature.icon}
                title={t(`landing.coreFeatures.${feature.key}.title`)}
                description={t(`landing.coreFeatures.${feature.key}.description`)}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="eyebrow">{t('landing.dashboard.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-6">
                {t('landing.dashboard.titleLine1')}<br />{t('landing.dashboard.titleLine2')}
              </h2>
              <div className="space-y-6">
                {[
                  { icon: LayoutDashboard, key: 'company', color: 'text-theme-primary', bg: 'bg-theme-primary/10' },
                  { icon: CreditCard, key: 'subscription', color: 'text-theme-accent', bg: 'bg-theme-accent/10' },
                ].map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-theme-text-primary mb-1">{t(`landing.dashboard.${item.key}Title`)}</h3>
                      <p className="text-theme-text-secondary text-sm">{t(`landing.dashboard.${item.key}Text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="surface-panel p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="surface-soft p-4 bg-theme-primary/10">
                    <LayoutDashboard className="w-8 h-8 text-theme-primary mb-3" />
                    <div className="text-theme-text-primary font-semibold text-sm">{t('common.dashboard')}</div>
                    <div className="text-theme-text-muted text-xs mt-1">{t('landing.dashboard.accountOverview')}</div>
                  </div>
                  <div className="surface-soft p-4 bg-theme-accent/10">
                    <CreditCard className="w-8 h-8 text-theme-accent mb-3" />
                    <div className="text-theme-text-primary font-semibold text-sm">{t('nav.subscription')}</div>
                    <div className="text-theme-text-muted text-xs mt-1">{t('landing.dashboard.requiredFirst')}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-3 text-theme-text-muted text-xs">
                  <div className="h-px bg-theme-border flex-1" />
                  <span>{t('landing.dashboard.setupComplete')}</span>
                  <div className="h-px bg-theme-border flex-1" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="eyebrow">{t('landing.why.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-4">{t('landing.why.title')}</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <AnimatedSection key={item.key} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/25">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-theme-text-primary mb-2">{t(`landing.benefits.${item.key}.title`)}</h3>
                  <p className="text-sm text-theme-text-secondary">{t(`landing.benefits.${item.key}.text`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container-main">
          <AnimatedSection>
            <div className="relative rounded-3xl gradient-brand overflow-hidden shadow-theme">
              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('landing.cta.title')}</h2>
                <p className="text-brand-100 max-w-xl mx-auto mb-8">
                  {isAuthenticated ? t('landing.cta.authenticatedText') : t('landing.cta.publicText')}
                </p>
                {!isLoading && (
                  <div className="flex flex-wrap justify-center gap-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" className="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition-colors shadow-lg inline-flex items-center gap-2">
                          {t('landing.actions.dashboard')}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <Link to="/subscription" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                          {t('nav.subscription')}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/signup" className="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition-colors shadow-lg inline-flex items-center gap-2">
                          {t('landing.actions.createAccount')}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <Link to="/pricing" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                          {t('landing.actions.viewPricing')}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
