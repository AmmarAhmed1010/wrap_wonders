import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

// Import all slices
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import ordersReducer from './slices/ordersSlice'
import customersReducer from './slices/customersSlice'
import notificationsReducer from './slices/notificationsSlice'
import uiReducer from './slices/uiSlice'

// Persist configuration
const persistConfig = {
  key: 'wrap-wonders-store',
  storage,
  whitelist: ['cart', 'wishlist', 'ui'] // Only persist cart, wishlist, and UI state
}

// Combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  customers: customersReducer,
  notifications: notificationsReducer,
  ui: uiReducer
})

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

// Create persistor
export const persistor = persistStore(store)

export default store
