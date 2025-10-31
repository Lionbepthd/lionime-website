import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  theme: 'light',
  user: null,
  watchHistory: [],
  favorites: [],
  recentSearches: []
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.watchHistory.filter(item => item.id !== action.payload.id)].slice(0, 50)
      return { ...state, watchHistory: newHistory }
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.some(fav => fav.id === action.payload.id)
      const newFavorites = isFavorite
        ? state.favorites.filter(fav => fav.id !== action.payload.id)
        : [...state.favorites, action.payload]
      return { ...state, favorites: newFavorites }
    case 'ADD_SEARCH':
      const newSearches = [action.payload, ...state.recentSearches.filter(s => s !== action.payload)].slice(0, 10)
      return { ...state, recentSearches: newSearches }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const actions = {
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    addToHistory: (anime) => dispatch({ type: 'ADD_TO_HISTORY', payload: anime }),
    toggleFavorite: (anime) => dispatch({ type: 'TOGGLE_FAVORITE', payload: anime }),
    addSearch: (query) => dispatch({ type: 'ADD_SEARCH', payload: query })
  }

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
        }
