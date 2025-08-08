import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  },
  {
    id: 3,
    name: "Golden Leaf Necklace",
    category: "necklaces",
    price: 89.99,
    originalPrice: 109.99,
    image: "/products/necklace1.jpg",
    images: ["/products/necklace1.jpg", "/products/necklace1-2.jpg", "/products/necklace1-3.jpg"],
    description: "Elegant gold-plated leaf pendant on a delicate chain, perfect for everyday wear.",
    longDescription: "This exquisite necklace features a beautifully crafted leaf pendant in 18k gold plating. The delicate 18-inch chain is adjustable and hypoallergenic, making it perfect for sensitive skin. Each piece comes with a luxury gift box.",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 156,
    tags: ["jewelry", "gold", "leaf", "elegant"],
    dimensions: "18 inch chain",
    material: "18k Gold Plated Sterling Silver",
    weight: "0.1 lbs",
    sku: "WW-N001",
    discount: 18,
  },
  {
    id: 4,
    name: "Ocean Waves Art",
    category: "arts",
    price: 199.99,
    originalPrice: 249.99,
    image: "/products/art1.jpg",
    images: ["/products/art1.jpg", "/products/art1-2.jpg", "/products/art1-3.jpg"],
    description: "Mixed media artwork inspired by ocean waves and coastal beauty.",
    longDescription: "This captivating mixed media piece combines watercolor, acrylic, and textural elements to create a dynamic representation of ocean waves. The layered technique creates depth and movement that brings the power of the sea to life.",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 73,
    tags: ["ocean", "waves", "mixed media", "coastal"],
    dimensions: "20x16 inches",
    material: "Mixed Media on Paper",
    weight: "1.8 lbs",
    sku: "WW-A001",
    discount: 20,
  },
  {
    id: 5,
    name: "Vanilla Spice Candle",
    category: "candles",
    price: 26.99,
    originalPrice: 32.99,
    image: "/products/candle2.jpg",
    images: ["/products/candle2.jpg", "/products/candle2-2.jpg", "/products/candle2-3.jpg"],
    description: "Warm vanilla and spice blend in a beautiful ceramic vessel.",
    longDescription: "Experience the cozy warmth of our Vanilla Spice candle. This premium blend combines Madagascar vanilla with warm spices like cinnamon and nutmeg. Housed in a handcrafted ceramic vessel that doubles as home decor.",
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 94,
    tags: ["vanilla", "spice", "ceramic", "cozy"],
    dimensions: "4x3.5 inches",
    material: "Soy Wax, Ceramic Vessel",
    weight: "1.2 lbs",
    sku: "WW-C002",
    discount: 18,
    burnTime: "50 hours",
  },
  {
    id: 6,
    name: "Rose Gold Chain",
    category: "necklaces",
    price: 124.99,
    originalPrice: 149.99,
    image: "/products/necklace2.jpg",
    images: ["/products/necklace2.jpg", "/products/necklace2-2.jpg", "/products/necklace2-3.jpg"],
    description: "Minimalist rose gold chain perfect for layering.",
    longDescription: "This sophisticated rose gold chain is the epitome of minimalist elegance. Crafted from premium rose gold plated sterling silver, it's perfect for layering or wearing alone. The adjustable length ensures a perfect fit.",
    inStock: false,
    featured: false,
    rating: 4.8,
    reviewCount: 201,
    tags: ["rose gold", "minimalist", "layering", "chain"],
    dimensions: "16-18 inch adjustable",
    material: "Rose Gold Plated Sterling Silver",
    weight: "0.15 lbs",
    sku: "WW-N002",
    discount: 17,
  },
  {
    id: 7,
    name: "Abstract Harmony",
    category: "paintings",
    price: 449.99,
    originalPrice: 529.99,
    image: "/products/painting2.jpg",
    images: ["/products/painting2.jpg", "/products/painting2-2.jpg", "/products/painting2-3.jpg"],
    description: "Bold abstract painting with vibrant colors and dynamic composition.",
    longDescription: "This striking abstract piece features bold brushstrokes and a vibrant color palette that creates visual harmony. The large format makes it perfect as a statement piece in modern interiors.",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 45,
    tags: ["abstract", "bold", "modern", "statement"],
    dimensions: "36x24 inches",
    material: "Oil on Canvas",
    weight: "4.2 lbs",
    sku: "WW-P002",
    discount: 15,
  },
  {
    id: 8,
    name: "Moonlight Serenade Candle",
    category: "candles",
    price: 34.99,
    originalPrice: 42.99,
    image: "/products/candle3.jpg",
    images: ["/products/candle3.jpg", "/products/candle3-2.jpg", "/products/candle3-3.jpg"],
    description: "Luxurious candle with jasmine and sandalwood notes.",
    longDescription: "Our most luxurious candle blend featuring exotic jasmine flowers and warm sandalwood. This premium candle is hand-poured in small batches using the finest ingredients and comes in an elegant black glass vessel.",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 67,
    tags: ["luxury", "jasmine", "sandalwood", "premium"],
    dimensions: "4x4.5 inches",
    material: "Premium Soy Blend, Black Glass",
    weight: "1.5 lbs",
    sku: "WW-C003",
    discount: 19,
    burnTime: "60 hours",
  }
]

