import { useEffect, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { useRoute } from '../router'
const links = ['work', 'about', 'contact']
type VT = { ready: Promise<void> }

export default function Nav() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light')
  const [active, setActive] = useState('')
  const path = useRoute()
  const home = path === '/'
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(id => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [path])
  /** Theme change expands as a circle from the toggle (View Transitions); falls back to a colour fade. */
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement, t = theme === 'dark' ? 'light' : 'dark'
    const apply = () => { root.dataset.theme = t; flushSync(() => setTheme(t)) }
    try { localStorage.setItem('theme', t) } catch { /* ignore */ }
    const vt = (document as unknown as { startViewTransition?: (cb: () => void) => VT }).startViewTransition
    if (!vt || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theming'); apply(); setTimeout(() => root.classList.remove('theming'), 600); return
    }
    const r = e.currentTarget.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const run = vt.call(document, apply)
    run.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] }, { duration: 800, easing: 'cubic-bezier(.22,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }))
  }
  return (
    <header className="nav glass">
      <a href={home ? '#top' : '/'} className="mark" aria-label="Piyush Panbude, home"><span className="mark-full">Piyush Panbude</span><span className="mark-short" aria-hidden="true">PP</span></a>
      <nav aria-label="Primary">
        {links.map(id => <a key={id} href={home ? '#' + id : '/#' + id} aria-current={active === id ? 'true' : undefined}>{id[0].toUpperCase() + id.slice(1)}</a>)}
      </nav>
      <button className="icon" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />}
        </svg>
      </button>
    </header>
  )
}
