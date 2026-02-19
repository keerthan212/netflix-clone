import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const success = login(email, password)
      setIsSubmitting(false)
      if (success) {
        navigate(from, { replace: true })
      } else {
        setErrors({ password: 'Invalid credentials. Use at least 6 characters for password.' })
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/login/1920/1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-streaming-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-streaming-accent/5 via-transparent to-streaming-dark" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
        {/* Glass Card */}
        <div className="glass rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block font-display font-bold text-2xl mb-2">
              <span className="text-streaming-accent">Stream</span>Vault
            </Link>
            <h1 className="text-2xl font-display font-semibold">Welcome back</h1>
            <p className="text-white/70 text-sm mt-1">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors((prev) => ({ ...prev, email: '' }))
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-streaming-accent focus:border-transparent transition-all`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: '' }))
                  }}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-streaming-accent focus:border-transparent transition-all`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-lg bg-streaming-accent hover:bg-streaming-accent-hover font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Demo: Use any valid email and a password with 6+ characters.
          </p>
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
