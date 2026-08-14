import raw from '../data/products.json'
import type { Catalog, Product } from '../data/types'
import { normalize, slugFor } from './format'

const catalog = raw as unknown as Catalog

export const categories = catalog.categories

export const products: Product[] = catalog.products.map((p) => ({
  ...p,
  id: slugFor(p),
}))

export const bySlug = new Map(products.map((p) => [p.id, p]))
export const bySku = new Map(products.map((p) => [p.sku, p]))

export const categoryName = (id: string) =>
  categories.find((c) => c.id === id)?.name ?? id

/** Pre-computed search index (name + SKU + family + description keywords). */
const searchIndex = new Map<string, string>(
  products.map((p) => [
    p.id,
    normalize(
      [
        p.name,
        p.sku,
        p.familyName,
        p.version ?? '',
        categoryName(p.category),
        p.tagline ?? '',
        p.description ?? '',
        (p.applications ?? []).map((a) => `${a.label} ${a.text}`).join(' '),
        (p.specs ?? []).map((s) => s.value).join(' '),
      ].join(' '),
    ),
  ]),
)

export function matchesQuery(p: Product, query: string): boolean {
  const q = normalize(query).trim()
  if (!q) return true
  const hay = searchIndex.get(p.id) ?? ''
  return q.split(/\s+/).every((token) => hay.includes(token))
}

/** Score used to rank search suggestions — SKU and name hits come first. */
export function searchScore(p: Product, query: string): number {
  const q = normalize(query).trim()
  if (!q) return 0
  const sku = normalize(p.sku)
  const name = normalize(p.name)
  if (sku === q) return 0
  if (sku.startsWith(q)) return 1
  if (sku.includes(q)) return 2
  if (name.startsWith(q)) return 3
  if (name.includes(q)) return 4
  return 5
}

export const priceBounds = (() => {
  const values = products.map((p) => p.priceGross)
  return { min: Math.min(...values), max: Math.max(...values) }
})()

export function relatedTo(p: Product, limit = 4): Product[] {
  const sameFamily = products.filter((x) => x.family === p.family && x.id !== p.id)
  const sameCategory = products.filter(
    (x) => x.category === p.category && x.family !== p.family,
  )
  const sorted = sameCategory.sort(
    (a, b) => Math.abs(a.priceGross - p.priceGross) - Math.abs(b.priceGross - p.priceGross),
  )
  return [...sameFamily, ...sorted].slice(0, limit)
}
