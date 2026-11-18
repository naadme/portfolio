import CsPage from '../../components/case-study/CsPage'
import CsSection from '../../components/case-study/CsSection'
import { CsProse, CsList, CsCols, CsQuote, CsShot } from '../../components/case-study/CsBlocks'
import CsFeatures from '../../components/case-study/CsFeatures'
import CsTech from '../../components/case-study/CsTech'
import type { Feature, Meta, Shot } from '../../components/case-study/types'

const P = '/projects/chawala-dental-clinic/'
const S = (file: string, alt: string, cap?: string, frame?: Shot['frame']): Shot => ({ src: P + file + '.jpg', alt, cap, frame })

const meta: Meta = {
  slug: 'chawala-dental-clinic',
  n: '04',
  name: 'Chawala Dental Clinic',
  industry: 'Healthcare',
  type: 'Client project',
  role: 'Design and development',
  status: 'Awaiting client approval',
  tagline: 'A calm, credible website for a dental practice — treatments made clear, and the next step always one click away.',
  overview: [
    'Chawala Dental Speciality Clinic is a dental practice in Mumbai. I designed and built its website: a single reassuring journey from first impression to contact — who the clinic is, what it treats, who treats it, and how to reach it.',
    'The audience is someone choosing a dentist, often on a phone, often a little anxious. Every decision on the page serves that moment: clean typography, generous space, plain-language treatment descriptions and a booking path that never hides.',
    'The build is complete and has been prepared for review — the project is awaiting client approval and has not been launched.',
  ],
  hero: S('home-desktop', 'Chawala Dental Clinic homepage on desktop', 'The clinic homepage as presented for approval'),
  stack: [
    { name: 'React', role: 'The page composed as components — navigation, hero, services, team, testimonials, FAQ and contact.' },
    { name: 'Vite', role: 'Development server and the production build pipeline.' },
    { name: 'Framer Motion', role: 'Section entrance transitions and scroll-triggered reveals, kept quiet rather than showy.' },
  ],
  seo: {
    title: 'Chawala Dental Clinic — Website Case Study | Piyush Panbude',
    description: 'Case study: a modern dental clinic website built with React, Vite and Framer Motion — treatment information, an always-visible booking path and a seamless mobile experience. Awaiting client approval.',
  },
}

const challenge = [
  { title: 'Trust in the first seconds', body: 'Patients judge a clinic by how its website looks. The design had to feel clean, modern and clinical without ever feeling cold.' },
  { title: 'Treatments people can understand', body: 'Dental language is full of jargon. The site needed a structure where someone finds their concern and understands the treatment in plain words.' },
  { title: 'The next step, always visible', body: 'From any point on the page, an interested patient should be able to book or get in touch without hunting for a contact page.' },
  { title: 'One experience across devices', body: 'Most patients arrive from mobile search, so layout, type and touch targets had to hold up at phone width as carefully as on a desktop.' },
  { title: 'Room for the clinic to grow', body: 'A health-tips section gives the practice somewhere to publish advice over time, and an FAQ answers the questions a front desk hears every day.' },
]

const approach = [
  { title: 'A page that answers questions in order', body: 'Hero, about, services, team, testimonials, FAQ, contact — the exact sequence a patient moves through when deciding.' },
  { title: 'Navigation that mirrors the page', body: 'Anchor links jump into each section from the header, with Health Tips as the one separate route for content the clinic can keep adding to.' },
  { title: 'Motion in service of calm', body: 'Sections ease into view as you scroll and the FAQ opens smoothly — and everything stops for visitors with reduced-motion preferences.' },
  { title: 'Contact as the anchor', body: 'Phone, email, address and clinic hours grouped in the footer, so a mobile visitor is one tap from calling.' },
]

