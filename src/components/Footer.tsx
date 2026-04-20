import { Link } from 'react-router-dom'
import { Droplets, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Subscription Policy', href: '/subscription-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-water-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-white">WaterBilling</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
              Professional water billing management system for utility companies. 
              Streamline operations, track meters, generate bills, and grow your business.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>puttyvireakmeas@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>+855 968 087 133</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Phnom Penh, Cambodia</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white text-sm mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Water Billing System. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for utility companies.
          </p>
        </div>
      </div>
    </footer>
  )
}