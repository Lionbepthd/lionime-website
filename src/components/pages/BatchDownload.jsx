import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import animeService from '../../services/animeService'
import { Download, Play, HardDrive, Clock, FileText } from 'lucide-react'
import { formatFileSize, formatDate } from '../../utils/helpers'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/pages/batch-download.css'

const BatchDownload = () => {
  const { slug } = useParams()
  const [batchData, setBatchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedQuality, setSelectedQuality] = useState('')

  useEffect(() => {
    fetchBatchData()
  }, [slug])

  const fetchBatchData = async () => {
    try {
      setLoading(true)
      const data = await animeService.getBatchDownload(slug)
      setBatchData(data)
      if (data.qualities && data.qualities.length > 0) {
        setSelectedQuality(data.qualities[0].quality)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const selectedQualityData = batchData?.qualities?.find(
    q => q.quality === selectedQuality
  )

  if (loading) return <PageLoader />
  if (error) return <ErrorState error={error} />
  if (!batchData) return <NotFoundState />

  return (
    <div className="batch-download-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>
              <Download className="header-icon" />
              Download Batch: {batchData.animeTitle}
            </h1>
            <p>Download semua episode sekaligus dalam satu paket</p>
          </div>
          <Link 
            to={`/anime/${batchData.animeSlug}`}
            className="btn btn-secondary"
          >
            <Play size={16} />
            Tonton Online
          </Link>
        </div>

        <div className="batch-content">
          {/* Anime Info */}
          <div className="anime-info-card">
            <img 
              src={batchData.animeImage} 
              alt={batchData.animeTitle}
              className="anime-poster"
            />
            <div className="anime-details">
              <h2>{batchData.animeTitle}</h2>
              <p className="anime-description">
                {batchData.description || 'Download semua episode anime ini dalam kualitas terbaik.'}
              </p>
              
              <div className="anime-stats">
                <div className="stat">
                  <FileText size={16} />
                  <span>Total Episode: {batchData.totalEpisodes}</span>
                </div>
                <div className="stat">
                  <HardDrive size={16} />
                  <span>Total Size: {formatFileSize(batchData.totalSize)}</span>
                </div>
                {batchData.updatedAt && (
                  <div className="stat">
                    <Clock size={16} />
                    <span>Update: {formatDate(batchData.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quality Selection */}
          {batchData.qualities && batchData.qualities.length > 0 && (
            <section className="quality-section">
              <h3>Pilih Kualitas</h3>
              <div className="quality-options">
                {batchData.qualities.map(quality => (
                  <button
                    key={quality.quality}
                    onClick={() => setSelectedQuality(quality.quality)}
                    className={`quality-btn ${selectedQuality === quality.quality ? 'active' : ''}`}
                  >
                    <span className="quality-name">{quality.quality}</span>
                    <span className="quality-size">
                      {formatFileSize(quality.size)}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Download Links */}
          {selectedQualityData && (
            <section className="download-section">
              <h3>Link Download - {selectedQuality}</h3>
              <div className="download-options">
                {selectedQualityData.links.map((link, index) => (
                  <DownloadOption 
                    key={index}
                    link={link}
                    index={index + 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Batch Info */}
          <div className="batch-info">
            <h3>Informasi Batch Download</h3>
            <div className="info-grid">
              <div className="info-item">
                <h4>✅ Lengkap</h4>
                <p>Semua episode dari awal sampai akhir</p>
              </div>
              <div className="info-item">
                <h4>⚡ Cepat</h4>
                <p>Download semua episode sekaligus</p>
              </div>
              <div className="info-item">
                <h4>🎯 Terorganisir</h4>
                <p>File sudah rapi dengan nama yang sesuai</p>
              </div>
              <div className="info-item">
                <h4>💾 Multiple Server</h4>
                <p>Pilihan server download yang beragam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DownloadOption = ({ link, index }) => {
  return (
    <div className="download-option">
      <div className="option-header">
        <h4>Server {index}</h4>
        <span className="server-name">{link.server}</span>
      </div>
      
      <div className="option-links">
        {link.parts && link.parts.length > 0 ? (
          link.parts.map((part, partIndex) => (
            <a
              key={partIndex}
              href={part.url}
              download
              className="download-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Part {partIndex + 1} ({formatFileSize(part.size)})
            </a>
          ))
        ) : (
          <a
            href={link.url}
            download
            className="download-link full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={16} />
            Download Full Batch
          </a>
        )}
      </div>

      {link.password && (
        <div className="option-password">
          <strong>Password:</strong> {link.password}
        </div>
      )}
    </div>
  )
}

const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat batch download..." />
  </div>
)

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-content">
      <h2>Gagal Memuat Batch Download</h2>
      <p>{error}</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Home
      </Link>
    </div>
  </div>
)

const NotFoundState = () => (
  <div className="not-found-state">
    <div className="not-found-content">
      <h2>Batch Tidak Ditemukan</h2>
      <p>Batch download untuk anime ini tidak tersedia.</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Home
      </Link>
    </div>
  </div>
)

export default BatchDownload
