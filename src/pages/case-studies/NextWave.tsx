import CsPage from '../../components/case-study/CsPage'
import CsSection from '../../components/case-study/CsSection'
import { CsProse, CsList, CsCols, CsQuote } from '../../components/case-study/CsBlocks'
import CsFeatures from '../../components/case-study/CsFeatures'
import CsTech from '../../components/case-study/CsTech'
import type { Feature, Meta, Shot } from '../../components/case-study/types'

const P = '/projects/nextwave/'
const S = (file: string, alt: string, cap?: string, frame?: Shot['frame']): Shot => ({ src: P + file + '.jpg', alt, cap, frame })

const meta: Meta = {
  slug: 'nextwave',
  n: '03',
  name: 'NextWave',
  industry: 'Digital agency',
  type: 'Personal project',
  role: 'Concept, design and development',
  status: 'Complete',
  tagline: 'An agency site that has to sell the studio before anyone reads a word of copy.',
  overview: [
    'Next Wave Studio is a concept for a small digital marketing and creative studio — websites, brand identity, marketing strategy and content. I designed and built the entire site as a personal project: a landing page plus services, work, process, about, contact and FAQ routes.',
    'With no client list to lean on, the page makes its case through presentation alone: confident typography, a strict information hierarchy, honest copy, and motion that feels considered rather than decorative.',
    'Nothing on it is borrowed — no fake metrics, no invented testimonials, no stock logos. The design had to earn attention on craft alone.',
  ],
  hero: S('home-desktop', 'Next Wave Studio landing page hero on desktop', 'The landing page hero — Next Wave Studio'),
  stack: [
    { name: 'React 18', role: 'Component structure across twelve routes, from the landing page to policy pages.' },
    { name: 'TypeScript', role: 'Typed content — services, projects, process steps, FAQs and site config — so copy stays consistent between routes.' },
    { name: 'Vite', role: 'Fast dev server and a small production bundle.' },
    { name: 'Tailwind CSS', role: 'The design system: ink, paper and signal tokens, Space Grotesk and Inter, and one shared easing curve.' },
    { name: 'Framer Motion', role: 'All animation — scroll reveals with staggered delays and the hero’s SVG line-draw.' },
    { name: 'React Router', role: 'Client-side routing with scroll restoration on every route change.' },
    { name: 'lucide-react', role: 'A consistent icon set across navigation, buttons and social marks.' },
  ],
  seo: {
    title: 'NextWave — Agency Landing Page Case Study | Piyush Panbude',
    description: 'Case study: a premium digital agency landing page built with React, TypeScript, Tailwind CSS and Framer Motion — bold visuals, honest copy and purposeful motion.',
  },
}

const challenge = [
  { title: 'Credibility without claims', body: 'A studio with no verified results yet can’t show case studies full of numbers. The design had to look expensive while saying only what is true.' },
  { title: 'One page, seven decisions', body: 'Hero, work, services, about, process, commitments and CTA — each section has exactly one job, and the reader always knows where they are in the story.' },
  { title: 'Services scannable in seconds', body: 'Six services, each explained briefly with a route to more detail, so a marketing director finds their need in a single pass.' },
  { title: 'Motion with a purpose', body: 'Animation has to guide attention through the hierarchy rather than decorate it — and degrade cleanly for visitors with reduced-motion enabled.' },
  { title: 'A system, not a mockup', body: 'Twelve routes, shared components, typed content files and consistent tokens, so the concept could grow into a real site without a rewrite.' },
]

const approach = [
  { title: 'Routing as architecture', body: 'Home, services and work indexes with detail routes, about, process, contact, FAQ, privacy, terms and a 404 — with scroll restoration on every change.' },
  { title: 'Honest copy as a feature', body: 'No testimonials, client logos or performance statistics appear anywhere — none were available to verify, so the design never borrows credibility it doesn’t have.' },
  { title: 'The contact form as a real component', body: 'Field-level validation, idle/submitting/success/error states, and the delivery endpoint kept in an environment variable rather than hardcoded.' },
  { title: 'Responsive behaviour', body: 'The sticky blurred header collapses into a hamburger panel that locks body scroll; grids fall from three columns to one; type scales fluidly with clamp.' },
]

