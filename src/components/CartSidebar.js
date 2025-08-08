'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { 
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CartSidebar = () => {
  const { 
    cartOpen, 
    closeCart, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    getCartTotal, 
    getCartSavings,
    getCartItemsCount,
    toggleWishlist,
    isInWishlist
  } = useStore()

  const subtotal = getCartTotal()
  const savings = getCartSavings()
  const itemCount = getCartItemsCount()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    updateCartQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId)
    toast.success(`${productName} removed from cart`)
  }

  const handleMoveToWishlist = (product) => {
    toggleWishlist(product)
    removeFromCart(product.id)
    toast.success(`${product.name} moved to wishlist`)
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col"
            style={{ boxShadow: 'var(--shadow-strong)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
              <div className="flex items-center space-x-3">
                <ShoppingBagIcon className="h-6 w-6" style={{ color: 'var(--primary-coral)' }} />
                <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                  Shopping Cart
                </h2>
                {itemCount > 0 && (
                  <span className="text-white text-sm rounded-full px-2 py-1 font-medium" style={{ backgroundColor: 'var(--primary-coral)' }}>
                    {itemCount}
                  </span>
                )}
              </div>
              <motion.button
                onClick={closeCart}
                className="p-2 rounded-full transition-colors"
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(243, 244, 246, 1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-6 w-6" style={{ color: 'rgba(107, 114, 128, 1)' }} />
              </motion.button>
            </div>

            {cart.length === 0 ? (
              /* Empty Cart */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(243, 244, 246, 1)' }}>
                  <ShoppingBagIcon className="h-12 w-12" style={{ color: 'rgba(156, 163, 175, 1)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Your cart is empty</h3>
                <p className="mb-8" style={{ color: 'rgba(75, 85, 99, 1)' }}>
                  Discover our amazing handcrafted products and add them to your cart.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="text-white px-8 py-3 rounded-full transition-colors font-medium"
                  style={{ backgroundColor: 'var(--primary-coral)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--brand-600)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-coral)'}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 rounded-2xl p-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        layout
                      >
                        <div className="flex space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="w-10 h-10 bg-gray-300 rounded" />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate mb-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 capitalize">
                              {item.category}
                            </p>
                            
                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="font-semibold text-primary-coral">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <MinusIcon className="h-4 w-4 text-gray-600" />
                                </motion.button>
                                
                                <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <PlusIcon className="h-4 w-4 text-gray-600" />
                                </motion.button>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  onClick={() => handleMoveToWishlist(item)}
                                  className="p-2 text-gray-400 hover:text-primary-coral transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  title="Move to Wishlist"
                                >
                                  {isInWishlist(item.id) ? (
                                    <HeartSolidIcon className="h-5 w-5 text-primary-coral" />
                                  ) : (
                                    <HeartIcon className="h-5 w-5" />
                                  )}
                                </motion.button>
                                
                                <motion.button
                                  onClick={() => handleRemoveItem(item.id, item.name)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  title="Remove Item"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span>-${savings.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    {subtotal < 50 && subtotal > 0 && (
                      <div className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-primary-coral">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full bg-primary-coral text-white py-4 px-6 rounded-full font-semibold text-center hover:bg-brand-600 transition-colors flex items-center justify-center"
                    >
                      Checkout - ${total.toFixed(2)}
                    </Link>
                    
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-full font-medium text-center hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CartSidebar
