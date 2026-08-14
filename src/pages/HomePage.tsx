import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Building2,
  Calculator,
  DollarSign,
  Heart,
  LayoutGrid,
  Package,
  Star,
  Truck,
  Users,
} from 'lucide-react'
import FreundMark from '../components/FreundMark'
import { products } from '../lib/catalog'

export default function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">
          <LayoutGrid size={26} /> Pagina Principala
        </h1>

        <Link
          to="/scule-freund"
          className="brand-head"
          style={{ textDecoration: 'none', marginBottom: 8 }}
        >
          <FreundMark width={124} />
          <div className="txt">
            <h1 style={{ fontSize: 18 }}>Scule profesionale FREUND — noul magazin</h1>
            <p>
              {products.length} articole cu fotografii, prețuri, stoc, filtre și coș de
              cumpărături. Intră în secțiune →
            </p>
          </div>
          <div className="count">
            <b>{products.length}</b>
            <span>articole</span>
          </div>
        </Link>

        <div className="section-label">Activitate</div>
        <div className="home-grid">
          <Link to="/scule-freund" className="home-tile">
            <Package size={22} />
            <div>
              <h3>Cauta Articole</h3>
              <p>Catalogul de produse Color Metal, inclusiv sculele FREUND.</p>
            </div>
          </Link>
          <Link to="/favorite" className="home-tile">
            <Heart size={22} />
            <div>
              <h3>Articole favorite</h3>
              <p>Produsele salvate de utilizatorii companiei tale.</p>
            </div>
          </Link>
          <span className="home-tile muted">
            <Star size={22} />
            <div>
              <h3>Oferte</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
        </div>

        <div className="section-label">Date financiare</div>
        <div className="home-grid">
          <span className="home-tile muted">
            <Star size={22} />
            <div>
              <h3>Balanta</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
          <span className="home-tile muted">
            <DollarSign size={22} />
            <div>
              <h3>Facturi</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
          <span className="home-tile muted">
            <AlertTriangle size={22} />
            <div>
              <h3>Alerte</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
        </div>

        <div className="section-label">Contul meu</div>
        <div className="home-grid">
          <span className="home-tile muted">
            <Building2 size={22} />
            <div>
              <h3>Date companie</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
          <span className="home-tile muted">
            <Users size={22} />
            <div>
              <h3>Utilizatori</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
          <span className="home-tile muted">
            <Truck size={22} />
            <div>
              <h3>Adrese de livrare</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
        </div>

        <div className="section-label">Info utile</div>
        <div className="home-grid">
          <span className="home-tile muted">
            <Calculator size={22} />
            <div>
              <h3>Calculator greutate</h3>
              <p>Nu face parte din acest prototip.</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}
