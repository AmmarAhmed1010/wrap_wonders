'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
  ChevronDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const OrdersManager = () => {
  const { orders = [], updateOrderStatus } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [sortBy, setSortBy] = useState('date')

  // Mock orders if none exist
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

  const allOrders = orders.length > 0 ? orders : mockOrders

  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'shipped', label: 'Shipped', color: 'purple' },
    { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return ClockIcon
      case 'processing':
        return CheckCircleIcon
      case 'shipped':
        return TruckIcon
      case 'delivered':
        return CheckCircleIcon
      case 'cancelled':
        return XCircleIcon
      default:
        return ClockIcon
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = allOrders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date)
        case 'total':
          return b.total - a.total
        case 'customer':
          return a.customerName.localeCompare(b.customerName)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const handleStatusUpdate = (orderId, newStatus) => {
    if (updateOrderStatus) {
      updateOrderStatus(orderId, newStatus)
    }
    // Update mock data for demo
    const orderIndex = allOrders.findIndex(order => order.id === orderId)
    if (orderIndex !== -1) {
      allOrders[orderIndex].status = newStatus
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Orders Management
          </h2>
          <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Track and manage customer orders
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary-coral)' }}>
              {filteredOrders.length}
            </p>
            <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Total Orders
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: 'rgba(209, 213, 219, 1)',
                focusRingColor: 'var(--primary-coral)'
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

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
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
            <option value="customer">Sort by Customer</option>
            <option value="status">Sort by Status</option>
          </select>

          {/* Date Filter */}
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: 'rgba(209, 213, 219, 1)',
                focusRingColor: 'var(--primary-coral)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                            {order.customerName}
                          </div>
                          <div className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                            {order.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold" style={{ color: 'var(--primary-coral)' }}>
                          ${order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className={`text-xs px-3 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${getStatusColor(order.status)}`}
                            style={{ focusRingColor: 'var(--primary-coral)' }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                          onClick={() => setSelectedOrder(order)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>View</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
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
                  Order Details - {selectedOrder.id}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Customer Information
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Shipping Address
                  </h4>
                  <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Order Items
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                          {item.name}
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold" style={{ color: 'var(--primary-coral)' }}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                    Total Amount:
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--primary-coral)' }}>
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border rounded-lg font-medium"
                  style={{
                    borderColor: 'rgba(209, 213, 219, 1)',
                    color: 'rgba(107, 114, 128, 1)'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OrdersManager
