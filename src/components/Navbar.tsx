import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Droplets, Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { useTheme } from '@/lib/theme'
import { type LanguageCode, useLanguage, useTranslation } from '@/lib/language/i18n'

const publicNavLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.features', href: '/features' },
  { labelKey: 'nav.pricing', href: '/pricing' },
]

const authenticatedNavLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.features', href: '/features' },
  { labelKey: 'nav.subscription', href: '/subscription' },
]

const legalLinks = [
  { labelKey: 'nav.termsOfService', href: '/terms' },
  { labelKey: 'nav.privacyPolicy', href: '/privacy' },
  { labelKey: 'nav.subscriptionPolicy', href: '/subscription-policy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()
  const { theme, toggleTheme } = useTheme()
  const { options: languageOptions, language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setLegalOpen(false)
    setLanguageOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!languageOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [languageOpen])

  const isHome = location.pathname === '/'
  const showBg = scrolled || !isHome
  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks
  const legalActive = legalLinks.some((link) => link.href === location.pathname)

  const navItemClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active
        ? showBg
          ? 'text-theme-primary bg-theme-primary/10'
          : 'text-white bg-white/15'
        : showBg
          ? 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover'
          : 'text-white/80 hover:text-white hover:bg-white/10'
    }`

  const iconButtonClass = `h-10 w-10 rounded-lg transition-all inline-flex items-center justify-center ${
    showBg
      ? 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover'
      : 'text-white/80 hover:text-white hover:bg-white/10'
  }`

  const handleSignOut = () => {
    const confirmed = window.confirm(t('common.signOut', 'Sign Out'))
    if (!confirmed) return

    logout()
    navigate('/')
  }

  const compactControlClass = `h-9 rounded-lg border px-3 text-sm font-semibold outline-none transition-all ${
    showBg
      ? 'border-theme-border/80 bg-transparent text-theme-text-secondary hover:border-theme-primary/30 hover:bg-theme-surface-hover hover:text-theme-text-primary'
      : 'border-white/15 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white'
  }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showBg
            ? 'bg-theme-surface/90 backdrop-blur-xl shadow-sm border-b border-theme-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-water-500 flex items-center justify-center shadow-lg shadow-brand-600/25 group-hover:shadow-brand-600/40 transition-shadow">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-lg tracking-tight transition-colors ${showBg ? 'text-theme-text-primary' : 'text-white'}`}>
                WaterBilling
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={navItemClass(location.pathname === link.href)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setLegalOpen(true)}
                onMouseLeave={() => setLegalOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setLegalOpen((open) => !open)}
                  className={`${navItemClass(legalActive)} inline-flex items-center gap-1`}
                >
                  {t('common.legal')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${legalOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {legalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-theme-border bg-theme-elevated p-2 shadow-theme"
                    >
                      {legalLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            location.pathname === link.href
                              ? 'bg-theme-primary/10 text-theme-primary'
                              : 'text-theme-text-secondary hover:bg-theme-surface-hover hover:text-theme-text-primary'
                          }`}
                        >
                          {t(link.labelKey)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div
                ref={languageMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setLanguageOpen((open) => !open)}
                  className={`${compactControlClass} inline-flex items-center gap-2`}
                  aria-label={t('common.language', 'Language')}
                  aria-expanded={languageOpen}
                >
                  <Languages className="h-4 w-4" />
                  <span>{languageOptions.find((option) => option.code === language)?.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-theme-border bg-theme-elevated p-2 shadow-theme"
                    >
                      {languageOptions.map((option) => (
                        <button
                          key={option.code}
                          type="button"
                          onClick={() => {
                            setLanguage(option.code as LanguageCode)
                            setLanguageOpen(false)
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                            language === option.code
                              ? 'bg-theme-primary/10 text-theme-primary'
                              : 'text-theme-text-secondary hover:bg-theme-surface-hover hover:text-theme-text-primary'
                          }`}
                        >
                          <span>{option.label}</span>
                          {language === option.code && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className={iconButtonClass}
                aria-label={theme === 'dark' ? t('common.switchToLight') : t('common.switchToDark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className={`text-sm font-semibold px-3.5 py-2 rounded-lg transition-all ${
                      showBg
                        ? 'text-theme-primary bg-transparent hover:bg-theme-primary/10'
                        : 'text-white/90 bg-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t('common.dashboard')}
                  </Link>
                  <span className={`text-sm font-medium ${showBg ? 'text-theme-text-secondary' : 'text-white/80'}`}>
                    {user?.full_name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      showBg ? 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {t('common.signOut')}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      showBg ? 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t('common.signIn')}
                  </Link>
                  <Link to="/signup" className="btn-primary text-sm py-2.5">
                    {t('common.getStarted')}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                showBg ? 'text-theme-text-secondary hover:bg-theme-surface-hover' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-theme-surface border-b border-theme-border shadow-theme md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.href
                      ? 'text-theme-primary bg-theme-primary/10'
                      : 'text-theme-text-secondary hover:bg-theme-surface-hover'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-theme-text-muted">
                {t('common.legal')}
              </div>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.href
                      ? 'text-theme-primary bg-theme-primary/10'
                      : 'text-theme-text-secondary hover:bg-theme-surface-hover'
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="pt-3 border-t border-theme-border space-y-2">
                <div className="px-4 py-2">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-theme-text-muted">
                    {t('common.language', 'Language')}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => setLanguage(option.code)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                          language === option.code
                            ? 'bg-theme-primary text-white'
                            : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-surface-hover'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-theme-text-secondary hover:bg-theme-surface-hover flex items-center justify-between"
                >
                  <span>{theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}</span>
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-3 rounded-xl text-sm font-medium text-theme-primary bg-theme-primary/10">
                      {t('common.dashboard')}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      {t('common.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-3 rounded-xl text-sm font-medium text-theme-text-secondary hover:bg-theme-surface-hover">
                      {t('common.signIn')}
                    </Link>
                    <Link to="/signup" className="block px-4 py-3 rounded-xl text-sm font-semibold text-center text-white bg-brand-600 hover:bg-brand-700">
                      {t('common.getStarted')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
