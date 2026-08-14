import type { Product } from '../data/types'
import ProductCard from './ProductCard'

export default function ProductGrid({
  products,
  loading,
}: {
  products: Product[]
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="card is-skeleton" key={i}>
            <div className="thumb-sk skeleton" />
            <div className="line-sk skeleton" style={{ width: '40%' }} />
            <div className="line-sk skeleton" style={{ width: '86%' }} />
            <div className="line-sk skeleton" style={{ width: '60%' }} />
            <div className="line-sk skeleton" style={{ width: '50%', marginBottom: 14 }} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
