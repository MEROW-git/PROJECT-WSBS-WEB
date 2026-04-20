import {
  BarChart3,
  CreditCard,
  Gauge,
  Receipt,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type BillingCycle = 'monthly' | 'yearly'

export interface PricingPlanConfig {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  users: number
  customers: number
  features: string[]
  notIncluded: string[]
  popular?: boolean
}

export interface SubscriptionModuleConfig {
  icon: LucideIcon
  title: string
  text: string
}

export interface PricingFaqConfig {
  q: string
  a: string
}

export const pricingConfig = {
  yearlyDiscountLabel: 'Save 20%',
  defaultPlanId: 'professional',
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small water utilities that need reliable customer, meter, and billing records.',
      monthlyPrice: 29,
      yearlyPrice: 290,
      users: 3,
      customers: 500,
      features: [
        'Up to 3 staff users',
        'Up to 500 customers',
        'Customer management',
        'Meter management',
        'Basic monthly billing',
        'Payment recording',
        'Email support',
      ],
      notIncluded: ['Staff reading workflows', 'Advanced reports', 'Custom branding'],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing utilities with more staff, more customers, and stronger reporting needs.',
      monthlyPrice: 79,
      yearlyPrice: 790,
      users: 10,
      customers: 5000,
      features: [
        'Up to 10 staff users',
        'Up to 5,000 customers',
        'Everything in Starter',
        'Staff reading workflows',
        'Installation tracking',
        'Advanced billing rules',
        'Penalty and discount rules',
        'Standard reports',
        'Priority support',
      ],
      notIncluded: ['Custom integrations', 'Dedicated account manager'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large-scale utility operations that need high limits, advanced analytics, and dedicated help.',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      users: 50,
      customers: 50000,
      features: [
        'Up to 50 staff users',
        'Up to 50,000 customers',
        'Everything in Professional',
        'Unlimited meter readers',
        'Advanced analytics',
        'Custom report builder',
        'API access',
        'White-label options',
        'Dedicated account manager',
        '24/7 phone support',
      ],
      notIncluded: [],
    },
  ] satisfies PricingPlanConfig[],
  pricingFaqs: [
    {
      q: 'Can I change plans later?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
    },
    {
      q: 'Do I need to subscribe first?',
      a: 'Yes. A paid subscription is required before your account setup is complete.',
    },
    {
      q: 'What happens if I exceed my customer limit?',
      a: "We'll notify you when you're approaching your limit. You can upgrade to a higher plan or contact us for a custom solution.",
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with our service.',
    },
    {
      q: 'Can I cancel my subscription?',
      a: 'You can cancel anytime from your account settings. Your access continues until the end of your current billing period.',
    },
  ] satisfies PricingFaqConfig[],
  subscriptionModules: [
    { icon: Users, title: 'Customers', text: 'Register accounts, organize areas, and track service status.' },
    { icon: Gauge, title: 'Meters', text: 'Manage meter numbers, sizes, installations, and readings.' },
    { icon: Receipt, title: 'Billing', text: 'Generate bills with usage, fixed fees, penalties, and balances.' },
    { icon: CreditCard, title: 'Payments', text: 'Record payment methods, partial payments, and receipts.' },
    { icon: BarChart3, title: 'Reports', text: 'Review collections, revenue, customer counts, and activity.' },
    { icon: ShieldCheck, title: 'Security', text: 'Keep company data isolated with role-based account access.' },
  ] satisfies SubscriptionModuleConfig[],
  subscriptionFaqs: [
    {
      q: 'Why do I need to choose a plan now?',
      a: 'The company setup is only complete after a paid subscription is active. After subscribing, you go straight to the web dashboard.',
    },
    {
      q: 'Can I change plans later?',
      a: 'Yes. You can upgrade or downgrade as your company grows. Plan changes can be handled from account settings or support.',
    },
    {
      q: 'What happens if I reach my customer limit?',
      a: 'You can move to a higher plan before adding more customers, so your records stay organized and supported.',
    },
    {
      q: 'What do I see after subscribing?',
      a: 'You will land on the web dashboard with your company, account, company code, role, and subscription information.',
    },
  ] satisfies PricingFaqConfig[],
}

export const getPlanPrice = (plan: PricingPlanConfig, billingCycle: BillingCycle) =>
  billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
