import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Calculator,
  DollarSign,
  Heart,
  LayoutGrid,
  type LucideIcon,
  Map,
  Phone,
  Shapes,
  Star,
  Store,
  Truck,
  Users,
} from 'lucide-react'
import FreundMark from '../components/FreundMark'
import { products } from '../lib/catalog'

interface Tile {
  icon: LucideIcon
  label: string
  to?: string
}

const SECTIONS: Array<{ title: string; tiles: Tile[] }> = [
  {
    title: 'ACTIVITATE',
    tiles: [
      { icon: Shapes, label: 'CAUTA ARTICOLE', to: '/articole' },
      { icon: Heart, label: 'ARTICOLE FAVORITE', to: '/favorite' },
      { icon: Store, label: 'OFERTE' },
    ],
  },
  {
    title: 'DATE FINANCIARE',
    tiles: [
      { icon: Star, label: 'BALANTA' },
      { icon: DollarSign, label: 'FACTURI' },
      { icon: AlertTriangle, label: 'ALERTE' },
    ],
  },
  {
    title: 'CONTUL MEU',
    tiles: [
      { icon: Building2, label: 'DATE COMPANIE' },
      { icon: Users, label: 'UTILIZATORI' },
      { icon: Truck, label: 'ADRESE DE LIVRARE' },
    ],
  },
  {
    title: 'INFO UTILE',
    tiles: [
      { icon: BookOpen, label: 'TEHNIPEDIA' },
      { icon: Phone, label: 'SERVICE CENTER' },
      { icon: Calculator, label: 'CALCULATOR GREUTATE' },
      { icon: Map, label: 'RUTE DISTRIBUTIE' },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">
          <LayoutGrid size={26} /> Pagina Principala
        </h1>

        <Link to="/articole" className="brand-head" style={{ textDecoration: 'none' }}>
          <FreundMark width={124} />
          <div className="txt">
            <h1 style={{ fontSize: 18 }}>Scule profesionale FREUND — noul magazin</h1>
            <p>
              {products.length} articole cu fotografii, prețuri, stoc, filtre și coș de
              cumpărături. Drumul din portal: <b>Cauta Articole → Accesorii arhitecturale →
              Scule FREUND</b>.
            </p>
          </div>
          <div className="count">
            <b>{products.length}</b>
            <span>articole</span>
          </div>
        </Link>

        <p className="proto-note" style={{ marginTop: 18 }}>
          Aceasta este pagina principală a portalului, reprodusă ca punct de plecare. În
          prototip sunt active doar <b>Cauta Articole</b> și <b>Articole favorite</b>; restul
          secțiunilor sunt afișate ca în portal, dar inactive.
        </p>

        {SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="section-label">{section.title}</div>
            <div className="home-grid">
              {section.tiles.map(({ icon: Icon, label, to }) =>
                to ? (
                  <Link key={label} to={to} className="home-tile">
                    <Icon size={22} />
                    <div>
                      <h3>{label}</h3>
                      <p>
                        {label === 'CAUTA ARTICOLE'
                          ? 'Catalogul de produse Color Metal, inclusiv sculele FREUND.'
                          : 'Produsele salvate de utilizatorii companiei tale.'}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <span
                    key={label}
                    className="home-tile muted"
                    title="Nu face parte din acest prototip"
                  >
                    <Icon size={22} />
                    <div>
                      <h3>{label}</h3>
                      <p>Nu face parte din acest prototip.</p>
                    </div>
                  </span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
