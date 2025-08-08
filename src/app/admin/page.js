'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import ProductsManager from '@/components/admin/ProductsManager'
import OrdersManager from '@/components/admin/OrdersManager'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import CustomersManager from '@/components/admin/CustomersManager'
import SettingsManager from '@/components/admin/SettingsManager'
import { 
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const { products, orders, customers } = useStore()

  const tabs = [
    {
      id: 'analytics',
      name: 'Analytics',
      icon: ChartBarIcon,
      component: AnalyticsDashboard
    },
    {
      id: 'products',
      name: 'Products',
      icon: ShoppingBagIcon,
      component: ProductsManager,
      count: products.length
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: ClipboardDocumentListIcon,
      component: OrdersManager,
      count: orders?.length || 0
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: UsersIcon,
      component: CustomersManager,
      count: customers?.length || 0
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: CogIcon,
      component: SettingsManager
    }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-secondary)' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))'
              }}>
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                  Admin Dashboard
                </h1>
                <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  Manage your Wrap Wonders store
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Welcome back, Admin
                </p>
                <p className="text-xs" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, var(--primary-teal), var(--accent-teal-400))'
              }}>
                <span className="text-white font-medium text-sm">AD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id ? 'shadow-sm' : ''
                    }`}
                    style={{
                      backgroundColor: activeTab === tab.id ? 'var(--primary-coral)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : 'rgba(75, 85, 99, 1)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === tab.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {ActiveComponent && <ActiveComponent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
