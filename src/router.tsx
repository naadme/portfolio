import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'

const EVT = 'app:navigate'

/** Push a same-origin URL and notify the app. */
export function navigate(to: string) {
  const url = new URL(to, location.origin)
  if (url.origin !== location.origin) { location.href = to; return }
  history.pushState({}, '', to)
  window.dispatchEvent(new Event(EVT))
}

/** Current pathname, kept in sync with pushState/popstate. */
export function useRoute() {
  const [path, setPath] = useState(() => location.pathname)
  useEffect(() => {
    const update = () => setPath(location.pathname)
    addEventListener('popstate', update)
    addEventListener(EVT, update)
    /** Same-origin <a href="/..."> links become client-side navigations; hash-only links stay native. */
    const onClick = (e: ReactMouseEvent | MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey || (e as MouseEvent).shiftKey || (e as MouseEvent).altKey) return
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.relList.contains('external')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname && url.search === location.search) return // in-page anchor
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => { removeEventListener('popstate', update); removeEventListener(EVT, update); document.removeEventListener('click', onClick) }
  }, [])
  return path
}
