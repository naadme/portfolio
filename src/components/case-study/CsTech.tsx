import type { CSSProperties } from 'react'
import type { Stack } from './types'

/** Technology section: every technology described by the role it plays in the build. */
export default function CsTech({ items, note }: { items: Stack[]; note?: string }) {
  return (
    <>
      <ul className="cs-tech">
        {items.map((t, i) => (
          <li key={t.name} data-reveal style={{ '--rd': i * 70 + 'ms' } as CSSProperties}>
            <h3>{t.name}</h3>
            <p>{t.role}</p>
          </li>
        ))}
      </ul>
      {note && <p className="cs-note" data-reveal>{note}</p>}
    </>
  )
}
