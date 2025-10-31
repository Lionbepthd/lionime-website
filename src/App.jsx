import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import MainLayout from './components/layout/MainLayout'
import HomePage from './components/pages/HomePage'
import AnimeDetail from './components/pages/AnimeDetail'
import EpisodePlayer from './components/pages/EpisodePlayer'
import SchedulePage from './components/pages/SchedulePage'
import SearchPage from './components/pages/SearchPage'
import GenrePage from './components/pages/GenrePage'
import CompleteAnime from './components/pages/CompleteAnime'
import OngoingAnime from './components/pages/OngoingAnime'
import BatchDownload from './components/pages/BatchDownload'
import ErrorBoundary from './components/common/ErrorBoundary'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { useScrollToTop } from './hooks/useScrollToTop'
import { addWatermark } from './utils/protection'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const isOnline = useNetworkStatus()
  const { showScrollTop, scrollToTop } = useScrollToTop()

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Add protection watermark
    addWatermark()

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-content">
          <div className="app-loading-spinner"></div>
          <h2>Memuat Lionime...</h2>
          <p>Streaming anime terbaik siap untuk Anda</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="app-skip-link">
        Loncat ke konten utama
      </a>

      {/* Network Status Indicator */}
      <div className={`network-status ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? 'Koneksi pulih' : 'Anda sedang offline'}
      </div>

      {/* Loading Bar for route transitions */}
      <div className="app-loading-bar" style={{ width: '0%' }}></div>

      <ErrorBoundary>
        <AppProvider>
          <Router>
            <MainLayout>
              <main id="main-content" className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/anime/:slug" element={<AnimeDetail />} />
                  <Route path="/episode/:slug" element={<EpisodePlayer />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/search/:keyword" element={<SearchPage />} />
                  <Route path="/genre" element={<GenrePage />} />
                  <Route path="/genre/:slug" element={<GenrePage />} />
                  <Route path="/complete-anime/:page" element={<CompleteAnime />} />
                  <Route path="/ongoing-anime" element={<OngoingAnime />} />
                  <Route path="/batch/:slug" element={<BatchDownload />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </MainLayout>
          </Router>
        </AppProvider>
      </ErrorBoundary>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll ke atas"
      >
        ↑
      </button>
    </div>
  )
}

const NotFound = () => (
  <div className="not-found-page">
    <div className="container">
      <div className="not-found-content">
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.</p>
        <div className="not-found-actions">
          <a href="/" className="btn btn-primary">
            Kembali ke Home
          </a>
          <a href="/search" className="btn btn-secondary">
            Cari Anime
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default App
