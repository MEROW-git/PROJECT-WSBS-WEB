import AnimatedSection from '@/components/AnimatedSection'

export default function TermsPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-main max-w-4xl">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-500 mb-10">Last updated: January 1, 2025</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing or using the Water Billing System service, you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our service. 
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
              <p className="text-slate-600 leading-relaxed">
                Water Billing System provides a cloud-based platform for water utility companies to 
                manage customers, meters, readings, billing, and payments. The service includes access 
                to the hosted web service and connected account features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Account Registration</h2>
              <p className="text-slate-600 leading-relaxed">
                To use our service, you must create an account by providing accurate and complete 
                information. You are responsible for maintaining the confidentiality of your account 
                credentials and for all activities that occur under your account. You must notify us 
                immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Subscription and Payment</h2>
              <p className="text-slate-600 leading-relaxed">
                Access to the service requires an active subscription. You agree to pay all fees 
                associated with your chosen plan. Subscriptions automatically renew unless cancelled 
                before the renewal date. We reserve the right to change pricing with 30 days notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Acceptable Use</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree not to use the service for any unlawful purpose or in any way that could 
                damage, disable, overburden, or impair our servers or networks. You may not attempt 
                to gain unauthorized access to any part of the service or accounts of other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Ownership</h2>
              <p className="text-slate-600 leading-relaxed">
                You retain ownership of all data you input into the system. We claim no ownership 
                over your customer records, billing data, or business information. You grant us a 
                limited license to host and process your data solely for the purpose of providing 
                the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We may terminate or suspend your account immediately for any violation of these terms. 
                Upon termination, your right to use the service will immediately cease. You may cancel 
                your subscription at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                In no event shall Water Billing System be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising out of or relating to your use 
                of the service. Our total liability shall not exceed the amount you paid for the 
                service in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will provide notice of 
                significant changes by posting the updated terms on our website or notifying you via 
                email. Continued use of the service after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
              <p className="text-slate-600 leading-relaxed">
                For questions about these terms, please contact us at support@waterbilling.com.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
