import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Paket', href: '#packages' },
  { label: 'Katalog', href: '#catalog' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Kontak', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-main flex h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <span className={cn(
            'text-xl font-bold transition-colors',
            scrolled ? 'text-gray-900' : 'text-white'
          )}>
            My<span className="text-brand-600">Rental</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-600',
                scrolled ? 'text-gray-700' : 'text-white/90'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="tel:+6281234567890">
          <Button
            variant={scrolled ? 'default' : 'white'}
            size="sm"
            className="hidden md:inline-flex gap-2"
          >
            <Phone className="h-4 w-4" />
            Hubungi Kami
          </Button>
        </a>
      </div>
    </motion.nav>
  )
}
