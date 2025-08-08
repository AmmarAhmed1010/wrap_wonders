import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      const exists = state.items.find(item => item.id === product.id)
      if (!exists) {
        state.items.push(product)
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    toggleWishlist: (state, action) => {
      const product = action.payload
      const exists = state.items.find(item => item.id === product.id)
      if (exists) {
        state.items = state.items.filter(item => item.id !== product.id)
      } else {
        state.items.push(product)
      }
    },
    clearWishlist: (state) => {
      state.items = []
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  setLoading,
  setError
} = wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistLoading = (state) => state.wishlist.loading
export const selectWishlistError = (state) => state.wishlist.error
export const selectWishlistCount = (state) => state.wishlist.items.length

export const selectIsInWishlist = (state, productId) => {
  return state.wishlist.items.some(item => item.id === productId)
}

export default wishlistSlice.reducer
