import { motion } from 'framer-motion'
import { Car, Users, Award, MapPin } from 'lucide-react'

const stats = [
  { icon: Car, value: '50+', label: 'Total Armada' },
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Award, value: '5+', label: 'Years Experience' },
  { icon: MapPin, value: '10+', label: 'City Coverage' },
]

export default function Stats() {
  return (
    <section className="bg-brand-600 py-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <span className="mb-1 text-4xl font-bold text-white md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-white/80">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
