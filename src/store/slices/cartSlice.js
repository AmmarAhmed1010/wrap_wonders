import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          ...product,
          quantity
        })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        } else {
          item.quantity = quantity
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
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
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  setLoading,
  setError
} = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartOpen = (state) => state.cart.isOpen
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error

export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0)
}

export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const selectCartSavings = (state) => {
  return state.cart.items.reduce((total, item) => {
    const savings = (item.originalPrice - item.price) * item.quantity
    return total + savings
  }, 0)
}

export default cartSlice.reducer
