import { social } from '../data/profile'
import { GITHUB, LINKEDIN, WHATSAPP } from './icons'
/** Renders an icon only for profile URLs that are set in data/profile.ts. `labels` adds the network name. */
export default function Social({ labels = false }: { labels?: boolean }) {
  const items = [['GitHub', social.github, GITHUB], ['LinkedIn', social.linkedin, LINKEDIN], ['WhatsApp', social.whatsapp, WHATSAPP]].filter(i => i[1])
  if (!items.length) return null
  return <ul className={'social' + (labels ? ' labeled' : '')}>{items.map(([n, h, d]) => (
    <li key={n}><a href={h} target="_blank" rel="noopener noreferrer" aria-label={n + ' (opens in a new tab)'}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d={d} /></svg>{labels && <span>{n}</span>}</a></li>))}</ul>
}
