import { Link, Route, Routes } from 'react-router-dom'
import PortalHeader from './components/PortalHeader'
import PortalFooter from './components/PortalFooter'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import BrowseCategoriesPage from './pages/BrowseCategoriesPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'

function DemoBar() {
  return (
    <div className="demo-bar">
      <div className="container">
        <b>PROTOTIP UI/UX</b>
        <span>
          Machetă funcțională a secțiunii FREUND din Portalul Partenerilor Color Metal · stocuri și utilizator = date demonstrative · prețuri din lista de prețuri FREUND · fără legătură cu sistemele de producție
        </span>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="page container">
      <div className="empty" style={{ marginTop: 40 }}>
        <h3>Pagina nu a fost găsită</h3>
        <p>Verifică adresa sau întoarce-te la catalogul de scule FREUND.</p>
        <Link className="btn btn-outline" to="/scule-freund">
          Scule FREUND
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <DemoBar />
      <PortalHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articole" element={<BrowseCategoriesPage />} />
          <Route path="/scule-freund" element={<CategoryPage />} />
          <Route path="/scule-freund/:slug" element={<ProductPage />} />
          <Route path="/cos" element={<CartPage />} />
          <Route path="/favorite" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PortalFooter />
      <Toast />
    </>
  )
}
