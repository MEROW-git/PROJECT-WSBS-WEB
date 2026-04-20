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
    <div className="pt-24 pb-16">
      <section className="container-main mb-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-2 text-brand-600 font-semibold text-sm uppercase tracking-wide">
              <Droplets className="h-4 w-4" />
              About WaterBilling
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-5">
              Helping water utility companies manage billing with confidence.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
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
            className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 text-white flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-lg text-slate-900">WaterBilling</div>
                <div className="text-sm text-slate-500">Utility management company</div>
              </div>
            </div>
            <div className="space-y-4">
              {companyFacts.map((fact) => (
                <div key={fact} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-water-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{fact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 mb-16">
        <div className="container-main">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Simple tools for serious utility operations.
            </h2>
            <p className="text-slate-600 text-lg">
              We build WaterBilling so water companies can spend less time fighting spreadsheets and more time serving customers with accurate records.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <AnimatedSection key={value.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{value.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main">
        <AnimatedSection className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 items-start">
          <div>
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Contact</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-4">Talk with our team</h2>
            <p className="text-slate-600">
              For account setup, subscription questions, or password reset support, contact the WaterBilling team directly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-[1.45fr_1fr_1fr] gap-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <Mail className="h-5 w-5 text-brand-600 mb-3" />
              <div className="text-sm font-semibold text-slate-900 mb-1">Email</div>
              <div className="text-sm text-slate-600 break-words">puttyvireakmeas@gmail.com</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <Phone className="h-5 w-5 text-brand-600 mb-3" />
              <div className="text-sm font-semibold text-slate-900 mb-1">Phone</div>
              <div className="text-sm text-slate-600">+855 968 087 133</div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <MapPin className="h-5 w-5 text-brand-600 mb-3" />
              <div className="text-sm font-semibold text-slate-900 mb-1">Location</div>
              <div className="text-sm text-slate-600">Phnom Penh, Cambodia</div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
