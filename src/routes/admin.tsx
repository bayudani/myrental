import { createFileRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { auth } from '../lib/admin-store'
import {
  LayoutDashboard,
  ClipboardList,
  Car,
  Package,
  MessageSquare,
  ChevronDown,
  LogOut,
  ArrowLeft,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

const mainLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
]

const contentLinks = [
  { label: 'Armada', href: '/admin/armada', icon: Car },
  { label: 'Paket', href: '/admin/paket', icon: Package },
  { label: 'Testimoni', href: '/admin/testimoni', icon: MessageSquare },
]

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [kontenOpen, setKontenOpen] = useState(
    location.pathname.startsWith('/admin/armada') ||
    location.pathname.startsWith('/admin/paket') ||
    location.pathname.startsWith('/admin/testimoni')
  )

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

  const isActive = (href: string) => location.pathname === href

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

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {mainLinks.map((link) => {
            const active = isActive(link.href)
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

          <div className="pt-4">
            <button
              onClick={() => setKontenOpen(!kontenOpen)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                !kontenOpen ? 'text-gray-400' : 'text-gray-700'
              } hover:bg-gray-100 hover:text-gray-900`}
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                Konten
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${kontenOpen ? 'rotate-0' : '-rotate-90'}`}
              />
            </button>

            {kontenOpen && (
              <div className="ml-2 mt-1 space-y-0.5 border-l border-gray-200 pl-3">
                {contentLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate({ to: link.href })
                      }}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
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
