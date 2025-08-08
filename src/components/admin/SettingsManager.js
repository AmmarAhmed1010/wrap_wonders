'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  TruckIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

const SettingsManager = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'Wrap Wonders',
    storeDescription: 'Premium handcrafted arts, candles, paintings, and necklaces',
    storeEmail: 'info@wrapwonders.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Art Street, Creative City, CC 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    
    // Notifications
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    customerMessages: true,
    marketingEmails: false,
    
    // Payment Settings
    paymentMethods: {
      stripe: true,
      paypal: true,
      applePay: true,
      googlePay: false
    },
    
    // Shipping Settings
    freeShippingThreshold: 75,
    standardShipping: 5.99,
    expressShipping: 12.99,
    internationalShipping: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordRequirements: true,
    
    // Theme
    primaryColor: '#CF4369',
    secondaryColor: '#7FB2B0',
    accentColor: '#EBC558',
    darkMode: false,
    
    // Analytics
    googleAnalytics: '',
    facebookPixel: '',
    trackingEnabled: true,
    
    // SEO
    metaTitle: 'Wrap Wonders - Premium Handcrafted Arts & Crafts',
    metaDescription: 'Discover unique handcrafted arts, candles, paintings, and necklaces.',
    keywords: 'handcrafted, arts, candles, paintings, necklaces, premium'
  })

  const sections = [
    {
      id: 'general',
      name: 'General',
      icon: CogIcon,
      description: 'Basic store information and settings'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      description: 'Email and alert preferences'
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: CreditCardIcon,
      description: 'Payment methods and processing'
    },
    {
      id: 'shipping',
      name: 'Shipping',
      icon: TruckIcon,
      description: 'Shipping rates and options'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheckIcon,
      description: 'Security and authentication settings'
    },
    {
      id: 'theme',
      name: 'Theme',
      icon: PaintBrushIcon,
      description: 'Customize your store appearance'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: ChartBarIcon,
      description: 'Tracking and analytics setup'
    },
    {
      id: 'seo',
      name: 'SEO',
      icon: GlobeAltIcon,
      description: 'Search engine optimization'
    }
  ]

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNestedSettingChange = (parent, key, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Store Name
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => handleSettingChange('storeName', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Store Email
          </label>
          <input
            type="email"
            value={settings.storeEmail}
            onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Store Phone
          </label>
          <input
            type="tel"
            value={settings.storePhone}
            onChange={(e) => handleSettingChange('storePhone', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
          Store Description
        </label>
        <textarea
          value={settings.storeDescription}
          onChange={(e) => handleSettingChange('storeDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: 'rgba(209, 213, 219, 1)',
            focusRingColor: 'var(--primary-coral)'
          }}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
          Store Address
        </label>
        <textarea
          value={settings.storeAddress}
          onChange={(e) => handleSettingChange('storeAddress', e.target.value)}
          rows={2}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: 'rgba(209, 213, 219, 1)',
            focusRingColor: 'var(--primary-coral)'
          }}
        />
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive general email notifications' },
          { key: 'orderNotifications', label: 'Order Notifications', description: 'Get notified about new orders' },
          { key: 'inventoryAlerts', label: 'Inventory Alerts', description: 'Low stock and out of stock alerts' },
          { key: 'customerMessages', label: 'Customer Messages', description: 'Notifications for customer inquiries' },
          { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional and marketing communications' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium" style={{ color: 'var(--foreground)' }}>
                {item.label}
              </h4>
              <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                {item.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
          Payment Methods
        </h4>
        <div className="space-y-4">
          {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
            <div key={method} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCardIcon className="h-6 w-6" style={{ color: 'var(--primary-coral)' }} />
                <span className="font-medium capitalize" style={{ color: 'var(--foreground)' }}>
                  {method === 'applePay' ? 'Apple Pay' : method === 'googlePay' ? 'Google Pay' : method.charAt(0).toUpperCase() + method.slice(1)}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => handleNestedSettingChange('paymentMethods', method, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Free Shipping Threshold ($)
          </label>
          <input
            type="number"
            value={settings.freeShippingThreshold}
            onChange={(e) => handleSettingChange('freeShippingThreshold', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Standard Shipping ($)
          </label>
          <input
            type="number"
            value={settings.standardShipping}
            onChange={(e) => handleSettingChange('standardShipping', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
            Express Shipping ($)
          </label>
          <input
            type="number"
            value={settings.expressShipping}
            onChange={(e) => handleSettingChange('expressShipping', parseFloat(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium" style={{ color: 'var(--foreground)' }}>
            International Shipping
          </h4>
          <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Enable shipping to international addresses
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.internationalShipping}
            onChange={(e) => handleSettingChange('internationalShipping', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
          Meta Title
        </label>
        <input
          type="text"
          value={settings.metaTitle}
          onChange={(e) => handleSettingChange('metaTitle', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: 'rgba(209, 213, 219, 1)',
            focusRingColor: 'var(--primary-coral)'
          }}
          maxLength="60"
        />
        <p className="text-xs mt-1" style={{ color: 'rgba(107, 114, 128, 1)' }}>
          {settings.metaTitle.length}/60 characters
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
          Meta Description
        </label>
        <textarea
          value={settings.metaDescription}
          onChange={(e) => handleSettingChange('metaDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: 'rgba(209, 213, 219, 1)',
            focusRingColor: 'var(--primary-coral)'
          }}
          maxLength="160"
        />
        <p className="text-xs mt-1" style={{ color: 'rgba(107, 114, 128, 1)' }}>
          {settings.metaDescription.length}/160 characters
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
          Keywords
        </label>
        <input
          type="text"
          value={settings.keywords}
          onChange={(e) => handleSettingChange('keywords', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            borderColor: 'rgba(209, 213, 219, 1)',
            focusRingColor: 'var(--primary-coral)'
          }}
          placeholder="Separate keywords with commas"
        />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'payments':
        return renderPaymentSettings()
      case 'shipping':
        return renderShippingSettings()
      case 'seo':
        return renderSEOSettings()
      default:
        return (
          <div className="text-center py-12">
            <p style={{ color: 'rgba(107, 114, 128, 1)' }}>
              Settings for {activeSection} coming soon...
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Settings
        </h2>
        <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
          Configure your store settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Settings Navigation */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <nav className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id ? 'shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: activeSection === section.id ? 'var(--primary-coral)' : 'transparent',
                    color: activeSection === section.id ? 'white' : 'rgba(75, 85, 99, 1)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{section.name}</div>
                    <div className={`text-xs ${
                      activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {sections.find(s => s.id === activeSection)?.name} Settings
              </h3>
              <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            
            {renderContent()}
            
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                className="px-4 py-2 border rounded-lg font-medium"
                style={{
                  borderColor: 'rgba(209, 213, 219, 1)',
                  color: 'rgba(107, 114, 128, 1)'
                }}
              >
                Reset
              </button>
              <motion.button
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: 'var(--primary-coral)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsManager
