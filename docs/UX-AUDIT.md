# Audit UX — secțiunea FREUND din CMPORTAL (stadiul actual)

Inspecție efectuată pe `cmportal.ro`, cont partener, **doar în citire** (screenshot + DOM/CSS).
Traseul analizat: `Cauta Articole` → `browse_categories/0` → *ACCESORII ARHITECTURALE →
SCULE FREUND* → `browse_articles/97`.

## Ce este în neregulă

**1. Produsele nu arată ca produse.**
Toate cele ~50 de articole sunt redate ca „chip-uri" gri (`.card__dimensiuni--item`,
fundal `#EDF1F4`, text `#B1B9BF`, 14px, weight 100) aranjate ca un nor de etichete.
Vizual, sunt indistinguibile de un filtru sau de un tag. Nimic nu sugerează că sunt
lucruri care pot fi cumpărate.

**2. Nu există fotografii în listă.**
Imaginea există în sistem (există chiar și un tooltip „poze disponibile"), dar apare doar
după un click, într-un pop-up mic. Într-un magazin de scule, fotografia este principalul
element de identificare — un tinichigiu recunoaște foarfeca după formă, nu după cod.

**3. Nu există prețuri.**
Nici în listă, nici în pop-up, nici în coș. Utilizatorul nu poate lua nicio decizie de
achiziție în interfață.

**4. Nu există stoc.**
Nicio informație de disponibilitate înainte de trimiterea cererii.

**5. Numele și codul sunt lipite într-un singur șir.**
`CIOCAN PENTRU EMBOSARE SI NETEZIRE, COLTAR, 145X3501678145` — codul `01678145` se
lipește de dimensiunea `145X350`. Este imposibil de citit și de căutat vizual.

**6. Diacriticele lipsesc, iar textul e all-caps.**
`CLESTI DE SERTIZARE, INDOITI LA 45 GR.` și, pe alocuri, entități HTML neinterpretate
(`FOARFECE DECALAT PENTRU TAIERE &#34;MINI&#34;`). Denumirile în majuscule sunt mai greu
de scanat decât cele în capitalizare normală.

**7. Nu există filtrare, sortare sau căutare în categorie.**
Singurul mecanism de găsire este citirea listei complete. Cu ~50 de poziții este obositor;
la scara întregului catalog Color Metal devine imposibil.

**8. Nu există pagină de produs.**
Pop-up-ul afișează doar o imagine, cu un scroll intern. Nu există descriere, aplicație,
beneficii, specificații tehnice, variante sau produse similare — deși toate acestea
există în catalogul FREUND.

**9. Un singur buton „Adauga in cos" pentru toată pagina.**
Fluxul este „bifează chip-uri → un buton global → câmp liber Observatii". Este un
formular de cerere de ofertă deghizat în listă de produse, nu un coș.

**10. Cantitatea nu se poate seta la selecție.**
Se poate ajusta abia în coș.

**11. Coșul nu are valori.**
`Cosul Meu` arată denumire, cod și cantitate — fără preț unitar, fără subtotal, fără TVA,
fără total. Coșul are câmpuri de cerere (`Nr. cerere`, `Termen de livrare solicitat`),
ceea ce confirmă că fluxul actual este de tip RFQ.

**12. Variantele nu sunt legate între ele.**
Cele trei dimensiuni ale cleștilor de sertizare la 45° (40/60/80 mm) sunt trei chip-uri
independente, fără nicio relație vizibilă.

## Ce trebuie păstrat (identitatea CMPORTAL)

- Header-ul alb, fix, de 50 px, cu bordură `rgba(0,0,0,.12)`.
- Logo-ul COLOR METAL (auriu `#C39B3F` + gri `#8A8A8A`) la ~218 px lățime.
- Navigația `Pagina Principala` / `Cauta Articole` / `Oferte`, cu iconițe aurii.
- `Favorite` (inimă roșie `#F44336`) și `Cosul meu` (text auriu `#F7C325`) cu badge roșu.
- Numele companiei și al utilizatorului în dreapta.
- Paleta: auriu `#F7C325`, buton auriu `#FFCA28` cu text alb, ardezie `#293845`,
  griuri `#90A4AE` / `#788795` / `#C3CFD9`, gri deschis `#EDF1F4`.
- Roboto 14px, colț de 3 px, umbre discrete, densitate mare, fără decorațiuni.
- Titlurile de pagină 24px/700 în `rgba(41,56,68,.75)`, cu iconiță aurie.
- Footer-ul cu contactul dedicat + coloana de documente.
- Conceptele existente de *Favorite* și *Coș*.
- Ierarhia de categorii existentă (*Accesorii arhitecturale → Scule FREUND*).

## Ce s-a schimbat în prototip

| Problemă | Soluție |
|---|---|
| Chip-uri gri | Carduri de produs cu înălțime constantă: fotografie → marcă → denumire → cod → atribut → stoc → preț → acțiuni |
| Fără imagini | Fotografii extrase din catalogul PDF, fundal alb, WebP, lazy-load |
| Fără preț | `xxx,xx lei + TVA` ca informație principală, `xxx,xx lei cu TVA (21%)` secundar |
| Fără stoc | `În stoc` / `Stoc limitat` / `Indisponibil momentan` (+ cantitate) |
| Nume + cod lipite | `Cod produs: 01678145` pe rând separat, tabular |
| All-caps fără diacritice | Denumiri în capitalizare normală, cu diacritice corecte |
| Fără căutare | Căutare live după denumire, cod și cuvinte-cheie, insensibilă la diacritice, cu sugestii |
| Fără filtre | Sidebar cu categorie, versiune (stânga/dreapta), disponibilitate, interval de preț; contorizări live; chip-uri de filtre active; „Șterge filtrele" |
| Fără sortare | Recomandate / Preț crescător / Preț descrescător / Denumire A–Z / Disponibilitate |
| Pop-up de imagine | Pagină de produs pe rută proprie, cu galerie, lightbox, tab-uri (Descriere, Aplicație, Beneficii, Specificații tehnice) și produse similare |
| Un buton global | `Adaugă în coș` pe fiecare card și pe pagina de produs, cu selector de cantitate și feedback |
| Coș fără valori | Coș cu preț unitar, subtotal pe linie, total fără TVA, TVA, total cu TVA |
| Variante nelegate | Blocul „Variante disponibile" pe pagina de produs, cu preț per variantă |
| Fără stări goale | Stare de căutare fără rezultate + acțiune de resetare; coș gol; favorite goale; produs indisponibil cu buton dezactivat |
