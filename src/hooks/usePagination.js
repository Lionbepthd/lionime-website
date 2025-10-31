import { useState, useCallback } from 'react'

export const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }, [])

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    setTotalPages,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  }
}
