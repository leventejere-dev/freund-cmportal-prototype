import { X } from 'lucide-react'
import { categories } from '../lib/catalog'
import { STOCK_LABEL } from './StockBadge'
import type { Product } from '../data/types'

export interface FilterState {
  categories: string[]
  hands: string[]
  stock: string[]
  priceMin: string
  priceMax: string
}

export const emptyFilters: FilterState = {
  categories: [],
  hands: [],
  stock: [],
  priceMin: '',
  priceMax: '',
}

export const HAND_LABEL: Record<string, string> = {
  dreapta: 'Tăiere dreapta',
  stanga: 'Tăiere stânga',
}

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]

export function countBy(list: Product[], key: (p: Product) => string | undefined) {
  const m = new Map<string, number>()
  for (const p of list) {
    const k = key(p)
    if (!k) continue
    m.set(k, (m.get(k) ?? 0) + 1)
  }
  return m
}

interface Props {
  value: FilterState
  onChange: (next: FilterState) => void
  /** Products matching search only — used for the facet counts. */
  scope: Product[]
  open: boolean
  onClose: () => void
  activeCount: number
}

export default function FilterSidebar({
  value,
  onChange,
  scope,
  open,
  onClose,
  activeCount,
}: Props) {
  const catCounts = countBy(scope, (p) => p.category)
  const handCounts = countBy(scope, (p) => p.hand)
  const stockCounts = countBy(scope, (p) => p.stockStatus)

  return (
    <aside className={`filters${open ? '' : ' closed'}`} aria-label="Filtre">
      <div className="f-head">
        <strong>Filtre</strong>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {activeCount > 0 && (
            <button className="link-btn" onClick={() => onChange(emptyFilters)}>
              Șterge filtrele
            </button>
          )}
          <button className="icon-btn hide-desktop" onClick={onClose} aria-label="Închide filtrele">
            <X size={18} />
          </button>
        </span>
      </div>

      <div className="f-group">
        <h4>Categorie</h4>
        {categories.map((c) => {
          const n = catCounts.get(c.id) ?? 0
          return (
            <label key={c.id} className={n === 0 ? 'disabled' : undefined}>
              <input
                type="checkbox"
                checked={value.categories.includes(c.id)}
                disabled={n === 0 && !value.categories.includes(c.id)}
                onChange={() => onChange({ ...value, categories: toggle(value.categories, c.id) })}
              />
              {c.name}
              <span className="n">{n}</span>
            </label>
          )
        })}
      </div>

      <div className="f-group">
        <h4>Versiune</h4>
        {(['dreapta', 'stanga'] as const).map((h) => {
          const n = handCounts.get(h) ?? 0
          return (
            <label key={h} className={n === 0 ? 'disabled' : undefined}>
              <input
                type="checkbox"
                checked={value.hands.includes(h)}
                disabled={n === 0 && !value.hands.includes(h)}
                onChange={() => onChange({ ...value, hands: toggle(value.hands, h) })}
              />
              {HAND_LABEL[h]}
              <span className="n">{n}</span>
            </label>
          )
        })}
      </div>

      <div className="f-group">
        <h4>Disponibilitate</h4>
        {(['in-stoc', 'stoc-limitat', 'indisponibil'] as const).map((s) => {
          const n = stockCounts.get(s) ?? 0
          return (
            <label key={s} className={n === 0 ? 'disabled' : undefined}>
              <input
                type="checkbox"
                checked={value.stock.includes(s)}
                disabled={n === 0 && !value.stock.includes(s)}
                onChange={() => onChange({ ...value, stock: toggle(value.stock, s) })}
              />
              {STOCK_LABEL[s]}
              <span className="n">{n}</span>
            </label>
          )
        })}
      </div>

      <div className="f-group">
        <h4>Preț fără TVA (lei)</h4>
        <div className="range-row">
          <input
            type="number"
            min={0}
            placeholder="de la"
            aria-label="Preț minim fără TVA"
            value={value.priceMin}
            onChange={(e) => onChange({ ...value, priceMin: e.target.value })}
          />
          <span>–</span>
          <input
            type="number"
            min={0}
            placeholder="până la"
            aria-label="Preț maxim fără TVA"
            value={value.priceMax}
            onChange={(e) => onChange({ ...value, priceMax: e.target.value })}
          />
        </div>
      </div>
    </aside>
  )
}
