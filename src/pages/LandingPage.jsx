import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { MovieRow } from '../components/MovieRow'
import { useLandingData } from '../hooks/useTmdbRows'

const HERO_FALLBACK = 'https://picsum.photos/seed/cinema/1920/1080'

export function LandingPage() {
  const { hero, trending, popularShows, newReleases, loading } = useLandingData()
  const heroImage = hero?.backdrop || HERO_FALLBACK

  return (
    <div className="min-h-screen">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={hero?.title || 'Hero'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-streaming-dark via-streaming-dark/80 to-streaming-dark/40" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4">
              {hero ? (
                <>
                  {hero.title}
                  <br />
                  <span className="text-streaming-accent">{hero.year ? `(${hero.year})` : 'Now Streaming'}</span>
                </>
              ) : (
                <>
                  Unlimited entertainment.
                  <br />
                  <span className="text-streaming-accent">Stream anywhere.</span>
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl line-clamp-3">
              {hero?.overview || 'Discover thousands of movies and shows. Watch on any device. Cancel anytime.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-lg bg-streaming-accent hover:bg-streaming-accent-hover font-semibold transition-all hover:scale-105 shadow-lg shadow-streaming-accent/20"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg glass hover:bg-white/20 font-semibold transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="py-12 md:py-16 -mt-20 relative z-20">
        <MovieRow title="Trending Movies" items={trending} loading={loading} />
        <MovieRow title="Popular Shows" items={popularShows} loading={loading} />
        <MovieRow title="New Releases" items={newReleases} loading={loading} />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-display font-bold text-lg">
            <span className="text-streaming-accent">Stream</span>Vault
          </span>
          <p className="text-sm text-white/60">© 2024 StreamVault. Premium entertainment platform.</p>
          <div className="flex gap-6">
            <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
