import { useEffect } from 'react'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = value
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el) }
  el.href = href
}

/** Per-page document metadata: title, description, canonical and Open Graph tags. */
export function useSEO({ title, description, image }: { title: string; description: string; image?: string }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'article')
    setMeta('property', 'og:url', location.origin + location.pathname)
    if (image) setMeta('property', 'og:image', image)
    setLink('canonical', location.origin + location.pathname)
  }, [title, description, image])
}
