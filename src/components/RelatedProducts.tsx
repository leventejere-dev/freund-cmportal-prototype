import type { Product } from '../data/types'
import ProductCard from './ProductCard'

export default function RelatedProducts({ items }: { items: Product[] }) {
  if (!items.length) return null
  return (
    <section className="section">
      <h2>Produse similare</h2>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
