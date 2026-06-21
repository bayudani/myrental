import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
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
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
      <div className="container-main flex h-16 md:h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-base md:text-lg font-bold text-white">M</span>
          </div>
          <span className={cn(
            'text-lg md:text-xl font-bold transition-colors',
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

        <div className="flex items-center gap-3">
          <a href="tel:+6281234567890" className="md:hidden">
            <Button
              variant={scrolled ? 'default' : 'white'}
              size="icon"
              className="h-9 w-9"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </a>

          <a href="tel:+6281234567890" className="hidden md:inline-flex">
            <Button
              variant={scrolled ? 'default' : 'white'}
              size="sm"
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </Button>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'flex md:hidden items-center justify-center rounded-lg p-2 transition-colors',
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            )}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
                <span className="text-lg font-bold text-gray-900">
                  My<span className="text-brand-600">Rental</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 px-4 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-100 px-6 pt-6 mt-4">
                <a href="tel:+6281234567890">
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Hubungi Kami
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
