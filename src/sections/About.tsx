import { stats, experience, education, languages } from '../data/profile'
import Words from '../components/Words'
import CountUp from '../components/CountUp'

type Item = { period?: string; title: string; detail: string }
const Group = ({ label, items }: { label: string; items: Item[] }) => (
  <section className="col">
    <h3 className="label">{label}</h3>
    {items.map(i => <div className="entry" key={i.title + i.detail}>{i.period && <span className="when">{i.period}</span>}<b>{i.title}</b><p>{i.detail}</p></div>)}
  </section>
)

const LEAD = 'I design and develop modern, high-performance websites that combine exceptional aesthetics with seamless user experience.'
const BODY = 'I build custom digital experiences for startups, businesses and personal brands with a strong focus on quality, performance and clean engineering.'

export default function About() {
  return (
    <div className="band about" id="about">
      <div className="wrap">
        <p className="label">About</p>
        <div className="about-intro">
          <p className="statement" data-sp="pass"><Words text={LEAD} /></p>
          <p className="about-body">{BODY}</p>
        </div>
        <dl className="stats" data-sp="pass">{stats.map(([v, l]) => <div key={l}><dd><CountUp value={v} /></dd><dt>{l}</dt></div>)}</dl>
        <div className="about-cols">
          <Group label="Experience" items={experience} />
          <Group label="Education" items={education} />
          <Group label="Languages" items={languages} />
        </div>
      </div>
    </div>
  )
}
