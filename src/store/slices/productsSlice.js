import { createSlice } from '@reduxjs/toolkit'

// Enhanced product data with more details
const mockProducts = [
  {
    id: 1,
    name: "Sunset Dreams Canvas",
    category: "paintings",
    price: 299.99,
    originalPrice: 349.99,
    image: "/products/painting1.jpg",
    images: ["/products/painting1.jpg", "/products/painting1-2.jpg", "/products/painting1-3.jpg"],
    description: "A breathtaking sunset landscape painting that captures the golden hour magic with vibrant colors and masterful brushwork.",
    longDescription: "This stunning canvas painting brings the warmth and beauty of a perfect sunset into your home. Created with premium acrylic paints on high-quality canvas, each brushstroke tells a story of nature's daily masterpiece. The rich oranges, deep purples, and golden yellows create a mesmerizing focal point for any room.",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 127,
    tags: ["landscape", "sunset", "nature", "wall art"],
    dimensions: "24x18 inches",
    material: "Acrylic on Canvas",
    weight: "2.5 lbs",
    sku: "WW-P001",
    discount: 14,
    stock: 15,
    sold: 89
  },
  {
    id: 2,
    name: "Lavender Bliss Candle",
    category: "candles",
    price: 24.99,
    originalPrice: 29.99,
    image: "/products/candle1.jpg",
    images: ["/products/candle1.jpg", "/products/candle1-2.jpg", "/products/candle1-3.jpg"],
    description: "Hand-poured soy candle with natural lavender essential oils for ultimate relaxation.",
    longDescription: "Indulge in the calming essence of our Lavender Bliss candle. Made from 100% natural soy wax and infused with pure lavender essential oil, this candle provides up to 45 hours of burn time. The elegant glass vessel can be repurposed after use.",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ["aromatherapy", "relaxation", "natural", "soy wax"],
    dimensions: "3.5x4 inches",
    material: "Soy Wax, Cotton Wick",
    weight: "0.8 lbs",
    sku: "WW-C001",
    discount: 17,
    burnTime: "45 hours",
    stock: 25,
    sold: 156
  },
  {
    id: 3,
    name: "Ocean Breeze Necklace",
    category: "necklaces",
    price: 89.99,
    originalPrice: 109.99,
    image: "/products/necklace1.jpg",
    images: ["/products/necklace1.jpg", "/products/necklace1-2.jpg", "/products/necklace1-3.jpg"],
    description: "Elegant sterling silver necklace with genuine turquoise pendant, inspired by ocean waves.",
    longDescription: "This exquisite necklace features a hand-selected turquoise stone set in sterling silver, capturing the essence of ocean waves. Each stone is unique, making every piece one-of-a-kind. The adjustable chain ensures a perfect fit for any neckline.",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 64,
    tags: ["jewelry", "sterling silver", "turquoise", "handmade"],
    dimensions: "18-20 inch chain",
    material: "Sterling Silver, Turquoise",
    weight: "0.3 lbs",
    sku: "WW-N001",
    discount: 18,
    stock: 8,
    sold: 43
  },
  {
    id: 4,
    name: "Abstract Harmony",
    category: "paintings",
    price: 199.99,
    originalPrice: 249.99,
    image: "/products/painting2.jpg",
    images: ["/products/painting2.jpg", "/products/painting2-2.jpg"],
    description: "Modern abstract painting with bold colors and dynamic composition.",
    longDescription: "A vibrant abstract piece that brings energy and sophistication to any space. Created with high-quality acrylic paints on gallery-wrapped canvas, this artwork features bold geometric shapes and a harmonious color palette.",
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 52,
    tags: ["abstract", "modern", "colorful", "geometric"],
    dimensions: "20x16 inches",
    material: "Acrylic on Canvas",
    weight: "2.0 lbs",
    sku: "WW-P002",
    discount: 20,
    stock: 12,
    sold: 67
  },
  {
    id: 5,
    name: "Vanilla Mint Candle",
    category: "candles",
    price: 19.99,
    originalPrice: 24.99,
    image: "/products/candle2.jpg",
    images: ["/products/candle2.jpg", "/products/candle2-2.jpg"],
    description: "Refreshing vanilla mint scented candle perfect for any room.",
    longDescription: "A delightful blend of creamy vanilla and fresh mint creates an invigorating yet calming atmosphere. Hand-poured with natural soy wax and cotton wick for a clean, long-lasting burn.",
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 38,
    tags: ["vanilla", "mint", "refreshing", "soy wax"],
    dimensions: "3x3.5 inches",
    material: "Soy Wax, Cotton Wick",
    weight: "0.6 lbs",
    sku: "WW-C002",
    discount: 20,
    burnTime: "35 hours",
    stock: 30,
    sold: 92
  },
  {
    id: 6,
    name: "Rose Gold Pendant",
    category: "necklaces",
    price: 129.99,
    originalPrice: 159.99,
    image: "/products/necklace2.jpg",
    images: ["/products/necklace2.jpg", "/products/necklace2-2.jpg"],
    description: "Delicate rose gold pendant with intricate floral design.",
    longDescription: "This stunning rose gold pendant features an intricate floral pattern that catches the light beautifully. Crafted from high-quality rose gold plated sterling silver, it's perfect for both casual and formal occasions.",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 76,
    tags: ["rose gold", "floral", "delicate", "elegant"],
    dimensions: "16-18 inch chain",
    material: "Rose Gold Plated Sterling Silver",
    weight: "0.2 lbs",
    sku: "WW-N002",
    discount: 19,
    stock: 6,
    sold: 34
  },
  {
    id: 7,
    name: "Ceramic Art Bowl",
    category: "arts",
    price: 45.99,
    originalPrice: 55.99,
    image: "/products/art1.jpg",
    images: ["/products/art1.jpg", "/products/art1-2.jpg"],
    description: "Handcrafted ceramic bowl with unique glazed finish.",
    longDescription: "This beautiful ceramic bowl is hand-thrown and glazed with a unique finish that makes each piece one-of-a-kind. Perfect for serving or as a decorative accent piece.",
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 29,
    tags: ["ceramic", "handcrafted", "bowl", "decorative"],
    dimensions: "8x3 inches",
    material: "Ceramic",
    weight: "1.2 lbs",
    sku: "WW-A001",
    discount: 18,
    stock: 18,
    sold: 23
  },
  {
    id: 8,
    name: "Citrus Burst Candle",
    category: "candles",
    price: 22.99,
    originalPrice: 27.99,
    image: "/products/candle3.jpg",
    images: ["/products/candle3.jpg", "/products/candle3-2.jpg"],
    description: "Energizing citrus blend candle to brighten your day.",
    longDescription: "A vibrant blend of orange, lemon, and grapefruit essential oils creates an energizing atmosphere. Made with premium soy wax for a clean burn that lasts up to 40 hours.",
    inStock: true,
    featured: false,
    rating: 4.3,
    reviewCount: 41,
    tags: ["citrus", "energizing", "orange", "lemon"],
    dimensions: "3.2x4 inches",
    material: "Soy Wax, Cotton Wick",
    weight: "0.7 lbs",
    sku: "WW-C003",
    discount: 18,
    burnTime: "40 hours",
    stock: 22,
    sold: 78
  }
]

