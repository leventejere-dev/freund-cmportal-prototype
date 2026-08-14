import { chromium } from 'playwright'

const B = process.env.TEST_URL ?? 'http://localhost:4173'
const CH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const b = await chromium.launch({ executablePath: CH })
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const errs = []
let failed = 0
p.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
p.on('console', (m) => {
  if (m.type() === 'error' && !/TUNNEL|fonts\.g/.test(m.text())) errs.push('CONSOLE: ' + m.text())
})
const ok = (n, c) => {
  if (!c) failed++
  console.log(c ? 'PASS' : 'FAIL', n)
}
const num = (s) => parseFloat(s.replace(/\./g, '').replace(',', '.'))

await p.goto(B + '/scule-freund', { waitUntil: 'networkidle' })
ok('category page renders 49 cards', (await p.locator('.card').count()) === 49)

await p.fill('input[type=search]', '01090022')
await p.waitForTimeout(400)
ok('search by SKU narrows to 1', (await p.locator('.card').count()) === 1)
ok('autocomplete suggestions', (await p.locator('.suggestions button').count()) >= 1)

await p.fill('input[type=search]', 'clesti blocare')
await p.waitForTimeout(300)
const nClesti = await p.locator('.card').count()
ok('diacritic-insensitive search', nClesti > 0 && nClesti < 49)

await p.fill('input[type=search]', 'zzzqqq')
await p.waitForTimeout(300)
ok(
  'empty-search state',
  (await p.locator('.empty h3').innerText()).includes('Nu am găsit produse'),
)
await p.locator('.empty button').click()
await p.waitForTimeout(300)
ok('"Șterge filtrele" restores list', (await p.locator('.card').count()) === 49)

await p.locator('.filters label', { hasText: 'Ciocane' }).locator('input').check()
await p.waitForTimeout(300)
ok('category filter → 4 hammers', (await p.locator('.card').count()) === 4)
ok('active filter chip', (await p.locator('.active-chip').count()) === 1)
await p.locator('.active-chip').click()
await p.waitForTimeout(250)
ok('chip removal restores', (await p.locator('.card').count()) === 49)

await p.selectOption('select[aria-label="Sortare produse"]', 'pret-asc')
await p.waitForTimeout(300)
ok(
  'sort ascending',
  (await p.locator('.card .price-net').first().innerText()).startsWith('54,55'),
)
await p.selectOption('select[aria-label="Sortare produse"]', 'pret-desc')
await p.waitForTimeout(300)
ok(
  'sort descending',
  (await p.locator('.card .price-net').first().innerText()).startsWith('11.570'),
)

await p.locator('.card .btn-gold').first().click()
await p.waitForTimeout(300)
ok('add-to-cart toast', await p.locator('.toast').isVisible())
ok('header cart badge = 1', (await p.locator('.cm-badge').first().innerText()) === '1')

await p.locator('.card .fav').first().click()
await p.waitForTimeout(250)
ok('favorites badge = 1', (await p.locator('.cm-action .on-heart').innerText()) === '1')

await p.locator('.card a.btn-outline').first().click()
await p.waitForLoadState('networkidle')
ok('product route', /\/scule-freund\/.+/.test(p.url()))
ok('PDP title', (await p.locator('.pdp-info h1').innerText()).length > 5)
ok('PDP tabs', (await p.locator('.tabs button').count()) >= 2)
await p.locator('.tabs button', { hasText: 'Specificații tehnice' }).click()
ok('specifications table', (await p.locator('.spec-table tr').count()) >= 4)
ok('gallery thumbnails', (await p.locator('.gallery .thumbs button').count()) === 2)
await p.locator('.gallery .main').click()
await p.waitForTimeout(300)
ok('lightbox opens', await p.locator('.lightbox').isVisible())
await p.keyboard.press('Escape')
await p.waitForTimeout(250)
ok('lightbox closes on Esc', (await p.locator('.lightbox').count()) === 0)

await p.locator('.buy-row .qty button[aria-label="Crește cantitatea"]').click()
await p.locator('.buy-row .qty button[aria-label="Crește cantitatea"]').click()
ok('quantity selector', (await p.locator('.buy-row .qty input').inputValue()) === '3')
await p.locator('.buy-row .btn-gold').click()
await p.waitForTimeout(300)

await p.goto(B + '/cos', { waitUntil: 'networkidle' })
ok('cart has lines', (await p.locator('.cart-row').count()) >= 1)
const netTxt = await p.locator('.summary .row').first().locator('b').innerText()
const vatTxt = await p.locator('.summary .row').nth(1).locator('b').innerText()
const totTxt = await p.locator('.summary .row.total span').last().innerText()
ok('VAT = 21% of net', Math.abs(num(netTxt) * 0.21 - num(vatTxt)) < 0.05)
ok('total = net + VAT', Math.abs(num(netTxt) + num(vatTxt) - num(totTxt)) < 0.05)

await p.reload({ waitUntil: 'networkidle' })
ok('cart persists across reload', (await p.locator('.cart-row').count()) >= 1)

const before = await p.locator('.cart-row .line-total').first().innerText()
await p.locator('.cart-row .qty button[aria-label="Crește cantitatea"]').first().click()
await p.waitForTimeout(300)
ok(
  'cart quantity update recalculates',
  (await p.locator('.cart-row .line-total').first().innerText()) !== before,
)
const rows = await p.locator('.cart-row').count()
await p.locator('.cart-row .icon-btn[title="Elimină din coș"]').first().click()
await p.waitForTimeout(300)
ok('cart remove line', (await p.locator('.cart-row').count()) === rows - 1)

await p.goto(B + '/favorite', { waitUntil: 'networkidle' })
ok('favorites page lists item', (await p.locator('.card').count()) >= 1)

await p.goto(B + '/scule-freund/masina-de-cusut-si-taiat-seaming-pro-93000000', {
  waitUntil: 'networkidle',
})
ok('deep link + refresh', (await p.locator('.pdp-info h1').innerText()).includes('Seaming'))

await p.goto(B + '/scule-freund?q=deschiderea', { waitUntil: 'networkidle' })
await p.waitForTimeout(300)
ok(
  'search query in URL',
  (await p.locator('input[type=search]').inputValue()) === 'deschiderea',
)
ok(
  'unavailable product disables add-to-cart',
  await p.locator('.card .btn-gold').first().isDisabled(),
)

await p.goto(B + '/scule-freund', { waitUntil: 'networkidle' })
await p.mouse.wheel(0, 4000)
await p.waitForTimeout(1200)
const broken = await p.evaluate(
  () => [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
)
ok('no broken images', broken === 0)

// mobile
const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const mp = await m.newPage()
await mp.goto(B + '/scule-freund', { waitUntil: 'networkidle' })
ok('mobile: filters hidden by default', !(await mp.locator('.filters').isVisible()))
await mp.locator('.btn-filters').click()
await mp.waitForTimeout(300)
ok('mobile: filter drawer opens', await mp.locator('.filters').isVisible())
const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.body.getBoundingClientRect().width)
ok('mobile: no horizontal overflow', overflow <= 1)
await mp.locator('.f-head .icon-btn').click({ force: true })
await mp.waitForTimeout(200)
await mp.locator('.cm-burger').click()
await mp.waitForTimeout(300)
ok('mobile: nav drawer opens', await mp.locator('.cm-drawer').isVisible())

console.log(errs.length ? 'ERRORS: ' + errs.join(' | ') : 'no page errors')
console.log(failed === 0 ? '\nALL CHECKS PASSED' : `\n${failed} CHECK(S) FAILED`)
await b.close()
process.exit(failed === 0 ? 0 : 1)
