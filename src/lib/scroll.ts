const clamp = (n: number) => Math.min(1, Math.max(0, n))
type Track = { el: HTMLElement; mode: string; target: number; value: number; written: string }

/**
 * Writes a smoothed 0..1 progress value to --p on every [data-sp] element.
 * Modes: pass (element crosses the viewport), sticky (progress through a pinned section),
 * leave (element scrolling away from the top), page (whole-page progress).
 * The raw scroll position is only a target; the value eases toward it each frame.
 */
export function initScroll() {
  const tracks: Track[] = Array.from(document.querySelectorAll<HTMLElement>('[data-sp]')).map(el => ({ el, mode: el.dataset.sp || 'pass', target: 0, value: 0, written: '' }))
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { tracks.filter(t => t.mode !== 'page').forEach(t => t.el.style.setProperty('--p', '1')); return () => {} }
  const wide = matchMedia('(min-width:1000px)')
  let raf = 0, last = 0, first = true

  const measure = () => {
    const vh = innerHeight
    for (const t of tracks) {
      const r = t.el.getBoundingClientRect()
      if (t.mode === 'page') { const max = document.documentElement.scrollHeight - vh; t.target = max > 0 ? clamp(scrollY / max) : 0 }
      else if (t.mode === 'leave') t.target = clamp(-r.top / r.height)
      else if (t.mode === 'sticky' && wide.matches) t.target = clamp(-r.top / Math.max(1, r.height - vh))
      else if (t.mode === 'sticky') t.target = clamp((vh - r.top) / vh)
      else t.target = clamp((vh - r.top) / (vh + r.height))
      if (first) t.value = t.target
    }
    first = false
  }
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now
    const k = 1 - Math.exp(-dt * 9)
    let moving = false
    for (const t of tracks) {
      const d = t.target - t.value
      if (Math.abs(d) > 0.0005) { t.value += d * k; moving = true } else t.value = t.target
      const v = t.value.toFixed(4)
      if (v !== t.written) { t.el.style.setProperty('--p', v); t.written = v }
    }
    raf = moving ? requestAnimationFrame(frame) : 0
  }
  const kick = () => { measure(); if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
  addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick); addEventListener('load', kick)
  kick()
  return () => { cancelAnimationFrame(raf); removeEventListener('scroll', kick); removeEventListener('resize', kick); removeEventListener('load', kick) }
}
