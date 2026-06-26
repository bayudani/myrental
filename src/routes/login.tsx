import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { auth } from '../lib/admin-store'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth.check()) {
      navigate({ to: '/admin' })
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Username dan password wajib diisi')
      return
    }
    if (auth.login(username, password)) {
      navigate({ to: '/admin' })
    } else {
      setError('Username atau password salah')
    }
  }

  return (
    <div className="relative flex min-h-screen">
      <div
        className="absolute inset-0 bg-gray-900"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />

      <div className="relative z-10 flex w-full items-center justify-center px-6 lg:w-1/2 lg:justify-end lg:pr-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600">
              <span className="text-base font-bold text-white">M</span>
            </div>
            <h1 className="text-xl font-bold text-white">Masuk ke panel admin</h1>
            <p className="mt-1 text-sm text-white/60">
              MyRental Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3.5 py-2.5">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 hidden flex-1 items-center justify-center lg:flex">
        <div className="max-w-sm text-center">
          <p className="text-4xl font-bold text-white">MyRental</p>
          <p className="mt-3 text-base text-white/50 leading-relaxed">
            Premium car rental solution. Kelola bisnis rental mobil Anda dengan mudah dan profesional.
          </p>
        </div>
      </div>
    </div>
  )
}
