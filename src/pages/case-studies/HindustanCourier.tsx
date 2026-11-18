import CsPage from '../../components/case-study/CsPage'
import CsSection from '../../components/case-study/CsSection'
import { CsProse, CsList, CsCols, CsQuote } from '../../components/case-study/CsBlocks'
import CsFeatures from '../../components/case-study/CsFeatures'
import CsTech from '../../components/case-study/CsTech'
import type { Feature, Meta, Shot } from '../../components/case-study/types'

const P = '/projects/hindustan-courier/'
const S = (file: string, alt: string, cap?: string, frame?: Shot['frame']): Shot => ({ src: P + file + '.jpg', alt, cap, frame })

const meta: Meta = {
  slug: 'hindustan-courier',
  n: '02',
  name: 'Hindustan Courier & Cargo Services',
  industry: 'Logistics / Courier and Cargo',
  type: 'business website',
  role: 'Design and development',
  status: 'Live',
  tagline: 'The digital front door for a courier company that has been moving parcels since 2002.',
  overview: [
    'Hindustan Courier & Cargo Services, established in 2002, handles domestic and international courier and cargo — primarily by air, with door-to-door delivery. I designed and built its official website: the company’s public face, and the place a customer checks a shipment or finds a service.',
    'This is not a marketing site pretending to be one. It has a job to do on day one: prove the company is established and reachable, make a large service list navigable, and put tracking within one click of the homepage.',
    'It is live at hindustancourier.com.',
  ],
  hero: S('home-desktop', 'Hindustan Courier website homepage on desktop', 'The live website — hindustancourier.com'),
  live: { href: 'https://hindustancourier.com/', label: 'Visit website' },
  stack: [
    { name: 'React', role: 'The interface — homepage, service pages, tools and content routes.' },
    { name: 'Vite', role: 'Build pipeline and the production bundle behind the live site.' },
    { name: 'Framer Motion', role: 'Restrained section reveals — a business site should feel steady, not showy.' },
  ],
  seo: {
    title: 'Hindustan Courier & Cargo Services — Website Case Study | Piyush Panbude',
    description: 'Case study: the official website for Hindustan Courier & Cargo Services — shipment tracking, domestic and international services, tools and enquiry paths, built with React, Vite and Framer Motion.',
  },
}

const challenge = [
  { title: 'Credibility for an established business', body: 'More than two decades of operation needed a site that reads as professional and permanent — not a template with a logo dropped into it.' },
  { title: 'A large service list, made navigable', body: 'Domestic express, international air, e-commerce logistics, packing, cargo, rate calculation, serviceability checks — a customer should reach the right one in a click.' },
  { title: 'Tracking within reach', body: 'The most common reason to visit a courier site is to check a shipment. That path had to sit on the homepage and on a page of its own.' },
  { title: 'Enquiry without friction', body: 'Calls, emails and a message form for people who want a quote or a pickup — plus self-service tools for people who want an answer immediately.' },
  { title: 'Business-grade mobile behaviour', body: 'Customers track parcels from phones. Layout, tools and forms had to work at every width, not merely shrink.' },
]

const approach = [
  { title: 'A homepage built as a funnel', body: 'Positioning, trust, tracking, services, how it works, advantages, partners, contact — each block answers one question and hands the reader to the next.' },
  { title: 'Service pages for comparison', body: 'Domestic and international pages carry the depth, written for a customer comparing options rather than for a search engine.' },
  { title: 'Tools get their own routes', body: 'A rate calculator, a pin-code serviceability checker, a tracking page and FAQs — the difference between a brochure and a working website.' },
  { title: 'Motion kept on a short leash', body: 'Gentle section reveals only. The animation budget went to making the page feel alive without undermining the seriousness the business sells.' },
]

