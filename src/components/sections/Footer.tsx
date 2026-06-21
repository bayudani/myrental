import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const footerLinks = {
  menu: [
    { label: 'Beranda', href: '#hero' },
    { label: 'Paket', href: '#packages' },
    { label: 'Katalog', href: '#catalog' },
    { label: 'Testimoni', href: '#testimonials' },
  ],
  services: [
    { label: 'Rental Lepas Kunci', href: '#packages' },
    { label: 'Rental Dengan Supir', href: '#packages' },
    { label: 'Rental Supir + BBM', href: '#packages' },
    { label: 'Sewa Harian', href: '#packages' },
    { label: 'Sewa Mingguan', href: '#packages' },
  ],
  contact: [
    { icon: Phone, text: '+62 812-3456-7890' },
    { icon: Mail, text: 'info@myrental.com' },
    { icon: MapPin, text: 'Jakarta, Indonesia' },
  ],
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container-main py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="text-xl font-bold">
                My<span className="text-brand-500">Rental</span>
              </span>
            </a>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Penyedia layanan rental mobil premium di Indonesia. Armada terbaik, harga transparan, pelayanan profesional untuk perjalanan Anda.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Menu
            </h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Layanan
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Kontak
            </h4>
            <ul className="space-y-4">
              {footerLinks.contact.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-gray-400">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-main flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2024 <a href="https://byvictech.site" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">byvictech.site</a>
          </p>
          <p className="text-sm text-gray-500">
            Premium Car Rental Service
          </p>
        </div>
      </div>
    </footer>
  )
}
