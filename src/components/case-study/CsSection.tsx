import type { ReactNode } from 'react'

/** A numbered chapter of the case study. */
export default function CsSection({ n, label, title, lead, children, id }: {
  n: string; label: string; title?: string; lead?: string; children?: ReactNode; id?: string
}) {
  return (
    <section className="cs-sec" id={id} data-sp="pass">
      <div className="cs-sec-head">
        <p className="cs-label" data-reveal><b>{n}</b>{label}</p>
        {title && <h2 data-reveal>{title}</h2>}
        {lead && <p className="cs-lead" data-reveal>{lead}</p>}
      </div>
      {children && <div className="cs-sec-body">{children}</div>}
    </section>
  )
}
