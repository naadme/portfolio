import type { Shot } from './types'
import CsImg from './CsImg'
import { delay } from './CsPage'

/** One screenshot, optionally framed and captioned, revealed as it scrolls in. */
export function CsShot({ shot, i = 0, frame = 'wide' }: { shot: Shot; i?: number; frame?: 'wide' | 'phone' | 'plain' | 'long' }) {
  return (
    <figure className={`cs-fig cs-fig--${shot.frame || frame}`} style={delay(Math.min(i, 4) * 70)} data-reveal>
      <div className="cs-fig-box"><CsImg src={shot.src} alt={shot.alt} /></div>
      {shot.cap && <figcaption>{shot.cap}</figcaption>}
    </figure>
  )
}

/** Paragraph block. */
export function CsProse({ paras }: { paras: string[] }) {
  return <div className="cs-prose">{paras.map((p, i) => <p key={i} data-reveal style={delay(i * 60)}>{p}</p>)}</div>
}

/** Numbered list of titled points — used for challenges, approach and outcomes. */
export function CsList({ items, ordered = true }: { items: { title: string; body: string }[]; ordered?: boolean }) {
  return (
    <ol className="cs-list">
      {items.map((it, i) => (
        <li key={it.title} data-reveal style={delay(i * 70)}>
          <span className="cs-li-n" aria-hidden="true">{ordered ? String(i + 1).padStart(2, '0') : '—'}</span>
          <div><h3>{it.title}</h3><p>{it.body}</p></div>
        </li>
      ))}
    </ol>
  )
}

/** Two-to-four column supporting copy (contributions, outcomes, roles). */
export function CsCols({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className={`cs-cols cs-cols--${items.length}`}>
      {items.map((it, i) => (
        <article key={it.title} data-reveal style={delay(i * 80)}>
          <h3>{it.title}</h3><p>{it.body}</p>
        </article>
      ))}
    </div>
  )
}

/** Closing statement. */
export function CsQuote({ text, by }: { text: string; by?: string }) {
  return <blockquote className="cs-quote" data-reveal><p>{text}</p>{by && <cite>{by}</cite>}</blockquote>
}
