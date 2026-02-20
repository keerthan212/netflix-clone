import { useState, useEffect } from 'react'
import {
  getTrendingMovies,
  getTrendingTv,
  getPopularMovies,
  getPopularTv,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
} from '../api/movies'

const PLACEHOLDER_POSTER = 'https://placehold.co/300x450/1a1a24/6b7280?text=No+Poster'

function withPlaceholder(items) {
  return items.map((item) => ({
    ...item,
    image: item.image || PLACEHOLDER_POSTER,
  }))
}

function getPlaceholderItems(seed, count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${seed}-${i}`,
    title: `Content ${i + 1}`,
    image: `https://picsum.photos/seed/${seed}${i}/300/450`,
    year: '2024',
  }))
}

export function useLandingData() {
  const [data, setData] = useState({
    trending: [],
    popularShows: [],
    newReleases: [],
    hero: null,
    loading: true,
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [trending, popularTv, nowPlaying] = await Promise.all([
          getTrendingMovies(),
          getPopularTv(),
          getNowPlayingMovies(),
        ])
        if (cancelled) return
        const hero = trending[0] || nowPlaying[0] || {
          title: 'Unlimited entertainment.',
          backdrop: 'https://picsum.photos/seed/cinema/1920/1080',
          overview: 'Discover thousands of movies and shows. Watch on any device.',
          year: '',
        }
        setData({
          trending: trending.length > 0 ? withPlaceholder(trending) : getPlaceholderItems('trending'),
          popularShows: popularTv.length > 0 ? withPlaceholder(popularTv) : getPlaceholderItems('popular'),
          newReleases: nowPlaying.length > 0 ? withPlaceholder(nowPlaying) : getPlaceholderItems('new'),
          hero,
          loading: false,
        })
      } catch (e) {
        if (!cancelled) setData((d) => ({ ...d, loading: false }))
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return data
}

export function useDashboardData() {
  const [data, setData] = useState({
    featured: null,
    continueWatching: [],
    trending: [],
    popular: [],
    action: [],
    comedies: [],
    loading: true,
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [trending, popular, topRated, action, comedies] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getDiscoverMovies(28), // Action
          getDiscoverMovies(35), // Comedy
        ])
        if (cancelled) return
        const featured = trending[0] || popular[0] || {
          title: 'Continue Watching',
          backdrop: 'https://picsum.photos/seed/featured/1920/600',
          overview: 'Pick up right where you left off',
        }
        const fallback = (arr, seed) => arr.length > 0 ? withPlaceholder(arr) : getPlaceholderItems(seed)
        setData({
          featured,
          continueWatching: trending.length > 0 ? withPlaceholder(trending.slice(0, 8)) : getPlaceholderItems('continue'),
          trending: trending.length > 0 ? withPlaceholder(trending) : getPlaceholderItems('trending'),
          popular: popular.length > 0 ? withPlaceholder(popular) : getPlaceholderItems('popular'),
          action: action.length > 0 ? withPlaceholder(action) : getPlaceholderItems('action'),
          comedies: comedies.length > 0 ? withPlaceholder(comedies) : getPlaceholderItems('comedies'),
          loading: false,
        })
      } catch (e) {
        if (!cancelled) setData((d) => ({ ...d, loading: false }))
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return data
}
