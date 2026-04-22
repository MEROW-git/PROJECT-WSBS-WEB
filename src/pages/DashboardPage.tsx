import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Building2, CheckCircle, CreditCard, Mail, ShieldCheck, User } from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/lib/language/i18n'

export default function DashboardPage() {
  const { user, company, subscription, setUser, setSubscription } = useAuthStore()
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false)
  const [isRefreshingSubscription, setIsRefreshingSubscription] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const refreshProfile = async () => {
      if (user?.email && user?.company_code) return

      setIsRefreshingProfile(true)
      const res = await api.me()
      setIsRefreshingProfile(false)

      if (res.success && res.data) {
        setUser(res.data)
      }
    }

    refreshProfile()
  }, [setUser, user?.company_code, user?.email])

  useEffect(() => {
    const refreshSubscription = async () => {
      setIsRefreshingSubscription(true)
      const res = await api.getMySubscription()
      setIsRefreshingSubscription(false)

      setSubscription(res.success && res.data ? res.data : null)
    }

    refreshSubscription()
  }, [setSubscription])

  const companyName = company?.company_name || user?.company_name || t('dashboard.fallbackCompany')
  const companyCode = company?.company_code || user?.company_code || t('dashboard.notAvailable')
  const hasSubscription = Boolean(subscription)
  const subscriptionStatus = subscription
    ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
    : t('dashboard.noSubscription.status')

  const details = [
    {
      icon: Building2,
      label: t('dashboard.details.company'),
      value: companyName,
    },
    {
      icon: User,
      label: t('dashboard.details.owner'),
      value: user?.full_name || t('dashboard.adminUser'),
    },
    {
      icon: Mail,
      label: t('dashboard.details.email'),
      value: user?.email || company?.email || t('dashboard.notAvailable'),
    },
    {
      icon: CreditCard,
      label: t('dashboard.details.companyCode'),
      value: companyCode,
    },
    {
      icon: ShieldCheck,
      label: t('dashboard.details.role'),
      value: user?.role || t('dashboard.adminRole'),
    },
    {
      icon: hasSubscription ? CheckCircle : AlertTriangle,
      label: t('dashboard.details.subscription'),
      value: subscriptionStatus,
    },
  ]

  return (
    <div className="pt-28 pb-16 min-h-screen bg-theme-bg-secondary">
      <div className="container-main max-w-5xl">
        <div className="mb-8">
          <div className={`mb-4 w-fit ${hasSubscription ? 'badge-success' : 'inline-flex items-center gap-2 rounded-full bg-theme-warning/15 px-3 py-1.5 text-sm font-semibold text-theme-warning'}`}>
            {hasSubscription ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            {hasSubscription ? t('dashboard.setupComplete') : t('dashboard.noSubscription.badge')}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-text-primary">
            {t('dashboard.welcome')}, {user?.full_name || t('dashboard.adminRole')}
          </h1>
          <p className="text-theme-text-secondary mt-3 max-w-2xl">
            {hasSubscription ? t('dashboard.subtitle') : t('dashboard.noSubscription.subtitle')}
          </p>
        </div>

        {!hasSubscription && !isRefreshingSubscription && (
          <div className="mb-8 rounded-2xl border border-theme-warning/30 bg-theme-warning/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-theme-warning/15 text-theme-warning flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-theme-text-primary">{t('dashboard.noSubscription.title')}</h2>
                  <p className="mt-1 text-sm text-theme-text-secondary">{t('dashboard.noSubscription.text')}</p>
                </div>
              </div>
              <Link to="/subscription" className="btn-primary shrink-0">
                {t('dashboard.noSubscription.action')}
              </Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {details.map((item) => (
            <div key={item.label} className="surface-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-theme-text-muted">{item.label}</span>
              </div>
              <div className="text-lg font-bold text-theme-text-primary break-words">
                {(isRefreshingProfile || isRefreshingSubscription) && item.value === t('dashboard.notAvailable')
                  ? t('dashboard.loading')
                  : item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="surface-card p-6">
          <h2 className="text-xl font-bold text-theme-text-primary mb-3">
            {hasSubscription ? t('dashboard.doneTitle') : t('dashboard.noSubscription.panelTitle')}
          </h2>
          <p className="text-theme-text-secondary">
            {hasSubscription ? t('dashboard.doneText') : t('dashboard.noSubscription.panelText')}
          </p>
        </div>
      </div>
    </div>
  )
}
