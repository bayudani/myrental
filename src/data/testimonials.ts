export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    role: 'Pengusaha',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    text: 'Pelayanan sangat profesional! Mobil bersih, supir ramah, dan tepat waktu. Sangat recommended untuk perjalanan bisnis maupun liburan keluarga.',
  },
  {
    id: '2',
    name: 'Siti Rahmawati',
    role: 'Ibu Rumah Tangga',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    text: 'Pertama kali rental mobil dan pengalamannya luar biasa. Proses cepat, harga transparan, tidak ada biaya tersembunyi. Pasti pakai lagi!',
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    role: 'Travel Agent',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    text: 'Sudah langganan lebih dari 2 tahun. Armada selalu terawat, supir profesional, dan pelayanan 24 jam sangat membantu. MyRental yang terbaik!',
  },
]
