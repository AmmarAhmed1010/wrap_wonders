'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhotoIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const ProductsManager = () => {
  const { products, addProduct, updateProduct, removeProduct } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [sortBy, setSortBy] = useState('name')

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'arts',
    image: '',
    stock: '',
    featured: false,
    tags: []
  })

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'stock':
          return (b.stock || 0) - (a.stock || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

  const categories = ['all', 'arts', 'candles', 'paintings', 'necklaces']

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        rating: 0,
        reviews: 0,
        sold: 0,
        wishlistCount: 0
      }
      addProduct(product)
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: 'arts',
        image: '',
        stock: '',
        featured: false,
        tags: []
      })
      setShowAddModal(false)
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setNewProduct({
      ...product,
      price: product.price.toString(),
      stock: product.stock?.toString() || '0'
    })
    setShowAddModal(true)
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price) {
      const updatedProduct = {
        ...editingProduct,
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0
      }
      updateProduct(editingProduct.id, updatedProduct)
      setEditingProduct(null)
      setNewProduct({
        name: '',
        price: '',
        description: '',
        category: 'arts',
        image: '',
        stock: '',
        featured: false,
        tags: []
      })
      setShowAddModal(false)
    }
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      removeProduct(productId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Products Management
          </h2>
          <p className="text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
            Manage your product catalog and inventory
          </p>
        </div>
        
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium"
          style={{ backgroundColor: 'var(--primary-coral)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6" style={{ boxShadow: 'var(--shadow-soft)' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: 'rgba(209, 213, 219, 1)',
                focusRingColor: 'var(--primary-coral)'
              }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: 'rgba(209, 213, 219, 1)',
              focusRingColor: 'var(--primary-coral)'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
            <option value="rating">Sort by Rating</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 1)' }}>
              {filteredProducts.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                
                {product.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white"
                       style={{ backgroundColor: 'var(--primary-yellow)' }}>
                    Featured
                  </div>
                )}
                
                <div className="absolute top-3 right-3 flex space-x-2">
                  <motion.button
                    onClick={() => handleEditProduct(product)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PencilIcon className="h-4 w-4" style={{ color: 'var(--primary-teal)' }} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold" style={{ color: 'var(--primary-coral)' }}>
                    ${product.price}
                  </span>
                </div>
                
                <p className="text-sm mb-3 line-clamp-2" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 fill-current" style={{ color: 'var(--primary-yellow)' }} />
                    <span className="text-sm font-medium">
                      {product.rating || 0} ({product.reviews || 0})
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    (product.stock || 0) > 10 ? 'bg-green-100 text-green-800' :
                    (product.stock || 0) > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {(product.stock || 0) > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm" style={{ color: 'rgba(107, 114, 128, 1)' }}>
                  <span>Category: {product.category}</span>
                  <span>Sold: {product.sold || 0}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false)
              setEditingProduct(null)
              setNewProduct({
                name: '',
                price: '',
                description: '',
                category: 'arts',
                image: '',
                stock: '',
                featured: false,
                tags: []
              })
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: 'rgba(209, 213, 219, 1)',
                      focusRingColor: 'var(--primary-coral)'
                    }}
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: 'rgba(209, 213, 219, 1)',
                      focusRingColor: 'var(--primary-coral)'
                    }}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: 'rgba(209, 213, 219, 1)',
                      focusRingColor: 'var(--primary-coral)'
                    }}
                  >
                    <option value="arts">Arts</option>
                    <option value="candles">Candles</option>
                    <option value="paintings">Paintings</option>
                    <option value="necklaces">Necklaces</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      borderColor: 'rgba(209, 213, 219, 1)',
                      focusRingColor: 'var(--primary-coral)'
                    }}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{
                    borderColor: 'rgba(209, 213, 219, 1)',
                    focusRingColor: 'var(--primary-coral)'
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{
                    borderColor: 'rgba(209, 213, 219, 1)',
                    focusRingColor: 'var(--primary-coral)'
                  }}
                  placeholder="Enter product description"
                />
              </div>
              
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                    className="rounded"
                    style={{ accentColor: 'var(--primary-coral)' }}
                  />
                  <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    Featured Product
                  </span>
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                    setNewProduct({
                      name: '',
                      price: '',
                      description: '',
                      category: 'arts',
                      image: '',
                      stock: '',
                      featured: false,
                      tags: []
                    })
                  }}
                  className="px-4 py-2 border rounded-lg font-medium"
                  style={{
                    borderColor: 'rgba(209, 213, 219, 1)',
                    color: 'rgba(107, 114, 128, 1)'
                  }}
                >
                  Cancel
                </button>
                <motion.button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="px-6 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: 'var(--primary-coral)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductsManager
