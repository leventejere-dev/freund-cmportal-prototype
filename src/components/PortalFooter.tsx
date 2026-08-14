import { User } from 'lucide-react'

/* Brand glyphs are inlined: lucide-react no longer ships brand icons. */
const Facebook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  </svg>
)
const Linkedin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.06A4.17 4.17 0 0 1 16.6 8.7c4 0 4.74 2.5 4.74 5.76V21h-4v-5.72c0-1.37-.03-3.12-1.94-3.12-1.95 0-2.25 1.48-2.25 3.02V21H9V9Z" />
  </svg>
)
const Youtube = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.02V8.98L15.2 12 10 15.02Z" />
  </svg>
)

export default function PortalFooter() {
  return (
    <footer className="cm-footer">
      <div className="container cols">
        <div>
          <h4>Contactele mele Color Metal</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <User size={15} /> MATE SANDOR
          </p>
          <p>0747 282 791 · mate.sandor@color-metal.ro</p>
        </div>
        <div>
          <h4>Documente</h4>
          <p>Declarație de conformitate</p>
          <p>Condiții generale de vânzare</p>
          <p>Cataloage</p>
        </div>
        <div>
          <h4>&nbsp;</h4>
          <div className="socials">
            <Facebook />
            <Linkedin />
            <Youtube />
          </div>
        </div>
      </div>
    </footer>
  )
}
