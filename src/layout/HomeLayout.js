import React from 'react'
import '../../styles/layout/home-layout.css'

const HomeLayout = ({ children, className = '' }) => {
  return (
    <div className={`home-layout ${className}`}>
      {children}
    </div>
  )
}

export const Section = ({ title, subtitle, children, className = '' }) => {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default HomeLayout
