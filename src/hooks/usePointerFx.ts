import { useEffect } from 'react'

/** Pointer-only effects (mouse/trackpad): tilt + sheen on [data-tilt], magnetic pull on [data-magnetic]. */
export function usePointerFx() {
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cur: HTMLElement | null = null, raf = 0, ev: PointerEvent | null = null
    const reset = (el: HTMLElement) => { ['--rx', '--ry', '--tx', '--ty', '--hover'].forEach(k => el.style.setProperty(k, '0')) }
    const apply = () => {
      raf = 0
      if (!ev) return
      const t = (ev.target as Element).closest<HTMLElement>('[data-tilt],[data-magnetic]')
      if (cur && cur !== t) { reset(cur); cur = null }
      if (!t) return
      cur = t
      const r = t.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height
      if ('tilt' in t.dataset) {
        t.style.setProperty('--rx', ((x - 0.5) * 2).toFixed(3)); t.style.setProperty('--ry', ((y - 0.5) * 2).toFixed(3))
        t.style.setProperty('--mx', x.toFixed(3)); t.style.setProperty('--my', y.toFixed(3)); t.style.setProperty('--hover', '1')
      } else {
        t.style.setProperty('--tx', ((x - 0.5) * r.width * 0.22).toFixed(1) + 'px'); t.style.setProperty('--ty', ((y - 0.5) * r.height * 0.32).toFixed(1) + 'px')
      }
    }
    const move = (e: PointerEvent) => { ev = e; if (!raf) raf = requestAnimationFrame(apply) }
    const leave = () => { if (cur) { reset(cur); cur = null } }
    document.addEventListener('pointermove', move, { passive: true }); document.documentElement.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave) }
  }, [])
}
