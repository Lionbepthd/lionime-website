import React from 'react'
import AnimeCard, { AnimeCardSkeleton } from './AnimeCard'
import '../../styles/components/anime-grid.css'

const AnimeGrid = ({ 
  animeList, 
  loading = false, 
  skeletonCount = 12,
  columns = 6,
  className = '' 
}) => {
  if (loading) {
    return (
      <div className={`anime-grid grid-${columns} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!animeList || animeList.length === 0) {
    return (
      <div className="anime-grid-empty">
        <div className="empty-state">
          <h3>Tidak ada anime ditemukan</h3>
          <p>Coba gunakan kata kunci lain atau filter yang berbeda</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`anime-grid grid-${columns} ${className}`}>
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  )
}

export default AnimeGrid
