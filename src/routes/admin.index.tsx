import { createFileRoute } from '@tanstack/react-router'
import { cars } from '../data/cars'
import { packages } from '../data/packages'
import { testimonials } from '../data/testimonials'
import { orders } from '../lib/admin-store'
import { Car, Package, Star, ClipboardList, TrendingUp, ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: DashboardPage,
})

const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function DashboardPage() {
  const allOrders = orders.getAll()
  const pendingOrders = allOrders.filter((o) => o.status === 'pending').length
  const confirmedOrders = allOrders.filter((o) => o.status === 'confirmed').length
  const completedOrders = allOrders.filter((o) => o.status === 'completed').length

  const monthlyData = monthlyLabels.map((_, i) => {
    const m = i + 1
    return allOrders.filter((o) => {
      const d = new Date(o.createdAt)
      return d.getMonth() + 1 === m
    }).length
  })
  const maxMonth = Math.max(...monthlyData, 1)

  const stats = [
    { icon: Car, label: 'Total Armada', value: cars.length, change: '+1', color: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    { icon: Package, label: 'Paket Rental', value: packages.length, change: '-', color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { icon: Star, label: 'Testimoni', value: testimonials.length, change: '+3', color: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-600' },
    { icon: ClipboardList, label: 'Pending Order', value: pendingOrders, change: `${allOrders.length} total`, color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Selamat datang kembali, Admin</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-gray-700">Aktif</span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.text}`} />
              </div>
              <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-0.5 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Orders per Bulan</h2>
              <p className="mt-0.5 text-sm text-gray-500">Total {allOrders.length} orders</p>
            </div>
          </div>
          <div className="flex items-end gap-2" style={{ height: 160 }}>
            {monthlyData.map((val, i) => {
              const height = val === 0 ? 4 : (val / maxMonth) * 100
              const isMax = val === maxMonth && val > 0
              return (
                <div key={i} className="group relative flex flex-1 flex-col items-center justify-end h-full">
                  <div className="mb-1.5 text-xs font-medium text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                    {val}
                  </div>
                  <div
                    className={`w-full rounded-md transition-all duration-300 ${
                      isMax ? 'bg-brand-500' : 'bg-brand-200'
                    }`}
                    style={{ height: `${height}%`, minHeight: 4 }}
                  />
                  <div className="mt-1.5 text-[10px] font-medium text-gray-400">
                    {monthlyLabels[i]}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Status Orders</h2>
              <p className="mt-0.5 text-sm text-gray-500">Overview seluruh order</p>
            </div>
          </div>
          <div className="space-y-5">
            {[
              { label: 'Pending', value: pendingOrders, color: 'bg-amber-500', max: allOrders.length || 1 },
              { label: 'Confirmed', value: confirmedOrders, color: 'bg-blue-500', max: allOrders.length || 1 },
              { label: 'Completed', value: completedOrders, color: 'bg-emerald-500', max: allOrders.length || 1 },
              { label: 'Total', value: allOrders.length, color: 'bg-gray-900', max: allOrders.length || 1 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">Order Terbaru</h2>
          <span className="text-xs text-gray-400">{allOrders.length} total</span>
        </div>
        {allOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <ClipboardList className="mx-auto mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-400">Belum ada order masuk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Paket</th>
                  <th className="px-6 py-4">Mobil</th>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{order.package}</td>
                    <td className="px-6 py-4 text-gray-600">{order.car}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.startDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${
                        order.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : order.status === 'confirmed'
                          ? 'bg-blue-50 text-blue-700'
                          : order.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {order.status}
                      </span>
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
