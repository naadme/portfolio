import { useScrollEngine } from '../hooks/useScrollEngine'
import { usePointerFx } from '../hooks/usePointerFx'
import ProjectIndex from '../components/ProjectIndex'
import Hero from '../components/Hero'
import Work from '../sections/Work'
import About from '../sections/About'
import Technologies from '../sections/Technologies'
import Contact from '../sections/Contact'
import { useSEO } from '../lib/seo'

/** The homepage: hero, selected work, about, technologies and contact. */
export default function HomePage() {
  useScrollEngine(); usePointerFx()
  useSEO({
    title: 'Piyush Panbude — Web developer and digital product builder',
    description: 'Piyush Panbude designs and develops modern, high-performance websites and digital products for startups, businesses and personal brands. Based in Mumbai.',
  })
  return (
    <main>
      <Hero />
      <Work />
      <About />
      <Technologies />
      <Contact />
      <ProjectIndex />
    </main>
  )
}
