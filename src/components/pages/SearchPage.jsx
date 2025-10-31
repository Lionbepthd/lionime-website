import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAnimeSearch } from '../../hooks/useSearch'
import { usePagination } from '../../hooks/usePagination'
import AnimeGrid from '../anime/AnimeGrid'
import { Search, Filter, X } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/search.css'

const SearchPage = () => {
  const { keyword } = useParams()
  const { results, loading, error, hasMore } = useAnimeSearch(keyword)
  const { currentPage, nextPage, prevPage, hasNext, hasPrev } = usePagination()
  const { addSearch } = useApp()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    season: '',
    year: ''
  })

  useEffect(() => {
    if (keyword) {
      addSearch(keyword)
    }
  }, [keyword, addSearch])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      status: '',
      season: '',
      year: ''
    })
  }

  const filteredResults = results.filter(anime => {
    if (filters.type && anime.type !== filters.type) return false
    if (filters.status && anime.status !== filters.status) return false
    if (filters.season && anime.season !== filters.season) return false
    if (filters.year && anime.year !== filters.year) return false
    return true
  })

  return (
    <div className="search-page">
      <div className="container">
        {/* Header */}
        <div className="search-header">
          <h1>
            <Search className="header-icon" />
            Hasil Pencarian: "{keyword}"
          </h1>
          <p>Ditemukan {filteredResults.length} anime</p>
        </div>

        {/* Filters */}
        <div className="search-controls">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle-btn"
          >
            <Filter size={16} />
            Filter
          </button>

          {showFilters && (
            <div className="filters-panel">
              <div className="filters-header">
                <h3>Filter Anime</h3>
                <button onClick={clearFilters} className="clear-filters">
                  <X size={16} />
                  Hapus Filter
                </button>
              </div>

              <div className="filter-grid">
                <div className="filter-group">
                  <label>Tipe</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">Semua Tipe</option>
                    <option value="TV">TV</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Status</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">Semua Status</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Musim</label>
                  <select 
                    value={filters.season}
                    onChange={(e) => handleFilterChange('season', e.target.value)}
                  >
                    <option value="">Semua Musim</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Tahun</label>
                  <select 
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                  >
                    <option value="">Semua Tahun</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="search-results">
          {loading ? (
            <AnimeGrid loading={true} skeletonCount={12} columns={4} />
          ) : error ? (
            <ErrorState error={error} />
          ) : (
            <>
              <AnimeGrid 
                animeList={filteredResults} 
                columns={4}
              />
              
              {/* Pagination */}
              {filteredResults.length > 0 && (
                <div className="pagination">
                  <button 
                    onClick={prevPage}
                    disabled={!hasPrev}
                    className="pagination-btn prev"
                  >
                    Sebelumnya
                  </button>
                  
                  <span className="page-info">
                    Halaman {currentPage}
                  </span>
                  
                  <button 
                    onClick={nextPage}
                    disabled={!hasNext}
                    className="pagination-btn next"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Hasil Pencarian</h2>
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

export default SearchPage
