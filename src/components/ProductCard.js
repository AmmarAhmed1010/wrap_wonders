'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { 
  ShoppingBagIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

const ProductCard = ({ product, index = 0, className = '' }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useStore()

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.inStock) {
      addToCart(product)
      toast.success(`${product.name} added to cart!`)
    }
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <motion.div
      className={`group bg-white rounded-2xl transition-all duration-300 overflow-hidden ${className}`}
      style={{
        boxShadow: 'var(--shadow-soft)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-medium)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-soft)'}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden" style={{ backgroundColor: 'var(--brand-100)' }}>
          {/* Product Image Placeholder */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, var(--brand-100) 0%, var(--brand-200) 100%)'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg" style={{ backgroundColor: 'rgba(209, 213, 219, 1)' }} />
              <p className="text-sm">Product Image</p>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.discount > 0 && (
              <motion.div
                className="text-white px-2 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'var(--primary-coral)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                -{product.discount}%
              </motion.div>
            )}
            {product.featured && (
              <motion.div
                className="px-2 py-1 rounded-full text-xs font-bold"
                style={{ 
                  backgroundColor: 'var(--primary-yellow)',
                  color: 'var(--brand-900)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Featured
              </motion.div>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute top-4 right-4 text-white px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#ef4444' }}>
              Out of Stock
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group/heart"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: 'var(--shadow-soft)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isWishlisted ? (
              <HeartSolidIcon className="h-5 w-5" style={{ color: 'var(--primary-coral)' }} />
            ) : (
              <HeartIcon className="h-5 w-5 transition-colors" style={{ color: 'rgba(75, 85, 99, 1)' }} />
            )}
          </motion.button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-3">
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.location.href = `/product/${product.id}`
                }}
                className="bg-white p-3 rounded-full transition-all duration-300"
                style={{
                  color: 'rgba(17, 24, 39, 1)',
                  boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary-teal)'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white'
                  e.target.style.color = 'rgba(17, 24, 39, 1)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <EyeIcon className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  color: 'rgba(17, 24, 39, 1)',
                  boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={(e) => {
                  if (product.inStock) {
                    e.target.style.backgroundColor = 'var(--primary-coral)'
                    e.target.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.inStock) {
                    e.target.style.backgroundColor = 'white'
                    e.target.style.color = 'rgba(17, 24, 39, 1)'
                  }
                }}
                whileHover={{ scale: product.inStock ? 1.1 : 1 }}
                whileTap={{ scale: product.inStock ? 0.9 : 1 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ShoppingBagIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium capitalize" style={{ color: 'var(--primary-teal)' }}>
              {product.category}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarSolidIcon 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-200'
                  }`} 
                />
              ))}
              <span className="text-xs ml-1" style={{ color: 'rgba(107, 114, 128, 1)' }}>({product.reviewCount})</span>
            </div>
          </div>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold mb-2 transition-colors line-clamp-2" style={{ color: 'rgba(17, 24, 39, 1)' }}>
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(75, 85, 99, 1)' }}>
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold" style={{ color: 'var(--primary-coral)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm line-through" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-sm font-medium" style={{ color: '#059669' }}>
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full text-white py-3 px-4 rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary-coral)' }}
            onMouseEnter={(e) => {
              if (product.inStock) {
                e.target.style.backgroundColor = 'var(--brand-600)'
              }
            }}
            onMouseLeave={(e) => {
              if (product.inStock) {
                e.target.style.backgroundColor = 'var(--primary-coral)'
              }
            }}
            whileHover={{ scale: product.inStock ? 1.02 : 1 }}
            whileTap={{ scale: product.inStock ? 0.98 : 1 }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