const initialState = {
  products: mockProducts,
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'featured',
  priceRange: [0, 500],
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        rating: 0,
        reviewCount: 0,
        tags: action.payload.tags || [],
        images: [action.payload.image],
        originalPrice: action.payload.price * 1.2,
        discount: 0,
        stock: action.payload.stock || 0,
        sold: 0
      }
      state.products.push(newProduct)
    },
    updateProduct: (state, action) => {
      const { id, updates } = action.payload
      const index = state.products.findIndex(product => product.id === id)
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updates }
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setPriceRange,
  setLoading,
  setError
} = productsSlice.actions

// Selectors
export const selectProducts = (state) => state.products.products
export const selectSearchQuery = (state) => state.products.searchQuery
export const selectSelectedCategory = (state) => state.products.selectedCategory
export const selectSortBy = (state) => state.products.sortBy
export const selectPriceRange = (state) => state.products.priceRange
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error

// Complex selectors
export const selectFilteredProducts = (state) => {
  const { products, searchQuery, selectedCategory, sortBy, priceRange } = state.products
  
  let filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })
  
  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      case 'discount':
        return b.discount - a.discount
      default: // featured
        return b.featured ? 1 : -1
    }
  })
  
  return filtered
}

export const selectProductById = (state, productId) => {
  return state.products.products.find(product => product.id === parseInt(productId))
}

export const selectRelatedProducts = (state, productId, category, limit = 4) => {
  return state.products.products
    .filter(p => p.category === category && p.id !== productId)
    .slice(0, limit)
}

export default productsSlice.reducer
