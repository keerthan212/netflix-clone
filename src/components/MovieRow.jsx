import { useRef } from 'react'

export function MovieRow({ title, items = [], loading = false }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const placeholderItems = Array.from({ length: 8 }, (_, i) => ({
    id: `placeholder-${title}-${i}`,
    title: `Content ${i + 1}`,
    image: `https://picsum.photos/seed/${title.replace(/\s/g, '')}${i}/300/450`,
    year: '2024',
  }))
  const displayItems = items.length ? items : placeholderItems

  return (
    <section className="group mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-display font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full glass hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full glass hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="group relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex-shrink-0 w-40 sm:w-48 md:w-56 snap-center">
                  <SkeletonCard />
                </div>
              ))
            : displayItems.map((item, index) => (
                <div
                  key={item?.id ?? index}
                  className="flex-shrink-0 w-40 sm:w-48 md:w-56 snap-center"
                >
                  <MovieCard item={item} />
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

const FALLBACK_POSTER = 'https://placehold.co/300x450/1a1a24/6b7280?text=No+Poster'

function MovieCard({ item }) {
  const poster = item?.image || FALLBACK_POSTER
  return (
    <div className="group/card relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/50">
      <div className="aspect-[2/3] bg-streaming-slate rounded-xl overflow-hidden">
        <img
          src={poster}
          alt={item?.title || 'Movie'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_POSTER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="font-medium text-sm line-clamp-2">{item?.title}</h3>
        <p className="text-xs text-white/70">{item?.year || ''}</p>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="aspect-[2/3] rounded-xl bg-streaming-slate animate-pulse overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-streaming-slate to-streaming-charcoal" />
    </div>
  )
}
