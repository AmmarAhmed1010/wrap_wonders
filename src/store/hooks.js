import { useDispatch, useSelector } from 'react-redux'

// Custom hooks for typed Redux usage
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

// Custom hooks for common operations
export const useCart = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const cartOpen = useAppSelector(state => state.cart.isOpen)
  const cartLoading = useAppSelector(state => state.cart.loading)
  const cartError = useAppSelector(state => state.cart.error)
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartSavings = cartItems.reduce((total, item) => {
    const savings = (item.originalPrice - item.price) * item.quantity
    return total + savings
  }, 0)

  return {
    cartItems,
    cartOpen,
    cartLoading,
    cartError,
    cartItemsCount,
    cartTotal,
    cartSavings,
    dispatch
  }
}

export const useWishlist = () => {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector(state => state.wishlist.items)
  const wishlistLoading = useAppSelector(state => state.wishlist.loading)
  const wishlistError = useAppSelector(state => state.wishlist.error)
  const wishlistCount = wishlistItems.length

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  return {
    wishlistItems,
    wishlistLoading,
    wishlistError,
    wishlistCount,
    isInWishlist,
    dispatch
  }
}

export const useProducts = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.products.products)
  const searchQuery = useAppSelector(state => state.products.searchQuery)
  const selectedCategory = useAppSelector(state => state.products.selectedCategory)
  const sortBy = useAppSelector(state => state.products.sortBy)
  const priceRange = useAppSelector(state => state.products.priceRange)
  const loading = useAppSelector(state => state.products.loading)
  const error = useAppSelector(state => state.products.error)

  // Filtered products logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      case 'discount':
        return b.discount - a.discount
      default: // featured
        return b.featured ? 1 : -1
    }
  })

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id))
  }

  const getRelatedProducts = (productId, category, limit = 4) => {
    return products
      .filter(p => p.category === category && p.id !== productId)
      .slice(0, limit)
  }

  return {
    products,
    filteredProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    priceRange,
    loading,
    error,
    getProductById,
    getRelatedProducts,
    dispatch
  }
}

export const useOrders = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.orders.orders)
  const loading = useAppSelector(state => state.orders.loading)
  const error = useAppSelector(state => state.orders.error)

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status)
  }

  const getRecentOrders = (limit = 5) => {
    return [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  const getOrdersStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
    }
  }

  return {
    orders,
    loading,
    error,
    getOrderById,
    getOrdersByStatus,
    getRecentOrders,
    getOrdersStats,
    dispatch
  }
}

export const useCustomers = () => {
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customers.customers)
  const loading = useAppSelector(state => state.customers.loading)
  const error = useAppSelector(state => state.customers.error)

  const getCustomerById = (customerId) => {
    return customers.find(customer => customer.id === customerId)
  }

  const getCustomersByStatus = (status) => {
    return customers.filter(customer => customer.status === status)
  }

  const getVIPCustomers = () => {
    return customers.filter(customer => customer.status === 'vip')
  }

  const getCustomersStats = () => {
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

  const getTopCustomers = (limit = 10) => {
    return [...customers]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit)
  }

  return {
    customers,
    loading,
    error,
    getCustomerById,
    getCustomersByStatus,
    getVIPCustomers,
    getCustomersStats,
    getTopCustomers,
    dispatch
  }
}

export const useNotifications = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(state => state.notifications.notifications)
  const loading = useAppSelector(state => state.notifications.loading)
  const error = useAppSelector(state => state.notifications.error)

  const unreadNotifications = notifications.filter(notification => !notification.read)
  const unreadCount = unreadNotifications.length

  const getRecentNotifications = (limit = 5) => {
    return [...notifications]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
  }

  return {
    notifications,
    unreadNotifications,
    unreadCount,
    loading,
    error,
    getRecentNotifications,
    dispatch
  }
}

export const useUI = () => {
  const dispatch = useAppDispatch()
  const mobileMenuOpen = useAppSelector(state => state.ui.mobileMenuOpen)
  const searchOpen = useAppSelector(state => state.ui.searchOpen)
  const loading = useAppSelector(state => state.ui.loading)
  const error = useAppSelector(state => state.ui.error)
  const theme = useAppSelector(state => state.ui.theme)
  const sidebarCollapsed = useAppSelector(state => state.ui.sidebarCollapsed)

  return {
    mobileMenuOpen,
    searchOpen,
    loading,
    error,
    theme,
    sidebarCollapsed,
    dispatch
  }
}
