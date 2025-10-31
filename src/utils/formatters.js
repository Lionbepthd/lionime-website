export const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (timeString) => {
  if (!timeString) return '-'
  return timeString
}

export const formatNumber = (number) => {
  if (!number) return '0'
  return new Intl.NumberFormat('id-ID').format(number)
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const formatDuration = (minutes) => {
  if (!minutes) return '-'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}j ${mins}m`
  }
  return `${mins}m`
}

export const capitalizeFirst = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}
