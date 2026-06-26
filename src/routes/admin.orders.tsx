import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { orders } from '../lib/admin-store'
import { Trash2, Plus, X } from 'lucide-react'
import type { Order } from '../lib/admin-store'

export const Route = createFileRoute('/admin/orders')({
  component: OrdersPage,
})

const carOptions = ['Toyota Avanza', 'Toyota Innova', 'Honda Brio', 'Mitsubishi Pajero', 'Toyota Hiace', 'Toyota Fortuner']
const packageOptions = ['Lepas Kunci', 'Include Supir', 'Include Supir + BBM']

function OrdersPage() {
  const [list, setList] = useState<Order[]>(orders.getAll())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    package: packageOptions[0],
    car: carOptions[0],
    startDate: '',
    duration: 1,
  })

  const refresh = () => setList(orders.getAll())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customerName || !form.phone || !form.startDate) return
    orders.add({ ...form, status: 'pending' })
    setShowForm(false)
    setForm({ customerName: '', phone: '', package: packageOptions[0], car: carOptions[0], startDate: '', duration: 1 })
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm('Hapus order ini?')) {
      orders.delete(id)
      refresh()
    }
  }

  const handleStatus = (id: string, status: Order['status']) => {
    orders.update(id, { status })
    refresh()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Kelola order rental ({list.length})</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Batal' : 'Tambah Order'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-bold text-gray-900">Order Baru</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Nama Pelanggan</label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">No. Telepon</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Paket</label>
              <select
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              >
                {packageOptions.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Mobil</label>
              <select
                value={form.car}
                onChange={(e) => setForm({ ...form, car: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              >
                {carOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Tanggal Mulai</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Durasi (hari)</label>
              <input
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Simpan Order
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {list.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            Belum ada data order. Klik "Tambah Order" untuk membuat order baru.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase text-gray-400">
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Telepon</th>
                  <th className="px-6 py-4">Paket</th>
                  <th className="px-6 py-4">Mobil</th>
                  <th className="px-6 py-4">Mulai</th>
                  <th className="px-6 py-4">Durasi</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{order.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{order.package}</td>
                    <td className="px-6 py-4 text-gray-600">{order.car}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.startDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.duration} hari</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatus(order.id, e.target.value as Order['status'])}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium focus:outline-none ${
                          order.status === 'pending'
                            ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                            : order.status === 'confirmed'
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : order.status === 'completed'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
