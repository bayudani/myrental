import { motion } from 'framer-motion'
import { Users, Settings, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { cars } from '../../data/cars'
import useEmblaCarousel from 'embla-carousel-react'

const carData = cars

export default function Catalog() {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: true })

  return (
    <section id="catalog" className="py-24">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            Car Catalog
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Koleksi Armada Kami
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Pilih mobil impian Anda dari koleksi armada premium yang kami sediakan.
          </p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carData.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-52 w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
                    {car.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {car.seats} Seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Settings className="h-4 w-4" />
                    {car.transmission}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {car.price}
                    </span>
                    <span className="text-sm text-gray-500">/hari</span>
                  </div>
                  <Button size="sm" className="gap-1">
                    Sewa <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {carData.map((car) => (
              <div
                key={car.id}
                className="min-w-[280px] flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="space-y-3 p-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
                      {car.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Settings className="h-4 w-4" />
                      {car.transmission}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{car.price}</span>
                      <span className="text-sm text-gray-500">/hari</span>
                    </div>
                    <Button size="sm" className="gap-1">
                      Sewa <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
