import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Navbar({ variant = 'landing', transparent = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const navClass = transparent
    ? 'absolute top-0 left-0 right-0 z-50 glass-dark'
    : 'bg-streaming-charcoal/95 backdrop-blur-md border-b border-white/5'

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`${navClass} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-display font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            <span className="text-streaming-accent">Stream</span>
            <span>Vault</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full ring-2 ring-white/20"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-streaming-accent hover:bg-streaming-accent-hover transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in border-t border-white/10">
            <div className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white"
                  >
                    Home
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg bg-streaming-accent hover:bg-streaming-accent-hover text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
