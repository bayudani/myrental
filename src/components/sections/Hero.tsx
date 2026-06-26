import { motion } from 'framer-motion'
import { Check, ArrowRight, Shield, Clock, Star } from 'lucide-react'
import { Button } from '../ui/button'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 * i, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://taf.co.id/media/5ca2dec78678780284400ca3893329c2?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />

      <div className="container-main relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="pt-24">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
            >
              <Star className="h-3.5 w-3.5 text-yellow-400" />
              Trusted Car Rental Service
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Solusi Rental Mobil{' '}
              <span className="text-brand-500">Premium</span>{' '}
              untuk Perjalanan Anda
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="mb-8 max-w-lg text-lg leading-relaxed text-gray-300"
            >
              Menyediakan layanan rental mobil dengan armada terbaik, harga
              transparan, dan pelayanan profesional. Perjalanan nyaman, aman,
              dan berkesan bersama MyRental.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <a href="#catalog" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Lihat Katalog
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="tel:+6281234567890" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-gray-900 sm:w-auto"
                >
                  Hubungi Kami
                </Button>
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-4 md:gap-6"
            >
              {[
                { icon: Shield, text: 'Armada Terawat' },
                { icon: Clock, text: 'Booking Cepat' },
                { icon: Star, text: 'Harga Transparan' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-white/80">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600/20">
                    <item.icon className="h-3.5 w-3.5 text-brand-400" />
                  </div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://storage.googleapis.com/sahabat-pegadaian-asset-prd/20250108-030849_beli-mobil-baru-atau-bekaswebp.webp?w=800&q=80"
                alt="Premium Car"
                className="relative z-10 w-full object-contain drop-shadow-2xl rounded-lg"
              />

              <div className="absolute -bottom-6 -left-6 z-20 rounded-xl bg-white/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">100+</p>
                    <p className="text-xs text-gray-300">Mobil Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  )
}
