import VisitButton from '../VisitButton'
import CsImg from './CsImg'
import type { Meta } from './types'

/** Project hero: index, metadata, tagline, facts, call to action and the lead visual. */
export default function CsHero({ meta }: { meta: Meta }) {
  return (
    <header className="cs-hero" id="cs-top">
      <div className="wrap">
        <a className="cs-back" href="/#work"><span aria-hidden="true">←</span> All projects</a>
        <p className="cs-kicker" data-reveal>
          <span className="cs-n">{meta.n}</span>
          <span>{meta.industry}</span>
          <span className="cs-sep" aria-hidden="true" />
          <span>{meta.type}</span>
        </p>
        <h1 data-reveal>{meta.name}</h1>
        <p className="cs-tagline" data-reveal>{meta.tagline}</p>

        <dl className="cs-facts" data-reveal>
          <div><dt>Industry</dt><dd>{meta.industry}</dd></div>
          <div><dt>Project type</dt><dd>{meta.type}</dd></div>
          <div><dt>My role</dt><dd>{meta.role}</dd></div>
          <div><dt>Status</dt><dd><span className="cs-status">{meta.status}</span></dd></div>
          <div className="cs-facts-wide"><dt>Built with</dt><dd>
            <ul className="cs-chips">{meta.stack.map(s => <li key={s.name}>{s.name}</li>)}</ul>
          </dd></div>
        </dl>

        <div className="cs-actions" data-reveal>
          {meta.live && <VisitButton link={meta.live} />}
          <a className="btn" href="/#work">Back to work</a>
        </div>
      </div>

      <figure className="cs-hero-fig" data-sp="pass">
        <div className="cs-fig-box"><CsImg src={meta.hero.src} alt={meta.hero.alt} eager /></div>
        {meta.hero.cap && <figcaption className="wrap">{meta.hero.cap}</figcaption>}
      </figure>

      <div className="wrap">
        <div className="cs-overview">
          <p className="cs-label" data-reveal><b>00</b> Project overview</p>
          {meta.overview.map((p, i) => <p key={i} data-reveal>{p}</p>)}
        </div>
      </div>
    </header>
  )
}
