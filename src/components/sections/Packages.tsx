import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import { packages } from '../../data/packages'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Packages() {
  return (
    <section id="packages" className="bg-gray-50 py-24">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            Rental Packages
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Pilih Paket Rental Terbaik
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Kami menawarkan fleksibilitas layanan rental mobil sesuai kebutuhan Anda.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl ${
                pkg.popular
                  ? 'border-brand-600 ring-1 ring-brand-600'
                  : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    POPULER
                  </span>
                </div>
              )}

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <pkg.icon className="h-7 w-7" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {pkg.name}
              </h3>
              <p className="mb-6 text-gray-600">{pkg.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {pkg.price}
                </span>
                <span className="text-gray-500">/hari</span>
              </div>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? 'default' : 'outline'}
                className="w-full"
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
