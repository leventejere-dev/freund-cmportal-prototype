import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../lib/store'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckCircle2 size={18} />
      <span>{toast}</span>
    </div>
  )
}
