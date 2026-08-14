import { CURRENCY } from '../lib/config'
import { formatMoney, netFromGross, vatPercentLabel } from '../lib/format'

interface Props {
  gross: number
  qty?: number
  size?: 'md' | 'lg'
}

/**
 * B2B price hierarchy: net price is the headline, gross (cu TVA) is secondary.
 * The published FREUND list price includes VAT, so net is derived from it.
 */
export default function PriceDisplay({ gross, qty = 1, size = 'md' }: Props) {
  const g = gross * qty
  const n = netFromGross(gross) * qty
  return (
    <div className={size === 'lg' ? 'price-lg' : undefined}>
      <div className="price-net">
        {formatMoney(n)} {CURRENCY} <span className="vat-note">+ TVA</span>
      </div>
      <div className="price-gross">
        {formatMoney(g)} {CURRENCY} cu TVA ({vatPercentLabel})
      </div>
    </div>
  )
}
