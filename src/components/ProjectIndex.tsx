import { useEffect, useState } from 'react'
import { projects } from '../data/projects'

/** Glass project switcher: appears while a project is on screen, highlights it, jumps on click. */
export default function ProjectIndex() {
  const [active, setActive] = useState(-1)
  useEffect(() => {
    const stages = projects.map(p => document.getElementById(p.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(projects.findIndex(p => p.id === e.target.id)) }), { rootMargin: '-48% 0px -48% 0px' })
    stages.forEach(s => io.observe(s))
    const work = document.getElementById('work')
    const out = new IntersectionObserver(([e]) => { if (!e.isIntersecting) setActive(-1) }, { rootMargin: '-30% 0px -30% 0px' })
    if (work) out.observe(work)
    return () => { io.disconnect(); out.disconnect() }
  }, [])
  return (
    <nav className={'pindex glass' + (active >= 0 ? ' show' : '')} aria-label="Projects">
      {projects.map((p, i) => <a key={p.id} href={'#' + p.id} aria-current={i === active ? 'true' : undefined}><span>{p.n}</span><span className="nm">{p.name}</span></a>)}
    </nav>
  )
}
