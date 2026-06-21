export interface Car {
  id: string
  name: string
  category: string
  price: string
  image: string
  seats: number
  transmission: string
}

export const cars: Car[] = [
  {
    id: 'avanza',
    name: 'Toyota Avanza',
    category: 'MPV',
    price: 'Rp 350.000',
    image: '/images/avanza.png',
    seats: 7,
    transmission: 'Manual',
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    category: 'MPV Premium',
    price: 'Rp 500.000',
    image: '/images/innova.png',
    seats: 7,
    transmission: 'Manual / Matic',
  },
  {
    id: 'brio',
    name: 'Honda Brio',
    category: 'Hatchback',
    price: 'Rp 300.000',
    image: '/images/brio.png',
    seats: 5,
    transmission: 'Manual / Matic',
  },
  {
    id: 'pajero',
    name: 'Mitsubishi Pajero',
    category: 'SUV',
    price: 'Rp 800.000',
    image: '/images/pajero.png',
    seats: 7,
    transmission: 'Matic',
  },
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    category: 'Minibus',
    price: 'Rp 700.000',
    image: '/images/hiace.png',
    seats: 12,
    transmission: 'Manual',
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    category: 'SUV Premium',
    price: 'Rp 900.000',
    image: '/images/fortuner.png',
    seats: 7,
    transmission: 'Matic',
  },
]
