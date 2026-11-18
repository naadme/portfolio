import { useEffect } from 'react'
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Eased, cancellable scrolling for in-page links. Project links land mid-stage so the content is visible. */
export function useAnchorScroll() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    const stop = () => cancelAnimationFrame(raf)
    const to = (y: number) => {
      stop()
      if (reduce.matches) { scrollTo(0, y); return }
      const y0 = scrollY, d = y - y0, dur = Math.min(1700, Math.max(800, Math.abs(d) * 0.42)), t0 = performance.now()
      const step = (now: number) => { const t = Math.min(1, (now - t0) / dur); scrollTo(0, y0 + d * ease(t)); if (t < 1) raf = requestAnimationFrame(step) }
      raf = requestAnimationFrame(step)
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const id = a.getAttribute('href')!.slice(1)
      const el = id === 'top' ? document.body : document.getElementById(id)
      if (!el) return
      e.preventDefault()
      let y = id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY
      if (el.classList.contains('pj')) y += innerWidth >= 1000 ? (el.offsetHeight - innerHeight) * 0.5 : -72
      to(Math.max(0, y))
      el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true })
    }
    const cancel = ['wheel', 'touchstart', 'keydown']
    document.addEventListener('click', onClick)
    cancel.forEach(ev => addEventListener(ev, stop, { passive: true }))
    return () => { stop(); document.removeEventListener('click', onClick); cancel.forEach(ev => removeEventListener(ev, stop)) }
  }, [])
}
