import CsPage from '../../components/case-study/CsPage'
import CsSection from '../../components/case-study/CsSection'
import { CsProse, CsList, CsCols, CsQuote, CsShot } from '../../components/case-study/CsBlocks'
import CsFeatures from '../../components/case-study/CsFeatures'
import CsGallery from '../../components/case-study/CsGallery'
import CsTech from '../../components/case-study/CsTech'
import type { Feature, Meta, Shot, ShotGroup } from '../../components/case-study/types'

const P = '/projects/ruhi-collections/'
const S = (file: string, alt: string, cap?: string, frame?: Shot['frame']): Shot => ({ src: P + file + '.jpg', alt, cap, frame })

const meta: Meta = {
  slug: 'ruhi-collections',
  n: '05',
  name: 'Ruhi Collections',
  industry: 'Fashion / E-commerce',
  type: 'Real client project',
  role: 'Design, frontend, backend and integrations',
  status: 'Live',
  tagline: 'A complete fashion commerce platform — the storefront, the payments and the admin that runs them.',
  overview: [
    'Ruhi Collections is a women’s clothing brand — co-ord sets, dresses, tops, trousers and winter wear, sold across India. I built its e-commerce website end to end: the shopping experience customers use, the catalogue and order system the team runs it with, and the payment and integration layer that ties the two together.',
    'The project is deliberately wider than a storefront. Behind one design sits a product catalogue with colourways and photography, an order pipeline with its own reference system, an administrative dashboard with role-based access, and integrations that push every order into the tools the client already works in.',
    'It is a real client build, live at ruhi-collections.com and in daily commercial use.',
  ],
  hero: S('home-desktop', 'Ruhi Collections homepage on desktop', 'The live storefront — ruhi-collections.com'),
  live: { href: 'https://www.ruhi-collections.com/', label: 'Visit website' },
  stack: [
    { name: 'React', role: 'The storefront and the admin, routed as one single-page application.' },
    { name: 'Vite', role: 'Development server, code splitting and the production bundle.' },
    { name: 'Tailwind CSS', role: 'Utility styling mapped to the brand palette, responsive from mobile up.' },
    { name: 'Supabase', role: 'PostgreSQL database, authentication, file storage and row-level security.' },
    { name: 'Razorpay', role: 'Checkout — order creation, payment capture and verification.' },
    { name: 'Google OAuth', role: 'Sign-in for customers and for the admin dashboard.' },
    { name: 'Google Sheets', role: 'Order rows synced into a spreadsheet the client can share and read.' },
    { name: 'Vercel', role: 'Hosting, SPA routing and the scheduled sheet sync.' },
  ],
  seo: {
    title: 'Ruhi Collections — E-commerce Case Study | Piyush Panbude',
    description: 'How I built Ruhi Collections: a complete fashion e-commerce platform with React, Supabase and Razorpay — storefront, admin dashboard, order pipeline and Google Sheets sync.',
  },
}

const challenge = [
  { title: 'A catalogue with real depth', body: 'Hundreds of pieces across categories and colourways, each with its own imagery, sizing and pricing — discoverable through filtering, sorting and search rather than endless scrolling.' },
  { title: 'Two audiences, one system', body: 'Shoppers who want to browse and buy quickly, and a team that needs to add products, adjust prices, publish banners and work through orders without waiting on a developer.' },
  { title: 'Payments that reconcile themselves', body: 'Orders priced correctly at the moment of purchase and confirmed by the payment provider, so the record of what was actually paid never depends on memory or manual entry.' },
  { title: 'Operations where the client already works', body: 'Orders, statuses and customer details surfaced in an administrative dashboard — and mirrored into Google Sheets, the ledger the business already lived in.' },
  { title: 'Mobile first, always', body: 'Most of this traffic arrives on phones. Every screen — gallery, cart, checkout — was treated as a phone screen first.' },
]