const features: Feature[] = [
  {
    title: 'Treatment information, plainly written',
    body: 'Four service cards — Preventive Care, Cosmetic Dentistry, Orthodontics and Dental Surgery — each with a one-line explanation of what it covers, laid out as a grid anyone can scan in seconds.',
    why: 'A patient arrives with a concern, not a treatment name. Grouping services this way lets them self-identify before they ever call.',
    shot: S('home-services', 'Our Main Services section with four treatment cards', 'Our Main Services — four treatments, one screen'),
  },
  {
    title: 'Trust built through people',
    body: 'A team section introduces the dentists behind the practice — names, roles and their own words — sitting right after the clinic’s positioning, with photo slots prepared for the portraits the clinic will supply.',
    why: 'Dentistry is personal. Showing who will actually treat you is the single strongest trust signal a clinic site can offer.',
    shot: S('home-team', 'Meet the experts team section', 'Meet The Experts — the team section'),
  },
  {
    title: 'Questions answered in place',
    body: 'An accordion FAQ covers the practical questions — appointments, first visits, what to bring — expanding smoothly without sending the reader away from the page.',
    why: 'Every answered question is one less call the front desk repeats, and one less moment of hesitation for a new patient.',
    shot: S('home-faq', 'Frequently asked questions accordion', 'The FAQ accordion'),
  },
  {
    title: 'A booking path that never hides',
    body: '“Book Visit” sits in the header, the hero and the closing CTA — “Ready for your next visit?” — and repeats again in the footer. In the build behind these screenshots the appointment action itself is a placeholder: no booking system is connected yet, and settling that flow is part of what client review will decide.',
    why: 'Intent should never travel far. Whatever form the final booking takes, the path to it is already designed into every screen.',
    shot: S('home-cta', 'Ready for your next visit call to action', 'The closing call to action'),
  },
  {
    title: 'Contact, where patients expect it',
    body: 'The footer gathers the practice’s contact block — phone, email, address and clinic hours — under the same visual language as the rest of the page.',
    why: 'A large share of clinic traffic is “find the number and call”. That information is never more than a scroll away.',
    shot: S('home-footer', 'Footer with clinic contact details', 'Contact details in the footer'),
  },
  {
    title: 'A second page for content',
    body: 'Health Tips runs as its own route with long-form advice articles, matching the homepage’s typography and spacing so the site feels like one piece.',
    why: 'It gives the clinic a home for advice — useful for patients, and a foundation for the site to grow after launch.',
    shot: S('health-tips', 'Health Tips article page', 'The Health Tips page'),
  },
]

const contribution = [
  { title: 'Design and art direction', body: 'Visual identity, type scale, colour, section layout and imagery direction across the whole page.' },
  { title: 'Frontend development', body: 'The responsive build: sticky navigation, hero, service grid, team cards, testimonial block, FAQ accordion and the supporting Health Tips page.' },
  { title: 'Interaction design', body: 'Scroll-triggered reveals, accordion behaviour and hover states — with reduced-motion preferences respected throughout.' },
  { title: 'Handover', body: 'Prepared for client review with placeholder contact content clearly flagged for replacement before launch.' },
]

export default function ChawalaDentalClinic() {
  return (
    <CsPage meta={meta} tone="chawala">
      <CsSection n="01" label="The brief" title="What a clinic website has to do" lead="Before all else: make a nervous person trust the place enough to pick up the phone.">
        <CsList items={challenge} />
      </CsSection>

      <CsSection n="02" label="Development approach" title="Built around the patient’s questions" lead="A calm single-page journey with one supporting route — organised so the treatment information does the selling.">
        <CsProse paras={[
          'The site is organised around the questions a patient actually asks: what do you treat, who will treat me, how do I come in. The homepage answers them in that order, and every section hands the reader to the next.',
          'Motion is used sparingly and deliberately — sections ease into view, the FAQ opens without drama, and the whole system stands down for anyone browsing with reduced-motion enabled. On a healthcare site, restraint reads as confidence.',
        ]} />
        <CsList items={approach} />
      </CsSection>

      <CsSection n="03" label="Key features" title="What’s on the page" lead="Six pieces that turn a visitor into a patient — and one honest note about their status.">
        <CsFeatures items={features} />
      </CsSection>

      <CsSection n="04" label="Technology" title="The stack, and what each part does">
        <CsTech items={meta.stack} note="This is a front-end project: there is no booking backend, no patient records and no payments involved. Contact details shown in the build are placeholders pending the client’s final content — one of the items the project’s approval stage will settle." />
      </CsSection>

      <CsSection n="05" label="My contribution" title="What I designed and built">
        <CsCols items={contribution} />
      </CsSection>

      <CsSection n="06" label="Outcome" title="Where the project stands">
        <CsProse paras={[
          'The result is a complete, self-contained clinic website: a trustworthy first impression, treatment information anyone can understand, the team behind it, answers to common questions and contact details that are always one scroll away — identical in behaviour from a 1440px desktop to a phone.',
          'It is not launched, and that status is deliberate. The project is awaiting client approval; content, contact details and the final booking flow are to be confirmed with the clinic before it goes live. The build itself is ready for that conversation.',
        ]} />
        <CsQuote text="Trust is the conversion. Everything on this page exists to earn one phone call." />
      </CsSection>
    </CsPage>
  )
}
