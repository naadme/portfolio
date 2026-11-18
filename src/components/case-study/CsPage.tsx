import type { CSSProperties, ReactNode } from 'react'
import { useEffect } from 'react'
import { useSEO } from '../../lib/seo'
import { useScrollEngine } from '../../hooks/useScrollEngine'
import { usePointerFx } from '../../hooks/usePointerFx'
import CsHero from './CsHero'
import CsNav from './CsNav'
import type { Meta, Tone } from './types'

/** Reveals every [data-reveal] element as it enters the viewport; reduced motion shows everything. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

/** Shell for every case study: metadata, hero, body, project navigation and page SEO. */
export default function CsPage({ meta, tone, children }: { meta: Meta; tone: Tone; children: ReactNode }) {
  useScrollEngine(); usePointerFx(); useReveal()
  useSEO({
    title: meta.seo.title,
    description: meta.seo.description,
    image: new URL(meta.hero.src, location.origin).href,
  })
  return (
    <main className={`cs cs--${tone}`} id="cs-main">
      <CsHero meta={meta} />
      <div className="cs-body">{children}</div>
      <CsNav current={meta.slug} />
    </main>
  )
}

/** Small helper so sections can stagger their own reveals. */
export const delay = (ms: number) => ({ '--rd': ms + 'ms' } as CSSProperties)
