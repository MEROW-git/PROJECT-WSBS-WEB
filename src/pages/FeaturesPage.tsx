import {
  Users, Gauge, Ruler, Wrench, ClipboardList,
  Receipt, CreditCard, BarChart3, LayoutDashboard, ShieldCheck,
  Cloud, Headphones, Check
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
      'Record readings through approved staff tools',
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
    icon: LayoutDashboard,
    title: 'Web Dashboard',
    desc: 'A clear account dashboard for company information, subscription status, and billing management.',
    features: ['Account overview', 'Company details', 'Subscription status', 'Billing access'],
  },
  {
    icon: ShieldCheck,
    title: 'Controlled Access',
    desc: 'Users only receive the features their active subscription allows.',
    features: ['Plan-based access', 'Role controls', 'Secure sessions', 'Account status checks'],
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
    <div className="pt-24 pb-16 bg-theme-bg">
      {/* Header */}
      <section className="container-main mb-16">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Features</span>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mt-3 mb-4">
            Complete Feature Set
          </h1>
          <p className="text-lg text-theme-text-secondary">
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
                  <h2 className="text-2xl font-bold text-theme-text-primary mb-4">{group.title}</h2>
                  <ul className="space-y-3">
                    {group.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <span className="text-theme-text-secondary">{feature}</span>
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
                      <p className="text-theme-text-muted text-sm font-medium">{group.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-padding section-muted mt-16">
        <div className="container-main">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-text-primary mb-4">Platform & Services</h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">
              Beyond software features, we provide a complete service platform for your business.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {platformFeatures.map((pf, i) => (
              <AnimatedSection key={pf.title} delay={i * 0.1}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                      <pf.icon className="w-6 h-6 text-theme-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-theme-text-primary mb-1">{pf.title}</h3>
                      <p className="text-sm text-theme-text-secondary mb-3">{pf.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {pf.features.map((f) => (
                          <span key={f} className="chip">
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