const approach = [
  { title: 'Server-side pricing', body: 'Cart totals are re-derived from live catalogue rows when the order is created. Nothing the browser sends decides what the customer pays.' },
  { title: 'Row-level security everywhere', body: 'Every table carries policies: the public reads only active products, customers read only their own orders, and payment columns are writable by no client at all.' },
  { title: 'Idempotent money', body: 'Payment verification, webhooks and retries converge on one outcome per order, with a signature-verified webhook ledger preventing double settlement.' },
  { title: 'Images as data', body: 'Photo framing is stored as numbers and applied with CSS, so the same crop holds across the shop card, the product gallery and the homepage banners.' },
]

const features: Feature[] = [
  {
    title: 'Catalogue and product discovery',
    body: 'The shop opens with a filterable catalogue: category filtering, sorting (featured, price, rating, name) and a header search that looks across the whole range — name, description, category, badge, sizes and saved colours — case-insensitively.',
    why: 'A fashion catalogue only works if a shopper can narrow it in a few seconds. Search and filters share one rule set, so results are consistent wherever you start.',
    shot: S('shop-filtered', 'Ruhi Collections catalogue filtered by category', 'The catalogue, filtered to one category'),
  },
  {
    title: 'Product pages with real colourways',
    body: 'Each colourway is its own catalogue row, grouped into one design. Choosing a colour swaps the photo set, sizes, price and URL together; the gallery runs a main image with thumbnails, up to four photographs per colour, each with its own framing.',
    why: 'This is how the brand actually sells — one design in five colours — so the interface treats colour as a first-class choice, not a dropdown afterthought.',
    shot: S('product-desktop', 'Product page with colourways, sizes and gallery', 'Product detail: colourways, sizes and the photo gallery'),
  },
  {
    title: 'Reviews tied to real purchases',
    body: 'Signed-in customers whose orders include a piece can submit a review — one per order line, through a database function rather than a direct write. Reviews land as pending, an admin moderates them, and only approved ones appear with the ratings breakdown.',
    why: 'Social proof that can’t be gamed: eligibility comes from the order itself, and nothing reaches the page without passing moderation.',
    shot: S('product-reviews', 'Customer reviews section with ratings breakdown', 'Customer reviews with a ratings breakdown'),
  },
  {
    title: 'Cart and Razorpay checkout',
    body: 'The cart persists by product and size, then hands off to a three-step checkout — contact, delivery address, payment. Every order is paid online through Razorpay: UPI, cards, net banking and wallets, opened inside the checkout and verified server-side before the order is confirmed.',
    why: 'Payment status is decided by a signature check on the server, not by what the browser claims. The cart only clears once verification succeeds.',
    shot: S('cart-mobile', 'Cart on mobile', 'The cart, on mobile', 'phone'),
  },
  {
    title: 'The admin dashboard',
    body: '/admin sits outside the public layout behind its own sign-in — Google or email — with two roles: a full owner account and catalogue-only product managers. Sections cover Products, Categories, Orders, Banners, Page images, Bestsellers, Coupons and Reviews, with search, visibility filters and confirm dialogs throughout.',
    why: 'The shop can be run day to day without touching code: add a colourway, reorder its photos, publish a banner, work an order, approve a review.',
    shot: S('admin-login', 'Admin sign-in screen at /admin', 'Admin sign-in — the dashboard sits behind it'),
  },
  {
    title: 'Wishlist and account',
    body: 'A wishlist heart on every card, a header counter and a dedicated wishlist page — kept in local storage so browsing works before anyone registers. Accounts add Google sign-in, order history and the ability to review purchases.',
    why: 'Shoppers return to fashion shops. Saving pieces has to cost one tap, with no wall in front of it.',
    shot: S('wishlist', 'Wishlist page on desktop', 'The wishlist page'),
  },
]

