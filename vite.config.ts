import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The public demo is served from a GitHub Pages project path,
// e.g. https://<user>.github.io/<repo>/ — pass it via BASE_PATH at build time.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    assetsInlineLimit: 2048,
  },
})
