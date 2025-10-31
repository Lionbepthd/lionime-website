import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import animeService from '../../services/animeService'
import AnimeGrid from '../anime/AnimeGrid'
import { Play, Calendar, Clock, TrendingUp } from 'lucide-react'
import { formatDate } from '../../utils/helpers'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/ongoing-anime.css'

const OngoingAnime = () => {
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOngoingAnime()
  }, [])

  const fetchOngoingAnime = async () => {
    try {
      setLoading(true)
      const data = await animeService.getOngoingAnime()
      setAnimeList(data.anime || data.results || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredAnime = animeList.filter(anime => {
    if (filter === 'recent') {
      return anime.lastEpisodeDate && isRecent(anime.lastEpisodeDate)
    }
    return true
  })

  const isRecent = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  const recentUpdated = animeList
    .filter(anime => anime.lastEpisodeDate && isRecent(anime.lastEpisodeDate))
    .sort((a, b) => new Date(b.lastEpisodeDate) - new Date(a.lastEpisodeDate))
    .slice(0, 5)

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />

  return (
    <div className="ongoing-anime-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>
            <Play className="header-icon" />
            Anime Ongoing
          </h1>
          <p>Anime yang masih berlangsung dan terus update</p>
        </div>

        {/* Recent Updates */}
        {recentUpdated.length > 0 && (
          <section className="recent-updates-section">
            <h2>
              <TrendingUp className="section-icon" />
              Baru Diupdate
            </h2>
            <div className="recent-updates">
              {recentUpdated.map(anime => (
                <RecentUpdateCard 
                  key={anime.id} 
                  anime={anime}
                />
              ))}
            </div>
          </section>
        )}

        {/* Filter Controls */}
        <div className="filter-controls">
          <button 
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >
            Semua ({animeList.length})
          </button>
          <button 
            onClick={() => setFilter('recent')}
            className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
          >
            Update Terbaru ({recentUpdated.length})
          </button>
        </div>

        {/* Anime List */}
        <div className="anime-section">
          <AnimeGrid 
            animeList={filteredAnime}
            loading={loading}
            columns={5}
          />
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <Clock className="info-icon" />
              <h3>Update Rutin</h3>
              <p>Episode baru biasanya rilis setiap minggu sesuai jadwal</p>
            </div>
            <div className="info-card">
              <Calendar className="info-icon" />
              <h3>Jadwal Tetap</h3>
              <p>Cek halaman jadwal untuk mengetahui waktu rilis pasti</p>
            </div>
            <div className="info-card">
              <Play className="info-icon" />
              <h3>Notifikasi</h3>
              <p>Dapatkan pemberitahuan ketika episode baru rilis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecentUpdateCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.slug}`} className="recent-update-card">
      <div className="update-image">
        <img src={anime.image} alt={anime.title} />
        <div className="update-badge">
          <Play size={12} />
        </div>
      </div>
      
      <div className="update-content">
        <h4 className="anime-title">{anime.title}</h4>
        <div className="update-meta">
          <span className="episode">EP {anime.lastEpisode}</span>
          {anime.lastEpisodeDate && (
            <span className="date">
              {formatDate(anime.lastEpisodeDate)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat anime ongoing..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Anime Ongoing</h2>
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

export default OngoingAnime