const gallery: ShotGroup[] = [
  { layout: 'mosaic', shots: [S('home-categories', 'Shop by category section'), S('home-bestsellers', 'Best sellers section'), S('home-story', 'Our story section')] },
  { title: 'Product, in detail', layout: 'duo', shots: [S('product-info', 'Product page information and sizing'), S('size-guide', 'Size guide page')] },
  { title: 'On the phone', layout: 'strip', shots: [S('home-mobile', 'Homepage on mobile'), S('shop-mobile', 'Catalogue on mobile'), S('product-mobile', 'Product page on mobile'), S('cart-mobile', 'Cart on mobile')] },
]

const contribution = [
  { title: 'Storefront', body: 'Home, catalogue, product pages, cart, checkout, order confirmation, wishlist, account, policies and live search — responsive React components throughout.' },
  { title: 'Admin and workflows', body: 'The full dashboard: colourway editing with photo sequencing and drag-to-position framing, the order pipeline with statuses and Excel export, banners, bestsellers, coupons, page images and review moderation.' },
  { title: 'Database and security', body: 'Schema and 45 migrations, row-level security policies, pricing and coupon functions, and the order and product ID systems allocated by the database itself.' },
  { title: 'Integrations', body: 'The Razorpay payment flow, Google Sheets order sync, Google sign-in, transactional order email and the contact form — each server-side, with secrets kept out of the browser.' },
]

export default function RuhiCollections() {
  return (
    <CsPage meta={meta} tone="ruhi">
      <CsSection n="01" label="The brief" title="Requirements, before a single screen" lead="The client needed a shop that could run itself day to day — not a brochure with a buy button.">
        <CsList items={challenge} />
      </CsSection>

      <CsSection n="02" label="Development approach" title="One application, three layers of truth" lead="A React front end, a database that behaves like an application server, and money handled at the edge.">
        <CsProse paras={[
          'The build is a single React application with two experiences inside it: a public storefront, and an administrative dashboard that sits outside the public layout, lazy-loaded behind its own sign-in.',
          'Rather than trusting the browser with business logic, the database does the heavy lifting. Postgres functions price orders from the live catalogue, allocate order references, validate coupons and guard against duplicates — so a manipulated client cannot invent a discount or underpay.',
          'Payment runs through three server-side steps: an edge function creates the order and the Razorpay order together, the browser opens Razorpay’s checkout, and a verification function checks the signature before the order is marked paid. A signature-verified webhook sits behind it as a settlement safety net.',
        ]} />
        <CsList items={approach} />
      </CsSection>

      <CsSection n="03" label="Key features" title="What the system actually does" lead="Six capabilities that make the storefront and the back office one product.">
        <CsFeatures items={features} />
      </CsSection>

      <CsSection n="04" label="Technology" title="The stack, and what each part is for" lead="Nothing here is a logo list — every technology has a job in the build.">
        <CsTech items={meta.stack} note="45 database migrations back the schema. Order references are allocated by the database in shop time, product IDs are assigned by trigger, and both were tested against a throwaway Postgres running the real migrations — concurrency included." />
      </CsSection>

      <CsSection n="05" label="Visual gallery" title="The interface, at length" lead="Storefront pages as they run in production, desktop and mobile.">
        {gallery.map((g, i) => <CsGallery key={i} group={g} />)}
      </CsSection>

      <CsSection n="06" label="My contribution" title="Where the work went" lead="Frontend, backend, integrations and the workflows in between — all built by me.">
        <CsCols items={contribution} />
      </CsSection>

      <CsSection n="07" label="Outcome" title="What the finished platform delivers">
        <CsProse paras={[
          'The finished system gives the brand one continuous path from a product photograph to a paid, logged and exported order. Customers get a fast, trustworthy shop; the team gets a dashboard that covers the whole operation — catalogue, orders, promotions, content and reviews — without developer involvement.',
          'For me, Ruhi Collections is the project that best shows how I work across layers: interface design and frontend craft on top, database design and security in the middle, and carefully-guarded integrations at the edges where mistakes are expensive.',
        ]} />
        <CsQuote text="One catalogue, one order record, one source of truth — the storefront, the dashboard and the spreadsheet are three views of the same data." />
      </CsSection>
    </CsPage>
  )
}
