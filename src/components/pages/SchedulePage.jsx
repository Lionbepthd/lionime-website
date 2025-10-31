import React from 'react'
import { useSchedule } from '../../hooks/useAnime'
import { Link } from 'react-router-dom'
import { DAYS, DAYS_ID } from '../../utils/constants'
import { formatTime } from '../../utils/helpers'
import { Calendar, Clock, Play } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/schedule.css'

const SchedulePage = () => {
  const { schedule, loading, error } = useSchedule()

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />

  return (
    <div className="schedule-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Calendar className="header-icon" />
            Jadwal Rilis Anime
          </h1>
          <p>Jadwal tayang anime berdasarkan hari</p>
        </div>

        <div className="schedule-container">
          {DAYS.map(day => (
            <DaySchedule 
              key={day}
              day={day}
              animeList={schedule[day] || []}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const DaySchedule = ({ day, animeList }) => {
  const dayName = DAYS_ID[day] || day

  return (
    <div className="day-schedule">
      <h2 className="day-title">{dayName}</h2>
      
      {animeList.length > 0 ? (
        <div className="anime-list">
          {animeList.map((anime, index) => (
            <ScheduleAnimeCard 
              key={anime.id || index} 
              anime={anime}
            />
          ))}
        </div>
      ) : (
        <div className="no-anime">
          <p>Tidak ada anime yang tayang hari ini</p>
        </div>
      )}
    </div>
  )
}

const ScheduleAnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.slug}`} className="schedule-anime-card">
      <div className="anime-image">
        <img src={anime.image} alt={anime.title} />
        <div className="play-overlay">
          <Play size={20} fill="white" />
        </div>
      </div>

      <div className="anime-info">
        <h3 className="anime-title">{anime.title}</h3>
        
        <div className="anime-meta">
          {anime.episode && (
            <span className="episode">EP {anime.episode}</span>
          )}
          {anime.time && (
            <div className="time">
              <Clock size={12} />
              <span>{formatTime(anime.time)}</span>
            </div>
          )}
        </div>

        {anime.genres && anime.genres.length > 0 && (
          <div className="genres">
            {anime.genres.slice(0, 2).map(genre => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat jadwal..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Jadwal</h2>
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

export default SchedulePage
