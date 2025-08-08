'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  MagnifyingGlassIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const CustomersManager = () => {
  const { customers = [] } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [sortBy, setSortBy] = useState('name')

  // Mock customers if none exist
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

  const allCustomers = customers.length > 0 ? customers : mockCustomers

  const getStatusColor = (status) => {
    switch (status) {
      case 'vip':
        return 'bg-purple-100 text-purple-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getCustomerTier = (totalSpent) => {
    if (totalSpent >= 2000) return { tier: 'VIP', color: 'var(--primary-coral)' }
    if (totalSpent >= 1000) return { tier: 'Gold', color: 'var(--primary-yellow)' }
    if (totalSpent >= 500) return { tier: 'Silver', color: 'var(--accent-teal-500)' }
    return { tier: 'Bronze', color: 'var(--primary-orange)' }
  }

  const filteredCustomers = allCustomers
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.phone.includes(searchTerm)
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'totalSpent':
          return b.totalSpent - a.totalSpent
        case 'totalOrders':
          return b.totalOrders - a.totalOrders
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Customers Management
          </h2>
          <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Manage and view customer information
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary-coral)' }}>
              {allCustomers.length}
            </p>
            <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Total Customers
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary-teal)' }}>
              {allCustomers.filter(c => c.status === 'vip').length}
            </p>
            <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              VIP Customers
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary-yellow)' }}>
              ${allCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(0)}
            </p>
            <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Total Revenue
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: 'rgba(209, 213, 219, 1)',
                focusRingColor: 'var(--primary-coral)'
              }}
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="totalSpent">Sort by Total Spent</option>
            <option value="totalOrders">Sort by Orders</option>
            <option value="joinDate">Sort by Join Date</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              {filteredCustomers.length} customers
            </span>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCustomers.map((customer) => {
            const tier = getCustomerTier(customer.totalSpent)
            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl p-6"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                {/* Customer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: `${tier.color}20` }}>
                      {customer.avatar ? (
                        <img src={customer.avatar} alt={customer.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <UserCircleIcon className="h-8 w-8" style={{ color: tier.color }} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                        {customer.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs px-2 py-1 rounded-full font-medium"
                         style={{ 
                           backgroundColor: `${tier.color}20`,
                           color: tier.color
                         }}>
                      {tier.tier}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      {customer.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      {customer.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm line-clamp-1" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      {customer.address}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <ShoppingBagIcon className="h-4 w-4" style={{ color: 'var(--primary-teal)' }} />
                      <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                        {customer.totalOrders}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      Orders
                    </span>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <HeartIcon className="h-4 w-4" style={{ color: 'var(--primary-coral)' }} />
                      <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                        {customer.wishlistItems}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      Wishlist
                    </span>
                  </div>
                </div>

                {/* Total Spent */}
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold" style={{ color: 'var(--primary-coral)' }}>
                    ${customer.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    Total Spent
                  </p>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs mb-4" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  <span>Joined: {new Date(customer.joinDate).toLocaleDateString()}</span>
                  <span>Last Order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <motion.button
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium"
                  style={{ 
                    backgroundColor: 'var(--primary-teal)',
                    color: 'white'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View Details</span>
                </motion.button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Customer Details Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCustomer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                  Customer Details
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCustomer.status)}`}>
                  {selectedCustomer.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <UserCircleIcon className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">{selectedCustomer.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <span>Joined: {new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase History */}
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Purchase Summary
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>Total Orders</span>
                        <span className="font-semibold text-lg">{selectedCustomer.totalOrders}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>Total Spent</span>
                        <span className="font-semibold text-lg" style={{ color: 'var(--primary-coral)' }}>
                          ${selectedCustomer.totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>Avg Order Value</span>
                        <span className="font-semibold">
                          ${(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>Last Order</span>
                        <span className="font-semibold">
                          {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>Wishlist Items</span>
                        <span className="font-semibold text-lg">{selectedCustomer.wishlistItems}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 border rounded-lg font-medium"
                  style={{
                    borderColor: 'rgba(209, 213, 219, 1)',
                    color: 'rgba(107, 114, 128, 1)'
                  }}
                >
                  Close
                </button>
                <motion.button
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: 'var(--primary-coral)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomersManager
