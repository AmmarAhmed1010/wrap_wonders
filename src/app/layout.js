import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import NotificationSystem from '@/components/NotificationSystem'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata = {
  title: 'Wrap Wonders - Premium Handcrafted Arts & Crafts',
  description: 'Discover unique handcrafted arts, candles, paintings, and necklaces at Wrap Wonders. Premium quality, creative designs, and exceptional craftsmanship.',
  keywords: 'handcrafted, arts, candles, paintings, necklaces, premium, creative, crafts',
  authors: [{ name: 'Wrap Wonders' }],
  creator: 'Wrap Wonders',
  publisher: 'Wrap Wonders',
  openGraph: {
    title: 'Wrap Wonders - Premium Handcrafted Arts & Crafts',
    description: 'Discover unique handcrafted arts, candles, paintings, and necklaces.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wrap Wonders - Premium Handcrafted Arts & Crafts',
    description: 'Discover unique handcrafted arts, candles, paintings, and necklaces.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className="font-sans bg-gradient-to-br from-white via-accent-teal-50/30 to-accent-yellow-50/30 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CartSidebar />
        <NotificationSystem />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              borderRadius: '12px',
              border: '1px solid #f3f4f6',
            },
            success: {
              iconTheme: {
                primary: '#CF4369',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
