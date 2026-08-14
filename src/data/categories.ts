/**
 * Category tree reproduced from the production portal
 * (cmportal.ro → Cauta Articole → /browse_categories/0).
 *
 * Only "Scule FREUND" is interactive in this prototype — the rest are shown
 * exactly as in the portal so the navigation path stays recognisable.
 */
export interface CategoryTile {
  name: string
  /** Set only for the tile that is live in this prototype. */
  to?: string
  image?: string
}

export interface CategoryGroup {
  title: string
  tiles: CategoryTile[]
}

export const categoryGroups: CategoryGroup[] = [
  {
    title: 'ACCESORII ARHITECTURALE',
    tiles: [
      {
        name: 'SCULE FREUND',
        to: '/scule-freund',
        image: 'products/freund/categorie-scule-freund.webp',
      },
    ],
  },
  {
    title: 'ALUMINIU',
    tiles: [
      { name: 'PROFILE, TEVI ALUMINIU' },
      { name: 'PLACI ALUMINIU' },
      { name: 'STUCCO, STRIATE, DIAMOND, PERFORATE' },
      { name: 'BARE ALUMINIU' },
      { name: 'GARD ALUMINIU' },
      { name: 'TABLE LISĂ ALUMINIU' },
      { name: 'BENZI ALUMINIU STANDARD' },
      { name: 'FAȚADĂ VENTILATĂ' },
    ],
  },
  {
    title: 'ALAMA',
    tiles: [{ name: 'BARE ALAMA' }, { name: 'TABLE ALAMA' }, { name: 'PLACI ALAMA' }],
  },
  {
    title: 'CUPRU',
    tiles: [
      { name: 'BARE CUPRU' },
      { name: 'BENZI CUPRU ARHITECTURAL' },
      { name: 'TABLE CUPRU' },
      { name: 'PLACI CUPRU' },
      { name: 'TEVI ROTUNDE CUPRU' },
    ],
  },
  {
    title: 'BRONZ',
    tiles: [{ name: 'BARE ROTUNDE BRONZ' }],
  },
  {
    title: 'TITAN ZINC',
    tiles: [{ name: 'BENZI TITAN ZINC' }, { name: 'TABLE TITAN ZINC' }],
  },
]
