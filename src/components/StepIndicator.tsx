import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  label: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.completed
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300',
                    isCompleted && 'bg-brand-600 border-brand-600 text-white',
                    isCurrent && 'bg-white border-brand-600 text-brand-600 shadow-lg shadow-brand-600/20',
                    isUpcoming && 'bg-white border-slate-300 text-slate-400'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium hidden sm:block',
                    isCompleted && 'text-brand-600',
                    isCurrent && 'text-brand-700',
                    isUpcoming && 'text-slate-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 sm:mx-4">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      isCompleted ? 'bg-brand-600' : 'bg-slate-200'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
