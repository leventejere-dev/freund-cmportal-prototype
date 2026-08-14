import { Link } from 'react-router-dom'
import { Lock, Shapes } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs'
import { categoryGroups, type CategoryTile } from '../data/categories'
import { products } from '../lib/catalog'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

function TileBody({ tile }: { tile: CategoryTile }) {
  return (
    <>
      <span className="cat-thumb">
        {tile.image ? (
          <img src={asset(tile.image)} alt="" loading="lazy" width={600} height={1066} />
        ) : (
          <span className="cat-thumb-empty" aria-hidden="true">
            <Lock size={20} />
          </span>
        )}
      </span>
      <span className="cat-name">{tile.name}</span>
      {tile.to && <span className="cat-count">{products.length} articole</span>}
    </>
  )
}

export default function BrowseCategoriesPage() {
  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Pagina principală', to: '/' }, { label: 'Articole' }]} />

        <h1 className="page-title">
          <Shapes size={26} /> Cauta Articole
        </h1>

        <p className="proto-note">
          Structura de categorii este cea din Portalul Partenerilor. În acest prototip este
          activă doar categoria <b>Scule FREUND</b> — restul sunt afișate doar pentru a arăta
          drumul până la ea.
        </p>

        {categoryGroups.map((group) => (
          <section key={group.title} className="cat-group">
            <h2>{group.title}</h2>
            <div className="cat-grid">
              {group.tiles.map((tile) =>
                tile.to ? (
                  <Link key={tile.name} to={tile.to} className="cat-tile is-live">
                    <TileBody tile={tile} />
                  </Link>
                ) : (
                  <span
                    key={tile.name}
                    className="cat-tile is-disabled"
                    aria-disabled="true"
                    title="Nu face parte din acest prototip"
                  >
                    <TileBody tile={tile} />
                  </span>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
