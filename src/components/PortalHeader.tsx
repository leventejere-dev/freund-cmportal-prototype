import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Briefcase,
  Heart,
  LayoutGrid,
  Menu,
  Shapes,
  ShoppingCart,
  User,
  X,
} from 'lucide-react'
import { useStore } from '../lib/store'

const logo = `${import.meta.env.BASE_URL}brand/color-metal.svg`

/**
 * Reproduction of the production cmportal.ro toolbar: logo, three primary nav
 * entries, Favorite / Coșul meu counters, company + user block.
 */
export default function PortalHeader() {
  const { cartCount, favorites } = useStore()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header className="cm-header">
        <div className="container cm-toolbar">
          <button
            className="cm-burger"
            aria-label="Deschide meniul"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="cm-logo" aria-label="COLOR METAL — Portal Parteneri">
            <img src={logo} alt="COLOR METAL" width={218} height={20} />
            <span className="cm-portal-label">PORTAL PARTENERI</span>
          </Link>

          <nav className="cm-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `cm-navlink${isActive ? ' is-active' : ''}`}
            >
              <LayoutGrid size={17} /> Pagina Principala
            </NavLink>
            <NavLink
              to="/articole"
              className={({ isActive }) =>
                `cm-navlink${isActive || location.pathname.startsWith('/scule-freund') ? ' is-active' : ''}`
              }
            >
              <Shapes size={17} /> Cauta Articole
            </NavLink>
            <span className="cm-navlink" style={{ opacity: 0.55, cursor: 'default' }}>
              <Briefcase size={17} /> Oferte
            </span>
          </nav>

          <span className="cm-spacer" />

          <div className="cm-actions">
            <Link to="/favorite" className="cm-action" aria-label="Favorite">
              <Heart size={20} className="heart" />
              <span className="hide-sm">Favorite</span>
              {favorites.length > 0 && (
                <span className="cm-badge on-heart">{favorites.length}</span>
              )}
            </Link>

            <Link to="/cos" className="cm-action" aria-label="Coșul meu">
              <ShoppingCart size={20} className="cart" />
              <span className="cart-label">
                Coșul meu
                <small>
                  {cartCount} {cartCount === 1 ? 'articol' : 'articole'}
                </small>
              </span>
              {cartCount > 0 && <span className="cm-badge">{cartCount}</span>}
            </Link>

            <span className="cm-company">MELTRANS SRL</span>
            <span className="cm-user">
              <span className="uname">LEVENTE JERE</span>
              <User size={19} />
            </span>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className="cm-drawer-backdrop" onClick={() => setOpen(false)} />
          <aside className="cm-drawer" role="dialog" aria-label="Meniu">
            <button className="drawer-item" onClick={() => setOpen(false)}>
              <X size={20} /> Închide
            </button>
            <hr />
            <Link to="/">
              <LayoutGrid size={20} /> Pagina Principala
            </Link>
            <Link to="/articole">
              <Shapes size={20} /> Articole
            </Link>
            <Link to="/favorite">
              <Heart size={20} /> Favorite
            </Link>
            <Link to="/cos">
              <ShoppingCart size={20} /> Coșul meu
            </Link>
            <hr />
            <div style={{ padding: '4px 18px', color: '#788795', fontSize: 13 }}>
              MELTRANS SRL — LEVENTE JERE
            </div>
          </aside>
        </>
      )}
    </>
  )
}
