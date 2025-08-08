'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/ProductCard'
import { 
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  TagIcon
} from '@heroicons/react/24/outline'

const ShopPage = () => {
  const {
    getFilteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange
  } = useStore()

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [showOnSale, setShowOnSale] = useState(false)
  const [showInStock, setShowInStock] = useState(false)

  const filteredProducts = getFilteredProducts()

  const categories = [
    { id: 'all', name: 'All Products', count: filteredProducts.length },
    { id: 'paintings', name: 'Paintings', count: filteredProducts.filter(p => p.category === 'paintings').length },
    { id: 'candles', name: 'Candles', count: filteredProducts.filter(p => p.category === 'candles').length },
    { id: 'necklaces', name: 'Necklaces', count: filteredProducts.filter(p => p.category === 'necklaces').length },
    { id: 'arts', name: 'Arts & Crafts', count: filteredProducts.filter(p => p.category === 'arts').length }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest First' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'name', name: 'Name: A to Z' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'discount', name: 'Best Deals' }
  ]

  const allTags = [...new Set(filteredProducts.flatMap(p => p.tags))]

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('featured')
    setPriceRange([0, 600])
    setSelectedTags([])
    setMinRating(0)
    setShowOnSale(false)
    setShowInStock(false)
  }

  const finalFilteredProducts = filteredProducts.filter(product => {
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => product.tags.includes(tag))
    const matchesRating = product.rating >= minRating
    const matchesOnSale = !showOnSale || product.discount > 0
    const matchesInStock = !showInStock || product.inStock
    
    return matchesTags && matchesRating && matchesOnSale && matchesInStock
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-teal-50 to-accent-yellow-50 pt-24">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={`lg:w-80 ${filtersOpen ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-coral hover:text-brand-600 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-coral text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-sm ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 600])}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        minRating === rating
                          ? 'bg-primary-coral/10 text-primary-coral'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2">
                          {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-primary-coral text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Filters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Additional Filters</h4>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnSale}
                    onChange={(e) => setShowOnSale(e.target.checked)}
                    className="w-4 h-4 text-primary-coral border-gray-300 rounded focus:ring-primary-coral"
                  />
                  <span className="text-gray-700">On Sale</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="w-4 h-4 text-primary-coral border-gray-300 rounded focus:ring-primary-coral"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              className="bg-white rounded-2xl shadow-soft p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FunnelIcon className="h-5 w-5" />
                    <span>Filters</span>
                  </button>
                  
                  <div className="text-gray-600">
                    <span className="font-medium text-gray-900">{finalFilteredProducts.length}</span> products found
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-coral text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-coral text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <ListBulletIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            {finalFilteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-coral text-white px-8 py-3 rounded-full hover:bg-brand-600 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                className={`grid gap-8 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
                layout
              >
                <AnimatePresence>
                  {finalFilteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Load More Button (if needed) */}
            {finalFilteredProducts.length > 0 && finalFilteredProducts.length >= 12 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <button className="bg-gradient-to-r from-primary-coral to-primary-orange text-white px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all duration-300 transform hover:scale-105">
                  Load More Products
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
