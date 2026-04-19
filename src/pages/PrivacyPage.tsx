import AnimatedSection from '@/components/AnimatedSection'

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container-main max-w-4xl">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-10">Last updated: January 1, 2025</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed">
                We collect information you provide directly to us when registering for an account, 
                including your company name, administrator name, email address, phone number, and 
                password. We also collect data you input into the system such as customer records, 
                meter information, billing data, and payment records.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed">
                We use your information to provide, maintain, and improve our services. This includes 
                processing transactions, generating bills, sending email notifications, providing 
                customer support, and ensuring the security of your account. We do not sell your 
                personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Storage and Security</h2>
              <p className="text-slate-600 leading-relaxed">
                Your data is stored on secure cloud servers with industry-standard encryption. 
                We implement appropriate technical and organizational measures to protect your data 
                against unauthorized access, alteration, disclosure, or destruction. All data 
                transmission occurs over HTTPS encrypted connections.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Email Communications</h2>
              <p className="text-slate-600 leading-relaxed">
                We send transactional emails including account verification, password resets, billing 
                notifications, and system alerts. You may also receive optional marketing 
                communications which you can opt out of at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed">
                We may use third-party service providers for hosting, payment processing, and email 
                delivery. These providers have access to your information only to perform specific 
                tasks on our behalf and are obligated not to disclose or use it for other purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed">
                We retain your data for as long as your account is active or as needed to provide 
                services. If you cancel your subscription, we will retain your data for 30 days to 
                allow for account reactivation, after which it will be permanently deleted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may 
                also request a copy of your data or ask us to restrict certain processing activities. 
                Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at 
                privacy@waterbilling.com.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
