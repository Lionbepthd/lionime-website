import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Play } from 'lucide-react'
import { useQuickSearch } from '../../hooks/useSearch'
import '../../styles/components/header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { query, setQuery, suggestions, loading, clearSuggestions } = useQuickSearch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`)
      setQuery('')
      clearSuggestions()
      setIsMobileMenuOpen(false)
    }
  }

  const handleSuggestionClick = (slug, title) => {
    navigate(`/anime/${slug}`)
    setQuery('')
    clearSuggestions()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        {/* Logo Lionime */}
        <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          <Play size={28} className="logo-icon" />
          <span className="logo-text">Lionime</span>
        </Link>

        {/* Navigation */}
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/ongoing-anime" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Ongoing
          </Link>
          <Link to="/complete-anime/1" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Complete
          </Link>
          <Link to="/schedule" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Schedule
          </Link>
          <Link to="/genre" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            Genres
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((anime) => (
                <div
                  key={anime.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(anime.slug, anime.title)}
                >
                  <img src={anime.image} alt={anime.title} />
                  <div className="suggestion-info">
                    <h4>{anime.title}</h4>
                    <span>{anime.type} • {anime.episodes || '?'} eps</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
