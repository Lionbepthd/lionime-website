const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.sankavollerei.com/anime/'

class AnimeService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Halaman Home
  async getHomePage() {
    return this.request('home')
  }

  // Jadwal Rilis Anime
  async getSchedule() {
    return this.request('schedule')
  }

  // Detail Lengkap Anime
  async getAnimeDetail(slug) {
    return this.request(`anime/${slug}`)
  }

  // Anime Tamat per Halaman
  async getCompleteAnime(page = 1) {
    return this.request(`complete-anime/${page}`)
  }

  // Anime Sedang Tayang
  async getOngoingAnime() {
    return this.request('ongoing-anime')
  }

  // Daftar Semua Genre
  async getAllGenres() {
    return this.request('genre')
  }

  // Daftar Anime Berdasarkan Genre
  async getAnimeByGenre(slug, page = 1) {
    return this.request(`genre/${slug}?page=${page}`)
  }

  // Detail dan Link Nonton per Episode
  async getEpisodeDetail(slug) {
    return this.request(`episode/${slug}`)
  }

  // Pencarian Anime
  async searchAnime(keyword, page = 1) {
    return this.request(`search/${keyword}?page=${page}`)
  }

  // Download Batch Anime
  async getBatchDownload(slug) {
    return this.request(`batch/${slug}`)
  }

  // Ambil URL Stream Server
  async getStreamServer(serverId) {
    return this.request(`server/${serverId}`)
  }

  // All Anime (Unlimited)
  async getAllAnime(page = 1) {
    return this.request(`unlimited?page=${page}`)
  }
}

export default new AnimeService()