const features: Feature[] = [
  {
    title: 'A hero that positions in one line',
    body: 'Eyebrow, headline — “Websites and brand work, built around how your business actually runs.” — a supporting line, two calls to action, and the studio’s signature: an ascending SVG stroke that draws itself on load.',
    why: 'The whole studio is pitched in the first screen. The line-draw mark gives the brand a visual idea without resorting to a literal wave.',
    shot: S('home-desktop', 'Next Wave Studio hero with headline and SignalLine mark', 'Hero — headline, calls to action and the SignalLine mark'),
  },
  {
    title: 'Navigation that stays out of the way',
    body: 'A sticky, blurred header carries the wordmark, five links with active states and a “Start a Project” button. On mobile it becomes a hamburger panel with the same links, auto-closing on route change and locking the page behind it.',
    why: 'Across twelve routes, wayfinding has to be effortless and never compete with the content underneath it.',
    shot: S('menu-mobile', 'Mobile navigation menu open', 'The mobile menu', 'phone'),
  },
  {
    title: 'Selected work, honestly presented',
    body: 'The work section states its own rule: “A few projects we’ve worked on, presented as what they are — real client work, not case studies with invented metrics.” Cards link through to detail routes.',
    why: 'Refusing to inflate is a positioning choice. It sets expectations for every other claim on the site.',
    shot: S('home-work', 'Selected work section with project cards', 'Selected work'),
  },
  {
    title: 'Six services, one page',
    body: 'Website design and development, brand identity, digital marketing strategy, social media content, SEO and paid advertising — each a card with a “Learn more” route into a dedicated service page.',
    why: 'A focused offer, presented as one. The reader can locate their need without opening a menu or scrolling a manifesto.',
    shot: S('services-page', 'Services page with six service cards', 'The services route'),
  },
  {
    title: 'Process as a promise',
    body: 'Five numbered steps — Discovery, Strategy, Design & Execution, Launch, Improvement — laid out as a sequence the reader follows down the page.',
    why: 'Before anyone enquires, they can see exactly how an engagement runs. It qualifies the lead and calms the nervous ones.',
    shot: S('home-process', 'How a project runs process section', 'How a project runs — five steps'),
  },
  {
    title: 'A contact form with real states',
    body: 'Name, business, email, phone, service, budget and project description — validated per field on submit, with distinct submitting, success and error states. The delivery endpoint is configured through an environment variable at deploy time.',
    why: 'A form should behave like a product: clear errors, honest states, and no silent failure pretending to be success.',
    shot: S('contact-page', 'Contact page with project enquiry form', 'Start a project — the enquiry form'),
  },
]

const contribution = [
  { title: 'Concept and art direction', body: 'The studio identity, the voice of the copy, and the decision to present the concept with zero unverifiable claims.' },
  { title: 'Design system', body: 'Ink/paper/signal tokens, the Space Grotesk and Inter pairing, one shared easing curve, and spacing and type scales that hold across twelve routes.' },
  { title: 'Frontend and motion', body: 'Every component and every animation — the Reveal primitive, staggered grid entrances, the hero line-draw, hover states and the mobile menu.' },
  { title: 'Content architecture', body: 'Typed data files for services, projects, process steps and FAQs, keeping pages presentational and content consistent.' },
]

export default function NextWave() {
  return (
    <CsPage meta={meta} tone="nextwave">
      <CsSection n="01" label="The brief" title="Selling taste before track record" lead="An agency with no client logos yet has to prove taste and technical range in the same scroll.">
        <CsList items={challenge} />
      </CsSection>

      <CsSection n="02" label="Development approach" title="A design system first, a motion system second" lead="Three tokens, one easing curve, and content kept honest by structure.">
        <CsProse paras={[
          'The identity rests on three colours — a near-black ink, warm paper and a single teal signal accent — with Space Grotesk for display and Inter for reading. One custom easing curve, cubic-bezier(0.22, 1, 0.36, 1), is shared by every transition on the site, which is why it all moves as if played by the same instrument.',
          'Motion is a single reusable primitive: a Reveal wrapper that fades and lifts elements as they enter the viewport, triggered once, with small staggered delays across grids. The hero’s signature is the SignalLine — an SVG path that draws itself on load, the studio’s stand-in for “the next wave”.',
          'The build ships with a full reduced-motion override, focus-visible rings, an active-link nav state, and a mobile menu that locks body scroll while open — the details that separate a concept from something you’d actually deploy.',
        ]} />
        <CsList items={approach} />
      </CsSection>

      <CsSection n="03" label="Key features" title="How the page works" lead="Six moments where design and motion carry the pitch.">
        <CsFeatures items={features} />
      </CsSection>

      <CsSection n="04" label="Technology" title="The stack, and what each part does">
        <CsTech items={meta.stack} note="Animation is handled entirely by Framer Motion — scroll reveals, staggered entrances and the hero line-draw — with Tailwind transitions covering the smaller hover states. The project is purely front-end; the contact form’s delivery endpoint is a deploy-time configuration." />
      </CsSection>

      <CsSection n="05" label="My contribution" title="Concept to build" lead="A self-initiated project — every decision and every line of it mine.">
        <CsCols items={contribution} />
      </CsSection>

      <CsSection n="06" label="Outcome" title="What the project demonstrates">
        <CsProse paras={[
          'NextWave is a complete agency presence rather than a single landing page: twelve routes, a consistent design system, typed content and a motion language that stays subordinate to the message. It demonstrates how I build a brand from zero — identity, voice, structure and interaction as one decision.',
          'It also shows the discipline I bring to client work: where a claim can’t be verified, the design finds another way to be convincing. That rule is why the page still reads honestly today.',
        ]} />
        <CsQuote text="No invented metrics, no borrowed logos, no filler — the design had to earn attention on craft alone." />
      </CsSection>
    </CsPage>
  )
}
