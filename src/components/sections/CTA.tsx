import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 to-brand-700 py-20">
      <div className="container-main relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Siap untuk Perjalanan Terbaik Anda?
            </h2>
            <p className="mb-8 max-w-lg text-lg text-white/80">
              Hubungi kami sekarang dan dapatkan penawaran terbaik untuk rental mobil Anda. Tim kami siap melayani 24/7.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="white" size="lg" className="w-full gap-2 sm:w-auto">
                  Hubungi via WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="tel:+6281234567890" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-brand-600 sm:w-auto"
                >
                  Telepon Sekarang
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80"
              alt="Premium Car"
              className="w-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
