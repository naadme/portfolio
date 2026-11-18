import { useEffect, useRef } from 'react'
import { useRoute } from './router'
import { useAnchorScroll } from './hooks/useAnchorScroll'
import ProgressBar from './components/ProgressBar'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudyRoute from './pages/case-studies/CaseStudyRoute'

export default function App() {
  const path = useRoute()
  useAnchorScroll()
  const first = useRef(true)
  /** On navigation: jump to the hash target, otherwise start the new page at the top. */
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const id = decodeURIComponent(location.hash.slice(1))
    if (id) {
      const el = document.getElementById(id)
      if (el) { requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' })); return }
    }
    scrollTo(0, 0)
  }, [path])

  const slug = path.startsWith('/work/') ? decodeURIComponent(path.slice(6).replace(/\/+$/, '')) : null
  return (
    <>
      <ProgressBar />
      <a className="skip" href={slug ? '#cs-main' : '#work'}>Skip to content</a>
      <Nav />
      {slug ? <CaseStudyRoute slug={slug} /> : <HomePage />}
      <Footer />
    </>
  )
}
