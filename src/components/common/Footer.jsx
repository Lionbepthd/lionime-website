import React from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import '../../styles/components/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Play size={24} className="logo-icon" />
              <span className="logo-text">Lionime</span>
            </div>
            <p>Streaming anime terbaik dengan kualitas HD. Nikmati pengalaman menonton tanpa iklan.</p>
          </div>
          
          <div className="footer-section">
            <h4>Menu Cepat</h4>
            <Link to="/">Home</Link>
            <Link to="/ongoing-anime">Anime Ongoing</Link>
            <Link to="/complete-anime/1">Anime Complete</Link>
            <Link to="/schedule">Jadwal Rilis</Link>
            <Link to="/genre">Genre Anime</Link>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <Link to="/privacy">Kebijakan Privasi</Link>
            <Link to="/terms">Syarat & Ketentuan</Link>
            <Link to="/dmca">DMCA</Link>
            <Link to="/contact">Kontak</Link>
          </div>

          <div className="footer-section">
            <h4>Info</h4>
            <p>Website ini tidak menyimpan file apapun di server.</p>
            <p>Semua konten disediakan oleh third-party.</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Lionime. All rights reserved.</p>
          <p>Made with ❤️ for anime lovers</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
