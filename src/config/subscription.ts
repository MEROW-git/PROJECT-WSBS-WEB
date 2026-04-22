import { authConfig } from './auth'

export type SubscriptionCheckoutMode = 'api' | 'telegram'

export const subscriptionConfig = {
  checkoutMode: 'telegram' as SubscriptionCheckoutMode,
  telegramContact: authConfig.passwordResetContact,
  planPrices: {
    starter: {
      monthly: 29,
      yearly: 290,
    },
    professional: {
      monthly: 79,
      yearly: 790,
    },
    enterprise: {
      monthly: 199,
      yearly: 1990,
    },
  },
}
