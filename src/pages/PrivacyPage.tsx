import AnimatedSection from '@/components/AnimatedSection'
import { useTranslation } from '@/lib/language/i18n'

const privacySections = Array.from({ length: 8 }, (_, index) => index + 1)

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="pt-28 pb-16 bg-theme-bg">
      <div className="container-main max-w-4xl">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-text-primary mb-4">{t('legal.privacy.title')}</h1>
          <p className="text-theme-text-muted mb-10">{t('legal.lastUpdated')}</p>

          <div className="max-w-none">
            {privacySections.map((section) => (
              <section key={section} className={section === privacySections.length ? '' : 'mb-8'}>
                <h2 className="text-xl font-bold text-theme-text-primary mb-3">
                  {t(`legal.privacy.sections.${section}.title`)}
                </h2>
                <p className="text-theme-text-secondary leading-relaxed">
                  {t(`legal.privacy.sections.${section}.text`)}
                </p>
              </section>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