const features: Feature[] = [
  {
    title: 'Track Your Shipment, on the homepage',
    body: 'The homepage opens its working half with a tracking widget — “Enter your AWB / Tracking number” — and a dedicated /track_shipment page carries the same capability with an airway-number field that submits to the site’s server-side tracking endpoint.',
    why: 'Tracking is the highest-intent visit a courier site receives. It sits above the fold on the home page and has a URL of its own for people who bookmark it.',
    shot: S('track-widget', 'Track Your Shipment widget on the homepage', 'Track Your Shipment — the homepage widget'),
  },
  {
    title: 'Service pages that do the selling',
    body: 'Each service — starting with Domestic Express — gets its own page: what it covers, who it suits, how it works and a clear route to enquiry, under the same header, footer and responsive layout as the homepage.',
    why: 'Logistics customers compare before they call. Giving every service a proper page means each one can be found, read and shared on its own.',
    shot: S('domestic-express', 'Domestic Express service page', 'The Domestic Express page'),
  },
  {
    title: 'Tools, not just pages',
    body: 'A rate calculator works out pricing before anyone picks up the phone, and a pin-code serviceability checker tells a customer whether their area is covered. Both live at their own URLs.',
    why: 'Self-service answers are what separate a digital presence from a digital brochure — and they filter enquiries down to the ones that need a human.',
    shot: S('calculator', 'Rate calculator page', 'The rate calculator'),
  },
  {
    title: 'Enquiry paths, plural',
    body: 'A “Get in Touch” section with a name, email, subject and message form sits alongside direct email addresses, while the header keeps Contact and Services one click away from anywhere on the site.',
    why: 'Different customers reach out differently. The site offers both a written enquiry and an immediate address, without making either hard to find.',
    shot: S('contact', 'Get in touch contact section', 'Get in Touch — contact and enquiry'),
  },
  {
    title: 'Support content that pre-empts the call',
    body: 'An FAQ page answers the recurring questions — services, delivery, coverage — and an about page tells the company’s story and history behind the brand.',
    why: 'Every question answered on the page is one the front desk doesn’t repeat, and one more reason for a search engine to send traffic here.',
    shot: S('faqs', 'Frequently asked questions page', 'The FAQ page'),
  },
  {
    title: 'How it works, and why the company',
    body: 'A step-by-step section explains what happens once a shipment is handed over, followed by the company-advantages block and a partner-airline strip that carries the trust signal.',
    why: 'First-time customers need the process demystified; returning customers scan for proof they chose well. Both get their answer in the same scroll.',
    shot: S('how-it-works', 'How it works steps section', 'How It Works — the shipping process'),
  },
]

const contribution = [
  { title: 'Design and art direction', body: 'Visual identity for the web — colour, type, section rhythm and imagery — translating a twenty-year-old logistics brand into a modern digital presence.' },
  { title: 'Frontend development', body: 'The complete responsive build: homepage funnel, service pages, tracking interface, calculator, serviceability checker, FAQ and about routes.' },
  { title: 'Interaction and motion', body: 'Section reveals, form states, hover behaviour and the mobile navigation — restrained throughout, and respectful of reduced-motion preferences.' },
  { title: 'Integration boundaries', body: 'Clear separation between the interface I built and the company’s server-side systems — the tracking lookup, for instance, is served by the site’s backend endpoint rather than the front end.' },
]

export default function HindustanCourier() {
  return (
    <CsPage meta={meta} tone="hindustan">
      <CsSection n="01" label="The brief" title="Making logistics legible online" lead="A logistics company sells reliability. Online, that means looking established, being findable, and answering “where is my shipment?” instantly.">
        <CsList items={challenge} />
      </CsSection>

      <CsSection n="02" label="Development approach" title="Structured around what customers arrive to do" lead="Not the company org chart — the questions a customer actually types into a search bar.">
        <CsProse paras={[
          'The homepage is a funnel: positioning first, then trust, then the two things people came for — tracking and services — and only then the deeper story of process, advantages and contact.',
          'Service pages carry the depth, tools get their own URLs, and support content handles the rest. Together they turn a single-page brochure into a site with an answer for every common arrival.',
        ]} />
        <CsList items={approach} />
      </CsSection>

      <CsSection n="03" label="Key features" title="What the website does" lead="Six capabilities, each presented as built — with the boundary between interface and backend stated plainly.">
        <CsFeatures items={features} />
      </CsSection>

      <CsSection n="04" label="Technology" title="The stack, and what each part does">
        <CsTech items={meta.stack} note="The front end is what I built and what this case study documents. The tracking lookup is served by the site’s existing server-side endpoint: the form and its wiring are implemented and live, but this case study documents the interface rather than claiming a verified end-to-end results flow. Nothing here extends to business systems beyond the website itself." />
      </CsSection>

      <CsSection n="05" label="My contribution" title="What I designed and built">
        <CsCols items={contribution} />
      </CsSection>

      <CsSection n="06" label="Outcome" title="What the finished website delivers">
        <CsProse paras={[
          'The site gives an established logistics company a digital presence that matches its age: a credible first impression, a service list a customer can actually navigate, tracking within one click, self-service tools for rates and coverage, and enquiry paths that are always visible — on desktop and on a phone.',
          'For me, Hindustan Courier is the clearest example of building for a real operating business: the design has to serve customers with a task in hand, not linger on a mood. Everything decorative had to justify itself against “does this help someone ship a parcel?”',
        ]} />
        <CsQuote text="A business website earns its keep in the first ten seconds — established, findable, and one click from an answer." />
      </CsSection>
    </CsPage>
  )
}
