import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEpisodeDetail } from '../../hooks/useAnime'
import { useApp } from '../../contexts/AppContext'
import VideoPlayer from '../anime/VideoPlayer'
import ServerSelector from '../anime/ServerSelector'
import PlayerLayout from '../layout/PlayerLayout'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Download,
  Share2,
  List
} from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/episode-player.css'

const EpisodePlayer = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { episode, loading, error } = useEpisodeDetail(slug)
  const { addToHistory } = useApp()
  const [selectedServer, setSelectedServer] = useState(null)
  const [showEpisodeList, setShowEpisodeList] = useState(false)

  useEffect(() => {
    if (episode) {
      addToHistory({
        id: episode.id,
        title: episode.title,
        image: episode.image,
        slug: episode.slug,
        type: 'episode'
      })
    }
  }, [episode, addToHistory])

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />
  if (!episode) return <NotFoundState />

  const handleServerChange = (server) => {
    setSelectedServer(server)
  }

  const navigateToEpisode = (episodeSlug) => {
    if (episodeSlug) {
      navigate(`/episode/${episodeSlug}`)
      setShowEpisodeList(false)
    }
  }

  return (
    <PlayerLayout 
      title={`${episode.animeTitle} - Episode ${episode.number}`}
      showBack={true}
    >
      <div className="episode-player-page">
        <div className="player-container">
          {/* Video Player */}
          <div className="video-section">
            {selectedServer ? (
              <VideoPlayer 
                src={selectedServer.url}
                poster={episode.image}
                title={`${episode.animeTitle} - Episode ${episode.number}`}
                autoPlay={true}
                controls={true}
              />
            ) : (
              <div className="no-server-selected">
                <div className="no-server-content">
                  <Play size={48} />
                  <h3>Pilih Server untuk Memulai</h3>
                  <p>Silakan pilih server streaming dari daftar di bawah</p>
                </div>
              </div>
            )}
          </div>

          {/* Episode Navigation */}
          <div className="episode-navigation">
            <button 
              onClick={() => navigateToEpisode(episode.prevEpisode?.slug)}
              disabled={!episode.prevEpisode}
              className="nav-btn prev-btn"
            >
              <ChevronLeft size={20} />
              Episode Sebelumnya
            </button>

            <button 
              onClick={() => setShowEpisodeList(!showEpisodeList)}
              className="nav-btn list-btn"
            >
              <List size={20} />
              Daftar Episode
            </button>

            <button 
              onClick={() => navigateToEpisode(episode.nextEpisode?.slug)}
              disabled={!episode.nextEpisode}
              className="nav-btn next-btn"
            >
              Episode Selanjutnya
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Server Selection */}
          {episode.servers && episode.servers.length > 0 && (
            <div className="server-section">
              <ServerSelector 
                servers={episode.servers}
                onServerChange={handleServerChange}
                currentServer={selectedServer}
              />
            </div>
          )}

          {/* Episode Info */}
          <div className="episode-info-section">
            <h2 className="episode-title">
              {episode.animeTitle} - Episode {episode.number}
            </h2>
            {episode.title && episode.title !== `Episode ${episode.number}` && (
              <h3 className="episode-subtitle">{episode.title}</h3>
            )}
            
            {episode.description && (
              <div className="episode-description">
                <p>{episode.description}</p>
              </div>
            )}

            <div className="episode-actions">
              <Link 
                to={`/anime/${episode.animeSlug}`}
                className="btn btn-secondary"
              >
                Detail Anime
              </Link>
              
              {episode.downloadUrl && (
                <a 
                  href={episode.downloadUrl}
                  download
                  className="btn btn-secondary"
                >
                  <Download size={16} />
                  Download Episode
                </a>
              )}

              <button className="btn btn-secondary">
                <Share2 size={16} />
                Bagikan
              </button>
            </div>
          </div>
        </div>

        {/* Episode List Sidebar */}
        {showEpisodeList && episode.episodeList && (
          <div className="episode-list-sidebar">
            <div className="sidebar-header">
              <h3>Daftar Episode</h3>
              <button 
                onClick={() => setShowEpisodeList(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="episode-list">
              {episode.episodeList.map((ep, index) => (
                <button
                  key={ep.id || index}
                  onClick={() => navigateToEpisode(ep.slug)}
                  className={`episode-list-item ${ep.slug === slug ? 'active' : ''}`}
                >
                  <span className="episode-number">EP {ep.number}</span>
                  <span className="episode-title">
                    {ep.title || `Episode ${ep.number}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Overlay for episode list */}
        {showEpisodeList && (
          <div 
            className="episode-list-overlay"
            onClick={() => setShowEpisodeList(false)}
          />
        )}
      </div>
    </PlayerLayout>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat episode..." />
  </div>
)

const ErrorState = ({ error }) => (
  <PlayerLayout>
    <div className="error-state">
      <div className="error-content">
        <h2>Gagal Memuat Episode</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Home
        </Link>
      </div>
    </div>
  </PlayerLayout>
)

const NotFoundState = () => (
  <PlayerLayout>
    <div className="not-found-state">
      <div className="not-found-content">
        <h2>Episode Tidak Ditemukan</h2>
        <p>Episode yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Home
        </Link>
      </div>
    </div>
  </PlayerLayout>
)

export default EpisodePlayer
