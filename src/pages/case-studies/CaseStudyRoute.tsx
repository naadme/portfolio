import RuhiCollections from './RuhiCollections'
import ChawalaDentalClinic from './ChawalaDentalClinic'
import NextWave from './NextWave'
import HindustanCourier from './HindustanCourier'
import EarringQueen from './EarringQueen'
import type { ComponentType } from 'react'

const pages: Record<string, ComponentType> = {
  'ruhi-collections': RuhiCollections,
  'chawala-dental-clinic': ChawalaDentalClinic,
  'nextwave': NextWave,
  'hindustan-courier': HindustanCourier,
  'earringqueen': EarringQueen,
}

/** Resolves /work/:slug to a case study, with a graceful fallback for unknown slugs. */
export default function CaseStudyRoute({ slug }: { slug: string }) {
  const Page = pages[slug]
  if (Page) return <Page />
  return (
    <main className="cs" id="cs-main">
      <div className="wrap cs-404">
        <p className="cs-label"><b>404</b> Project not found</p>
        <h1>That project isn’t here.</h1>
        <p className="cs-tagline">It may have moved, or the address may be mistyped.</p>
        <div className="cs-actions"><a className="btn primary" href="/#work">Back to all projects</a></div>
      </div>
    </main>
  )
}
