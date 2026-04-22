import { Link } from 'react-router-dom'
import { Droplets, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/language/i18n'

const footerLinks = {
  product: [
    { labelKey: 'nav.features', href: '/features' },
    { labelKey: 'nav.pricing', href: '/pricing' },
  ],
  company: [
    { labelKey: 'nav.about', href: '/about' },
  ],
  legal: [
    { labelKey: 'nav.termsOfService', href: '/terms' },
    { labelKey: 'nav.privacyPolicy', href: '/privacy' },
    { labelKey: 'nav.subscriptionPolicy', href: '/subscription-policy' },
  ],
}

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-theme-bg-secondary text-theme-text-secondary border-t border-theme-border">
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-water-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-theme-text-primary">WaterBilling</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-3.5 h-3.5 text-theme-text-muted" />
                <span>puttyvireakmeas@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-3.5 h-3.5 text-theme-text-muted" />
                <span>+855 968 087 133</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-3.5 h-3.5 text-theme-text-muted" />
                <span>{t('footer.location')}</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-theme-text-primary text-sm mb-3">
                {t(`footer.sections.${title}`)}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-theme-text-primary transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Water Billing System. {t('footer.copyright')}
          </p>
          <p className="text-sm text-theme-text-muted">
            {t('footer.builtFor')}
          </p>
        </div>
      </div>
    </footer>
  )
}
