import { useEffect, useRef, useState } from 'react'

/** Image that fades in once decoded, so galleries never flash an empty box. */
export default function CsImg({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const ref = useRef<HTMLImageElement>(null)
  const [ok, setOk] = useState(false)
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth) setOk(true) }, [src])
  return <img ref={ref} className={ok ? 'ok' : ''} src={src} alt={alt} decoding="async"
    loading={eager ? 'eager' : 'lazy'} onLoad={() => setOk(true)} />
}
