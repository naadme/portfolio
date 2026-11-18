import { useEffect, useRef, useState } from 'react'
/** Counts up to a value like "6+" or "100%" the first time it scrolls into view. */
export default function CountUp({ value }: { value: string }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^(\d+)(.*)$/)
  useEffect(() => {
    const el = ref.current, mm = value.match(/^(\d+)(.*)$/)
    if (!el || !mm) return
    const n = +mm[1]
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(n); return }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (now: number) => { const t = Math.min(1, (now - t0) / 1500); setV(Math.round(n * (1 - Math.pow(1 - t, 3)))); if (t < 1) raf = requestAnimationFrame(step) }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  return <><span ref={ref} aria-hidden="true">{v}{m ? m[2] : ''}</span><span className="sr">{value}</span></>
}
