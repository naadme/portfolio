import { useEffect, useRef, useState } from 'react'
type Props = { src: string; alt: string; cls: 'd' | 'm'; badge?: string }
export default function Frame({ src, alt, cls, badge }: Props) {
  const img = useRef<HTMLImageElement>(null)
  const [ok, setOk] = useState(false)
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setOk(true) }, [])
  return <div className={'frame ' + cls}><img ref={img} className={ok ? 'ok' : ''} onLoad={() => setOk(true)} src={src} alt={alt} loading="lazy" decoding="async" />{badge && <span className="badge glass">{badge}</span>}</div>
}
