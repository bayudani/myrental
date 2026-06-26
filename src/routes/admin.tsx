import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { auth } from '../lib/admin-store'
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  LogOut,
  ArrowLeft,
} from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
  { label: 'Konten', href: '/admin/content', icon: FileText },
]

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!auth.check()) {
      navigate({ to: '/login' })
    }
  }, [navigate])

  const user = auth.check()
  if (!user) return null

  const handleLogout = () => {
    auth.logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            My<span className="text-brand-600">Rental</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  navigate({ to: link.href })
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="border-t border-gray-100 px-3 py-4 space-y-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate({ to: '/' })
            }}
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Ke Website
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
