import {
  Users, Gauge, Ruler, Wrench, ClipboardList,
  Receipt, CreditCard, BarChart3, LayoutDashboard, ShieldCheck,
  Cloud, Headphones, Check
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { useTranslation } from '@/lib/language/i18n'

const featureGroups = [
  { key: 'customers', icon: Users, color: 'from-blue-500 to-blue-600', count: 6 },
  { key: 'meters', icon: Gauge, color: 'from-cyan-500 to-cyan-600', count: 6 },
  { key: 'sizes', icon: Ruler, color: 'from-teal-500 to-teal-600', count: 5 },
  { key: 'installation', icon: Wrench, color: 'from-emerald-500 to-emerald-600', count: 6 },
  { key: 'reading', icon: ClipboardList, color: 'from-sky-500 to-sky-600', count: 7 },
  { key: 'billing', icon: Receipt, color: 'from-violet-500 to-violet-600', count: 8 },
  { key: 'payments', icon: CreditCard, color: 'from-amber-500 to-amber-600', count: 7 },
  { key: 'reports', icon: BarChart3, color: 'from-rose-500 to-rose-600', count: 7 },
]

const platformFeatures = [
  { key: 'dashboard', icon: LayoutDashboard, count: 4 },
  { key: 'access', icon: ShieldCheck, count: 4 },
  { key: 'cloud', icon: Cloud, count: 4 },
  { key: 'support', icon: Headphones, count: 4 },
]

export default function FeaturesPage() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-16 bg-theme-bg">
      <section className="container-main mb-16">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">{t('nav.features')}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-3 mb-4">
            {t('features.title')}
          </h1>
          <p className="text-lg text-theme-text-secondary">
            {t('features.subtitle')}
          </p>
        </AnimatedSection>
      </section>

      <section className="container-main">
        <div className="space-y-16">
          {featureGroups.map((group, gi) => (
            <AnimatedSection key={group.key}>
              <div className={`grid lg:grid-cols-2 gap-8 items-start ${gi % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={gi % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${group.color} text-white mb-5`}>
                    <group.icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{t(`features.groups.${group.key}.title`)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-theme-text-primary mb-4">{t(`features.groups.${group.key}.title`)}</h2>
                  <ul className="space-y-3">
                    {Array.from({ length: group.count }, (_, index) => index + 1).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <span className="text-theme-text-secondary">{t(`features.groups.${group.key}.items.${feature}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={gi % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="surface-soft p-8 h-full min-h-[280px] flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <group.icon className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-theme-text-muted text-sm font-medium">{t(`features.groups.${group.key}.title`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-padding section-muted mt-16">
        <div className="container-main">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-text-primary mb-4">{t('features.platform.title')}</h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">
              {t('features.platform.text')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {platformFeatures.map((feature, i) => (
              <AnimatedSection key={feature.key} delay={i * 0.1}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-theme-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-text-primary mb-1">{t(`features.platform.cards.${feature.key}.title`)}</h3>
                      <p className="text-sm text-theme-text-secondary mb-3">{t(`features.platform.cards.${feature.key}.text`)}</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: feature.count }, (_, index) => index + 1).map((item) => (
                          <span key={item} className="chip">
                            {t(`features.platform.cards.${feature.key}.items.${item}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
