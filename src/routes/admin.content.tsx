import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { content } from '../lib/admin-store'
import { cars, type Car } from '../data/cars'
import { packages, type Package } from '../data/packages'
import { testimonials, type Testimonial } from '../data/testimonials'
import { Car as CarIcon, Package as PackageIcon, MessageSquare, RotateCcw } from 'lucide-react'

export const Route = createFileRoute('/admin/content')({
  component: ContentPage,
})

type Tab = 'cars' | 'packages' | 'testimonials'

function ContentPage() {
  const [tab, setTab] = useState<Tab>('cars')

  const tabs = [
    { id: 'cars' as Tab, label: 'Armada', icon: CarIcon, count: cars.length },
    { id: 'packages' as Tab, label: 'Paket', icon: PackageIcon, count: packages.length },
    { id: 'testimonials' as Tab, label: 'Testimoni', icon: MessageSquare, count: testimonials.length },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Manajemen Konten</h1>
        <p className="text-gray-500">Kelola data armada, paket, dan testimoni</p>
      </div>

      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{t.count}</span>
          </button>
        ))}
      </div>

      {tab === 'cars' && <CarTable />}
      {tab === 'packages' && <PackageTable />}
      {tab === 'testimonials' && <TestimonialTable />}
    </div>
  )
}

function CarTable() {
  const [data, setData] = useState<Car[]>(() => content.get<Car[]>('cars', cars))
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Car | null>(null)

  const save = (newData: Car[]) => {
    content.set('cars', newData)
    setData(newData)
  }

  const reset = () => {
    if (confirm('Reset ke data default?')) {
      content.reset('cars')
      setData(cars)
    }
  }

  const startEdit = (item: Car) => {
    setEditing(item.id)
    setForm({ ...item })
  }

  const saveEdit = () => {
    if (!form) return
    const newData = data.map((c) => (c.id === form.id ? form : c))
    save(newData)
    setEditing(null)
    setForm(null)
  }

  const addNew = () => {
    const id = `car-${Date.now()}`
    const newCar: Car = { id, name: 'Mobil Baru', category: 'MPV', price: 'Rp 0', image: '/images/placeholder.png', seats: 5, transmission: 'Manual' }
    save([...data, newCar])
    startEdit(newCar)
  }

  const remove = (id: string) => {
    if (confirm('Hapus data ini?')) {
      save(data.filter((c) => c.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Total {data.length} armada</p>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button onClick={addNew} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700">
            + Tambah
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {editing === item.id && form ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Nama</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Kategori</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Harga</label>
                  <input type="text" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Image Path</label>
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Seats</label>
                  <input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Transmission</label>
                  <input type="text" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none" />
                </div>
                <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
                  <button onClick={saveEdit} className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">Simpan</button>
                  <button onClick={() => { setEditing(null); setForm(null) }} className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 uppercase">
                    {item.name.split(' ').pop()?.slice(0, 3)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category} • {item.price}/hari • {item.seats} seats • {item.transmission}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(item)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50">Edit</button>
                  <button onClick={() => remove(item.id)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Hapus</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PackageTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Edit data paket belum tersedia di demo ini. Data bersumber dari <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">src/data/packages.ts</code></p>
      <div className="mt-4 space-y-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-lg border border-gray-100 p-4">
            <p className="font-medium text-gray-900">{pkg.name}</p>
            <p className="text-sm text-gray-500">{pkg.price}/hari {pkg.popular && '• Populer'}</p>
            <p className="mt-1 text-xs text-gray-400">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Edit data testimoni belum tersedia di demo ini. Data bersumber dari <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">src/data/testimonials.ts</code></p>
      <div className="mt-4 space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-lg border border-gray-100 p-4">
            <p className="font-medium text-gray-900">{t.name}</p>
            <p className="text-xs text-gray-500">{t.role}</p>
            <p className="mt-1 text-sm text-gray-600">"{t.text}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}
