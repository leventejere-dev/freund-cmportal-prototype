# Scule FREUND — prototip de magazin B2B pentru Portalul Partenerilor Color Metal

Prototip funcțional (nu machetă statică) pentru secțiunea **Scule FREUND** din
[cmportal.ro](https://cmportal.ro). Reproduce shell-ul vizual al portalului existent
(COLOR METAL) și înlocuiește lista actuală de „tag-uri" cu o experiență reală de
e-commerce B2B: carduri de produs cu fotografii, prețuri fără/cu TVA, stoc, filtre,
sortare, căutare, pagini de produs, galerie cu lightbox, favorite și coș funcțional.

> **Acesta este un prototip.** Nu este conectat la niciun sistem de producție Color Metal.
> Vezi secțiunea [Date demonstrative](#date-demonstrative).

---

## Demo public

**https://leventejere-dev.github.io/freund-cmportal-prototype/**

Drumul din portal, reprodus în prototip:
`Pagina Principala → Cauta Articole → ACCESORII ARHITECTURALE → SCULE FREUND`

Rute utile:

- Pagina principală — `/`
- Lista de categorii (doar FREUND este activă) — `/articole`
- Categoria FREUND — `/scule-freund`
- Exemplu de produs — `/scule-freund/masina-de-cusut-si-taiat-seaming-pro-93000000`
- Coșul — `/cos`
- Favorite — `/favorite`

## Rulare locală

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de producție:

```bash
npm run build      # generează dist/
npm run preview    # servește dist/ pe http://localhost:4173
```

Test funcțional end-to-end (Playwright, 43 verificări):

```bash
npx playwright install chromium   # o singură dată
npm run build && npm run preview &
node test.mjs
```

---

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Rutare | react-router-dom (`BrowserRouter`) |
| Iconițe | lucide-react |
| Stil | CSS simplu, cu design tokens în `src/index.css` |
| Date | JSON local (`src/data/products.json`) |
| State | React Context + `localStorage` (coș, favorite) |

Nu există backend. Toate datele sunt statice și livrate odată cu build-ul.

## Rute

| Rută | Pagină |
|---|---|
| `/` | Pagina principală (reproducere a dashboard-ului CMPORTAL) |
| `/articole` | Lista de categorii din portal — doar *Scule FREUND* este activă |
| `/scule-freund` | Categoria FREUND — grilă, filtre, căutare, sortare |
| `/scule-freund/:slug` | Pagina de produs (ex. `/scule-freund/foarfeca-decupaj-rotund-in-varf-00371000`) |
| `/cos` | Coșul de cumpărături |
| `/favorite` | Articole favorite |

Link-urile directe funcționează după deploy, iar reîncărcarea paginii nu produce 404
(`dist/404.html` este o copie a `index.html`, mecanismul standard SPA pentru GitHub Pages).

## Structura proiectului

```
public/
  brand/                  logo COLOR METAL + FREUND (SVG vectorizat)
  products/freund/        fotografii de produs extrase din catalogul PDF
                          NN.webp (card 560px) · NN-lg.webp (PDP 1100px)
                          NN-fisa.webp (pagina originală din catalog)
src/
  components/             Header, Breadcrumbs, SearchBar, FilterSidebar, SortDropdown,
                          ProductCard, ProductGrid, ProductGallery, PriceDisplay,
                          StockBadge, QuantitySelector, AddToCartButton, FavoriteButton,
                          ProductSpecifications, RelatedProducts, Toast, Footer
  pages/                  HomePage, BrowseCategoriesPage, CategoryPage, ProductPage,
                          CartPage, FavoritesPage
  lib/
    config.ts             VAT_RATE și alte constante de business
    format.ts             formatare monedă RO, calcul net din brut, slug, normalizare
    catalog.ts            încărcare catalog, index de căutare, produse similare
    store.tsx             coș + favorite (Context + localStorage)
  data/
    products.json         49 articole
    categories.ts         arborele de categorii din portal (20 categorii, 6 grupe)
    types.ts              tipurile TypeScript
docs/
  UX-AUDIT.md             auditul UX al implementării actuale
```

## Modelul de date

Un obiect = un cod de articol vandabil. Câmpurile lipsă din catalog sunt **omise**,
nu inventate.

```jsonc
{
  "id": "clesti-de-sertizare-indoiti-la-45-imbinare-suprapusa-22-mm-01090022",
  "sku": "01090022",
  "name": "Clești de sertizare, îndoiți la 45°, îmbinare suprapusă, 22 mm",
  "familyName": "Clești de sertizare, îndoiți la 45°, îmbinare suprapusă, 22 mm",
  "brand": "FREUND",
  "category": "clesti-faltuit",
  "family": "clesti-de-sertizare-indoiti-la-45-imbinare-suprapusa-22-mm",
  "catalogPage": 6,
  "catalogNumber": 4,
  "version": "Clești de sertizare, îndoiți la 45°, îmbinare suprapusă",
  "image": "products/freund/06.webp",
  "imageLarge": "products/freund/06-lg.webp",
  "imageSheet": "products/freund/06-fisa.webp",
  "priceGross": 197,            // lei, CU TVA — exact cum apare în lista de prețuri
  "stockStatus": "in-stoc",     // in-stoc | stoc-limitat | indisponibil (DEMO)
  "stockQuantity": 39,          // DEMO
  "tagline": "Pentru că mini poate fi mare",
  "description": "…",
  "applications": [{ "label": "Asistent precis", "text": "Îndoaie și îmbină tabla!" }],
  "benefits":     [{ "label": "Convenabil", "text": "Clește îndoit la 45°." }],
  "specs":        [{ "label": "Lățimea fălcilor / tăierii", "value": "22mm" }],
  "hand": "dreapta",            // doar unde catalogul specifică stânga/dreapta
  "weightG": 220,
  "sizeMm": 22
}
```

## TVA și prețuri

Lista de prețuri FREUND furnizată conține **prețuri cu TVA**, în lei, valori întregi.
Prețul fără TVA este derivat: `net = brut / (1 + VAT_RATE)`.

`VAT_RATE` este definit într-un singur loc — `src/lib/config.ts` — și este setat la
**21%** (cota standard din România). În producție această valoare trebuie să vină din
ERP / datele de articol, nu din front-end.

Afișare, peste tot:

```
480,17 lei + TVA          ← informația principală (B2B)
581,00 lei cu TVA (21%)   ← informația secundară
```

## Sursa conținutului

| Element | Sursă |
|---|---|
| Denumiri, descrieri, Aplicare, Beneficii, dimensiuni, greutăți, nr. articol | `Catalog FREUND CM26.pdf` (46 pagini, 43 fișe de produs) |
| Prețuri | `freundpretnou.pdf` (51 poziții, prețuri cu TVA) |
| Fotografii de produs | extrase din PDF-ul de catalog (vezi mai jos) |
| Shell vizual (header, culori, tipografie, footer) | cmportal.ro — inspectat, **fără nicio modificare** pe site-ul de producție |

### Extragerea fotografiilor

Paginile PDF-ului sunt raster aplatizat (fiecare pagină este împărțită în ~30 de dale
JPEG de 561×285 px), deci **nu există assets de produs individuale în PDF**. Procedura
folosită, în consecință:

1. randare pagină la 3,5× (1528×2143 px);
2. mască de „cerneală" pe luminanță + saturație;
3. eroziune morfologică → sămânță; reconstrucție (`binary_propagation`) → forma completă
   a sculei, fără text (textul nu primește sămânță);
4. filtrare componente după grosimea trăsăturii (elimină titluri și tabele);
5. decupare la bounding box + fundal alb curat prin mască alfa cu margine estompată;
6. export WebP la 560 px (card) și 1100 px (PDP), plus pagina de catalog completă (fișă).

Nu s-a folosit generare AI și nicio fotografie stock. Total assets: ~2,9 MB.

## Date demonstrative

Următoarele sunt **date demonstrative**, marcate ca atare și în interfață (bara de sus):

- **Stoc și cantități** (`În stoc` / `Stoc limitat` / `Indisponibil momentan`, „39 buc.
  disponibile") — generate determinist din SKU. Catalogul furnizat nu conține stocuri.
- **Utilizatorul și compania din header** (`MELTRANS SRL`, `LEVENTE JERE`) și datele de
  contact din footer — preluate ca exemplu din portal pentru fidelitate vizuală.
- **Butonul „Trimite comanda"** din coș nu trimite nimic.
- Meniurile *Oferte, Balanta, Facturi, Alerte, Date companie, Utilizatori, Adrese de
  livrare, Tehnipedia, Service center, Calculator greutate, Rute distributie* sunt afișate
  ca inactive — nu fac parte din acest prototip.
- În `/articole` toate cele 20 de categorii ale portalului sunt afișate, dar numai
  *Scule FREUND* este activă; celelalte sunt gri, fără imagini (nu am acces la ele).

**Prețurile NU sunt date demonstrative** — provin din lista de prețuri furnizată.

### Ce lipsește din date

Poziția `01080060` — *Clești de sertizare, drepți, îmbinare suprapusă, 60 mm* (277 lei) —
apare în lista de prețuri și în portal, dar **nu are fișă în catalogul PDF**. A fost
omisă din setul de date pentru a nu inventa descriere și fotografie. Restul de 49 de
poziții din lista de prețuri au corespondent 1:1 în catalog.

## Ce necesită integrare de backend în producție

1. **Stoc real** — cantitate disponibilă per depozit, cu rezervare la adăugarea în coș.
2. **Preț de contract per partener** — grile de discount, prețuri negociate, valute.
3. **Cota de TVA din datele de articol** — nu constantă în front-end.
4. **Coș și comandă server-side** — persistență per utilizator/companie (nu localStorage),
   validare, transmitere către ERP, numere de cerere, termen de livrare, adrese de livrare.
5. **Favorite** — salvate pe cont, partajate în cadrul companiei (portalul are deja acest
   concept).
6. **Căutare** — indexare server-side peste tot catalogul Color Metal, nu doar FREUND;
   sinonime, corectare de scriere, categorii.
7. **Media de produs** — un CDN/DAM cu mai multe fotografii per articol (galeria suportă
   deja imagini multiple), plus fișe tehnice PDF.
8. **Autentificare și autorizare** — prototipul rulează complet public, fără login.

## Licență / conținut

Conținutul de catalog, prețurile, logo-urile COLOR METAL și FREUND aparțin deținătorilor
de drept și sunt folosite aici exclusiv pentru acest prototip intern.
