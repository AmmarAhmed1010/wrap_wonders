'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { 
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
  ShareIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import toast from 'react-hot-toast'

const WishlistPage = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    clearWishlist,
    isInWishlist 
  } = useStore()

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId)
    toast.success(`${productName} removed from wishlist`)
  }

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
      toast.success('Wishlist cleared')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Wrap Wonders Wishlist',
          text: 'Check out my wishlist from Wrap Wonders!',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Wishlist link copied to clipboard!')
    }
  }

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-teal-50 to-accent-yellow-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <HeartSolidIcon className="h-8 w-8 text-primary-coral mr-3" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              My Wishlist
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your carefully curated collection of favorite items
          </p>
          
          {wishlist.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <div className="bg-white rounded-2xl shadow-soft px-6 py-4">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-primary-coral">{wishlist.length}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-soft px-6 py-4">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-primary-teal">${totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-soft px-6 py-4">
                <p className="text-sm text-gray-600">You Save</p>
                <p className="text-2xl font-bold text-primary-yellow">${totalSavings.toFixed(2)}</p>
              </div>
            </div>
          )}
        </motion.div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist */
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary-coral to-primary-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-soft">
              <HeartIcon className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items you love to keep track of them and purchase them later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-gradient-to-r from-primary-coral to-primary-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-strong transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingBagIcon className="h-6 w-6 mr-2" />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Actions */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <ShareIcon className="h-4 w-4" />
                  <span>Share Wishlist</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    wishlist.forEach(product => addToCart(product))
                    toast.success('All items added to cart!')
                  }}
                  className="bg-primary-teal text-white px-6 py-2 rounded-full hover:bg-accent-teal-600 transition-colors font-medium"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="text-red-600 hover:text-red-700 px-4 py-2 rounded-full hover:bg-red-50 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>
            </motion.div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    layout
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg" />
                          <p className="text-sm">Product Image</p>
                        </div>
                      </div>

                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-primary-coral text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{product.discount}%
                        </div>
                      )}

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Out of Stock
                        </div>
                      )}

                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-3">
                          <Link
                            href={`/product/${product.id}`}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-primary-teal hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-primary-coral hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingBagIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                            className="bg-white text-gray-900 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary-teal font-medium capitalize">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} 
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-coral transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary-coral">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <HeartSolidIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-primary-coral text-white py-3 px-4 rounded-full hover:bg-brand-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Continue Shopping */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center bg-gradient-to-r from-primary-teal to-accent-teal-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-medium transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingBagIcon className="h-6 w-6 mr-2" />
                Continue Shopping
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
