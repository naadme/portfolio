import type { Feature } from './types'
import { CsShot } from './CsBlocks'

/** Feature showcase: each capability explained with what it does, why it matters and its own visual. */
export default function CsFeatures({ items }: { items: Feature[] }) {
  return (
    <div className="cs-feats">
      {items.map((f, i) => (
        <article className="cs-feat" key={f.title}>
          <div className="cs-feat-copy" data-reveal>
            <p className="cs-feat-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
            <h3>{f.title}</h3>
            <p className="cs-feat-body">{f.body}</p>
            {f.why && <p className="cs-feat-why"><b>Why it matters.</b> {f.why}</p>}
          </div>
          {f.shot && <CsShot shot={f.shot} i={i % 3} />}
        </article>
      ))}
    </div>
  )
}
