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

const values = [
  {
    icon: Target,
    title: 'Built for utility work',
    text: 'We focus on the daily needs of water utility teams: customers, meters, billing, payments, and reliable records.',
  },
  {
    icon: ShieldCheck,
    title: 'Trustworthy records',
    text: 'Our goal is to help companies keep clean account data, clear subscription status, and controlled access.',
  },
  {
    icon: Users,
    title: 'Support that stays close',
    text: 'We support companies through setup, account questions, subscription changes, and ongoing system maintenance.',
  },
]

const companyFacts = [
  'Water utility management platform',
  'Based in Phnom Penh, Cambodia',
  'Designed for small and growing utility companies',
  'Paid subscription required before account setup is complete',
]

export default function AboutPage() {
  const { isAuthenticated, isLoading } = useAuthStore()

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
              About WaterBilling
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-4 mb-5">
              Helping water utility companies manage billing with confidence.
            </h1>
            <p className="text-lg text-theme-text-secondary leading-relaxed mb-8">
              WaterBilling is a professional web platform for utility companies that need a clearer way to manage customers, meters, bills, payments, and subscription access from one system.
            </p>
            {!isLoading && (
              <div className="flex flex-wrap gap-4">
                <Link to={isAuthenticated ? '/dashboard' : '/signup'} className="btn-primary">
                  {isAuthenticated ? 'Go to Dashboard' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to={isAuthenticated ? '/subscription' : '/pricing'} className="btn-secondary">
                  {isAuthenticated ? 'Subscription' : 'View Plans'}
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
                <div className="text-sm text-theme-text-muted">Utility management company</div>
              </div>
            </div>
            <div className="space-y-4">
              {companyFacts.map((fact) => (
                <div key={fact} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-theme-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-theme-text-secondary">{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-muted py-16 mb-16">
        <div className="container-main">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <span className="eyebrow">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mt-3 mb-4">
              Simple tools for serious utility operations.
            </h2>
            <p className="text-theme-text-secondary text-lg">
              We build WaterBilling so water companies can spend less time fighting spreadsheets and more time serving customers with accurate records.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <AnimatedSection key={value.title} className="surface-card p-6">
                <div className="h-12 w-12 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-theme-text-primary mb-2">{value.title}</h3>
                <p className="text-sm leading-relaxed text-theme-text-secondary">{value.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main">
        <AnimatedSection className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 items-start">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="text-3xl font-bold text-theme-text-primary mt-3 mb-4">Talk with our team</h2>
            <p className="text-theme-text-secondary">
              For account setup, subscription questions, or password reset support, contact the WaterBilling team directly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-[1.45fr_1fr_1fr] gap-4">
            <div className="surface-card p-5">
              <Mail className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">Email</div>
              <div className="text-sm text-theme-text-secondary break-words">puttyvireakmeas@gmail.com</div>
            </div>
            <div className="surface-card p-5">
              <Phone className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">Phone</div>
              <div className="text-sm text-theme-text-secondary">+855 968 087 133</div>
            </div>
            <div className="surface-card p-5">
              <MapPin className="h-5 w-5 text-theme-primary mb-3" />
              <div className="text-sm font-semibold text-theme-text-primary mb-1">Location</div>
              <div className="text-sm text-theme-text-secondary">Phnom Penh, Cambodia</div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
