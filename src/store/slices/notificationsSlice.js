import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  loading: false,
  error: null
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date(),
        ...action.payload
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true
      })
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
  addNotification,
  removeNotification,
  clearNotifications,
  markAsRead,
  markAllAsRead,
  setLoading,
  setError
} = notificationsSlice.actions

// Selectors
export const selectNotifications = (state) => state.notifications.notifications
export const selectNotificationsLoading = (state) => state.notifications.loading
export const selectNotificationsError = (state) => state.notifications.error

export const selectUnreadNotifications = (state) => {
  return state.notifications.notifications.filter(notification => !notification.read)
}

export const selectUnreadCount = (state) => {
  return state.notifications.notifications.filter(notification => !notification.read).length
}

export const selectRecentNotifications = (state, limit = 5) => {
  return [...state.notifications.notifications]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit)
}

export default notificationsSlice.reducer
