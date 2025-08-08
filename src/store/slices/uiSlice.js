import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mobileMenuOpen: false,
  searchOpen: false,
  loading: false,
  error: null,
  theme: 'light',
  sidebarCollapsed: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    openMobileMenu: (state) => {
      state.mobileMenuOpen = true
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen
    },
    openSearch: (state) => {
      state.searchOpen = true
    },
    closeSearch: (state) => {
      state.searchOpen = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload
    }
  }
})

export const {
  toggleMobileMenu,
  openMobileMenu,
  closeMobileMenu,
  toggleSearch,
  openSearch,
  closeSearch,
  setLoading,
  setError,
  clearError,
  setTheme,
  toggleTheme,
  toggleSidebar,
  setSidebarCollapsed
} = uiSlice.actions

// Selectors
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen
export const selectSearchOpen = (state) => state.ui.searchOpen
export const selectUILoading = (state) => state.ui.loading
export const selectUIError = (state) => state.ui.error
export const selectTheme = (state) => state.ui.theme
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed

export default uiSlice.reducer
