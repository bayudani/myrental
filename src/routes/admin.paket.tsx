import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { content } from '../lib/admin-store'
import { packages, type Package } from '../data/packages'
import { RotateCcw, Car, User, Fuel, Plus, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ConfirmDialog } from '../components/ui/confirm-dialog'

export const Route = createFileRoute('/admin/paket')({
  component: PaketPage,
})

const iconMap: Record<string, LucideIcon> = { Car, User, Fuel }
const iconOptions = ['Car', 'User', 'Fuel']

function PaketPage() {
  const [data, setData] = useState<Package[]>(() => content.get<Package[]>('packages', packages))
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<Package | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const save = (newData: Package[]) => {
    content.set('packages', newData)
    setData(newData)
  }

  const reset = () => {
    content.reset('packages')
    setData(packages)
    setConfirmReset(false)
  }

  const startEdit = (item: Package) => {
    setEditing(item.id)
    setForm({ ...item, features: [...item.features] })
  }

  const saveEdit = () => {
    if (!form) return
    const newData = data.map((p) => (p.id === form.id ? form : p))
    save(newData)
    setEditing(null)
    setForm(null)
  }

  const addNew = () => {
    const id = `pkg-${Date.now()}`
    const newPkg: Package = {
      id,
      name: 'Paket Baru',
      description: 'Deskripsi paket',
      icon: Car,
      features: ['Fitur 1', 'Fitur 2'],
      price: 'Rp 0',
      popular: false,
    }
    save([...data, newPkg])
    startEdit(newPkg)
  }

  const removeFeature = (idx: number) => {
    if (!form) return
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) })
  }

  const addFeature = () => {
    if (!form) return
    setForm({ ...form, features: [...form.features, ''] })
  }

  const executeDelete = () => {
    if (!confirmDelete) return
    save(data.filter((p) => p.id !== confirmDelete))
    setConfirmDelete(null)
  }

  const IconComp = form ? (iconMap[form.icon.name] || Car) : Car

  return (
    <div>
      <ConfirmDialog
        open={confirmDelete !== null}
        title="Hapus Paket"
        message="Apakah kamu yakin ingin menghapus paket ini? Tindakan ini tidak bisa dibatalkan."
        onConfirm={executeDelete}
        onCancel={() => setConfirmDelete(null)}
      />
      <ConfirmDialog
        open={confirmReset}
        title="Reset Data Paket"
        message="Semua perubahan akan hilang dan dikembalikan ke data awal."
        confirmLabel="Reset"
        onConfirm={reset}
        onCancel={() => setConfirmReset(false)}
      />

      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Data Paket</h1>
        <p className="text-gray-500">Kelola paket rental yang tampil di website</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Total {data.length} paket</p>
        <div className="flex gap-2">
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            onClick={addNew}
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {editing === item.id && form ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-gray-500">Nama Paket</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-gray-500">Deskripsi</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Harga</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Icon</label>
                  <select
                    value={form.icon.name}
                    onChange={(e) => setForm({ ...form, icon: iconMap[e.target.value] || Car })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <div className="mb-1 flex items-center justify-between">
                    <label className="block text-xs text-gray-500">Fitur</label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700"
                    >
                      <Plus className="h-3 w-3" /> Tambah fitur
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {form.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={f}
                          onChange={(e) => {
                            const newFeatures = [...form.features]
                            newFeatures[i] = e.target.value
                            setForm({ ...form, features: newFeatures })
                          }}
                          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-600 focus:outline-none"
                          placeholder="Nama fitur"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.popular}
                      onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                    />
                    <span className="text-sm text-gray-700">Tandai sebagai POPULER</span>
                  </label>
                </div>
                <div className="flex items-end gap-2 sm:col-span-2">
                  <button
                    onClick={saveEdit}
                    className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => { setEditing(null); setForm(null) }}
                    className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                      {item.popular && (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">POPULER</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.price}/hari &bull; {item.features.length} fitur
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(item)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
