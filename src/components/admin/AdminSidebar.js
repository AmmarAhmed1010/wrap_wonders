'use client'

import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

const AdminSidebar = ({ activeTab, setActiveTab, onClose }) => {
  const menuItems = [
    {
      id: 'analytics',
      name: 'Analytics',
      icon: ChartBarIcon,
      description: 'View store performance'
    },
    {
      id: 'products',
      name: 'Products',
      icon: ShoppingBagIcon,
      description: 'Manage inventory'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: ClipboardDocumentListIcon,
      description: 'Track orders'
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: UsersIcon,
      description: 'Customer management'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: CogIcon,
      description: 'Store configuration'
    }
  ]

  return (
    <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))'
        }}>
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div>
          <h2 className="font-bold" style={{ color: 'var(--foreground)' }}>
            Admin Panel
          </h2>
          <p className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Wrap Wonders
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeTab === item.id ? 'shadow-sm' : ''
            }`}
            style={{
              backgroundColor: activeTab === item.id ? 'var(--primary-coral)' : 'transparent',
              color: activeTab === item.id ? 'white' : 'rgba(75, 85, 99, 1)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="h-5 w-5" />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className={`text-xs ${
                activeTab === item.id ? 'text-white/80' : 'text-gray-500'
              }`}>
                {item.description}
              </div>
            </div>
          </motion.button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--foreground)' }}>
          Quick Actions
        </h3>
        <div className="space-y-2">
          <motion.a
            href="/"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm"
            style={{ color: 'rgba(107, 114, 128, 1)' }}
            whileHover={{ 
              backgroundColor: 'rgba(249, 250, 251, 1)',
              scale: 1.02 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <HomeIcon className="h-4 w-4" />
            <span>View Store</span>
          </motion.a>
          
          <motion.button
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm w-full text-left"
            style={{ color: 'rgba(107, 114, 128, 1)' }}
            whileHover={{ 
              backgroundColor: 'rgba(249, 250, 251, 1)',
              scale: 1.02 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="border-t pt-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold" style={{ color: 'var(--primary-coral)' }}>
              156
            </div>
            <div className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Orders
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold" style={{ color: 'var(--primary-teal)' }}>
              89
            </div>
            <div className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Customers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
