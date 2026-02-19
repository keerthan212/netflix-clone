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
} from '../api/tmdb'

const PLACEHOLDER_POSTER = 'https://placehold.co/300x450/1a1a24/6b7280?text=No+Poster'

function withPlaceholder(items) {
  return items.map((item) => ({
    ...item,
    image: item.image || PLACEHOLDER_POSTER,
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
        const hero = trending[0] || nowPlaying[0]
        setData({
          trending: withPlaceholder(trending),
          popularShows: withPlaceholder(popularTv),
          newReleases: withPlaceholder(nowPlaying),
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
        const featured = trending[0] || popular[0]
        setData({
          featured,
          continueWatching: withPlaceholder(trending.slice(0, 8)),
          trending: withPlaceholder(trending),
          popular: withPlaceholder(popular),
          action: withPlaceholder(action),
          comedies: withPlaceholder(comedies),
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
