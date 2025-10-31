import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Home } from 'lucide-react'
import '../../styles/layout/player-layout.css'

const PlayerLayout = ({ children, title, showBack = true }) => {
  return (
    <div className="player-layout">
      <div className="player-header">
        <div className="container">
          <div className="player-nav">
            {showBack && (
              <Link to="/" className="back-btn">
                <ChevronLeft size={20} />
                Kembali
              </Link>
            )}
            <Link to="/" className="home-btn">
              <Home size={20} />
              Home
            </Link>
          </div>
          {title && <h1 className="player-title">{title}</h1>}
        </div>
      </div>
      <div className="player-content">
        {children}
      </div>
    </div>
  )
}

export default PlayerLayout
