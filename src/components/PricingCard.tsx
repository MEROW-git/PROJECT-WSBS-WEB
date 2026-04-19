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
          ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-xl shadow-brand-600/25 scale-105 z-10'
          : 'bg-white border border-slate-200 hover:border-brand-300 hover:shadow-lg'
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={cn('text-lg font-bold', isPopular ? 'text-white' : 'text-slate-900')}>
          {plan.plan_name}
        </h3>
        <p className={cn('text-sm mt-1', isPopular ? 'text-brand-100' : 'text-slate-500')}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className={cn('text-4xl font-bold', isPopular ? 'text-white' : 'text-slate-900')}>
          ${price}
        </span>
        <span className={cn('text-sm', isPopular ? 'text-brand-200' : 'text-slate-400')}>
          {period}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={cn('w-5 h-5 flex-shrink-0 mt-0.5', isPopular ? 'text-brand-200' : 'text-brand-600')} />
            <span className={cn('text-sm', isPopular ? 'text-brand-50' : 'text-slate-600')}>
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
            ? 'bg-white text-brand-700 hover:bg-brand-50 shadow-lg'
            : 'bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20'
        )}
      >
        Choose {plan.plan_name}
      </button>
    </div>
  )
}
