import { VAT_RATE } from './config'

const nf = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const nf0 = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0 })

/** Net (fără TVA) price derived from the published gross price. */
export function netFromGross(gross: number): number {
  return gross / (1 + VAT_RATE)
}

export function formatMoney(value: number): string {
  return nf.format(value)
}

export function formatInt(value: number): string {
  return nf0.format(value)
}

export const vatPercentLabel = `${Math.round(VAT_RATE * 100)}%`

const COMBINING = /[̀-ͯ]/g

function deaccent(s: string): string {
  return s
    .normalize('NFD')
    .replace(COMBINING, '')
    .replace(/[ăâ]/g, 'a')
    .replace(/î/g, 'i')
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
}

export function slugFor(p: { name: string; sku: string }): string {
  const base = deaccent(p.name.toLowerCase())
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${base}-${p.sku.toLowerCase()}`
}

/** Diacritic-insensitive, case-insensitive search key. */
export function normalize(s: string): string {
  return deaccent(s.toLowerCase())
}
