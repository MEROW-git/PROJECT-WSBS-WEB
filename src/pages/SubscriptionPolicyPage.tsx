import AnimatedSection from '@/components/AnimatedSection'

export default function SubscriptionPolicyPage() {
  return (
    <div className="pt-28 pb-16 bg-theme-bg">
      <div className="container-main max-w-4xl">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-text-primary mb-4">Subscription Policy</h1>
          <p className="text-theme-text-muted mb-10">Last updated: January 1, 2025</p>

          <div className="max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Subscription Required</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                New accounts must choose and activate a paid subscription before setup is complete.
                Access to account features begins after the selected plan is active.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Billing Cycles</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                We offer monthly and yearly billing cycles. Monthly subscriptions are billed on 
                the same day each month. Yearly subscriptions are billed once per year at a 
                discounted rate (save 20% compared to monthly). You can switch billing cycles 
                at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Payment Methods</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                We accept major credit cards (Visa, Mastercard, American Express) and bank transfers 
                for enterprise plans. All payments are processed securely through our payment 
                providers. Payments are non-refundable except as specified in our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Plan Limits</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                Each plan has limits on the number of users and customers. If you approach your 
                plan limits, we will notify you via email. You can upgrade to a higher plan at 
                any time. There are no overage charges — you simply need to upgrade when you 
                exceed your plan limits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Cancellation</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                You may cancel your subscription at any time from your account settings. Upon 
                cancellation, you will continue to have access until the end of your current 
                billing period. After that, your account will be downgraded to a limited access 
                state with 30 days to export your data before deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Refund Policy</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                We offer a 30-day money-back guarantee for new subscribers. If you are not 
                satisfied with our service within the first 30 days of your paid subscription, 
                contact us for a full refund. Refunds are processed within 5-10 business days. 
                This guarantee does not apply to renewals or plan changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-theme-text-primary mb-3">Account Suspension</h2>
              <p className="text-theme-text-secondary leading-relaxed">
                We may suspend accounts for non-payment after a 7-day grace period. During 
                suspension, you will have read-only access to your data. Accounts suspended 
                for more than 60 days may be permanently deleted. Contact support if you need 
                payment arrangement assistance.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
