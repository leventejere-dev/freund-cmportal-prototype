/**
 * Business constants for the prototype.
 *
 * VAT_RATE is the single place the VAT percentage is configured. In production
 * this must come from the ERP / article master data, not from the front-end.
 */
export const VAT_RATE = 0.21 // 21% — cota standard TVA România

export const CURRENCY = 'lei'

/** Prices in the supplied FREUND price list are published WITH VAT. */
export const PRICES_INCLUDE_VAT = true

export const BRAND = {
  name: 'FREUND',
  claim: 'Unelte profesionale pentru acoperișuri și prelucrarea tablei',
}
