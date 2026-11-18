export default function VisitButton({ link }: { link: { href: string; label: string } }) {
  return <a className="visit" data-magnetic href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span><span className="sr">(opens in a new tab)</span></a>
}
