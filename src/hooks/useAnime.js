import { useState, useEffect } from 'react'
import animeService from '../services/animeService'

export const useHomePage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        setLoading(true)
        const homeData = await animeService.getHomePage()
        setData(homeData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHomePage()
  }, [])

  return { data, loading, error }
}

export const useAnimeDetail = (slug) => {
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await animeService.getAnimeDetail(slug)
        setAnime(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimeDetail()
  }, [slug])

  return { anime, loading, error }
}

export const useEpisodeDetail = (slug) => {
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await animeService.getEpisodeDetail(slug)
        setEpisode(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodeDetail()
  }, [slug])

  return { episode, loading, error }
}

export const useSchedule = () => {
  const [schedule, setSchedule] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true)
        const data = await animeService.getSchedule()
        setSchedule(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [])

  return { schedule, loading, error }
}
