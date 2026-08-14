export type StockStatus = 'in-stoc' | 'stoc-limitat' | 'indisponibil'

export interface Bullet {
  label: string
  text: string
}

export interface Spec {
  label: string
  value: string
}

export interface Product {
  id: string
  sku: string
  name: string
  familyName: string
  brand: 'FREUND'
  category: string
  family: string
  catalogPage: number
  catalogNumber?: number
  version?: string
  image: string
  imageLarge: string
  /** Full catalogue page from the FREUND PDF, shown as a second gallery image. */
  imageSheet?: string
  /** Gross price in RON, VAT included — as published in the FREUND price list. */
  priceGross: number
  stockStatus: StockStatus
  stockQuantity?: number
  featured?: boolean
  tagline?: string
  description?: string
  applications?: Bullet[]
  benefits?: Bullet[]
  specs?: Spec[]
  hand?: 'dreapta' | 'stanga'
  weightG?: number
  sizeMm?: number
}

export interface Category {
  id: string
  name: string
}

export interface Catalog {
  categories: Category[]
  products: Product[]
}
