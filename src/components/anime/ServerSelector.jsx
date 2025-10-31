import React, { useState, useEffect } from 'react'
import { Monitor, Download, Play } from 'lucide-react'
import '../../styles/components/server-selector.css'

const ServerSelector = ({ 
  servers = [], 
  onServerChange,
  currentServer = null 
}) => {
  const [selectedServer, setSelectedServer] = useState(currentServer)

  useEffect(() => {
    if (servers.length > 0 && !selectedServer) {
      const defaultServer = servers[0]
      setSelectedServer(defaultServer)
      onServerChange?.(defaultServer)
    }
  }, [servers, selectedServer, onServerChange])

  const handleServerSelect = (server) => {
    setSelectedServer(server)
    onServerChange?.(server)
  }

  const getServerIcon = (serverType) => {
    switch (serverType?.toLowerCase()) {
      case 'download':
        return <Download size={16} />
      case 'stream':
      default:
        return <Monitor size={16} />
    }
  }

  const getServerQuality = (server) => {
    // Extract quality from server name
    const qualityMatch = server.name?.match(/(\d+p)/i)
    return qualityMatch ? qualityMatch[1] : 'HD'
  }

  if (servers.length === 0) {
    return (
      <div className="server-selector">
        <div className="no-servers">
          <p>Tidak ada server tersedia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="server-selector">
      <h4 className="server-title">Pilih Server:</h4>
      
      <div className="server-list">
        {servers.map((server, index) => (
          <button
            key={server.id || index}
            className={`server-item ${selectedServer?.id === server.id ? 'active' : ''}`}
            onClick={() => handleServerSelect(server)}
          >
            <div className="server-info">
              <div className="server-icon">
                {getServerIcon(server.type)}
              </div>
              <div className="server-details">
                <span className="server-name">{server.name}</span>
                <span className="server-quality">
                  {getServerQuality(server)}
                </span>
              </div>
            </div>
            
            <div className="server-status">
              {selectedServer?.id === server.id ? (
                <Play size={16} className="active-indicator" />
              ) : (
                <div className="inactive-indicator" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedServer && (
        <div className="current-server-info">
          <h5>Server Aktif:</h5>
          <p>{selectedServer.name}</p>
          {selectedServer.url && (
            <a 
              href={selectedServer.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="server-link"
            >
              Buka di Tab Baru
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default ServerSelector
