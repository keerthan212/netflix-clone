import { Navbar } from '../components/Navbar'
import { MovieRow } from '../components/MovieRow'
import { useDashboardData } from '../hooks/useTmdbRows'

const FEATURED_FALLBACK = 'https://picsum.photos/seed/featured/1920/600'

export function Dashboard() {
  const { featured, continueWatching, trending, popular, action, comedies, loading } = useDashboardData()
  const heroImage = featured?.backdrop || FEATURED_FALLBACK

  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />

      {/* Hero Featured */}
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[55vh]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={featured?.title || 'Featured'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-streaming-dark via-streaming-dark/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="max-w-xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">
              {featured?.title || 'Continue Watching'}
            </h1>
            <p className="text-white/80 mb-4 line-clamp-2">{featured?.overview || 'Pick up right where you left off'}</p>
            <button className="px-6 py-3 rounded-lg bg-white text-streaming-dark font-semibold hover:bg-white/90 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <section className="py-8 md:py-12 -mt-8 relative z-10">
        <MovieRow title="Continue Watching" items={continueWatching} loading={loading} />
        <MovieRow title="Trending Now" items={trending} loading={loading} />
        <MovieRow title="Popular on StreamVault" items={popular} loading={loading} />
        <MovieRow title="Action & Adventure" items={action} loading={loading} />
        <MovieRow title="Comedies" items={comedies} loading={loading} />
      </section>
    </div>
  )
}
