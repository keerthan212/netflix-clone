const TMDB_BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

const getApiKey = () => import.meta.env.VITE_TMDB_API_KEY

export function getPosterUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export function getBackdropUrl(path, size = 'original') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

async function fetchTmdb(endpoint) {
  const apiKey = getApiKey()
  if (!apiKey) {
    console.warn('VITE_TMDB_API_KEY is not set. Add it to .env')
    return { results: [] }
  }
  const url = `${TMDB_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${apiKey}&language=en-US`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`)
  return res.json()
}

export async function getTrendingMovies() {
  const data = await fetchTmdb('/trending/movie/day')
  return (data.results || []).map(normalizeMovie)
}

export async function getTrendingTv() {
  const data = await fetchTmdb('/trending/tv/day')
  return (data.results || []).map(normalizeTv)
}

export async function getPopularMovies() {
  const data = await fetchTmdb('/movie/popular')
  return (data.results || []).map(normalizeMovie)
}

export async function getPopularTv() {
  const data = await fetchTmdb('/tv/popular')
  return (data.results || []).map(normalizeTv)
}

export async function getNowPlayingMovies() {
  const data = await fetchTmdb('/movie/now_playing')
  return (data.results || []).map(normalizeMovie)
}

export async function getTopRatedMovies() {
  const data = await fetchTmdb('/movie/top_rated')
  return (data.results || []).map(normalizeMovie)
}

export async function getUpcomingMovies() {
  const data = await fetchTmdb('/movie/upcoming')
  return (data.results || []).map(normalizeMovie)
}

export async function getDiscoverMovies(genreId) {
  const data = await fetchTmdb(`/discover/movie?with_genres=${genreId}`)
  return (data.results || []).map(normalizeMovie)
}

function normalizeMovie(m) {
  return {
    id: m.id,
    title: m.title,
    image: getPosterUrl(m.poster_path),
    backdrop: getBackdropUrl(m.backdrop_path),
    year: m.release_date ? m.release_date.slice(0, 4) : '',
    overview: m.overview,
    rating: m.vote_average,
  }
}

function normalizeTv(t) {
  return {
    id: t.id,
    title: t.name,
    image: getPosterUrl(t.poster_path),
    backdrop: getBackdropUrl(t.backdrop_path),
    year: t.first_air_date ? t.first_air_date.slice(0, 4) : '',
    overview: t.overview,
    rating: t.vote_average,
  }
}
