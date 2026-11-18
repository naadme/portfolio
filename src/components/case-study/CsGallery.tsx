import type { ShotGroup } from './types'
import { CsShot } from './CsBlocks'

/** Screenshot gallery with several compositions so pages never repeat the same card grid. */
export default function CsGallery({ group }: { group: ShotGroup }) {
  const { layout, shots } = group
  return (
    <div className="cs-gal-block">
      {(group.title || group.note) && (
        <div className="cs-gal-head" data-reveal>
          {group.title && <h3>{group.title}</h3>}
          {group.note && <p>{group.note}</p>}
        </div>
      )}
      <div className={`cs-gal cs-gal--${layout}`}>
        {shots.map((s, i) => <CsShot key={s.src + i} shot={s} i={i} frame={layout === 'strip' ? 'phone' : 'wide'} />)}
      </div>
    </div>
  )
}
