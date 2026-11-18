import { projects } from '../../data/projects'

/** End of the case study: previous / next project, back to all projects and a contact CTA. */
export default function CsNav({ current }: { current: string }) {
  const i = projects.findIndex(p => p.slug === current)
  const prev = projects[(i + projects.length - 1) % projects.length]
  const next = projects[(i + 1) % projects.length]
  return (
    <footer className="cs-end">
      <div className="wrap">
        <nav className="case-nav" aria-label="Project navigation">
          <a className="btn glass" href={`/work/${prev.slug}`}>
            <span>← Previous project</span><b>{prev.name}</b>
          </a>
          <a className="btn glass next" href={`/work/${next.slug}`}>
            <span>Next project →</span><b>{next.name}</b>
          </a>
        </nav>

        <div className="cs-cta" data-reveal>
          <div>
            <p className="cs-label"><b>Next</b> Let’s talk</p>
            <h2>Have a project worth building properly?</h2>
            <p>Tell me what you’re working on and I’ll come back with honest thoughts on scope, timeline and approach.</p>
          </div>
          <div className="cs-cta-actions">
            <a className="visit" data-magnetic href="/#contact">Get in touch<span aria-hidden="true">↗</span><span className="sr">(opens the contact section)</span></a>
            <a className="btn glass" href="/#work">Back to all projects</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
