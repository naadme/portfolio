import { tech, exploring } from '../data/profile'
import Words from '../components/Words'
export default function Technologies() {
  return (
    <div className="band tech-band">
      <div className="wrap">
        <p className="label">Technologies</p>
        <p className="tech-list" data-sp="pass"><Words text={tech.join(', ') + '.'} /></p>
        <p className="label explore-h">Currently exploring</p>
      </div>
      {/* Scroll-linked row: it slides sideways as you scroll past. Repeats are hidden from assistive tech. */}
      <div className="slide" data-sp="pass">
        <ul className="slide-track" aria-label="Currently exploring">
          {[0, 1, 2].flatMap(k => exploring.map(e => <li key={k + e} aria-hidden={k ? true : undefined}>{e}</li>))}
        </ul>
      </div>
    </div>
  )
}
