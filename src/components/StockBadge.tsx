import type { Product } from '../data/types'

export const STOCK_LABEL: Record<Product['stockStatus'], string> = {
  'in-stoc': 'În stoc',
  'stoc-limitat': 'Stoc limitat',
  indisponibil: 'Indisponibil momentan',
}

export default function StockBadge({
  product,
  showQty = false,
}: {
  product: Product
  showQty?: boolean
}) {
  return (
    <span className={`stock ${product.stockStatus}`}>
      {STOCK_LABEL[product.stockStatus]}
      {showQty && product.stockQuantity ? (
        <span className="qty">· {product.stockQuantity} buc. disponibile</span>
      ) : null}
    </span>
  )
}
