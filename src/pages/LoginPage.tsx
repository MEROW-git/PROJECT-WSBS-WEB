import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [companyCode, setCompanyCode] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!companyCode || !username || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    const res = await api.login({
      company_code: companyCode.trim(),
      username: username.trim(),
      password,
    })
    setLoading(false)

    if (res.success && res.data) {
      login(res.data.token, res.data.user)
      navigate('/onboarding')
    } else {
      setError(res.error?.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-water-500 flex items-center justify-center shadow-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">WaterBilling</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your company account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Code</label>
              <input
                type="text"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                placeholder="e.g. WATER01"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username or Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button className="text-sm text-brand-600 hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-primary justify-center disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
