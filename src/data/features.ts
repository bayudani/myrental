import {
  Shield,
  Clock,
  Car,
  Headphones,
  CreditCard,
  Route,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Advantage {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface BentoFeature {
  id: string
  title: string
  description: string
  icon: LucideIcon
  size: 'small' | 'medium' | 'large' | 'wide'
  color: 'red' | 'white' | 'dark'
}

export const advantages: Advantage[] = [
  {
    id: 'armada',
    title: 'Armada Terawat',
    description: 'Semua mobil dalam kondisi prima dan rutin diservis',
    icon: Car,
  },
  {
    id: 'driver',
    title: 'Driver Profesional',
    description: 'Supir berpengalaman dan berlisensi resmi',
    icon: Headphones,
  },
  {
    id: 'harga',
    title: 'Harga Transparan',
    description: 'Tanpa biaya tersembunyi, sesuai kesepakatan',
    icon: CreditCard,
  },
  {
    id: 'booking',
    title: 'Booking Cepat',
    description: 'Proses sewa cepat dan mudah',
    icon: Clock,
  },
  {
    id: 'support',
    title: 'Support 24/7',
    description: 'Layanan bantuan kapan pun Anda butuh',
    icon: Route,
  },
  {
    id: 'aman',
    title: 'Perjalanan Aman',
    description: 'Asuransi lengkap untuk perjalanan Anda',
    icon: Shield,
  },
]

export const bentoFeatures: BentoFeature[] = [
  {
    id: 'luxury',
    title: 'Premium Armada',
    description: 'Koleksi mobil premium dengan interior mewah, performa terbaik, dan perawatan berkala untuk pengalaman berkendara eksklusif.',
    icon: Car,
    size: 'wide',
    color: 'red',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Tim support profesional siap membantu Anda kapan pun, di mana pun, 24 jam nonstop.',
    icon: Headphones,
    size: 'small',
    color: 'white',
  },
  {
    id: 'booking',
    title: 'Fast Booking',
    description: 'Pesan dalam 5 menit, mobil siap dalam hitungan jam. Proses cepat tanpa ribet.',
    icon: Clock,
    size: 'small',
    color: 'white',
  },
  {
    id: 'insurance',
    title: 'Full Insurance',
    description: 'Setiap perjalanan dilindungi asuransi kendaraan komprehensif untuk keamanan dan kenyamanan maksimal Anda.',
    icon: Shield,
    size: 'wide',
    color: 'dark',
  },
  {
    id: 'flexible',
    title: 'Flexible Rental',
    description: 'Pilih durasi sewa sesuai kebutuhan. Harian, mingguan, atau bulanan dengan harga spesial.',
    icon: CreditCard,
    size: 'small',
    color: 'white',
  },
  {
    id: 'safe',
    title: 'Safe Journey',
    description: 'Standar kebersihan dan keamanan tinggi untuk setiap kendaraan. Perjalanan nyaman dan aman.',
    icon: Route,
    size: 'small',
    color: 'white',
  },
  {
    id: 'driver',
    title: 'Pro Driver',
    description: 'Supir berpengalaman, berlisensi, dan profesional siap mengantar Anda ke tujuan dengan aman.',
    icon: Shield,
    size: 'small',
    color: 'red',
  },
]
