import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Navigare secțiune">
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`} style={{ display: 'inline-flex', gap: 6 }}>
          {i > 0 && <span className="sep">/</span>}
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="current">{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}
