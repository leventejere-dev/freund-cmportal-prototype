import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import QuantitySelector from '../components/QuantitySelector'
import { useStore } from '../lib/store'
import { formatMoney, vatPercentLabel } from '../lib/format'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

export default function CartPage() {
  const {
    cartLines,
    cartCount,
    setQty,
    removeFromCart,
    clearCart,
    totalNet,
    totalVat,
    totalGross,
    toggleFavorite,
    isFavorite,
  } = useStore()

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Pagina principală', to: '/' }, { label: 'Coșul meu' }]} />

        <h1 className="page-title">
          <ShoppingCart size={26} /> Coșul meu
        </h1>

        {cartLines.length === 0 ? (
          <div className="empty">
            <h3>Coșul tău este gol</h3>
            <p>Adaugă scule FREUND din catalog pentru a continua.</p>
            <Link className="btn btn-gold" to="/scule-freund">
              Vezi sculele FREUND
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              <p className="result-line">
                Articole în coș: <b>{cartCount}</b>
              </p>

              <div className="cart-list">
                {cartLines.map((line) => (
                  <div className="cart-row" key={line.sku}>
                    <Link to={`/scule-freund/${line.product.id}`}>
                      <img src={asset(line.product.image)} alt="" loading="lazy" />
                    </Link>

                    <div>
                      <Link to={`/scule-freund/${line.product.id}`} className="name">
                        {line.product.name}
                      </Link>
                      <div className="meta">Cod produs: {line.sku}</div>
                      <div className="meta">
                        Preț unitar: {formatMoney(line.unitNet)} lei + TVA ·{' '}
                        {formatMoney(line.unitGross)} lei cu TVA
                      </div>

                      <div className="controls">
                        <QuantitySelector
                          value={line.qty}
                          onChange={(v) => setQty(line.sku, v)}
                          size="sm"
                        />
                        <button
                          className="icon-btn"
                          title="Elimină din coș"
                          aria-label={`Elimină ${line.product.name} din coș`}
                          onClick={() => removeFromCart(line.sku)}
                        >
                          <Trash2 size={17} />
                        </button>
                        <button
                          className="icon-btn"
                          title="Adaugă la favorite"
                          aria-label="Adaugă la favorite"
                          onClick={() => toggleFavorite(line.sku)}
                          style={{ color: isFavorite(line.sku) ? 'var(--cm-red)' : undefined }}
                        >
                          <Heart
                            size={17}
                            fill={isFavorite(line.sku) ? 'currentColor' : 'none'}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="right">
                      <div className="line-total">{formatMoney(line.lineNet)} lei</div>
                      <div className="meta">fără TVA</div>
                      <div className="meta">{formatMoney(line.lineGross)} lei cu TVA</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                <Link className="btn btn-outline" to="/scule-freund">
                  Continuă cumpărăturile
                </Link>
                <button className="btn btn-ghost" onClick={clearCart}>
                  Golește coșul
                </button>
              </div>
            </div>

            <aside className="summary">
              <h3>Sumar comandă</h3>
              <div className="row">
                <span>Total fără TVA</span>
                <b>{formatMoney(totalNet)} lei</b>
              </div>
              <div className="row">
                <span>TVA ({vatPercentLabel})</span>
                <b>{formatMoney(totalVat)} lei</b>
              </div>
              <div className="row total">
                <span>Total cu TVA</span>
                <span>{formatMoney(totalGross)} lei</span>
              </div>

              <button className="btn btn-gold btn-lg" style={{ width: '100%', marginTop: 14 }}>
                Trimite comanda
              </button>
              <p className="note">
                Prototip: butonul nu trimite o comandă reală. În producție, aici se face
                integrarea cu ERP-ul Color Metal (preț de contract, stoc real, adrese de
                livrare).
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
