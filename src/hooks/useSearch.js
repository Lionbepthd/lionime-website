import { useState, useEffect } from 'react'
import animeService from '../services/animeService'
import { debounce } from '../utils/helpers'

export const useAnimeSearch = (keyword, page = 1) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([])
      return
    }

    const searchAnime = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await animeService.searchAnime(keyword, page)
        setResults(prev => page === 1 ? data.results : [...prev, ...data.results])
        setHasMore(data.hasMore || false)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(searchAnime, 500)
    return () => clearTimeout(timeoutId)
  }, [keyword, page])

  return { results, loading, error, hasMore }
}

export const useQuickSearch = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedSearch = debounce(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([])
      return
    }

    setLoading(true)
    try {
      const data = await animeService.searchAnime(searchTerm, 1)
      setSuggestions(data.results?.slice(0, 5) || [])
    } catch (error) {
      console.error('Search error:', error)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query])

  return {
    query,
    setQuery,
    suggestions,
    loading,
    clearSuggestions: () => setSuggestions([])
  }
}
