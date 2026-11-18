import type { CSSProperties } from 'react'
/** Splits text into words that light up one by one as the parent's --p advances. */
export default function Words({ text, className }: { text: string; className?: string }) {
  const w = text.split(' ')
  return <span className={className}>{w.map((x, i) => <span className="w" key={i} style={{ '--s': (0.16 + 0.5 * i / w.length).toFixed(3) } as CSSProperties}>{x} </span>)}</span>
}
