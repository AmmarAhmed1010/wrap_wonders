import { createSlice } from '@reduxjs/toolkit'

const mockOrders = [
  {
    id: 'ORD-1001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    total: 149.99,
    status: 'pending',
    date: new Date('2024-01-08'),
    items: [
      { name: 'Handcrafted Ceramic Vase', quantity: 1, price: 89.99 },
      { name: 'Vanilla Scented Candle', quantity: 2, price: 30.00 }
    ],
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-1002',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    total: 89.99,
    status: 'processing',
    date: new Date('2024-01-07'),
    items: [
      { name: 'Abstract Oil Painting', quantity: 1, price: 89.99 }
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: 'ORD-1003',
    customerName: 'Emma Wilson',
    customerEmail: 'emma@example.com',
    total: 199.98,
    status: 'shipped',
    date: new Date('2024-01-06'),
    items: [
      { name: 'Silver Pearl Necklace', quantity: 1, price: 129.99 },
      { name: 'Rose Quartz Pendant', quantity: 1, price: 69.99 }
    ],
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-1004',
    customerName: 'David Brown',
    customerEmail: 'david@example.com',
    total: 45.99,
    status: 'delivered',
    date: new Date('2024-01-05'),
    items: [
      { name: 'Lavender Aromatherapy Candle', quantity: 1, price: 45.99 }
    ],
    shippingAddress: '321 Elm St, Miami, FL 33101'
  }
]

const initialState = {
  orders: mockOrders,
  loading: false,
  error: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    addOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: `ORD-${Date.now()}`,
        date: new Date()
      }
      state.orders.push(newOrder)
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload
      const order = state.orders.find(order => order.id === orderId)
      if (order) {
        order.status = status
      }
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload)
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
  setOrders,
  addOrder,
  updateOrderStatus,
  removeOrder,
  setLoading,
  setError
} = ordersSlice.actions

// Selectors
export const selectOrders = (state) => state.orders.orders
export const selectOrdersLoading = (state) => state.orders.loading
export const selectOrdersError = (state) => state.orders.error

export const selectOrderById = (state, orderId) => {
  return state.orders.orders.find(order => order.id === orderId)
}

export const selectOrdersByStatus = (state, status) => {
  return state.orders.orders.filter(order => order.status === status)
}

export const selectRecentOrders = (state, limit = 5) => {
  return [...state.orders.orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export const selectOrdersStats = (state) => {
  const orders = state.orders.orders
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  }
}

export default ordersSlice.reducer
