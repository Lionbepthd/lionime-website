import React from 'react'
import { Link } from 'react-router-dom'
import { useHomePage } from '../../hooks/useAnime'
import AnimeGrid from '../anime/AnimeGrid'
import EpisodeCard, { EpisodeCardSkeleton } from '../anime/EpisodeCard'
import { Play, Star, TrendingUp, Calendar, Clock } from 'lucide-react'
import { Section } from '../layout/HomeLayout'
import LoadingSpinner, { CardSkeleton } from '../common/LoadingSpinner'
import '../../styles/pages/home.css'

const HomePage = () => {
  const { data, loading, error } = useHomePage()

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />
  if (!data) return <EmptyState />

  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroSection data={data} />

      {/* Recent Episodes */}
      {data.recentEpisodes && data.recentEpisodes.length > 0 && (
        <Section 
          title="Episode Terbaru" 
          subtitle="Episode anime terbaru yang baru saja rilis"
          className="recent-episodes-section"
        >
          <div className="episodes-grid">
            {data.recentEpisodes.slice(0, 12).map((episode, index) => (
              <EpisodeCard 
                key={episode.id || index} 
                episode={episode}
                animeTitle={episode.animeTitle}
              />
            ))}
          </div>
          {data.recentEpisodes.length > 12 && (
            <div className="section-footer">
              <Link to="/recent-episodes" className="view-all-btn">
                Lihat Semua Episode
              </Link>
            </div>
          )}
        </Section>
      )}

      {/* Trending Anime */}
      {data.trending && data.trending.length > 0 && (
        <Section 
          title="Trending Sekarang" 
          subtitle="Anime yang sedang populer saat ini"
          className="trending-section"
        >
          <AnimeGrid 
            animeList={data.trending.slice(0, 12)} 
            columns={6}
          />
          {data.trending.length > 12 && (
            <div className="section-footer">
              <Link to="/trending" className="view-all-btn">
                Lihat Semua Trending
              </Link>
            </div>
          )}
        </Section>
      )}

      {/* Popular Anime */}
      {data.popular && data.popular.length > 0 && (
        <Section 
          title="Anime Populer" 
          subtitle="Anime dengan rating tertinggi"
          className="popular-section"
        >
          <AnimeGrid 
            animeList={data.popular.slice(0, 12)} 
            columns={6}
          />
          {data.popular.length > 12 && (
            <div className="section-footer">
              <Link to="/popular" className="view-all-btn">
                Lihat Semua Populer
              </Link>
            </div>
          )}
        </Section>
      )}

      {/* Spotlight Anime */}
      {data.spotlight && data.spotlight.length > 0 && (
        <Section 
          title="Spotlight Anime" 
          subtitle="Rekomendasi anime pilihan untuk kamu"
          className="spotlight-section"
        >
          <div className="spotlight-grid">
            {data.spotlight.slice(0, 6).map((anime, index) => (
              <SpotlightCard key={anime.id || index} anime={anime} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

const HeroSection = ({ data }) => {
  const spotlight = data.spotlight?.[0] || data.trending?.[0] || data.popular?.[0]

  if (!spotlight) return null

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img 
          src={spotlight.image} 
          alt={spotlight.title}
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {spotlight.title}
            </h1>
            <p className="hero-description">
              {spotlight.description || 'Nikmati pengalaman menonton anime terbaik dengan kualitas HD.'}
            </p>
            
            <div className="hero-meta">
              {spotlight.rating && (
                <div className="meta-item">
                  <Star size={16} />
                  <span>Rating: {spotlight.rating}</span>
                </div>
              )}
              {spotlight.episodes && (
                <div className="meta-item">
                  <Play size={16} />
                  <span>{spotlight.episodes} Episode</span>
                </div>
              )}
              {spotlight.status && (
                <div className="meta-item">
                  <TrendingUp size={16} />
                  <span>{spotlight.status}</span>
                </div>
              )}
            </div>

            <div className="hero-actions">
              <Link 
                to={`/anime/${spotlight.slug}`} 
                className="btn btn-primary btn-lg"
              >
                <Play size={20} />
                Tonton Sekarang
              </Link>
              <Link 
                to={`/anime/${spotlight.slug}`} 
                className="btn btn-secondary btn-lg"
              >
                Detail Anime
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img 
              src={spotlight.image} 
              alt={spotlight.title}
              className="hero-poster"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const SpotlightCard = ({ anime }) => {
  return (
    <div className="spotlight-card">
      <Link to={`/anime/${anime.slug}`} className="spotlight-link">
        <div className="spotlight-image">
          <img src={anime.image} alt={anime.title} />
          <div className="spotlight-overlay">
            <Play size={24} fill="white" />
          </div>
        </div>
        <div className="spotlight-content">
          <h4>{anime.title}</h4>
          <p>{anime.description?.substring(0, 100)}...</p>
        </div>
      </Link>
    </div>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat Lionime..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Terjadi Kesalahan</h2>
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

const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-content">
      <h2>Tidak Ada Data</h2>
      <p>Maaf, tidak ada anime yang ditemukan saat ini.</p>
    </div>
  </div>
)

export default HomePage
