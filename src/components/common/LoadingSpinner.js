import React from 'react'
import '../../styles/components/loading-spinner.css'

const LoadingSpinner = ({ size = 'medium', text = 'Memuat...' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="large" text="Memuat Lionime..." />
  </div>
)

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-meta"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default LoadingSpinner
