import { motion } from 'framer-motion'
import { bentoFeatures } from '../../data/features'
import { cn } from '../../lib/utils'

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-2',
  large: 'col-span-2 row-span-2',
  wide: 'col-span-2 row-span-1',
}

const colorClasses = {
  red: 'bg-brand-600 text-white',
  white: 'bg-white text-gray-900 border border-gray-200',
  dark: 'bg-gray-900 text-white',
}

export default function BentoFeatures() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            Fitur Unggulan
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Kenyamanan & Keamanan Terjamin
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Kami menghadirkan layanan terbaik untuk memastikan setiap perjalanan Anda berkesan.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {bentoFeatures.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8',
                sizeClasses[feature.size],
                colorClasses[feature.color]
              )}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-inherit">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold md:text-xl">
                {feature.title}
              </h3>
              <p className={cn(
                'text-sm leading-relaxed',
                feature.color === 'red' && 'text-white/80',
                feature.color === 'white' && 'text-gray-600',
                feature.color === 'dark' && 'text-gray-300'
              )}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
