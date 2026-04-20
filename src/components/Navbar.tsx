import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Droplets } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'

const publicNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
]

const authenticatedNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Subscription', href: '/subscription' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const showBg = scrolled || !isHome
  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks

  const handleSignOut = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?')
    if (!confirmed) return

    logout()
    navigate('/')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showBg
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/60'
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
              <span className={`font-bold text-lg tracking-tight transition-colors ${showBg ? 'text-slate-900' : 'text-white'}`}>
                WaterBilling
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? showBg ? 'text-brand-700 bg-brand-50' : 'text-white bg-white/15'
                      : showBg ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      showBg ? 'text-brand-700 bg-brand-50 hover:bg-brand-100' : 'text-white bg-white/15 hover:bg-white/20'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <span className={`text-sm font-medium ${showBg ? 'text-slate-600' : 'text-white/80'}`}>
                    {user?.full_name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      showBg ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      showBg ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary text-sm py-2.5">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                showBg ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
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
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.href
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-3 rounded-xl text-sm font-medium text-brand-700 bg-brand-50">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                      Sign In
                    </Link>
                    <Link to="/signup" className="block px-4 py-3 rounded-xl text-sm font-semibold text-center text-white bg-brand-600 hover:bg-brand-700">
                      Get Started
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
