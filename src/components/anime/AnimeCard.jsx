import React from 'react'
import { Link } from 'react-router-dom'
import { Play, Star, Calendar } from 'lucide-react'
import { truncateText, getImageUrl } from '../../utils/helpers'
import '../../styles/components/anime-card.css'

const AnimeCard = ({ anime, type = 'default' }) => {
  const {
    id,
    slug,
    title,
    image,
    rating,
    episodes,
    type: animeType,
    status,
    season,
    year
  } = anime

  const imageUrl = getImageUrl(image, '/api/placeholder/300/400')

  return (
    <div className={`anime-card ${type}`}>
      <Link to={`/anime/${slug}`} className="anime-card-link">
        <div className="anime-image">
          <img 
            src={imageUrl} 
            alt={title}
            loading="lazy"
          />
          <div className="anime-overlay">
            <div className="play-icon">
              <Play size={24} fill="white" />
            </div>
          </div>
          
          {/* Badges */}
          {rating && (
            <div className="rating-badge">
              <Star size={12} />
              <span>{rating}</span>
            </div>
          )}
          
          {episodes && (
            <div className="episode-badge">
              <span>{episodes} eps</span>
            </div>
          )}
        </div>

        <div className="anime-content">
          <h3 className="anime-title" title={title}>
            {truncateText(title, 50)}
          </h3>
          
          <div className="anime-meta">
            {animeType && (
              <span className="meta-item type">{animeType}</span>
            )}
            {status && (
              <span className={`meta-item status ${status.toLowerCase()}`}>
                {status}
              </span>
            )}
          </div>
          
          {(season || year) && (
            <div className="anime-season">
              <Calendar size={12} />
              <span>
                {season && year ? `${season} ${year}` : season || year}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export const AnimeCardSkeleton = () => (
  <div className="anime-card skeleton">
    <div className="anime-image skeleton-image"></div>
    <div className="anime-content">
      <div className="anime-title skeleton-text"></div>
      <div className="anime-meta">
        <span className="meta-item skeleton-meta"></span>
        <span className="meta-item skeleton-meta"></span>
      </div>
    </div>
  </div>
)

export default AnimeCard
