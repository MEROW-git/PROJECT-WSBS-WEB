import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Building2, CalendarDays, CheckCircle, CreditCard, Download, Mail, MonitorDown, ShieldCheck, Smartphone, User, Users } from 'lucide-react'
import { appDownloadsConfig } from '@/config/appDownloads'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/lib/language/i18n'

export default function DashboardPage() {
  const { user, company, subscription, setUser, setSubscription } = useAuthStore()
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false)
  const [isRefreshingSubscription, setIsRefreshingSubscription] = useState(false)
  const [isRefreshingStats, setIsRefreshingStats] = useState(false)
  const [accountStats, setAccountStats] = useState<{ customers: number | null; staff: number | null }>({
    customers: null,
    staff: null,
  })
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

  useEffect(() => {
    const refreshStats = async () => {
      setIsRefreshingStats(true)
      const [customersRes, usersRes] = await Promise.all([
        api.getCustomers(1, 1),
        api.getUsers(1, 1),
      ])
      setIsRefreshingStats(false)

      setAccountStats({
        customers: customersRes.success ? customersRes.pagination?.total ?? 0 : null,
        staff: usersRes.success ? usersRes.pagination?.total ?? 0 : null,
      })
    }

    refreshStats()
  }, [])

  const companyName = company?.company_name || user?.company_name || t('dashboard.fallbackCompany')
  const companyCode = company?.company_code || user?.company_code || t('dashboard.notAvailable')
  const hasSubscription = Boolean(subscription)
  const canDownloadApps = subscription?.status === 'active'
  const subscriptionStatus = subscription
    ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
    : t('dashboard.noSubscription.status')
  const formatDate = (value?: string) => {
    if (!value) return t('dashboard.notAvailable')

    return new Intl.DateTimeFormat(document.documentElement.lang === 'kh' ? 'km-KH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(`${value}T00:00:00`))
  }

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
    {
      icon: Users,
      label: t('dashboard.details.customers'),
      value: accountStats.customers === null ? t('dashboard.notAvailable') : accountStats.customers.toLocaleString(),
    },
    {
      icon: User,
      label: t('dashboard.details.staff'),
      value: accountStats.staff === null ? t('dashboard.notAvailable') : accountStats.staff.toLocaleString(),
    },
    {
      icon: CalendarDays,
      label: t('dashboard.details.subscriptionStart'),
      value: formatDate(subscription?.start_date),
    },
    {
      icon: CalendarDays,
      label: t('dashboard.details.subscriptionEnd'),
      value: formatDate(subscription?.end_date),
    },
  ]
  const downloadLinks = [
    {
      icon: MonitorDown,
      title: t('dashboard.downloads.desktopTitle'),
      text: t('dashboard.downloads.desktopText'),
      action: t('dashboard.downloads.desktopAction'),
      url: appDownloadsConfig.desktop.url,
    },
    {
      icon: Smartphone,
      title: t('dashboard.downloads.mobileTitle'),
      text: t('dashboard.downloads.mobileText'),
      action: t('dashboard.downloads.mobileAction'),
      url: appDownloadsConfig.mobile.url,
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
                {(isRefreshingProfile || isRefreshingSubscription || isRefreshingStats) && item.value === t('dashboard.notAvailable')
                  ? t('dashboard.loading')
                  : item.value}
              </div>
            </div>
          ))}
        </div>

        {canDownloadApps && (
          <div className="surface-card p-6 mb-8">
            <div className="flex items-start gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center flex-shrink-0">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-theme-text-primary">{t('dashboard.downloads.title')}</h2>
                <p className="mt-1 text-theme-text-secondary">{t('dashboard.downloads.text')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {downloadLinks.map((item) => (
                <div key={item.title} className="rounded-xl border border-theme-border bg-theme-bg-tertiary p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-theme-text-primary">{item.title}</h3>
                      <p className="mt-1 text-sm text-theme-text-secondary">{item.text}</p>
                      {item.url ? (
                        <a
                          href={item.url}
                          className="btn-primary mt-4 w-fit"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.action}
                        </a>
                      ) : (
                        <div className="mt-4 inline-flex rounded-lg border border-theme-border px-4 py-2 text-sm font-semibold text-theme-text-muted">
                          {t('dashboard.downloads.notConfigured')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
