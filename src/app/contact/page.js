'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Visit Our Studio',
      details: ['123 Artisan Street', 'Creative District, NY 10001', 'United States'],
      color: 'text-primary-coral'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['Customer Service: (555) 123-4567', 'Wholesale Inquiries: (555) 123-4568', 'Mon-Fri: 9AM-6PM EST'],
      color: 'text-primary-teal'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: ['General: hello@wrapwonders.com', 'Support: support@wrapwonders.com', 'Press: press@wrapwonders.com'],
      color: 'text-primary-yellow'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: 'text-primary-orange'
    }
  ]

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'order', label: 'Order Support' },
    { value: 'product', label: 'Product Question' },
    { value: 'wholesale', label: 'Wholesale Inquiry' },
    { value: 'artisan', label: 'Artisan Partnership' },
    { value: 'press', label: 'Press & Media' }
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-7 business days within the US. International shipping varies by location.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original condition. Custom items are final sale.'
    },
    {
      question: 'Do you offer wholesale pricing?',
      answer: 'Yes! We offer wholesale pricing for orders of 10+ items. Contact us for more information.'
    },
    {
      question: 'Are your products handmade?',
      answer: 'Yes, all our products are handcrafted by skilled artisans using traditional techniques and quality materials.'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: ''
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-teal-50 to-accent-yellow-50 pt-24">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Have a question about our products, need help with an order, or want to partner with us? 
              We'd love to hear from you! Our team is here to help make your experience wonderful.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-coral to-primary-orange mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${info.color.replace('text-', 'bg-')}/10`}>
                  <info.icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-primary-coral/10 rounded-full flex items-center justify-center mr-4">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-coral" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-coral text-white py-4 px-6 rounded-full font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-soft">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-primary-teal/10 rounded-full flex items-center justify-center mr-4">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-primary-teal" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Quick answers to common questions</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary-coral/5 to-primary-teal/5 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Can't find what you're looking for? Our customer support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center justify-center space-x-2 bg-primary-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-600 transition-colors"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href="mailto:support@wrapwonders.com"
                      className="flex items-center justify-center space-x-2 border border-primary-coral text-primary-coral px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-coral hover:text-white transition-colors"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>Email Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Visit Our Studio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of the Creative District, our studio showcases our latest collections 
              and hosts artisan workshops throughout the year.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-96 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center text-gray-400">
              <MapPinIcon className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">123 Artisan Street, Creative District, NY 10001</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
