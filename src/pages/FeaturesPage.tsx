import {
  Users, Gauge, Ruler, Wrench, ClipboardList,
  Receipt, CreditCard, BarChart3, Monitor, Smartphone,
  Cloud, Headphones, Shield, Zap, Check
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

const featureGroups = [
  {
    title: 'Customer Management',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Register and manage customer accounts',
      'Organize customers by areas and zones',
      'Track customer status (active, inactive, disconnected)',
      'Store contact info, ID cards, and addresses',
      'View customer history and connection dates',
      'Search and filter customer records',
    ],
  },
  {
    title: 'Meter Management',
    icon: Gauge,
    color: 'from-cyan-500 to-cyan-600',
    features: [
      'Track all meters with unique numbers',
      'Link meters to customers',
      'Manage meter sizes and specifications',
      'Record installation dates and initial readings',
      'Track meter status and location notes',
      'Support for meter replacement history',
    ],
  },
  {
    title: 'Meter Size Configuration',
    icon: Ruler,
    color: 'from-teal-500 to-teal-600',
    features: [
      'Define meter sizes (1/2", 3/4", 1", etc.)',
      'Set installation prices per size',
      'Set monthly renting fees per size',
      'Activate or deactivate sizes as needed',
      'Auto-calculate installation costs',
    ],
  },
  {
    title: 'Installation Tracking',
    icon: Wrench,
    color: 'from-emerald-500 to-emerald-600',
    features: [
      'Record new water connection installations',
      'Track installation fees and down payments',
      'Support installment payment plans',
      'Calculate penalties for late payments',
      'Monitor paid vs balance amounts',
      'Full payment history per installation',
    ],
  },
  {
    title: 'Meter Reading',
    icon: ClipboardList,
    color: 'from-sky-500 to-sky-600',
    features: [
      'Record readings via desktop or mobile app',
      'Enter previous and current readings',
      'Auto-calculate units consumed',
      'Capture meter photos as evidence',
      'Record GPS coordinates (mobile)',
      'Assign readings to staff members',
      'Approve or reject reading entries',
    ],
  },
  {
    title: 'Billing System',
    icon: Receipt,
    color: 'from-violet-500 to-violet-600',
    features: [
      'Generate monthly bills automatically',
      'Calculate usage charges from readings',
      'Apply fixed charges and tariffs',
      'Add installation installments to bills',
      'Include meter renting fees',
      'Calculate penalties for late payment',
      'Track paid amount and balance',
      'Generate unique bill numbers',
    ],
  },
  {
    title: 'Payment Processing',
    icon: CreditCard,
    color: 'from-amber-500 to-amber-600',
    features: [
      'Record multiple payment methods',
      'Support cash, bank transfer, mobile money, checks',
      'Track partial and full payments',
      'Generate payment receipts',
      'Link payments to bills and installations',
      'View payment history per customer',
      'Track who received each payment',
    ],
  },
  {
    title: 'Reports & Analytics',
    icon: BarChart3,
    color: 'from-rose-500 to-rose-600',
    features: [
      'Revenue summary reports',
      'Customer count and growth',
      'Meter reading statistics',
      'Bill collection reports',
      'Payment method breakdown',
      'Area-wise customer distribution',
      'Export reports for accounting',
    ],
  },
]

const platformFeatures = [
  {
    icon: Monitor,
    title: 'Desktop Application',
    desc: 'Full-featured Windows/Mac/Linux desktop app for office administrators, cashiers, and managers.',
    features: ['Complete admin control', 'Bill generation', 'Payment recording', 'Report viewing'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Application',
    desc: 'Lightweight iOS/Android app designed for field meter readers.',
    features: ['Quick reading entry', 'Photo capture', 'GPS tracking', 'Offline support'],
  },
  {
    icon: Cloud,
    title: 'Cloud Hosted',
    desc: 'We host and maintain the backend. No server setup needed on your end.',
    features: ['Automatic backups', '99.9% uptime', 'SSL encryption', 'Regular updates'],
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    desc: 'Our team handles technical support, updates, and system maintenance.',
    features: ['Email support', 'System updates', 'Bug fixes', 'Feature requests'],
  },
]

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="container-main mb-16">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">Features</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Complete Feature Set
          </h1>
          <p className="text-lg text-slate-600">
            Everything your water utility company needs to manage customers, meters, 
            billing, and payments professionally.
          </p>
        </AnimatedSection>
      </section>

      {/* Feature Groups */}
      <section className="container-main">
        <div className="space-y-16">
          {featureGroups.map((group, gi) => (
            <AnimatedSection key={group.title}>
              <div className={`grid lg:grid-cols-2 gap-8 items-start ${gi % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={gi % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${group.color} text-white mb-5`}>
                    <group.icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{group.title}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{group.title}</h2>
                  <ul className="space-y-3">
                    {group.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={gi % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-slate-100 rounded-2xl p-8 h-full min-h-[280px] flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <group.icon className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-slate-500 text-sm font-medium">{group.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-padding bg-slate-50 mt-16">
        <div className="container-main">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Platform & Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Beyond software features, we provide a complete service platform for your business.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {platformFeatures.map((pf, i) => (
              <AnimatedSection key={pf.title} delay={i * 0.1}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <pf.icon className="w-6 h-6 text-brand-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{pf.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{pf.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {pf.features.map((f) => (
                          <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                            {f}
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
