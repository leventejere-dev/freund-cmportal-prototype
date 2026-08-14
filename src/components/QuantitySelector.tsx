import { Minus, Plus } from 'lucide-react'

interface Props {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string | false
  size?: 'sm' | 'md'
  disabled?: boolean
  label?: string
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  unit = 'BUC',
  size = 'md',
  disabled = false,
  label = 'Cantitate',
}: Props) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n))

  return (
    <div className={`qty${size === 'sm' ? ' sm' : ''}`}>
      <button
        type="button"
        aria-label="Scade cantitatea"
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - 1))}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10)
          onChange(Number.isNaN(parsed) ? min : clamp(parsed))
        }}
        onBlur={(e) => {
          const parsed = parseInt(e.target.value, 10)
          onChange(Number.isNaN(parsed) ? min : clamp(parsed))
        }}
      />
      <button
        type="button"
        aria-label="Crește cantitatea"
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1))}
      >
        <Plus size={15} />
      </button>
      {unit ? <span className="unit">{unit}</span> : null}
    </div>
  )
}
