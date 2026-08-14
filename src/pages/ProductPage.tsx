import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, PackageCheck, Truck } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGallery from '../components/ProductGallery'
import PriceDisplay from '../components/PriceDisplay'
import StockBadge from '../components/StockBadge'
import QuantitySelector from '../components/QuantitySelector'
import AddToCartButton from '../components/AddToCartButton'
import ProductSpecifications from '../components/ProductSpecifications'
import RelatedProducts from '../components/RelatedProducts'
import FreundMark from '../components/FreundMark'
import { bySlug, categoryName, products, relatedTo } from '../lib/catalog'
import { formatMoney, netFromGross } from '../lib/format'
import { useStore } from '../lib/store'

type Tab = 'descriere' | 'aplicatie' | 'beneficii' | 'specificatii'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = bySlug.get(slug)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('descriere')
  const { isFavorite, toggleFavorite } = useStore()

  useEffect(() => {
    setQty(1)
    window.scrollTo({ top: 0 })
    if (product?.description) setTab('descriere')
    else if (product?.applications?.length) setTab('aplicatie')
    else if (product?.benefits?.length) setTab('beneficii')
    else setTab('specificatii')
  }, [slug, product])

  if (!product) {
    return (
      <div className="page container">
        <div className="empty" style={{ marginTop: 40 }}>
          <h3>Produsul nu a fost găsit</h3>
          <p>Este posibil ca articolul să fi fost redenumit sau scos din catalog.</p>
          <Link className="btn btn-outline" to="/scule-freund">
            Înapoi la Scule FREUND
          </Link>
        </div>
      </div>
    )
  }

  const siblings = products.filter((p) => p.family === product.family)
  const tabs: Array<[Tab, string]> = [
    ...(product.description ? ([['descriere', 'Descriere']] as Array<[Tab, string]>) : []),
    ...(product.applications?.length
      ? ([['aplicatie', 'Aplicație']] as Array<[Tab, string]>)
      : []),
    ...(product.benefits?.length ? ([['beneficii', 'Beneficii']] as Array<[Tab, string]>) : []),
    ['specificatii', 'Specificații tehnice'],
  ]

  const fav = isFavorite(product.sku)

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Pagina principală', to: '/' },
            { label: 'Articole', to: '/articole' },
            { label: 'Accesorii arhitecturale', to: '/articole' },
            { label: 'Scule FREUND', to: '/scule-freund' },
            { label: product.name },
          ]}
        />

        <div className="pdp">
          <ProductGallery product={product} />

          <div className="pdp-info">
            <div className="eyebrow">
              <FreundMark width={78} />
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--cm-grey-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {categoryName(product.category)}
              </span>
            </div>

            <h1>{product.name}</h1>
            {product.tagline && <p className="tagline">{product.tagline}</p>}

            <div className="pdp-meta">
              <span className="item">
                <span className="k">Cod produs</span>
                <span className="v">{product.sku}</span>
              </span>
              <span className="item">
                <span className="k">Disponibilitate</span>
                <span className="v">
                  <StockBadge product={product} showQty />
                </span>
              </span>
              <span className="item">
                <span className="k">Unitate</span>
                <span className="v">BUC</span>
              </span>
            </div>

            <div className="buy-box">
              <PriceDisplay gross={product.priceGross} size="lg" />

              <div className="buy-row">
                <QuantitySelector
                  value={qty}
                  onChange={setQty}
                  disabled={product.stockStatus === 'indisponibil'}
                />
                <AddToCartButton product={product} qty={qty} size="lg" />
                <button
                  type="button"
                  className="btn btn-outline btn-lg"
                  aria-pressed={fav}
                  onClick={() => toggleFavorite(product.sku)}
                  title={fav ? 'Elimină din favorite' : 'Adaugă la favorite'}
                >
                  <Heart
                    size={18}
                    fill={fav ? 'var(--cm-red)' : 'none'}
                    color={fav ? 'var(--cm-red)' : 'currentColor'}
                  />
                  <span className="hide-sm">Favorite</span>
                </button>
              </div>

              {qty > 1 && (
                <p
                  style={{
                    margin: '12px 0 0',
                    fontSize: 13,
                    color: 'var(--cm-grey-2)',
                  }}
                >
                  Total pentru {qty} buc.:{' '}
                  <b style={{ color: 'var(--cm-slate)' }}>
                    {formatMoney(netFromGross(product.priceGross) * qty)} lei + TVA
                  </b>{' '}
                  ({formatMoney(product.priceGross * qty)} lei cu TVA)
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: 18,
                  marginTop: 14,
                  flexWrap: 'wrap',
                  color: 'var(--cm-grey-2)',
                  fontSize: 12.5,
                }}
              >
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <PackageCheck size={15} /> Preț de partener, contract MELTRANS SRL
                </span>
                <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <Truck size={15} /> Livrare din depozitele Color Metal
                </span>
              </div>
            </div>

            {siblings.length > 1 && (
              <div className="variant-list">
                <h3>Variante disponibile</h3>
                {siblings.map((s) => (
                  <Link
                    key={s.id}
                    to={`/scule-freund/${s.id}`}
                    className={s.id === product.id ? 'on' : undefined}
                  >
                    <span>
                      {s.version || s.name}
                      <br />
                      <span style={{ color: 'var(--cm-grey-2)', fontSize: 12 }}>{s.sku}</span>
                    </span>
                    <span className="vp">
                      {formatMoney(netFromGross(s.priceGross))} lei
                      <span
                        style={{ fontWeight: 400, fontSize: 11, color: 'var(--cm-grey-2)' }}
                      >
                        {' '}
                        + TVA
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tabs" role="tablist">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={tab === key ? 'on' : undefined}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tab-panel" role="tabpanel">
          {tab === 'descriere' && product.description && <p>{product.description}</p>}

          {tab === 'aplicatie' && (
            <ul className="bullets">
              {product.applications?.map((a) => (
                <li key={a.label}>
                  <b>{a.label}:</b> {a.text}
                </li>
              ))}
            </ul>
          )}

          {tab === 'beneficii' && (
            <ul className="bullets">
              {product.benefits?.map((b) => (
                <li key={b.label}>
                  <b>{b.label}:</b> {b.text}
                </li>
              ))}
            </ul>
          )}

          {tab === 'specificatii' && <ProductSpecifications product={product} />}
        </div>

        <RelatedProducts items={relatedTo(product, 4)} />
      </div>
    </div>
  )
}
