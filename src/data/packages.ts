import { Car, User, Fuel } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Package {
  id: string
  name: string
  description: string
  icon: LucideIcon
  features: string[]
  price: string
  popular: boolean
}

export const packages: Package[] = [
  {
    id: 'lepas-kunci',
    name: 'Lepas Kunci',
    description: 'Sewa mobil tanpa supir. Cocok untuk perjalanan pribadi atau keluarga dengan kebebasan penuh.',
    icon: Car,
    features: [
      'Mobil bersih dan terawat',
      'Bebas atur rute sendiri',
      'Durasi sewa fleksibel',
      'Dokumen lengkap',
      'Asuransi kendaraan',
    ],
    price: 'Rp 350K',
    popular: false,
  },
  {
    id: 'dengan-supir',
    name: 'Include Supir',
    description: 'Sewa mobil lengkap dengan supir profesional. Nyaman dan aman tanpa perlu khawatir mengemudi.',
    icon: User,
    features: [
      'Supir profesional & ramah',
      'Mobil bersih dan terawat',
      'BBM ditanggung pribadi',
      'Durasi fleksibel',
      'Asuransi kendaraan',
    ],
    price: 'Rp 500K',
    popular: true,
  },
  {
    id: 'supir-bbm',
    name: 'Include Supir + BBM',
    description: 'Paket lengkap mobil, supir, dan bahan bakar. Solusi paling praktis untuk perjalanan Anda.',
    icon: Fuel,
    features: [
      'Supir profesional & ramah',
      'Mobil bersih dan terawat',
      'BBM FULL ditanggung',
      'Durasi fleksibel',
      'Asuransi kendaraan',
    ],
    price: 'Rp 650K',
    popular: false,
  },
]
