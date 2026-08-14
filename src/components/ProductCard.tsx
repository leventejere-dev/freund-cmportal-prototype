import { Link } from 'react-router-dom'
import type { Product } from '../data/types'
import PriceDisplay from './PriceDisplay'
import StockBadge from './StockBadge'
import FavoriteButton from './FavoriteButton'
import AddToCartButton from './AddToCartButton'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

function compactAttr(p: Product): string | null {
  const spec = p.specs?.find((s) =>
    /Lățimea|Lățime|Dimensiuni/i.test(s.label),
  )
  return spec ? `${spec.label.replace('Lățimea fălcilor / tăierii', 'Lățime')}: ${spec.value}` : null
}

export default function ProductCard({ product }: { product: Product }) {
  const href = `/scule-freund/${product.id}`
  const attr = compactAttr(product)

  return (
    <article className="card">
      <FavoriteButton sku={product.sku} />

      <Link to={href} className="thumb" tabIndex={-1} aria-hidden="true">
        <img
          src={asset(product.image)}
          alt=""
          loading="lazy"
          decoding="async"
          width={560}
          height={560}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = asset('brand/placeholder.svg')
          }}
        />
      </Link>

      <div className="body">
        <span className="brand-tag">FREUND</span>
        <h3 className="name">
          <Link to={href}>{product.name}</Link>
        </h3>
        <span className="sku">Cod produs: {product.sku}</span>
        {attr && <span className="attr">{attr}</span>}
        <StockBadge product={product} />

        <div className="price-wrap">
          <PriceDisplay gross={product.priceGross} />
        </div>

        <div className="actions">
          <Link to={href} className="btn btn-outline btn-view">
            Vezi produsul
          </Link>
          <AddToCartButton product={product} iconOnly />
        </div>
      </div>
    </article>
  )
}
