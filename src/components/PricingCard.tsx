import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Plan } from '@/lib/api'

interface PricingCardProps {
  plan: Plan
  billingCycle: 'monthly' | 'yearly'
  isPopular?: boolean
  onSelect: (planId: string) => void
}

export default function PricingCard({ plan, billingCycle, isPopular, onSelect }: PricingCardProps) {
  const price = billingCycle === 'yearly' ? plan.price_yearly : plan.price_monthly
  const period = billingCycle === 'yearly' ? '/year' : '/month'

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 md:p-8 transition-all duration-300',
        isPopular
          ? 'bg-gradient-to-b from-theme-primary to-theme-primary-hover text-white shadow-glow scale-105 z-10'
          : 'bg-theme-card border border-theme-border hover:border-theme-primary/30 hover:shadow-theme'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-warning">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={cn('text-lg font-bold', isPopular ? 'text-white' : 'text-theme-text-primary')}>
          {plan.plan_name}
        </h3>
        <p className={cn('text-sm mt-1', isPopular ? 'text-white/80' : 'text-theme-text-muted')}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className={cn('text-4xl font-bold', isPopular ? 'text-white' : 'text-theme-text-primary')}>
          ${price}
        </span>
        <span className={cn('text-sm', isPopular ? 'text-white/70' : 'text-theme-text-muted')}>
          {period}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={cn('w-5 h-5 flex-shrink-0 mt-0.5', isPopular ? 'text-white/80' : 'text-theme-primary')} />
            <span className={cn('text-sm', isPopular ? 'text-white/90' : 'text-theme-text-secondary')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.plan_id)}
        className={cn(
          'w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200',
          isPopular
            ? 'bg-white text-theme-primary hover:bg-white/90 shadow-lg'
            : 'bg-theme-primary text-white hover:bg-theme-primary-hover shadow-glow'
        )}
      >
        Choose {plan.plan_name}
      </button>
    </div>
  )
}
