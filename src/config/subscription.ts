import { authConfig } from './auth'

export type SubscriptionCheckoutMode = 'api' | 'telegram'

export const subscriptionConfig = {
  checkoutMode: 'telegram' as SubscriptionCheckoutMode,
  telegramContact: authConfig.passwordResetContact,
}
