import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { matchesQuery, products, searchScore } from '../lib/catalog'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const box = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const suggestions = useMemo(() => {
    const q = value.trim()
    if (q.length < 2) return []
    return products
      .filter((p) => matchesQuery(p, q))
      .sort((a, b) => searchScore(a, q) - searchScore(b, q))
      .slice(0, 7)
  }, [value])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="searchbox" ref={box}>
      <Search size={17} className="icon" />
      <input
        type="search"
        value={value}
        placeholder="Caută după denumire sau cod produs..."
        aria-label="Caută produse FREUND"
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
          setCursor(-1)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!suggestions.length) return
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setCursor((c) => (c + 1) % suggestions.length)
            setOpen(true)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setCursor((c) => (c - 1 + suggestions.length) % suggestions.length)
          } else if (e.key === 'Enter' && cursor >= 0) {
            e.preventDefault()
            navigate(`/scule-freund/${suggestions[cursor].id}`)
            setOpen(false)
          } else if (e.key === 'Escape') {
            setOpen(false)
          }
        }}
      />
      {value && (
        <button className="clear" aria-label="Șterge căutarea" onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}

      {open && suggestions.length > 0 && (
        <div className="suggestions" role="listbox">
          {suggestions.map((p, i) => (
            <button
              key={p.id}
              role="option"
              aria-selected={i === cursor}
              onClick={() => {
                navigate(`/scule-freund/${p.id}`)
                setOpen(false)
              }}
            >
              <img src={asset(p.image)} alt="" loading="lazy" />
              <span>
                <span className="s-name">{p.name}</span>
                <br />
                <span className="s-sku">{p.sku}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
