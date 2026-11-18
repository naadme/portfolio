import type { CSSProperties } from 'react'
import { ruhiPoints, type Project } from '../data/projects'
import Frame from './Frame'
import VisitButton from './VisitButton'

const rv = (k: number) => ({ '--k': k } as CSSProperties)

/** One pinned project showcase. Layout alternates with `index`; progress comes from data-sp. */
export default function ProjectStage({ p, index }: { p: Project; index: number }) {
  const href = '/work/' + p.slug
  return (
    <section className={'pj' + (index % 2 ? ' flip' : '')} data-sp="sticky" id={p.id} aria-label={p.name}>
      <div className="pj-stick">
        <div className="pj-copy">
          <p className="pj-meta rv" style={rv(0)}><span className="pj-n">{p.n}</span><span>{p.category}</span></p>
          <h3 className="rv" style={rv(1)}>{p.name}</h3>
          <p className="pj-desc rv" style={rv(2)}>{p.description}</p>
          <ul className="p-tech rv" style={rv(3)} aria-label="Technologies">{p.tech.map(t => <li key={t} className="glass">{t}</li>)}</ul>
          <div className="p-links rv" style={rv(4)}>
            {p.link && <VisitButton link={p.link} />}
            <a className="btn glass" href={href}>Read case study</a>
          </div>
        </div>
        <div className="pj-visual">
          <a className="tilt" data-tilt href={href} aria-label={`Open the ${p.name} case study`}>
            {p.images.length ? <>
              <Frame src={p.images[0]} alt={`${p.name} desktop preview`} cls="d" badge={p.status} />
              <Frame src={p.images[1]} alt={`${p.name} mobile preview`} cls="m" />
            </> : <div className="ruhi frame d">
              <p className="wordmark" aria-hidden="true">Ruhi<br />Collections</p>
              <ul>{ruhiPoints.map(x => <li key={x}>{x}</li>)}</ul>
              <span className="badge glass">{p.status}</span>
            </div>}
            <span className="sheen" aria-hidden="true" />
            <span className="peek glass" aria-hidden="true">Read case study ↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
