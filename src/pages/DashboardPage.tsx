import { useEffect, useState } from 'react'
import { Building2, CheckCircle, CreditCard, Mail, ShieldCheck, User } from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/lib/language/i18n'

export default function DashboardPage() {
  const { user, company, subscription, setUser } = useAuthStore()
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false)
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

  const companyName = company?.company_name || user?.company_name || t('dashboard.fallbackCompany')
  const companyCode = company?.company_code || user?.company_code || t('dashboard.notAvailable')
  const subscriptionStatus = subscription?.status || 'active'

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
      icon: CheckCircle,
      label: t('dashboard.details.subscription'),
      value: subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1),
    },
  ]

  return (
    <div className="pt-28 pb-16 min-h-screen bg-theme-bg-secondary">
      <div className="container-main max-w-5xl">
        <div className="mb-8">
          <div className="badge-success mb-4">
            <CheckCircle className="h-4 w-4" />
            {t('dashboard.setupComplete')}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-text-primary">
            {t('dashboard.welcome')}, {user?.full_name || t('dashboard.adminRole')}
          </h1>
          <p className="text-theme-text-secondary mt-3 max-w-2xl">
            {t('dashboard.subtitle')}
          </p>
        </div>

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
                {isRefreshingProfile && item.value === t('dashboard.notAvailable') ? t('dashboard.loading') : item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="surface-card p-6">
          <h2 className="text-xl font-bold text-theme-text-primary mb-3">{t('dashboard.doneTitle')}</h2>
          <p className="text-theme-text-secondary">
            {t('dashboard.doneText')}
          </p>
        </div>
      </div>
    </div>
  )
}
