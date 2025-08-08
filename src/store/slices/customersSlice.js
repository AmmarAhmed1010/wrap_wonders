import { createSlice } from '@reduxjs/toolkit'

const mockCustomers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    joinDate: new Date('2023-06-15'),
    totalOrders: 8,
    totalSpent: 1249.99,
    lastOrder: new Date('2024-01-08'),
    status: 'active',
    wishlistItems: 5,
    avatar: null
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    joinDate: new Date('2023-08-22'),
    totalOrders: 12,
    totalSpent: 2150.75,
    lastOrder: new Date('2024-01-07'),
    status: 'active',
    wishlistItems: 8,
    avatar: null
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, Chicago, IL 60601',
    joinDate: new Date('2023-04-10'),
    totalOrders: 15,
    totalSpent: 3299.50,
    lastOrder: new Date('2024-01-06'),
    status: 'vip',
    wishlistItems: 12,
    avatar: null
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1 (555) 321-0987',
    address: '321 Elm St, Miami, FL 33101',
    joinDate: new Date('2023-11-03'),
    totalOrders: 3,
    totalSpent: 189.97,
    lastOrder: new Date('2024-01-05'),
    status: 'active',
    wishlistItems: 2,
    avatar: null
  },
  {
    id: 5,
    name: 'Lisa Garcia',
    email: 'lisa@example.com',
    phone: '+1 (555) 654-3210',
    address: '654 Maple Dr, Seattle, WA 98101',
    joinDate: new Date('2023-09-18'),
    totalOrders: 6,
    totalSpent: 899.45,
    lastOrder: new Date('2024-01-03'),
    status: 'active',
    wishlistItems: 7,
    avatar: null
  }
]

const initialState = {
  customers: mockCustomers,
  loading: false,
  error: null
}

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload
    },
    addCustomer: (state, action) => {
      const newCustomer = {
        ...action.payload,
        id: Date.now(),
        joinDate: new Date(),
        totalOrders: 0,
        totalSpent: 0,
        status: 'active',
        wishlistItems: 0,
        avatar: null
      }
      state.customers.push(newCustomer)
    },
    updateCustomer: (state, action) => {
      const { id, updates } = action.payload
      const customer = state.customers.find(customer => customer.id === id)
      if (customer) {
        Object.assign(customer, updates)
      }
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload)
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
  setCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
  setLoading,
  setError
} = customersSlice.actions

// Selectors
export const selectCustomers = (state) => state.customers.customers
export const selectCustomersLoading = (state) => state.customers.loading
export const selectCustomersError = (state) => state.customers.error

export const selectCustomerById = (state, customerId) => {
  return state.customers.customers.find(customer => customer.id === customerId)
}

export const selectCustomersByStatus = (state, status) => {
  return state.customers.customers.filter(customer => customer.status === status)
}

export const selectVIPCustomers = (state) => {
  return state.customers.customers.filter(customer => customer.status === 'vip')
}

export const selectCustomersStats = (state) => {
  const customers = state.customers.customers
  return {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    vip: customers.filter(c => c.status === 'vip').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, customer) => {
      return sum + (customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0)
    }, 0) / customers.length
  }
}

export const selectTopCustomers = (state, limit = 10) => {
  return [...state.customers.customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit)
}

export default customersSlice.reducer
