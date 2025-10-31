import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Calendar, Clock } from 'lucide-react'
import { formatDate, truncateText } from '../../utils/helpers'
import '../../styles/components/episode-card.css'

const EpisodeCard = ({ episode, animeTitle }) => {
  const {
    id,
    slug,
    number,
    title,
    image,
    airedAt,
    duration,
    animeSlug
  } = episode

  const displayTitle = title || `Episode ${number}`
  const episodeUrl = `/episode/${slug}`

  return (
    <div className="episode-card">
      <Link to={episodeUrl} className="episode-link">
        <div className="episode-image">
          <img 
            src={image} 
            alt={displayTitle}
            loading="lazy"
          />
          <div className="episode-overlay">
            <div className="play-icon">
              <Play size={20} fill="white" />
            </div>
            {duration && (
              <div className="duration-badge">
                <Clock size={12} />
                <span>{duration}m</span>
              </div>
            )}
          </div>
          <div className="episode-number">
            EP {number}
          </div>
        </div>

        <div className="episode-content">
          <h4 className="episode-title" title={displayTitle}>
            {truncateText(displayTitle, 40)}
          </h4>
          
          {animeTitle && (
            <p className="anime-title" title={animeTitle}>
              {truncateText(animeTitle, 35)}
            </p>
          )}
          
          {airedAt && (
            <div className="episode-meta">
              <Calendar size={12} />
              <span>{formatDate(airedAt)}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export const EpisodeCardSkeleton = () => (
  <div className="episode-card skeleton">
    <div className="episode-image skeleton-image"></div>
    <div className="episode-content">
      <div className="episode-title skeleton-text"></div>
      <div className="anime-title skeleton-text-short"></div>
      <div className="episode-meta skeleton-meta"></div>
    </div>
  </div>
)

export default EpisodeCard