export const useStore = create(
  persist(
    (set, get) => ({
      // Products
      products: mockProducts,
      featuredProducts: mockProducts.filter(p => p.featured),
      
      // Cart
      cart: [],
      cartOpen: false,
      
      // Wishlist
      wishlist: [],
      
      // User
      user: null,
      
      // UI States
      mobileMenuOpen: false,
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'featured',
      priceRange: [0, 600],
      
      // Notifications
      notifications: [],
      
      // Actions
      addToCart: (product, quantity = 1) => {
        const { cart } = get()
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity }]
          })
        }
        
        // Add notification
        get().addNotification({
          type: 'success',
          message: `${product.name} added to cart!`
        })
      },
      
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        })
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set({ cartOpen: !get().cartOpen }),
      
      closeCart: () => set({ cartOpen: false }),
      
      // Wishlist Actions
      addToWishlist: (product) => {
        const { wishlist } = get()
        const existingItem = wishlist.find(item => item.id === product.id)
        
        if (!existingItem) {
          set({
            wishlist: [...wishlist, product]
          })
          get().addNotification({
            type: 'success',
            message: `${product.name} added to wishlist!`
          })
        }
      },
      
      removeFromWishlist: (productId) => {
        const product = get().wishlist.find(item => item.id === productId)
        set({
          wishlist: get().wishlist.filter(item => item.id !== productId)
        })
        if (product) {
          get().addNotification({
            type: 'info',
            message: `${product.name} removed from wishlist`
          })
        }
      },
      
      toggleWishlist: (product) => {
        const { wishlist } = get()
        const existingItem = wishlist.find(item => item.id === product.id)
        
        if (existingItem) {
          get().removeFromWishlist(product.id)
        } else {
          get().addToWishlist(product)
        }
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId)
      },
      
      clearWishlist: () => set({ wishlist: [] }),
      
      // UI Actions
      toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
      
      closeMobileMenu: () => set({ mobileMenuOpen: false }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setSortBy: (sortBy) => set({ sortBy }),
      
      setPriceRange: (priceRange) => set({ priceRange }),
      
      // Notification Actions
      addNotification: (notification) => {
        const id = Date.now()
        set({
          notifications: [...get().notifications, { ...notification, id }]
        })
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          get().removeNotification(id)
        }, 5000)
      },
      
      removeNotification: (id) => {
        set({
          notifications: get().notifications.filter(n => n.id !== id)
        })
      },
      
      // Computed values
      getCartTotal: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getCartItemsCount: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      
      getCartSavings: () => {
        const { cart } = get()
        return cart.reduce((total, item) => {
          const savings = (item.originalPrice - item.price) * item.quantity
          return total + savings
        }, 0)
      },
      
      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory, sortBy, priceRange } = get()
        
        let filtered = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
            case 'name':
              return a.name.localeCompare(b.name)
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
      },
      
      getProductById: (id) => {
        return get().products.find(product => product.id === parseInt(id))
      },
      
      getRelatedProducts: (productId, category, limit = 4) => {
        const { products } = get()
        return products
          .filter(p => p.category === category && p.id !== productId)
          .slice(0, limit)
      },
      
      // Admin Actions (for dashboard)
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
          rating: 0,
          reviewCount: 0,
          tags: product.tags || [],
          images: [product.image],
          originalPrice: product.price * 1.2, // 20% markup for original price
          discount: 0,
        }
        set({
          products: [...get().products, newProduct]
        })
      },
      
      updateProduct: (productId, updates) => {
        set({
          products: get().products.map(product =>
            product.id === productId
              ? { ...product, ...updates }
              : product
          )
        })
      },
      
      deleteProduct: (productId) => {
        set({
          products: get().products.filter(product => product.id !== productId)
        })
      },
      
      // Analytics
      getTopCategories: () => {
        const { products } = get()
        const categoryCount = {}
        products.forEach(product => {
          categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
        })
        return Object.entries(categoryCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
      },
      
      getTotalRevenue: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'wrap-wonders-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        selectedCategory: state.selectedCategory,
        sortBy: state.sortBy,
        priceRange: state.priceRange,
      }),
    }
  )
)
