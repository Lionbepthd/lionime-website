import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAnimeDetail } from '../../hooks/useAnime'
import { useApp } from '../../contexts/AppContext'
import AnimeGrid from '../anime/AnimeGrid'
import { 
  Play, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Bookmark,
  Share2,
  Download,
  Eye
} from 'lucide-react'
import { formatDate, truncateText, getImageUrl } from '../../utils/helpers'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/anime-detail.css'

const AnimeDetail = () => {
  const { slug } = useParams()
  const { anime, loading, error } = useAnimeDetail(slug)
  const { addToHistory, toggleFavorite, favorites } = useApp()

  React.useEffect(() => {
    if (anime) {
      addToHistory(anime)
    }
  }, [anime, addToHistory])

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />
  if (!anime) return <NotFoundState />

  const isFavorite = favorites.some(fav => fav.id === anime.id)

  return (
    <div className="anime-detail">
      {/* Hero Section */}
      <div className="anime-hero">
        <div className="hero-background">
          <img 
            src={getImageUrl(anime.coverImage || anime.image)} 
            alt={anime.title}
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="container">
          <div className="anime-hero-content">
            <div className="anime-poster">
              <img 
                src={getImageUrl(anime.image)} 
                alt={anime.title}
                className="poster-image"
              />
            </div>

            <div className="anime-info">
              <h1 className="anime-title">{anime.title}</h1>
              
              <div className="anime-meta-grid">
                {anime.rating && (
                  <div className="meta-item">
                    <Star className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Rating</span>
                      <span className="meta-value">{anime.rating}</span>
                    </div>
                  </div>
                )}

                {anime.episodes && (
                  <div className="meta-item">
                    <Play className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Episode</span>
                      <span className="meta-value">{anime.episodes}</span>
                    </div>
                  </div>
                )}

                {anime.duration && (
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Durasi</span>
                      <span className="meta-value">{anime.duration}m</span>
                    </div>
                  </div>
                )}

                {anime.status && (
                  <div className="meta-item">
                    <Eye className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Status</span>
                      <span className={`meta-value status ${anime.status.toLowerCase()}`}>
                        {anime.status}
                      </span>
                    </div>
                  </div>
                )}

                {anime.type && (
                  <div className="meta-item">
                    <Users className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Tipe</span>
                      <span className="meta-value">{anime.type}</span>
                    </div>
                  </div>
                )}

                {anime.season && (
                  <div className="meta-item">
                    <Calendar className="meta-icon" />
                    <div className="meta-content">
                      <span className="meta-label">Musim</span>
                      <span className="meta-value">{anime.season} {anime.year}</span>
                    </div>
                  </div>
                )}
              </div>

              {anime.genres && anime.genres.length > 0 && (
                <div className="genres-list">
                  <h4>Genre:</h4>
                  <div className="genres">
                    {anime.genres.map(genre => (
                      <Link 
                        key={genre} 
                        to={`/genre/${genre.toLowerCase()}`}
                        className="genre-tag"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {anime.studios && anime.studios.length > 0 && (
                <div className="studios-list">
                  <h4>Studio:</h4>
                  <div className="studios">
                    {anime.studios.map(studio => (
                      <span key={studio} className="studio-tag">
                        {studio}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="action-buttons">
                {anime.episodes > 0 && (
                  <Link 
                    to={`/episode/${anime.slug}-episode-1`} 
                    className="btn btn-primary btn-lg"
                  >
                    <Play size={20} />
                    Tonton Sekarang
                  </Link>
                )}
                
                <button 
                  onClick={() => toggleFavorite(anime)}
                  className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                >
                  <Bookmark size={20} />
                  {isFavorite ? 'Favorit' : 'Tambah Favorit'}
                </button>

                {anime.batchAvailable && (
                  <Link 
                    to={`/batch/${anime.slug}`}
                    className="btn btn-secondary btn-lg"
                  >
                    <Download size={20} />
                    Download Batch
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container">
        <div className="anime-content">
          {/* Synopsis */}
          {anime.description && (
            <section className="synopsis-section">
              <h2>Sinopsis</h2>
              <div className="synopsis-content">
                <p>{anime.description}</p>
              </div>
            </section>
          )}

          {/* Episode List */}
          {anime.episodesList && anime.episodesList.length > 0 && (
            <section className="episodes-section">
              <div className="section-header">
                <h2>Daftar Episode</h2>
                <span className="episode-count">
                  {anime.episodesList.length} Episode
                </span>
              </div>
              
              <div className="episodes-list">
                {anime.episodesList.map((episode, index) => (
                  <EpisodeListItem 
                    key={episode.id || index} 
                    episode={episode}
                    animeSlug={anime.slug}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recommendations */}
          {anime.recommendations && anime.recommendations.length > 0 && (
            <section className="recommendations-section">
              <h2>Rekomendasi Anime Serupa</h2>
              <AnimeGrid 
                animeList={anime.recommendations.slice(0, 6)} 
                columns={3}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

const EpisodeListItem = ({ episode, animeSlug }) => {
  return (
    <Link 
      to={`/episode/${episode.slug || `${animeSlug}-episode-${episode.number}`}`}
      className="episode-list-item"
    >
      <div className="episode-number">
        EP {episode.number}
      </div>
      <div className="episode-info">
        <h4 className="episode-title">
          {episode.title || `Episode ${episode.number}`}
        </h4>
        {episode.airedAt && (
          <span className="episode-date">
            {formatDate(episode.airedAt)}
          </span>
        )}
      </div>
      <div className="episode-action">
        <Play size={16} />
      </div>
    </Link>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat detail anime..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Anime</h2>
      <p>{error}</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Home
      </Link>
    </div>
  </div>
)

const NotFoundState = () => (
  <div className="not-found-state">
    <div className="not-found-content">
      <h2>Anime Tidak Ditemukan</h2>
      <p>Anime yang Anda cari tidak ditemukan atau mungkin telah dihapus.</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Home
      </Link>
    </div>
  </div>
)

export default AnimeDetail
