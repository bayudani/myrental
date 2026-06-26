export interface Order {
  id: string
  customerName: string
  phone: string
  package: string
  car: string
  startDate: string
  duration: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

const AUTH_KEY = 'admin-auth'
const ORDERS_KEY = 'admin-orders'

export const auth = {
  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, username }))
      return true
    }
    return false
  },
  logout() {
    localStorage.removeItem(AUTH_KEY)
  },
  check() {
    try {
      const data = localStorage.getItem(AUTH_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },
}

export const orders = {
  getAll(): Order[] {
    try {
      const data = localStorage.getItem(ORDERS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },
  add(order: Omit<Order, 'id' | 'createdAt'>) {
    const list = orders.getAll()
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    list.unshift(newOrder)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list))
    return newOrder
  },
  update(id: string, data: Partial<Order>) {
    const list = orders.getAll()
    const idx = list.findIndex((o) => o.id === id)
    if (idx === -1) return
    list[idx] = { ...list[idx], ...data }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list))
  },
  delete(id: string) {
    const list = orders.getAll().filter((o) => o.id !== id)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list))
  },
}

export const content = {
  get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(`admin-content-${key}`)
      return data ? JSON.parse(data) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, data: T) {
    localStorage.setItem(`admin-content-${key}`, JSON.stringify(data))
  },
  reset(key: string) {
    localStorage.removeItem(`admin-content-${key}`)
  },
}
