import CsPage from '../../components/case-study/CsPage'
import CsSection from '../../components/case-study/CsSection'
import { CsProse, CsList, CsCols, CsQuote } from '../../components/case-study/CsBlocks'
import CsFeatures from '../../components/case-study/CsFeatures'
import CsTech from '../../components/case-study/CsTech'
import type { Feature, Meta, Shot } from '../../components/case-study/types'

const P = '/projects/earringqueen/'
const S = (file: string, alt: string, cap?: string, frame?: Shot['frame']): Shot => ({ src: P + file + '.jpg', alt, cap, frame })

const meta: Meta = {
  slug: 'earringqueen',
  n: '01',
  name: 'EarringQueen',
  industry: 'E-commerce / Jewelry',
  type: 'E-commerce development project',
  role: 'Design and front-end development',
  status: 'In Development',
  tagline: 'A jewelry storefront built around the way people actually shop for pieces — browse, filter, shortlist.',
  overview: [
    'EarringQueen is a jewelry storefront — earrings, rings, bracelets, necklaces and charms — designed as a calm, product-first shopping experience. The build focuses on the browsing journey: a visual catalogue, filtering that narrows it quickly, and a wishlist for the pieces people want to come back to.',
    'The project is in development. The shopping experience shown here — catalogue, filtering, wishlist, cart and responsive layouts — is built and working. Payments are not active, and the site has not launched; this case study claims neither.',
  ],
  hero: S('home-desktop', 'EarringQueen storefront homepage on desktop', 'The storefront homepage'),
  stack: [
    { name: 'React', role: 'The storefront UI — product grid, filter sidebar, wishlist drawer, cart and responsive layouts.' },
    { name: 'Firebase', role: 'Backend layer for catalogue data and customer accounts as the build continues.' },
    { name: 'Stripe (planned)', role: 'Reserved for checkout. No payment flow is active in the current build, so no checkout claims are made here.' },
  ],
  seo: {
    title: 'EarringQueen — Jewelry Storefront Case Study | Piyush Panbude',
    description: 'Case study: a premium jewelry storefront with product filtering, wishlist functionality, cart and responsive layouts — an e-commerce build in development with React and Firebase.',
  },
}

const challenge = [
  { title: 'Merchandising first', body: 'Jewelry pieces are small, detailed and emotional. Photography and layout have to do the selling while the interface stays out of the way.' },
  { title: 'Narrowing a large catalogue', body: 'Shoppers arrive with a category in mind and a budget in their head. Filtering has to handle both instantly, without a page reload.' },
  { title: 'Shortlisting is part of shopping', body: 'Nobody buys jewelry in one visit. A wishlist lets people park pieces and return to them later.' },
  { title: 'Elegant on a phone', body: 'Most browsing happens on mobile — the grid, the filters and the wishlist drawer all have to feel designed for touch, not resized for it.' },
  { title: 'Room to grow into checkout', body: 'The build is structured so accounts and payments can be added without reworking the storefront. They are simply not there yet.' },
]

const approach = [
  { title: 'Component-driven storefront', body: 'A product grid fed from catalogue data, a filter sidebar reading category and price, and a wishlist that persists between visits — each an independent component with its own state.' },
  { title: 'Filtering without page loads', body: 'Category selection, a price-range slider and a sort control (price low-to-high, high-to-low) re-order the grid client-side, with a live product count so the shopper always knows what is left.' },
  { title: 'A deliberately lightweight wishlist', body: 'A heart on every card, a slide-out drawer to review saved pieces and a counter in the header — persisted locally, so it works before any account exists.' },
  { title: 'Responsive by design', body: 'The filter sidebar becomes a stacked panel on mobile, the grid drops columns gracefully, and the wishlist drawer keeps its full height at every width.' },
]

