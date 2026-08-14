import { ShoppingCart } from 'lucide-react'
import { useStore } from '../lib/store'
import type { Product } from '../data/types'

interface Props {
  product: Product
  qty?: number
  size?: 'md' | 'lg'
  block?: boolean
  label?: string
  /** Compact icon-only variant used on product cards. */
  iconOnly?: boolean
}

export default function AddToCartButton({
  product,
  qty = 1,
  size = 'md',
  block,
  label = 'Adaugă în coș',
  iconOnly = false,
}: Props) {
  const { addToCart } = useStore()
  const unavailable = product.stockStatus === 'indisponibil'

  return (
    <button
      type="button"
      className={`btn btn-gold${size === 'lg' ? ' btn-lg' : ''}${iconOnly ? ' btn-icon' : ''}`}
      style={block ? { width: '100%' } : undefined}
      disabled={unavailable}
      title={unavailable ? 'Produs indisponibil momentan' : label || 'Adaugă în coș'}
      aria-label={iconOnly ? `Adaugă ${product.name} în coș` : undefined}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product.sku, qty)
      }}
    >
      <ShoppingCart size={size === 'lg' ? 19 : 16} />
      {iconOnly ? null : unavailable ? 'Indisponibil' : label}
    </button>
  )
}
