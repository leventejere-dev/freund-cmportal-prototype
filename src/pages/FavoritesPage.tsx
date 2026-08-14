import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGrid from '../components/ProductGrid'
import { bySku } from '../lib/catalog'
import { useStore } from '../lib/store'
import type { Product } from '../data/types'

export default function FavoritesPage() {
  const { favorites } = useStore()
  const items = favorites.map((sku) => bySku.get(sku)).filter(Boolean) as Product[]

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'Pagina principală', to: '/' }, { label: 'Articole favorite' }]}
        />
        <h1 className="page-title">
          <Heart size={24} /> Articole favorite
        </h1>

        {items.length === 0 ? (
          <div className="empty">
            <h3>Nu ai încă articole favorite</h3>
            <p>Apasă pe inima din colțul unui produs pentru a-l salva aici.</p>
            <Link className="btn btn-outline" to="/scule-freund">
              Vezi sculele FREUND
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  )
}
