import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePagination } from '../../hooks/usePagination'
import animeService from '../../services/animeService'
import AnimeGrid from '../anime/AnimeGrid'
import { Tag, Grid, List, Filter } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/genre.css'

const GenrePage = () => {
  const { slug } = useParams()
  const [genres, setGenres] = useState([])
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const { currentPage, nextPage, prevPage, hasNext, hasPrev, setTotalPages } = usePagination()

  useEffect(() => {
    fetchGenres()
  }, [])

  useEffect(() => {
    if (slug) {
      fetchAnimeByGenre()
    }
  }, [slug, currentPage])

  const fetchGenres = async () => {
    try {
      const data = await animeService.getAllGenres()
      setGenres(data)
    } catch (err) {
      console.error('Error fetching genres:', err)
    }
  }

  const fetchAnimeByGenre = async () => {
    try {
      setLoading(true)
      const data = await animeService.getAnimeByGenre(slug, currentPage)
      setAnimeList(data.anime || data.results || [])
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const currentGenre = genres.find(genre => 
    genre.slug === slug || genre.name.toLowerCase() === slug?.toLowerCase()
  )

  if (!slug) {
    return <GenreList genres={genres} loading={loading} />
  }

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />

  return (
    <div className="genre-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>
              <Tag className="header-icon" />
              Genre: {currentGenre?.name || slug}
            </h1>
            <p>Menampilkan anime dengan genre {currentGenre?.name || slug}</p>
          </div>

          {/* View Controls */}
          <div className="view-controls">
            <button 
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="genre-content">
          {/* Sidebar */}
          <div className="genre-sidebar">
            <h3>Semua Genre</h3>
            <div className="genre-list">
              {genres.map(genre => (
                <Link
                  key={genre.slug || genre.name}
                  to={`/genre/${genre.slug || genre.name.toLowerCase()}`}
                  className={`genre-item ${slug === (genre.slug || genre.name.toLowerCase()) ? 'active' : ''}`}
                >
                  <span className="genre-name">{genre.name}</span>
                  <span className="genre-count">{genre.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Anime List */}
          <div className="anime-main">
            <AnimeGrid 
              animeList={animeList}
              loading={loading}
              columns={viewMode === 'grid' ? 4 : 1}
              className={viewMode === 'list' ? 'list-view' : ''}
            />

            {/* Pagination */}
            {animeList.length > 0 && (
              <div className="pagination">
                <button 
                  onClick={prevPage}
                  disabled={!hasPrev}
                  className="pagination-btn prev"
                >
                  Sebelumnya
                </button>
                
                <span className="page-info">
                  Halaman {currentPage}
                </span>
                
                <button 
                  onClick={nextPage}
                  disabled={!hasNext}
                  className="pagination-btn next"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const GenreList = ({ genres, loading }) => {
  return (
    <div className="genre-list-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Tag className="header-icon" />
            Semua Genre Anime
          </h1>
          <p>Jelajahi anime berdasarkan genre favorit Anda</p>
        </div>

        {loading ? (
          <div className="genres-loading">
            <LoadingSpinner text="Memuat genre..." />
          </div>
        ) : (
          <div className="genres-grid">
            {genres.map(genre => (
              <Link
                key={genre.slug || genre.name}
                to={`/genre/${genre.slug || genre.name.toLowerCase()}`}
                className="genre-card"
              >
                <div className="genre-icon">
                  <Tag size={24} />
                </div>
                <div className="genre-info">
                  <h3 className="genre-name">{genre.name}</h3>
                  <p className="genre-count">{genre.count} anime</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat anime..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Anime</h2>
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="btn btn-primary"
      >
        Coba Lagi
      </button>
    </div>
  </div>
)

export default GenrePage
