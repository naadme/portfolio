export type Shot = { src: string; alt: string; cap?: string; frame?: 'wide' | 'phone' | 'plain' | 'long' }

export type Stack = { name: string; role: string }

export type Meta = {
  slug: string
  n: string
  name: string
  industry: string
  type: string
  role: string
  status: string
  tagline: string
  overview: string[]
  hero: Shot
  live?: { href: string; label: string }
  stack: Stack[]
  seo: { title: string; description: string }
}

export type Feature = { title: string; body: string; why?: string; shot?: Shot }
export type Block = { title: string; body: string }
export type ShotGroup = { title?: string; note?: string; layout: 'full' | 'duo' | 'trio' | 'mosaic' | 'strip' | 'stack'; shots: Shot[] }
export type Tone = 'ruhi' | 'chawala' | 'nextwave' | 'hindustan' | 'earring'
