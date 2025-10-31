import React from 'react'
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
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <MainLayout>
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
          </MainLayout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  )
}

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Halaman Tidak Ditemukan</h1>
    <p>Halaman yang Anda cari tidak ada.</p>
  </div>
)

export default App
