import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Gauge, ClipboardList, Receipt, CreditCard,
  BarChart3, Monitor, Smartphone, ArrowRight, Shield,
  Zap, Clock, ChevronRight, Droplets
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import FeatureCard from '@/components/FeatureCard'

const heroFeatures = [
  { icon: Users, label: 'Customer Management' },
  { icon: Gauge, label: 'Meter Tracking' },
  { icon: Receipt, label: 'Auto Billing' },
  { icon: CreditCard, label: 'Payments' },
]

const coreFeatures = [
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Register customers, manage accounts, track connection history, and organize by areas or zones.',
  },
  {
    icon: Gauge,
    title: 'Meter Management',
    description: 'Track all meters, sizes, installations, and readings. Link meters to customers seamlessly.',
  },
  {
    icon: ClipboardList,
    title: 'Meter Reading',
    description: 'Record readings via desktop or mobile app. Support for photo capture and GPS coordinates.',
  },
  {
    icon: Receipt,
    title: 'Billing System',
    description: 'Generate monthly bills automatically based on usage, tariffs, fixed charges, and penalties.',
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Record cash, bank transfer, mobile money, and check payments with receipt tracking.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    description: 'View revenue reports, customer summaries, meter statistics, and payment collections.',
  },
]

const benefits = [
  { icon: Zap, title: 'Save Time', desc: 'Automate billing and reduce manual work by 80%.' },
  { icon: Shield, title: 'Accurate Records', desc: 'Eliminate errors with digital meter tracking.' },
  { icon: Clock, title: 'Always Available', desc: 'Cloud-hosted system accessible from anywhere.' },
  { icon: Monitor, title: 'Desktop + Mobile', desc: 'Office staff use desktop. Field staff use mobile.' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen gradient-hero overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-water-500 rounded-full blur-3xl" />
        </div>

        <div className="relative container-main pt-32 pb-20 min-h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-water-300 text-sm font-medium mb-6 border border-white/10">
                <Droplets className="w-4 h-4" />
                Water Utility Management Solution
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Manage Your Water
                <span className="block text-gradient mt-1">Billing System</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                A complete water billing platform for utility companies. Manage customers, 
                track meters, generate bills, and collect payments — all in one professional system.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/signup" className="btn-primary">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/pricing" className="btn-secondary">
                  View Plans
                </Link>
              </div>

              {/* Mini feature badges */}
              <div className="flex flex-wrap gap-3">
                {heroFeatures.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 text-xs font-medium border border-white/10">
                    <f.icon className="w-3.5 h-3.5" />
                    {f.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Main dashboard card */}
                <div className="glass-dark rounded-2xl p-6 w-[420px] shadow-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Water Billing</div>
                        <div className="text-slate-400 text-xs">Dashboard</div>
                      </div>
                    </div>
                    <div className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Customers', value: '1,248', color: 'text-brand-400' },
                      { label: 'Meters', value: '1,180', color: 'text-water-400' },
                      { label: 'Revenue', value: '$12.4K', color: 'text-emerald-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-slate-400 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent activity */}
                  <div className="text-white/60 text-xs mb-3">Recent Activity</div>
                  <div className="space-y-2">
                    {[
                      { action: 'New reading recorded', time: '2 min ago', icon: ClipboardList },
                      { action: 'Bill generated #B2045', time: '15 min ago', icon: Receipt },
                      { action: 'Payment received $85', time: '1 hr ago', icon: CreditCard },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg border border-white/5">
                        <item.icon className="w-4 h-4 text-brand-400" />
                        <div className="flex-1">
                          <div className="text-white text-xs font-medium">{item.action}</div>
                        </div>
                        <div className="text-slate-500 text-xs">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating mobile card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -right-6 glass-dark rounded-xl p-4 w-48 shadow-xl border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-water-400" />
                    <span className="text-white text-xs font-medium">Mobile App</span>
                  </div>
                  <div className="text-slate-400 text-xs">Field reading ready</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Who It's For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Built for Water Utility Companies
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you manage 100 or 10,000 connections, our system scales with your business needs.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Small Utilities', desc: 'Local water providers serving communities of 500-5,000 connections.', icon: Users },
              { title: 'Medium Companies', desc: 'Regional utilities with multiple zones and dedicated staff teams.', icon: Monitor },
              { title: 'Large Enterprises', desc: 'City-wide or multi-municipality water distribution networks.', icon: BarChart3 },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-water-100 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-brand-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-padding bg-slate-50">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A complete suite of tools to manage your water utility operations from end to end.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop + Mobile Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Multi-Platform</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
                Desktop for the Office.<br />Mobile for the Field.
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-6 h-6 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Desktop Application</h3>
                    <p className="text-slate-600 text-sm">
                      Full-featured desktop app for office staff. Manage customers, meters, bills, 
                      payments, reports, and system settings.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-water-100 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-water-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Mobile Application</h3>
                    <p className="text-slate-600 text-sm">
                      Lightweight mobile app for meter readers. Record readings, capture photos, 
                      and sync data in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <Monitor className="w-8 h-8 text-brand-400 mb-3" />
                      <div className="text-white font-semibold text-sm">Desktop</div>
                      <div className="text-slate-400 text-xs mt-1">Windows / Mac / Linux</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <Smartphone className="w-8 h-8 text-water-400 mb-3" />
                      <div className="text-white font-semibold text-sm">Mobile</div>
                      <div className="text-slate-400 text-xs mt-1">iOS / Android</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3 text-slate-400 text-xs">
                    <div className="h-px bg-white/20 flex-1" />
                    <span>Sync via Cloud API</span>
                    <div className="h-px bg-white/20 flex-1" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding bg-slate-50">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              Why Choose Water Billing?
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/25">
                    <b.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container-main">
          <AnimatedSection>
            <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-water-500 rounded-full blur-3xl" />
              </div>
              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Streamline Your Water Billing?
                </h2>
                <p className="text-brand-100 max-w-xl mx-auto mb-8">
                  Join hundreds of utility companies already using our platform. 
                  Sign up today and start managing your water billing professionally.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/signup" className="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition-colors shadow-lg inline-flex items-center gap-2">
                    Get Started Free
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link to="/pricing" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
