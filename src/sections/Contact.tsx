import { EMAIL, LOCATION } from '../data/profile'
import Social from '../components/Social'
import CopyEmail from '../components/CopyEmail'
import LocalTime from '../components/LocalTime'
export default function Contact() {
  return (
    <div className="band contact" id="contact" data-sp="pass">
      <div className="wrap">
        <h2>Let’s build something meaningful.</h2>
        <p className="c-sub">Open to freelance projects and professional enquiries.</p>
        <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="c-actions"><CopyEmail /></div>
        <p className="loc">{LOCATION} · <LocalTime /></p>
        <Social />
      </div>
    </div>
  )
}
