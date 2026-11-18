import type { CSSProperties } from 'react'
const delay = (ms: number) => ({ '--d': ms + 'ms' } as CSSProperties)
export default function Hero() {
  return (
    <section className="hero" id="top" data-sp="leave">
      <div className="hero-in">
        <p className="hero-eyebrow rise" style={delay(0)}>Freelance Web Developer</p>
        <h1><span className="mask"><span className="rise-mask" style={delay(140)}>Hi, I’m Piyush.</span></span></h1>
        <p className="hero-lede rise" style={delay(420)}>I build digital experiences that move businesses forward.</p>
        <p className="sub rise" style={delay(560)}>Web development. AI. Design. Digital products.</p>
        <div className="ctas rise" style={delay(720)}>
          <a className="btn primary" data-magnetic href="#work">Selected work</a>
          <a className="btn glass" href="#contact">Contact</a>
        </div>
        <a className="scroll" href="#work" aria-label="Scroll to selected work"><span /></a>
      </div>
    </section>
  )
}
