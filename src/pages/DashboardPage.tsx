import { useEffect, useState } from 'react'
import { Building2, CheckCircle, CreditCard, Mail, ShieldCheck, User } from 'lucide-react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const { user, company, subscription, setUser } = useAuthStore()
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false)

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

  const companyName = company?.company_name || user?.company_name || 'Your Company'
  const companyCode = company?.company_code || user?.company_code || 'Not available'
  const subscriptionStatus = subscription?.status || 'active'

  const details = [
    {
      icon: Building2,
      label: 'Company',
      value: companyName,
    },
    {
      icon: User,
      label: 'Account Owner',
      value: user?.full_name || 'Admin User',
    },
    {
      icon: Mail,
      label: 'Email',
      value: user?.email || company?.email || 'Not available',
    },
    {
      icon: CreditCard,
      label: 'Company Code',
      value: companyCode,
    },
    {
      icon: ShieldCheck,
      label: 'Role',
      value: user?.role || 'Admin',
    },
    {
      icon: CheckCircle,
      label: 'Subscription',
      value: subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1),
    },
  ]

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-50">
      <div className="container-main max-w-5xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 mb-4">
            <CheckCircle className="h-4 w-4" />
            Account setup complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Welcome, {user?.full_name || 'Admin'}
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            Your subscription is active. You can now manage your water billing account from this web dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {details.map((item) => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-500">{item.label}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 break-words">
                {isRefreshingProfile && item.value === 'Not available' ? 'Loading...' : item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">You're done</h2>
          <p className="text-slate-600">
            Your company account is ready. Keep this dashboard open for your account information and subscription status.
          </p>
        </div>
      </div>
    </div>
  )
}
