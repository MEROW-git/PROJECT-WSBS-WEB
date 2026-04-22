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
  nameKey: string
  descriptionKey: string
  monthlyPrice: number
  yearlyPrice: number
  users: number
  customers: number
  featureKeys: string[]
  notIncludedKeys: string[]
  popular?: boolean
}

export interface SubscriptionModuleConfig {
  icon: LucideIcon
  titleKey: string
  textKey: string
}

export interface PricingFaqConfig {
  questionKey: string
  answerKey: string
}

export const pricingConfig = {
  yearlyDiscountLabel: 'Save 20%',
  defaultPlanId: 'professional',
  plans: [
    {
      id: 'starter',
      nameKey: 'pricing.plans.starter.name',
      descriptionKey: 'pricing.plans.starter.description',
      monthlyPrice: 29,
      yearlyPrice: 290,
      users: 3,
      customers: 500,
      featureKeys: [
        'pricing.plans.starter.features.staff',
        'pricing.plans.starter.features.customers',
        'pricing.sharedFeatures.customerManagement',
        'pricing.sharedFeatures.meterManagement',
        'pricing.plans.starter.features.billing',
        'pricing.sharedFeatures.paymentRecording',
        'pricing.sharedFeatures.emailSupport',
      ],
      notIncludedKeys: [
        'pricing.sharedFeatures.staffReadingWorkflows',
        'pricing.sharedFeatures.advancedReports',
        'pricing.sharedFeatures.customBranding',
      ],
    },
    {
      id: 'professional',
      nameKey: 'pricing.plans.professional.name',
      descriptionKey: 'pricing.plans.professional.description',
      monthlyPrice: 79,
      yearlyPrice: 790,
      users: 10,
      customers: 5000,
      featureKeys: [
        'pricing.plans.professional.features.staff',
        'pricing.plans.professional.features.customers',
        'pricing.plans.professional.features.everythingStarter',
        'pricing.sharedFeatures.staffReadingWorkflows',
        'pricing.sharedFeatures.installationTracking',
        'pricing.sharedFeatures.advancedBillingRules',
        'pricing.sharedFeatures.penaltyDiscountRules',
        'pricing.sharedFeatures.standardReports',
        'pricing.sharedFeatures.prioritySupport',
      ],
      notIncludedKeys: [
        'pricing.sharedFeatures.customIntegrations',
        'pricing.sharedFeatures.dedicatedAccountManager',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      nameKey: 'pricing.plans.enterprise.name',
      descriptionKey: 'pricing.plans.enterprise.description',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      users: 50,
      customers: 50000,
      featureKeys: [
        'pricing.plans.enterprise.features.staff',
        'pricing.plans.enterprise.features.customers',
        'pricing.plans.enterprise.features.everythingProfessional',
        'pricing.sharedFeatures.unlimitedMeterReaders',
        'pricing.sharedFeatures.advancedAnalytics',
        'pricing.sharedFeatures.customReportBuilder',
        'pricing.sharedFeatures.apiAccess',
        'pricing.sharedFeatures.whiteLabelOptions',
        'pricing.sharedFeatures.dedicatedAccountManager',
        'pricing.sharedFeatures.phoneSupport',
      ],
      notIncludedKeys: [],
    },
  ] satisfies PricingPlanConfig[],
  pricingFaqs: [
    {
      questionKey: 'pricing.faqs.changePlans.question',
      answerKey: 'pricing.faqs.changePlans.answer',
    },
    {
      questionKey: 'pricing.faqs.subscribeFirst.question',
      answerKey: 'pricing.faqs.subscribeFirst.answer',
    },
    {
      questionKey: 'pricing.faqs.exceedLimit.question',
      answerKey: 'pricing.faqs.exceedLimit.answer',
    },
    {
      questionKey: 'pricing.faqs.refunds.question',
      answerKey: 'pricing.faqs.refunds.answer',
    },
    {
      questionKey: 'pricing.faqs.cancel.question',
      answerKey: 'pricing.faqs.cancel.answer',
    },
  ] satisfies PricingFaqConfig[],
  subscriptionModules: [
    { icon: Users, titleKey: 'subscription.modules.customers.title', textKey: 'subscription.modules.customers.text' },
    { icon: Gauge, titleKey: 'subscription.modules.meters.title', textKey: 'subscription.modules.meters.text' },
    { icon: Receipt, titleKey: 'subscription.modules.billing.title', textKey: 'subscription.modules.billing.text' },
    { icon: CreditCard, titleKey: 'subscription.modules.payments.title', textKey: 'subscription.modules.payments.text' },
    { icon: BarChart3, titleKey: 'subscription.modules.reports.title', textKey: 'subscription.modules.reports.text' },
    { icon: ShieldCheck, titleKey: 'subscription.modules.security.title', textKey: 'subscription.modules.security.text' },
  ] satisfies SubscriptionModuleConfig[],
  subscriptionFaqs: [
    {
      questionKey: 'subscription.faqs.chooseNow.question',
      answerKey: 'subscription.faqs.chooseNow.answer',
    },
    {
      questionKey: 'subscription.faqs.changePlans.question',
      answerKey: 'subscription.faqs.changePlans.answer',
    },
    {
      questionKey: 'subscription.faqs.customerLimit.question',
      answerKey: 'subscription.faqs.customerLimit.answer',
    },
    {
      questionKey: 'subscription.faqs.afterSubscribing.question',
      answerKey: 'subscription.faqs.afterSubscribing.answer',
    },
  ] satisfies PricingFaqConfig[],
}

export const getPlanPrice = (plan: PricingPlanConfig, billingCycle: BillingCycle) =>
  billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
