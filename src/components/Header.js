'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { 
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { 
    cartOpen, 
    toggleCart, 
    getCartItemsCount, 
    mobileMenuOpen, 
    toggleMobileMenu, 
    closeMobileMenu,
    wishlist,
    setSearchQuery: setStoreSearchQuery
  } = useStore()

  const cartItemsCount = getCartItemsCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setStoreSearchQuery(searchQuery)
      setSearchOpen(false)
      window.location.href = '/shop'
    }
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          boxShadow: scrolled ? 'var(--shadow-soft)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" style={{
                  background: 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))',
                  boxShadow: 'var(--shadow-soft)'
                }} onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-medium)'} onMouseLeave={(e) => e.target.style.boxShadow = 'var(--shadow-soft)'}>
                  <span className="text-white font-bold text-xl font-script">W</span>
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to right, var(--primary-coral), var(--primary-orange))' }}
                  layoutId="logo-glow"
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-display font-bold" style={{
                  background: 'linear-gradient(to right, var(--primary-coral), var(--primary-orange))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Wrap Wonders
                </h1>
                <p className="text-xs -mt-1" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>Handcrafted with Love</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative transition-colors duration-300 font-medium group"
                  style={{ color: 'rgba(55, 65, 81, 0.8)' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-coral)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(55, 65, 81, 0.8)'}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--primary-coral)' }}
                    layoutId={`nav-${item.name}`}
                  />
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition-all duration-300 text-sm"
                  style={{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--background-color)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-coral)'
                    e.target.style.boxShadow = '0 0 0 2px rgba(207, 67, 105, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-color)' }} />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-primary-coral transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </motion.button>

              {/* User Account */}
              <motion.button
                className="hidden sm:flex p-2 text-gray-700 hover:text-primary-coral transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserIcon className="h-6 w-6" />
              </motion.button>

              {/* Wishlist Icon */}
              <Link href="/wishlist">
                <motion.button
                  className="relative p-2 text-gray-700 hover:text-primary-coral transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {wishlist.length > 0 ? (
                    <HeartSolidIcon className="h-6 w-6 text-primary-coral" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                  {wishlist.length > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-primary-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart Icon */}
              <motion.button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-primary-coral transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 transition-colors"
                style={{ color: 'var(--text-color)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-coral)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-color)'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="md:hidden border-t backdrop-blur-md"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--background-color)'
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--background-color)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary-coral)'
                      e.target.style.boxShadow = '0 0 0 2px rgba(207, 67, 105, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)'
                      e.target.style.boxShadow = 'none'
                    }}
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-color)' }} />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              className="fixed top-20 right-0 bottom-0 w-80 bg-white z-50 lg:hidden"
              style={{ boxShadow: 'var(--shadow-strong)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-lg font-medium rounded-lg transition-colors"
                      style={{ color: 'var(--text-color)' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--background-color)'
                        e.target.style.color = 'var(--primary-coral)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = 'var(--text-color)'
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border-color)' }}>
                    <Link href="/wishlist" onClick={closeMobileMenu} className="block px-4 py-2 transition-colors"
                      style={{ color: 'var(--text-color)' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--background-color)'
                        e.target.style.color = 'var(--primary-coral)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = 'rgba(55, 65, 81, 0.8)'
                      }}>
                      Wishlist ({wishlist.length})
                    </Link>
                    <Link href="/admin" onClick={closeMobileMenu} className="block px-4 py-2 transition-colors"
                      style={{ color: 'rgba(55, 65, 81, 0.8)' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(243, 244, 246, 1)'
                        e.target.style.color = 'var(--primary-coral)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = 'rgba(55, 65, 81, 0.8)'
                      }}>
                      Admin
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
