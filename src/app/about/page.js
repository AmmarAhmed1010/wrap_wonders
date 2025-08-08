'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon,
  SparklesIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

const AboutPage = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Handcrafted with Love',
      description: 'Every piece is carefully crafted by skilled artisans who pour their passion into their work.'
    },
    {
      icon: SparklesIcon,
      title: 'Unique & Authentic',
      description: 'Each item tells a story and brings authentic beauty that mass-produced items simply cannot match.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Artisan Network',
      description: 'We partner with talented creators from around the world, supporting local communities and traditions.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Focused',
      description: 'Building connections between artisans and art lovers, creating a global community of creativity.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guaranteed',
      description: 'We stand behind every product with our commitment to exceptional quality and customer satisfaction.'
    },
    {
      icon: TruckIcon,
      title: 'Sustainable Practices',
      description: 'Eco-friendly packaging and sustainable sourcing practices that care for our planet.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & Creative Director',
      bio: 'Former art curator with 15 years of experience discovering and promoting emerging artists worldwide.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Artisan Relations Manager',
      bio: 'Travels the globe building relationships with local artisans and ensuring fair trade practices.',
      image: '/team/marcus.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Quality Assurance Lead',
      bio: 'Ensures every piece meets our high standards for craftsmanship and authenticity.',
      image: '/team/emma.jpg'
    },
    {
      name: 'David Kim',
      role: 'Sustainability Officer',
      bio: 'Leads our eco-friendly initiatives and sustainable packaging programs.',
      image: '/team/david.jpg'
    }
  ]

  const milestones = [
    { year: '2018', event: 'Wrap Wonders founded with 5 artisan partners' },
    { year: '2019', event: 'Reached 100+ unique products in our collection' },
    { year: '2020', event: 'Launched sustainable packaging initiative' },
    { year: '2021', event: 'Expanded to 50+ countries worldwide' },
    { year: '2022', event: 'Partnered with 200+ artisans globally' },
    { year: '2023', event: 'Achieved carbon-neutral shipping' },
    { year: '2024', event: 'Celebrating 10,000+ happy customers' }
  ]

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
              Our Story
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Wrap Wonders was born from a simple belief: that handcrafted beauty has the power to transform 
              spaces and touch hearts. We're more than just a marketplace – we're a bridge connecting talented 
              artisans with people who appreciate authentic, meaningful art.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-coral to-primary-orange mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We exist to celebrate and preserve the art of handcrafting while empowering artisans 
                around the world. Every purchase supports creative communities and helps maintain 
                traditional crafting techniques for future generations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through fair trade practices and direct partnerships, we ensure that artisans receive 
                fair compensation for their incredible work, while customers receive authentic, 
                high-quality pieces that tell a story.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-gradient-to-br from-primary-coral/20 to-primary-teal/20 rounded-3xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-2xl" />
                  <p className="text-lg">Mission Image</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide everything we do, from the artisans we partner with to the 
              way we package and ship your orders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-coral to-primary-orange rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind Wrap Wonders who work tirelessly to bring you 
              the finest handcrafted treasures from around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 mx-auto mb-2 bg-gray-300 rounded-full" />
                    <p className="text-sm">Team Photo</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-coral font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a global community of artisans and art lovers.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-coral to-primary-teal rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                      <div className="text-2xl font-bold text-primary-coral mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-white border-4 border-primary-coral rounded-full relative z-10" />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-gradient-to-r from-primary-coral to-primary-orange rounded-3xl p-12 text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Become part of our global family of art lovers and support artisans worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/shop"
                className="bg-white text-primary-coral px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Our Collection
              </motion.a>
              <motion.a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-coral transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
