import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { bySku } from './catalog'
import { netFromGross } from './format'
import { VAT_RATE } from './config'
import type { Product } from '../data/types'

const CART_KEY = 'cm-freund-cart-v1'
const FAV_KEY = 'cm-freund-favorites-v1'

export interface CartLine {
  sku: string
  qty: number
}

export interface CartLineView extends CartLine {
  product: Product
  unitNet: number
  unitGross: number
  lineNet: number
  lineVat: number
  lineGross: number
}

interface StoreValue {
  lines: CartLine[]
  cartLines: CartLineView[]
  cartCount: number
  totalNet: number
  totalVat: number
  totalGross: number
  addToCart: (sku: string, qty?: number) => void
  setQty: (sku: string, qty: number) => void
  removeFromCart: (sku: string) => void
  clearCart: () => void
  favorites: string[]
  isFavorite: (sku: string) => boolean
  toggleFavorite: (sku: string) => void
  toast: string | null
  notify: (message: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readJson<CartLine[]>(CART_KEY, []))
  const [favorites, setFavorites] = useState<string[]>(() => readJson<string[]>(FAV_KEY, []))
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — cart stays in memory for this session */
    }
  }, [lines])

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
    } catch {
      /* ignore */
    }
  }, [favorites])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const addToCart = useCallback(
    (sku: string, qty = 1) => {
      setLines((prev) => {
        const found = prev.find((l) => l.sku === sku)
        if (found) {
          return prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(999, l.qty + qty) } : l))
        }
        return [...prev, { sku, qty }]
      })
      const product = bySku.get(sku)
      notify(`${product ? product.name : sku} — adăugat în coș`)
    },
    [notify],
  )

  const setQty = useCallback((sku: string, qty: number) => {
    const safe = Math.max(1, Math.min(999, Math.round(qty) || 1))
    setLines((prev) => prev.map((l) => (l.sku === sku ? { ...l, qty: safe } : l)))
  }, [])

  const removeFromCart = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const toggleFavorite = useCallback(
    (sku: string) => {
      setFavorites((prev) => {
        const next = prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
        notify(prev.includes(sku) ? 'Eliminat din favorite' : 'Adăugat la favorite')
        return next
      })
    },
    [notify],
  )

  const value = useMemo<StoreValue>(() => {
    const cartLines: CartLineView[] = lines
      .map((l) => {
        const product = bySku.get(l.sku)
        if (!product) return null
        const unitGross = product.priceGross
        const unitNet = netFromGross(unitGross)
        return {
          ...l,
          product,
          unitGross,
          unitNet,
          lineNet: unitNet * l.qty,
          lineVat: unitNet * VAT_RATE * l.qty,
          lineGross: unitGross * l.qty,
        }
      })
      .filter(Boolean) as CartLineView[]

    const totalNet = cartLines.reduce((s, l) => s + l.lineNet, 0)
    const totalGross = cartLines.reduce((s, l) => s + l.lineGross, 0)

    return {
      lines,
      cartLines,
      cartCount: cartLines.reduce((s, l) => s + l.qty, 0),
      totalNet,
      totalVat: totalGross - totalNet,
      totalGross,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      favorites,
      isFavorite: (sku: string) => favorites.includes(sku),
      toggleFavorite,
      toast,
      notify,
    }
  }, [lines, favorites, toast, addToCart, setQty, removeFromCart, clearCart, toggleFavorite, notify])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
