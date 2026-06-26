import { createFileRoute } from '@tanstack/react-router'
import { testimonials } from '../data/testimonials'

export const Route = createFileRoute('/admin/testimoni')({
  component: TestimoniPage,
})

function TestimoniPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Data Testimoni</h1>
        <p className="text-gray-500">Testimoni pelanggan yang tampil di website</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Testimoni tidak bisa diubah.
        </p>
        <div className="mt-4 space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-lg border border-gray-100 p-4">
              <p className="font-medium text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
              <p className="mt-1 text-sm text-gray-600">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
