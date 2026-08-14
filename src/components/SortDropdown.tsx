export const SORTS = {
  recomandate: 'Recomandate',
  'pret-asc': 'Preț crescător',
  'pret-desc': 'Preț descrescător',
  'nume-az': 'Denumire A–Z',
  disponibilitate: 'Disponibilitate',
} as const

export type SortKey = keyof typeof SORTS

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
}) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span className="sr-only">Sortare</span>
      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label="Sortare produse"
      >
        {Object.entries(SORTS).map(([k, label]) => (
          <option key={k} value={k}>
            Sortare: {label}
          </option>
        ))}
      </select>
    </label>
  )
}
