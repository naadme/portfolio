// Files in Vite's public directory are served from the site root. Keeping these
// paths relative to the deployment avoids stale absolute deployment URLs and
// ensures spaces or Unicode filename encoding cannot break requests.
const P = '/projects/'
export type Project = {
  id: string; slug: string; n: string; category: string; name: string; description: string
  tech: string[]; status: string; images: string[]; link?: { href: string; label: string }
  details: { heading: string; body: string }[]
}
export const projects: Project[] = [
  { id: 'earringqueen', slug: 'earringqueen', n: '01', category: 'E-commerce', name: 'EarringQueen',
    description: 'A premium jewelry storefront featuring product filtering, wishlist functionality, responsive layouts, and an elegant shopping experience.',
    tech: ['React', 'Firebase', 'Stripe'], status: 'In development',
    images: [P + 'earringqueen/home-desktop.jpg', P + 'earringqueen/home-mobile.jpg'],
    details: [
      { heading: 'Overview', body: 'An online jewelry storefront designed around browsing: customers filter the catalog and save pieces to a wishlist.' },
      { heading: 'My contribution', body: 'Design and front-end development of the storefront, including the responsive layouts.' },
      { heading: 'Key functionality', body: 'Product filtering, wishlist, responsive layouts across desktop and mobile. Built with React, Firebase and Stripe. Currently in development.' }] },
  { id: 'hindustan-courier', slug: 'hindustan-courier', n: '02', category: 'Logistics / Business website', name: 'Hindustan Courier & Cargo Services',
    description: 'A complete business website for a courier company featuring shipment tracking, service information, responsive design, and a professional online presence.',
    tech: ['React', 'Vite', 'Framer Motion'], status: 'Live',
    images: [P + 'hindustan-courier/home-desktop.jpg', P + 'hindustan-courier/home-mobile.jpg'],
    link: { href: 'https://hindustancourier.com/', label: 'Visit website' },
    details: [
      { heading: 'Overview', body: 'The official website of Hindustan Courier & Cargo Services, established in 2002. The company handles domestic and international air courier and freight with door-to-door delivery.' },
      { heading: 'My contribution', body: 'Design and development of the company website.' },
      { heading: 'Key functionality', body: 'Shipment tracking, service information and a responsive layout, built with React, Vite and Framer Motion.' }] },
  { id: 'nextwave', slug: 'nextwave', n: '03', category: 'Digital agency', name: 'NextWave',
    description: 'A premium landing page designed for a digital marketing agency, emphasizing bold visuals, smooth interactions, and high-converting layouts.',
    tech: ['React', 'GSAP', 'Framer Motion'], status: 'Personal project',
    images: [P + 'nextwave/home-desktop.jpg', P + 'nextwave/home-mobile.jpg'],
    details: [
      { heading: 'Overview', body: 'A concept landing page for a digital marketing agency, with a strong visual identity and considered interaction design.' },
      { heading: 'My contribution', body: 'A self-initiated project: concept, design and development.' },
      { heading: 'Key functionality', body: 'Bold visual layouts and animated interactions using GSAP and Framer Motion on React.' }] },
  { id: 'chawala-dental', slug: 'chawala-dental-clinic', n: '04', category: 'Healthcare', name: 'Chawala Dental Clinic',
    description: 'A modern dental clinic website focused on building trust through clean design, online appointment booking, treatment information, and a seamless mobile experience.',
    tech: ['React', 'Vite', 'Framer Motion'], status: 'Awaiting client approval',
    images: [P + 'chawala-dental-clinic/home-desktop.jpg', P + 'chawala-dental-clinic/home-mobile.jpg'],
    details: [
      { heading: 'Overview', body: 'A website for a dental clinic that presents treatments clearly and lets patients request appointments online.' },
      { heading: 'My contribution', body: 'Design and development of the site. It has not been launched and is awaiting client approval.' },
      { heading: 'Key functionality', body: 'Online appointment booking, treatment information and a mobile-first experience, built with React, Vite and Framer Motion.' }] },
  { id: 'ruhi-collections', slug: 'ruhi-collections', n: '05', category: 'Fashion / E-commerce', name: 'Ruhi Collections',
    description: 'A modern e-commerce experience for a women’s fashion brand, combining product discovery, shopping functionality, order management, and administrative tools.',
    tech: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Razorpay', 'Google Sheets API', 'Google OAuth'], status: 'Client project',
    images: [P + 'ruhi-collections/home-desktop.jpg', P + 'ruhi-collections/home-mobile.jpg'], link: { href: 'https://www.ruhi-collections.com/', label: 'Visit website' },
    details: [
      { heading: 'Overview', body: 'An e-commerce website developed for a real client, a women’s fashion brand. The work spans the storefront, the backend and the tools the team uses to run the shop.' },
      { heading: 'My contribution', body: 'Front-end development, backend integration, database management, payment functionality and administrative workflows.' },
      { heading: 'Frontend', body: 'React and Vite: storefront, product catalog and customer shopping experience.' },
      { heading: 'Backend and integrations', body: 'Supabase with a PostgreSQL database. Razorpay for payments, Google Sheets API and Google OAuth.' },
      { heading: 'Admin tools', body: 'Product management, product image management, order management and an admin dashboard.' }] },
]
export const ruhiPoints = ['Storefront and product catalog', 'Product and image management', 'Order management', 'Admin dashboard', 'Razorpay payments', 'Google Sheets integration']
