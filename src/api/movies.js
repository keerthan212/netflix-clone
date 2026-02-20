// Free Movie API using sampleapis.com
const BASE_URL = 'https://api.sampleapis.com/movies'

// Available categories from sampleapis.com
const CATEGORIES = {
  action: 'action',
  animation: 'animation',
  classic: 'classic',
  comedy: 'comedy',
  drama: 'drama',
  horror: 'horror',
  family: 'family',
  mystery: 'mystery',
  scifi: 'scifi',
  western: 'western',
}

async function fetchMovies(category) {
  try {
    const url = `${BASE_URL}/${category}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    if (!res.ok) {
      console.warn(`Failed to fetch ${category}: ${res.status}`)
      return []
    }
    const data = await res.json()
    
    // Handle different response formats
    let movies = []
    if (Array.isArray(data)) {
      movies = data
    } else if (data && Array.isArray(data.results)) {
      movies = data.results
    } else if (data && Array.isArray(data.movies)) {
      movies = data.movies
    } else if (data && typeof data === 'object') {
      // Try to find any array property
      const arrayKeys = Object.keys(data).filter(key => Array.isArray(data[key]))
      if (arrayKeys.length > 0) {
        movies = data[arrayKeys[0]]
      }
    }
    
    // Log for debugging
    if (movies.length === 0) {
      console.warn(`No movies found for category: ${category}`, data)
    } else {
      console.log(`Fetched ${movies.length} movies from ${category}`)
    }
    
    return movies
  } catch (error) {
    console.error(`Error fetching ${category}:`, error)
    return []
  }
}

const FALLBACK_POSTER = 'https://placehold.co/300x450/1a1a24/6b7280?text=No+Poster'

function normalizeMovie(m) {
  if (!m) return null
  
  // Extract poster URL from various possible fields (sampleapis.com uses 'posterURLs')
  let posterUrl = null
  
  // Check for posterURLs object (common in sampleapis.com)
  if (m.posterURLs) {
    if (typeof m.posterURLs === 'string' && m.posterURLs.startsWith('http')) {
      posterUrl = m.posterURLs
    } else if (typeof m.posterURLs === 'object') {
      posterUrl = m.posterURLs.original || m.posterURLs.large || m.posterURLs.medium || 
                  m.posterURLs.small || m.posterURLs.thumbnail || 
                  (Object.values(m.posterURLs).find(url => typeof url === 'string' && url.startsWith('http')))
    }
  }
  
  // Check for poster object (similar structure)
  if (!posterUrl && m.poster && typeof m.poster === 'object') {
    posterUrl = m.poster.original || m.poster.large || m.poster.medium || 
                Object.values(m.poster).find(url => typeof url === 'string' && url.startsWith('http'))
  }
  
  // Fallback to other common string fields
  if (!posterUrl) {
    const stringFields = ['poster', 'posterURL', 'image', 'posterPath', 'coverImage', 'thumbnail', 'img', 'photo']
    for (const field of stringFields) {
      if (m[field] && typeof m[field] === 'string' && m[field].startsWith('http')) {
        posterUrl = m[field]
        break
      }
    }
  }
  
  // Ensure we have a valid URL (starts with http)
  if (posterUrl && !posterUrl.startsWith('http')) {
    posterUrl = null
  }
  
  // Extract year from various formats
  let year = ''
  if (m.year) {
    year = String(m.year)
  } else if (m.releaseDate) {
    const date = new Date(m.releaseDate)
    if (!isNaN(date.getTime())) {
      year = String(date.getFullYear())
    }
  } else if (m.released) {
    const date = new Date(m.released)
    if (!isNaN(date.getTime())) {
      year = String(date.getFullYear())
    }
  } else if (m.releaseYear) {
    year = String(m.releaseYear)
  }
  
  return {
    id: m.id || m.imdbID || `movie-${Math.random().toString(36).substr(2, 9)}`,
    title: m.title || m.name || 'Unknown Title',
    image: posterUrl || FALLBACK_POSTER,
    backdrop: m.backdrop || m.backdropURL || m.backdropPath || m.backdropURLs?.original || posterUrl || FALLBACK_POSTER,
    year: year,
    overview: m.plot || m.description || m.overview || m.synopsis || '',
    rating: m.rating || m.imdbRating || m.voteAverage || null,
  }
}

// Helper to get action movies as fallback
async function getActionMovies() {
  const movies = await fetchMovies(CATEGORIES.action)
  return movies.map(normalizeMovie).filter(Boolean)
}

// Export functions matching the TMDB API structure
// Using action API as primary source, with other categories for variety
export async function getTrendingMovies() {
  const [action, ghibli] = await Promise.all([getActionMovies(), getGhibliFilms()])
  // Merge: Ghibli films first, then action movies (dedupe by id)
  const seen = new Set()
  const merged = []
  for (const item of [...ghibli, ...action]) {
    if (item && item.id && !seen.has(item.id)) {
      seen.add(item.id)
      merged.push(item)
    }
  }
  return merged.length > 0 ? merged : getActionMovies()
}

export async function getTrendingTv() {
  // Try drama first, fallback to action
  const movies = await fetchMovies(CATEGORIES.drama)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getPopularMovies() {
  // Try comedy first, fallback to action
  const movies = await fetchMovies(CATEGORIES.comedy)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getPopularTv() {
  // Try family first, fallback to action
  const movies = await fetchMovies(CATEGORIES.family)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getNowPlayingMovies() {
  // New Releases: use Studio Ghibli films; fallback to scifi/action
  const ghibli = await getGhibliFilms()
  if (ghibli.length > 0) return ghibli
  const movies = await fetchMovies(CATEGORIES.scifi)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getTopRatedMovies() {
  // Try classic first, fallback to action
  const movies = await fetchMovies(CATEGORIES.classic)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getUpcomingMovies() {
  // Try mystery first, fallback to action
  const movies = await fetchMovies(CATEGORIES.mystery)
  return movies.length > 0 ? movies.map(normalizeMovie).filter(Boolean) : getActionMovies()
}

export async function getDiscoverMovies(genreId) {
  // Map genre IDs to categories
  // 28 = Action, 35 = Comedy, etc.
  const categoryMap = {
    28: CATEGORIES.action,
    35: CATEGORIES.comedy,
    18: CATEGORIES.drama,
    27: CATEGORIES.horror,
    878: CATEGORIES.scifi,
    37: CATEGORIES.western,
  }
  const category = categoryMap[genreId] || CATEGORIES.action
  const movies = await fetchMovies(category)
  return movies.map(normalizeMovie).filter(Boolean)
}

// Studio Ghibli API - https://ghibliapi.vercel.app/films
const GHIBLI_URL = 'https://ghibliapi.vercel.app/films'

async function fetchGhibliFilms() {
  try {
    const res = await fetch(GHIBLI_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      console.warn(`Ghibli API error: ${res.status}`)
      return []
    }
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching Ghibli films:', error)
    return []
  }
}

function normalizeGhibliFilm(film) {
  if (!film) return null
  return {
    id: film.id || `ghibli-${Math.random().toString(36).substr(2, 9)}`,
    title: film.title || film.original_title || 'Unknown',
    image: film.image && film.image.startsWith('http') ? film.image : FALLBACK_POSTER,
    backdrop: film.movie_banner && film.movie_banner.startsWith('http') ? film.movie_banner : (film.image || FALLBACK_POSTER),
    year: film.release_date || '',
    overview: film.description || '',
    rating: film.rt_score ? Number(film.rt_score) : null,
  }
}

/** Returns Studio Ghibli films for New Releases section */
export async function getGhibliFilms() {
  const films = await fetchGhibliFilms()
  return films.map(normalizeGhibliFilm).filter(Boolean)
}

// Helper functions for image URLs (kept for compatibility)
export function getPosterUrl(path) {
  return path || null
}

export function getBackdropUrl(path) {
  return path || null
}
