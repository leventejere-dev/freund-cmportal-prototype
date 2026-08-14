import { useEffect, useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import type { Product } from '../data/types'

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

export default function ProductGallery({ product }: { product: Product }) {
  const images: Array<{ src: string; label: string }> = [
    { src: product.imageLarge, label: 'Produs' },
    ...(product.imageSheet ? [{ src: product.imageSheet, label: 'Fișa din catalog' }] : []),
  ]
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => setIndex(0), [product.id])

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [zoom])

  return (
    <div className="gallery">
      <button
        className="main"
        style={{ border: '1px solid var(--cm-border-soft)', background: '#fff' }}
        onClick={() => setZoom(true)}
        aria-label="Mărește imaginea produsului"
      >
        <img
          src={asset(images[index].src)}
          alt={product.name}
          width={1100}
          height={1100}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = asset('brand/placeholder.svg')
          }}
        />
        <span className="zoom-hint">
          <ZoomIn size={14} /> Click pentru mărire
        </span>
      </button>

      {images.length > 1 && (
        <div className="thumbs">
          {images.map((img, i) => (
            <button
              key={img.src}
              className={i === index ? 'on' : undefined}
              onClick={() => setIndex(i)}
              aria-label={img.label}
              title={img.label}
            >
              <img src={asset(img.src)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <button className="close" aria-label="Închide">
            <X size={26} />
          </button>
          <img src={asset(images[index].src)} alt={product.name} />
        </div>
      )}
    </div>
  )
}
