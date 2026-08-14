import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import SearchBar from '../components/SearchBar'
import SortDropdown, { type SortKey } from '../components/SortDropdown'
import FilterSidebar, {
  emptyFilters,
  HAND_LABEL,
  type FilterState,
} from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import FreundMark from '../components/FreundMark'
import { STOCK_LABEL } from '../components/StockBadge'
import { categoryName, matchesQuery, products } from '../lib/catalog'
import { netFromGross } from '../lib/format'
import { BRAND } from '../lib/config'

const STOCK_ORDER = { 'in-stoc': 0, 'stoc-limitat': 1, indisponibil: 2 } as const

export default function CategoryPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState<SortKey>('recomandate')
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    const next = new URLSearchParams(params)
    if (query) next.set('q', query)
    else next.delete('q')
    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  /** Search-only scope drives the facet counts. */
  const searched = useMemo(
    () => products.filter((p) => matchesQuery(p, query)),
    [query],
  )

  const filtered = useMemo(() => {
    const min = filters.priceMin ? parseFloat(filters.priceMin) : null
    const max = filters.priceMax ? parseFloat(filters.priceMax) : null
    const list = searched.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.hands.length && (!p.hand || !filters.hands.includes(p.hand))) return false
      if (filters.stock.length && !filters.stock.includes(p.stockStatus)) return false
      const net = netFromGross(p.priceGross)
      if (min !== null && net < min) return false
      if (max !== null && net > max) return false
      return true
    })

    const sorted = [...list]
    switch (sort) {
      case 'pret-asc':
        sorted.sort((a, b) => a.priceGross - b.priceGross)
        break
      case 'pret-desc':
        sorted.sort((a, b) => b.priceGross - a.priceGross)
        break
      case 'nume-az':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'ro'))
        break
      case 'disponibilitate':
        sorted.sort(
          (a, b) =>
            STOCK_ORDER[a.stockStatus] - STOCK_ORDER[b.stockStatus] ||
            a.name.localeCompare(b.name, 'ro'),
        )
        break
      default:
        sorted.sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            STOCK_ORDER[a.stockStatus] - STOCK_ORDER[b.stockStatus] ||
            a.catalogPage - b.catalogPage,
        )
    }
    return sorted
  }, [searched, filters, sort])

  const chips: Array<{ key: string; label: string; clear: () => void }> = [
    ...filters.categories.map((c) => ({
      key: `c-${c}`,
      label: categoryName(c),
      clear: () =>
        setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
    })),
    ...filters.hands.map((h) => ({
      key: `h-${h}`,
      label: HAND_LABEL[h],
      clear: () => setFilters((f) => ({ ...f, hands: f.hands.filter((x) => x !== h) })),
    })),
    ...filters.stock.map((s) => ({
      key: `s-${s}`,
      label: STOCK_LABEL[s as keyof typeof STOCK_LABEL],
      clear: () => setFilters((f) => ({ ...f, stock: f.stock.filter((x) => x !== s) })),
    })),
    ...(filters.priceMin || filters.priceMax
      ? [
          {
            key: 'price',
            label: `Preț ${filters.priceMin || '0'}–${filters.priceMax || '∞'} lei`,
            clear: () => setFilters((f) => ({ ...f, priceMin: '', priceMax: '' })),
          },
        ]
      : []),
  ]

  const resetAll = () => {
    setFilters(emptyFilters)
    setQuery('')
  }

  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Pagina principală', to: '/' },
            { label: 'Accesorii arhitecturale', to: '/scule-freund' },
            { label: 'Scule FREUND' },
          ]}
        />

        <header className="brand-head">
          <FreundMark width={124} />
          <div className="txt">
            <h1>Scule profesionale FREUND</h1>
            <p>
              {BRAND.claim}. Foarfece, clești de fălțuit, ciocane, utilaje de fălțuit și
              îndoitoare — disponibile prin Color Metal.
            </p>
          </div>
          <div className="count">
            <b>{products.length}</b>
            <span>articole</span>
          </div>
        </header>

        <div className="shop-toolbar">
          <SearchBar value={query} onChange={setQuery} />
          <button className="btn-filters" onClick={() => setDrawer(true)}>
            <SlidersHorizontal size={16} /> Filtre
            {chips.length > 0 && ` (${chips.length})`}
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="shop-layout">
          <FilterSidebar
            value={filters}
            onChange={setFilters}
            scope={searched}
            open={drawer}
            onClose={() => setDrawer(false)}
            activeCount={chips.length}
          />

          <div>
            {chips.length > 0 && (
              <div className="active-filters">
                {chips.map((c) => (
                  <button key={c.key} className="active-chip" onClick={c.clear}>
                    {c.label} <X size={13} />
                  </button>
                ))}
                <button className="link-btn" onClick={() => setFilters(emptyFilters)}>
                  Șterge filtrele
                </button>
              </div>
            )}

            <p className="result-line">
              <b>{filtered.length}</b>{' '}
              {filtered.length === 1 ? 'produs găsit' : 'produse găsite'}
              {query && (
                <>
                  {' '}
                  pentru <b>„{query}”</b>
                </>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className="empty">
                <h3>Nu am găsit produse care corespund criteriilor selectate.</h3>
                <p>Încercați alți termeni de căutare sau eliminați o parte din filtre.</p>
                <button className="btn btn-outline" onClick={resetAll}>
                  Șterge filtrele
                </button>
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