const features: Feature[] = [
  {
    title: 'Category filtering',
    body: 'A sidebar lists every category — All plus each product family — and selecting one narrows the grid immediately, with the product count updating alongside it.',
    why: 'Most shoppers arrive knowing whether they want earrings or a bracelet. One tap should take them there.',
    shot: S('filter-bracelet', 'Storefront filtered to one category', 'The catalogue filtered by category'),
  },
  {
    title: 'Price filtering and sort',
    body: 'A price-range slider sets a budget floor and ceiling, and a sort control re-orders the visible products by price — low to high or high to low — on change.',
    why: 'Budget is the real filter in jewelry. Making it a slider instead of a dropdown keeps the shopper in control of the grid.',
    shot: S('filter-price', 'Price range filter and sort controls', 'Price range and sort controls'),
  },
  {
    title: 'Wishlist',
    body: 'Every product card carries a heart toggle. Saved pieces collect in a slide-out drawer with a header counter, and the state persists between visits — no account required to start shortlisting.',
    why: 'A considered purchase gets revisited. The wishlist is how a browser becomes a returning customer.',
    shot: S('wishlist-drawer', 'Wishlist drawer showing saved pieces', 'The wishlist drawer'),
  },
  {
    title: 'Cart and order summary',
    body: 'A dedicated cart page lists the selected pieces with a running order summary — the step between browsing and checkout, with the same typography and spacing as the storefront.',
    why: 'The cart is where confidence matters most. A calm, legible summary keeps a shopper moving instead of second-guessing.',
    shot: S('cart', 'Cart page with order summary', 'The cart page'),
  },
  {
    title: 'Brand storytelling pages',
    body: 'An “Our Story” page carries the brand narrative in the same visual language as the shop, with About and Contact routes completing the storefront shell around the grid.',
    why: 'Jewelry is bought from a brand as much as a product. The pages around the catalogue do the emotional work the grid can’t.',
    shot: S('story', 'Our Story brand page', 'Our Story'),
  },
]

const contribution = [
  { title: 'Design direction', body: 'The visual identity — palette, type, spacing and the product-card treatment that keeps photography in charge.' },
  { title: 'Storefront frontend', body: 'The React storefront: homepage, product grid, filter sidebar, cart and the surrounding content routes.' },
  { title: 'Shopping interactions', body: 'Category and price filtering, sorting, the wishlist heart/drawer/counter system and its persistence, and cart behaviour.' },
  { title: 'Responsive implementation', body: 'Layouts designed at phone width first — stacking filters, column drops and full-height drawers across breakpoints.' },
]

export default function EarringQueen() {
  return (
    <CsPage meta={meta} tone="earring">
      <CsSection n="01" label="The brief" title="Selling something you can’t hold" lead="Jewelry is browsed before it’s bought — the site has to make a large catalogue feel personal.">
        <CsList items={challenge} />
      </CsSection>

      <CsSection n="02" label="Development approach" title="A storefront with the commerce layers staged" lead="The shopping experience first; accounts and payments structured to arrive without a rewrite.">
        <CsProse paras={[
          'The storefront is built as a set of components: a product grid fed from catalogue data, a filter sidebar reading category and price, and a wishlist that persists between visits. Each piece holds its own state, which is what keeps filtering instant.',
          'Everything in this build is measured against one question — does it help someone find the piece they want? Features that don’t serve browsing were deliberately left for a later stage rather than half-built now.',
        ]} />
        <CsList items={approach} />
      </CsSection>

      <CsSection n="03" label="Key features" title="What the storefront does" lead="Five capabilities of the current build — each shown exactly as it runs.">
        <CsFeatures items={features} />
      </CsSection>

      <CsSection n="04" label="Technology" title="The stack, and what each part does">
        <CsTech items={meta.stack} note="Status: in development. The browsing experience — catalogue, filtering, wishlist, cart and responsive layouts — is built and shown throughout this page. Payment processing is not active in the current build, and the site has not launched." />
      </CsSection>

      <CsSection n="05" label="My contribution" title="What I designed and built">
        <CsCols items={contribution} />
      </CsSection>

      <CsSection n="06" label="Outcome" title="Where the project stands">
        <CsProse paras={[
          'The current build delivers a complete browsing experience: a visual catalogue that narrows instantly by category and budget, a wishlist that remembers, a cart that reads clearly, and layouts that feel designed at every width from a desktop down to a phone.',
          'It stands honestly at in-development status — the storefront is real, and payments and launch are the work still ahead. For me, the project demonstrates how I build commerce interfaces: state handled cleanly, interactions that feel immediate, and a structure that can absorb the next layer without being torn up.',
        ]} />
        <CsQuote text="Built to browse first: every interaction on the page exists to get a shopper closer to the piece they want." />
      </CsSection>
    </CsPage>
  )
}
