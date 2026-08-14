import { Heart } from 'lucide-react'
import { useStore } from '../lib/store'

export default function FavoriteButton({
  sku,
  className = 'fav',
  size = 18,
}: {
  sku: string
  className?: string
  size?: number
}) {
  const { isFavorite, toggleFavorite } = useStore()
  const on = isFavorite(sku)
  return (
    <button
      type="button"
      className={`${className}${on ? ' on' : ''}`}
      aria-pressed={on}
      aria-label={on ? 'Elimină din favorite' : 'Adaugă la favorite'}
      title={on ? 'Elimină din favorite' : 'Adaugă la favorite'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(sku)
      }}
    >
      <Heart size={size} fill={on ? 'currentColor' : 'none'} />
    </button>
  )
}
