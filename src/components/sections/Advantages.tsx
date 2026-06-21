import { motion } from 'framer-motion'
import { advantages } from '../../data/features'

export default function Advantages() {
  return (
    <section className="py-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Kenapa Memilih MyRental?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg">
                <adv.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-gray-900">
                {adv.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
