import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'
import '../../styles/components/video-player.css'

const VideoPlayer = ({ 
  src, 
  poster, 
  title = '',
  autoPlay = false,
  controls = true 
}) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e) => {
    const video = videoRef.current
    const newVolume = parseFloat(e.target.value)
    
    if (video) {
      video.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    const newTime = parseFloat(e.target.value)
    
    if (video) {
      video.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleFullscreen = () => {
    const player = playerRef.current
    
    if (!document.fullscreenElement) {
      player.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div 
      ref={playerRef}
      className="video-player"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="video-element"
        onClick={togglePlay}
        autoPlay={autoPlay}
        muted={isMuted}
      />
      
      {title && (
        <div className="video-title">
          <h3>{title}</h3>
        </div>
      )}

      {/* Custom Controls */}
      {controls && showControls && (
        <div className="video-controls">
          {/* Progress Bar */}
          <div className="progress-bar">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="progress-slider"
            />
            <div 
              className="progress-filled" 
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="control-buttons">
            <div className="left-controls">
              <button onClick={togglePlay} className="control-btn">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="volume-control">
                <button onClick={toggleMute} className="control-btn">
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="right-controls">
              <button className="control-btn">
                <Settings size={20} />
              </button>
              <button onClick={toggleFullscreen} className="control-btn">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="play-overlay" onClick={togglePlay}>
          <div className="play-button-large">
            <Play size={48} fill="white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
