import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplets,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/lib/language/i18n'

const values = [
  {
    icon: Target,
    titleKey: 'about.values.utility.title',
    textKey: 'about.values.utility.text',
  },
  {
    icon: ShieldCheck,
    titleKey: 'about.values.records.title',
    textKey: 'about.values.records.text',
  },
  {
    icon: Users,
    titleKey: 'about.values.support.title',
    textKey: 'about.values.support.text',
  },
]

const companyFacts = [
  'about.facts.platform',
  'about.facts.location',
  'about.facts.audience',
  'about.facts.subscription',
]

export default function AboutPage() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-16 bg-theme-bg">
      <section className="container-main mb-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-2 eyebrow">
              <Droplets className="h-4 w-4" />
              {t('about.eyebrow')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-4 mb-5">
              {t('about.title')}
            </h1>
            <p className="text-lg text-theme-text-secondary leading-relaxed mb-8">
              {t('about.subtitle')}
            </p>
            {!isLoading && (
              <div className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary">
                  {isAuthenticated ? t('landing.actions.dashboard') : t('landing.actions.createAccount')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to={isAuthenticated ? '/subscription' : '/pricing'} className="btn-secondary">
                  {isAuthenticated ? t('nav.subscription') : t('landing.actions.viewPlans')}
                </Link>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="surface-panel p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 text-white flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-lg text-theme-text-primary">WaterBilling</div>
                <div className="text-sm text-theme-text-muted">{t('about.companyType')}</div>
              </div>
            </div>
            <div className="space-y-4">
              {companyFacts.map((fact) => (
                <div key={fact} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-theme-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-theme-text-secondary">{t(fact)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-muted py-16 mb-16">
        <div className="container-main">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <span className="eyebrow">{t('about.purpose.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-4">
              {t('about.purpose.title')}
            </h2>
            <p className="text-theme-text-secondary text-lg">
              {t('about.purpose.text')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <AnimatedSection key={value.titleKey} className="surface-card p-6">
                <div className="h-12 w-12 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-theme-text-primary mb-2">{t(value.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-theme-text-secondary">{t(value.textKey)}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main">
        <AnimatedSection className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 items-start">
          <div>
            <span className="eyebrow">{t('about.contact.eyebrow')}</span>
            <h2 className="text-3xl font-bold text-theme-text-primary mt-3 mb-4">{t('about.contact.title')}</h2>
            <p className="text-theme-text-secondary">
              {t('about.contact.text')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-[1.45fr_1fr_1fr] gap-4">
            <div className="surface-card p-5">
              <Mail className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">{t('about.contact.email')}</div>
              <div className="text-sm text-theme-text-secondary break-words">puttyvireakmeas@gmail.com</div>
            </div>
            <div className="surface-card p-5">
              <Phone className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">{t('about.contact.phone')}</div>
              <div className="text-sm text-theme-text-secondary">+855 968 087 133</div>
            </div>
            <div className="surface-card p-5">
              <MapPin className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">{t('about.contact.location')}</div>
              <div className="text-sm text-theme-text-secondary">{t('footer.location')}</div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
