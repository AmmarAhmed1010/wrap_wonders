'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const AnalyticsDashboard = () => {
  const { products, orders, customers, analytics } = useStore()
  const [timeRange, setTimeRange] = useState('7d')

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0
    const totalOrders = orders?.length || 0
    const totalCustomers = customers?.length || 156 // Mock data
    const totalProducts = products.length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const conversionRate = 3.2 // Mock data
    const totalViews = 12847 // Mock data
    const wishlistItems = products.reduce((sum, product) => sum + (product.wishlistCount || 0), 0)

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      avgOrderValue,
      conversionRate,
      totalViews,
      wishlistItems
    }
  }, [products, orders, customers])

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${analyticsData.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'var(--primary-coral)'
    },
    {
      name: 'Total Orders',
      value: analyticsData.totalOrders.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: ShoppingBagIcon,
      color: 'var(--primary-teal)'
    },
    {
      name: 'Customers',
      value: analyticsData.totalCustomers.toLocaleString(),
      change: '+15.3%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'var(--primary-yellow)'
    },
    {
      name: 'Products',
      value: analyticsData.totalProducts.toLocaleString(),
      change: '+2.1%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'var(--primary-orange)'
    },
    {
      name: 'Avg Order Value',
      value: `$${analyticsData.avgOrderValue.toFixed(2)}`,
      change: '+5.4%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'var(--accent-teal-500)'
    },
    {
      name: 'Conversion Rate',
      value: `${analyticsData.conversionRate}%`,
      change: '-0.3%',
      changeType: 'decrease',
      icon: ChartBarIcon,
      color: 'var(--accent-orange-500)'
    },
    {
      name: 'Page Views',
      value: analyticsData.totalViews.toLocaleString(),
      change: '+18.7%',
      changeType: 'increase',
      icon: EyeIcon,
      color: 'var(--accent-yellow-500)'
    },
    {
      name: 'Wishlist Items',
      value: analyticsData.wishlistItems.toLocaleString(),
      change: '+22.1%',
      changeType: 'increase',
      icon: HeartIcon,
      color: 'var(--brand-500)'
    }
  ]

  const topProducts = products
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5)

  const recentOrders = orders?.slice(0, 5) || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Analytics Overview
          </h2>
          <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Track your store performance and key metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <div className={`flex items-center space-x-1 text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <span className="font-medium">{stat.change}</span>
              </div>
              <span className="text-sm ml-2" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                vs last period
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                    {product.name}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    {product.sold || Math.floor(Math.random() * 100)} sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: 'var(--primary-coral)' }}>
                    ${product.price}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                    #{index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--foreground)' }}>
            Recent Orders
          </h3>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, index) => (
                <div key={order.id || index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                      Order #{order.id || `ORD-${1000 + index}`}
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                      {order.customerName || `Customer ${index + 1}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: 'var(--primary-teal)' }}>
                      ${order.total || (Math.random() * 200 + 50).toFixed(2)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  No recent orders found
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
