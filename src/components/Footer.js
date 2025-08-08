'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdFavorite
} from 'react-icons/md'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/shop' },
        { name: 'Paintings', href: '/shop?category=paintings' },
        { name: 'Candles', href: '/shop?category=candles' },
        { name: 'Necklaces', href: '/shop?category=necklaces' },
        { name: 'Arts & Crafts', href: '/shop?category=arts' },
        { name: 'Featured Items', href: '/shop?sort=featured' },
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Care Instructions', href: '/care' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Artisan Partners', href: '/artisans' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Press', href: '/press' },
        { name: 'Careers', href: '/careers' },
        { name: 'Wholesale', href: '/wholesale' },
      ]
    },
    {
      title: 'Account',
      links: [
        { name: 'My Account', href: '/account' },
        { name: 'Order History', href: '/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Track Order', href: '/track' },
        { name: 'Gift Cards', href: '/gift-cards' },
        { name: 'Rewards Program', href: '/rewards' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com/wrapwonders', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/wrapwonders', color: 'hover:text-pink-600' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/wrapwonders', color: 'hover:text-blue-400' },
    { name: 'Pinterest', icon: FaPinterestP, href: 'https://pinterest.com/wrapwonders', color: 'hover:text-red-600' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/wrapwonders', color: 'hover:text-red-500' },
  ]

  const paymentMethods = [
    'Visa', 'Mastercard', 'American Express', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'
  ]

  return (
    <footer className="text-white relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, var(--brand-800), var(--primary-coral), var(--accent-teal-600))'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" style={{
          background: 'linear-gradient(135deg, var(--primary-yellow), var(--primary-orange))'
        }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" style={{
          background: 'linear-gradient(135deg, var(--accent-teal-400), var(--primary-coral))'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(135deg, var(--primary-yellow), var(--primary-orange))',
                  boxShadow: '0 10px 25px rgba(235, 197, 88, 0.3)'
                }}>
                  <span className="font-bold text-xl font-script" style={{ color: 'var(--brand-900)' }}>W</span>
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold" style={{
                    background: 'linear-gradient(to right, var(--primary-yellow), var(--primary-orange))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Wrap Wonders
                  </h2>
                  <p className="text-xs text-white/70 -mt-1">Handcrafted with Love</p>
                </div>
              </Link>
              
              <p className="text-white/90 mb-6 leading-relaxed">
                Discover unique handcrafted treasures that tell a story. Each piece is carefully curated from talented artisans around the world, bringing you authentic beauty and exceptional quality.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-white/90">
                  <MdLocationOn className="h-5 w-5" style={{ color: 'var(--primary-yellow)' }} />
                  <span>123 Artisan Street, Creative District, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <MdPhone className="h-5 w-5" style={{ color: 'var(--primary-yellow)' }} />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <MdEmail className="h-5 w-5" style={{ color: 'var(--primary-yellow)' }} />
                  <span>hello@wrapwonders.com</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                      style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--primary-yellow)'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer
