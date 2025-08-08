'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { 
  SparklesIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
  GiftIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
  const { featuredProducts, products } = useStore()

  const categories = [
    {
      name: 'Paintings',
      description: 'Original artwork that transforms any space',
      href: '/shop?category=paintings',
      color: 'from-primary-coral to-primary-orange',
      icon: '🎨'
    },
    {
      name: 'Candles',
      description: 'Hand-poured candles with natural scents',
      href: '/shop?category=candles',
      color: 'from-primary-teal to-accent-teal-400',
      icon: '🕯️'
    },
    {
      name: 'Necklaces',
      description: 'Elegant jewelry crafted with care',
      href: '/shop?category=necklaces',
      color: 'from-primary-yellow to-accent-yellow-400',
      icon: '💎'
    },
    {
      name: 'Arts & Crafts',
      description: 'Unique handmade treasures',
      href: '/shop?category=arts',
      color: 'from-primary-orange to-primary-coral',
      icon: '✨'
    }
  ]

  const features = [
    {
      icon: HeartIcon,
      title: 'Handcrafted with Love',
      description: 'Every piece is carefully made by skilled artisans'
    },
    {
      icon: TruckIcon,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50 worldwide'
    },
    {
      icon: ShieldCheckIcon,
      title: '30-Day Returns',
      description: 'Not satisfied? Return within 30 days for a full refund'
    },
    {
      icon: GiftIcon,
      title: 'Gift Wrapping',
      description: 'Beautiful gift wrapping available for all orders'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: 'The quality is absolutely amazing! My painting arrived perfectly packaged and looks even better in person.',
      avatar: '/avatars/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'I\'ve ordered multiple candles and they all smell incredible. The burn time is excellent too!',
      avatar: '/avatars/michael.jpg'
    },
    {
      name: 'Emma Rodriguez',
      location: 'Austin, TX',
      rating: 5,
      text: 'The necklace I bought is stunning and unique. I get compliments every time I wear it!',
      avatar: '/avatars/emma.jpg'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '200+', label: 'Artisan Partners' },
    { number: '50+', label: 'Countries Served' },
    { number: '4.9', label: 'Average Rating' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, var(--brand-50) 0%, var(--accent-teal-50) 50%, var(--accent-yellow-50) 100%)'
        }} />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: 'rgba(207, 67, 105, 0.2)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-display font-bold mb-8"
              style={{ color: 'var(--foreground)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
            >
              Wrap
              <span style={{
                background: 'linear-gradient(to right, var(--primary-coral), var(--primary-orange), var(--primary-teal))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {' '}Wonders
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed"
              style={{ color: 'rgba(31, 41, 55, 0.8)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Discover unique handcrafted treasures that tell a story. 
              <span style={{ color: 'var(--primary-coral)', fontWeight: '500' }}>Authentic beauty</span> from 
              talented artisans worldwide.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link
                href="/shop"
                className="group text-white px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                style={{
                  background: 'linear-gradient(to right, var(--primary-coral), var(--primary-orange))',
                  boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-strong)'}
                onMouseLeave={(e) => e.target.style.boxShadow = 'var(--shadow-soft)'}
              >
                <SparklesIcon className="h-6 w-6" />
                <span>Shop Collection</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="group px-10 py-5 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                style={{
                  border: '2px solid var(--primary-teal)',
                  color: 'var(--primary-teal)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary-teal)'
                  e.target.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'var(--primary-teal)'
                }}
              >
                <HeartIcon className="h-6 w-6" />
                <span>Our Story</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full flex justify-center" style={{ border: '2px solid var(--primary-coral)' }}>
            <div className="w-1 h-3 rounded-full mt-2" style={{ backgroundColor: 'var(--primary-coral)' }} />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Shop by Category
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
              Explore our carefully curated collections of handcrafted treasures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative rounded-3xl p-8 text-white overflow-hidden h-64 flex flex-col justify-between" style={{
                    background: category.color.includes('coral') ? 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))' :
                               category.color.includes('teal') ? 'linear-gradient(135deg, var(--primary-teal), var(--accent-teal-400))' :
                               category.color.includes('yellow') ? 'linear-gradient(135deg, var(--primary-yellow), var(--accent-yellow-400))' :
                               'linear-gradient(135deg, var(--primary-orange), var(--primary-coral))'
                  }}>
                    <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {category.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">
                        {category.name}
                      </h3>
                      <p className="text-white/90">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-white/90 group-hover:text-white transition-colors">
                      <span className="font-medium">Explore</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Featured Products
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
              Handpicked favorites from our artisan community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(to right, var(--primary-teal), var(--accent-teal-400))',
                boxShadow: 'var(--shadow-soft)'
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = 'var(--shadow-medium)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'var(--shadow-soft)'}
            >
              <span>View All Products</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Why Choose Wrap Wonders?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
              We're committed to providing you with the best handcrafted products and exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{
                  background: 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))',
                  boxShadow: 'var(--shadow-soft)'
                }}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-12 text-white text-center" style={{
            background: 'linear-gradient(to right, var(--primary-coral), var(--primary-orange), var(--primary-teal))'
          }}>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              What Our Customers Say
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
              Real reviews from real customers who love our handcrafted products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white rounded-2xl p-8"
                style={{ boxShadow: 'var(--shadow-soft)' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                
                <p className="mb-6 leading-relaxed" style={{ color: 'rgba(55, 65, 81, 0.8)' }}>
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{
                    background: 'linear-gradient(135deg, var(--primary-coral), var(--primary-orange))'
                  }}>
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--foreground)' }}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgba(31, 41, 55, 0.7)' }}>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl p-12 text-white text-center"
            style={{
              background: 'linear-gradient(to right, var(--primary-teal), var(--accent-teal-400))'
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlobeAltIcon className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-display font-bold mb-6">
              Join Our Global Community
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get exclusive access to new arrivals, artisan stories, and special offers. 
              Join 10,000+ art lovers worldwide!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4"
                style={{
                  color: 'var(--foreground)',
                  backgroundColor: 'white',
                  borderColor: 'transparent'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.3)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
              <motion.button
                className="px-8 py-4 rounded-full font-semibold transition-colors"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--primary-teal)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
