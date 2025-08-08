'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  ShareIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ProductDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { products, addToCart, featuredProducts } = useStore()
  const product = products.find(p => p.id === parseInt(params.id))

  useEffect(() => {
    if (!product) {
      router.push('/shop')
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-accent-teal-50 to-accent-yellow-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`)
  }

  const relatedProducts = featuredProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const productImages = [
    product.image,
    `/products/${product.category}2.jpg`,
    `/products/${product.category}3.jpg`,
    `/products/${product.category}4.jpg`
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely beautiful! The quality exceeded my expectations and it arrived perfectly packaged.",
      verified: true
    },
    {
      id: 2,
      name: "Michael R.",
      rating: 5,
      date: "1 month ago", 
      comment: "Love this piece! It's exactly as described and the craftsmanship is outstanding.",
      verified: true
    },
    {
      id: 3,
      name: "Emma L.",
      rating: 4,
      date: "3 weeks ago",
      comment: "Great product, fast shipping. Would definitely recommend to others!",
      verified: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-teal-50 to-accent-yellow-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="hover:text-primary-coral transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary-coral transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-primary-coral transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </motion.nav>

        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-coral transition-colors mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-soft">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-lg" />
                  <p className="text-lg font-medium">{product.name}</p>
                  <p className="text-sm capitalize">{product.category}</p>
                </div>
              </div>
              
              {/* Image Navigation */}
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : productImages.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-medium hover:bg-white transition-all"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedImage(selectedImage < productImages.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-medium hover:bg-white transition-all"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedImage === index ? 'bg-primary-coral' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary-coral' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-teal/10 text-primary-teal capitalize">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-coral transition-colors">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">4.9 (127 reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-primary-coral">
                  ${product.price}
                </span>
                {product.featured && (
                  <span className="bg-gradient-to-r from-primary-coral to-primary-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-lg font-medium">−</span>
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-primary-coral to-primary-orange text-white py-4 px-6 rounded-full font-semibold text-lg hover:shadow-strong transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button className="w-full border-2 border-primary-teal text-primary-teal py-4 px-6 rounded-full font-semibold text-lg hover:bg-primary-teal hover:text-white transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-soft">
                <TruckIcon className="h-6 w-6 text-primary-teal" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-soft">
                <ShieldCheckIcon className="h-6 w-6 text-primary-teal" />
                <div>
                  <p className="font-medium text-gray-900">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">30-day returns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="bg-white rounded-2xl shadow-soft overflow-hidden mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'description', name: 'Description' },
                { id: 'reviews', name: 'Reviews (127)' },
                { id: 'shipping', name: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-coral text-primary-coral'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Handcrafted with premium materials</li>
                        <li>• Unique design and attention to detail</li>
                        <li>• Perfect for gifting or personal use</li>
                        <li>• Sustainably sourced materials</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Category: {product.category}</li>
                        <li>• Handmade: Yes</li>
                        <li>• Care: Handle with care</li>
                        <li>• Origin: Artisan crafted</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                    <button className="bg-primary-coral text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-coral rounded-full flex items-center justify-center text-white font-medium">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <p className="text-sm text-gray-600">{review.date}</p>
                            </div>
                          </div>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Free shipping on orders over $50</li>
                        <li>• Standard shipping: 3-5 business days</li>
                        <li>• Express shipping: 1-2 business days</li>
                        <li>• International shipping available</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Return Policy</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 30-day return window</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free returns on defective items</li>
                        <li>• Refunds processed within 5-7 days</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-lg" />
                          <p className="text-xs">Product Image</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-coral transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary-coral font-bold">${relatedProduct.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
