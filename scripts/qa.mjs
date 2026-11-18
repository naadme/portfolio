import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.argv[2] || 'http://localhost:4173'
const slugs = ['ruhi-collections', 'chawala-dental-clinic', 'nextwave', 'hindustan-courier', 'earringqueen']
const sleep = ms => new Promise(r => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })

let failures = 0
const fail = msg => { failures++; console.log('  ✗ ' + msg) }
const ok = msg => console.log('  ✓ ' + msg)

async function open(path) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  const errors = [], bad404 = []
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', e => errors.push('pageerror: ' + e.message))
  page.on('response', r => { if (r.status() >= 400) bad404.push(r.status() + ' ' + r.url()) })
  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1200)
  return { page, errors, bad404, status: resp.status() }
}

/** Scroll the whole page so lazy images decode and reveals fire, then return to the top. */
async function sweep(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)) }
    scrollTo(0, 0)
  })
  await sleep(900)
}

// ── Home ──────────────────────────────────────────────────────────────
console.log('\n== HOME / ==')
{
  const { page, errors, bad404, status } = await open('/')
  if (status !== 200) fail('status ' + status)
  const links = await page.$$eval('.p-links a.btn', els => els.map(e => e.getAttribute('href')))
  const expected = slugs.map(s => '/work/' + s)
  if (JSON.stringify([...links].sort()) === JSON.stringify([...expected].sort())) ok('five "Read case study" links: ' + links.join(', '))
  else fail('case-study links wrong: ' + JSON.stringify(links))
  const tilt = await page.$$eval('.tilt', els => els.map(e => e.getAttribute('href')))
  if (tilt.every(h => h && h.startsWith('/work/'))) ok('tilt visuals link to /work/* (' + tilt.length + ')')
  else fail('tilt hrefs: ' + JSON.stringify(tilt))
  if (!errors.length) ok('no console errors'); else fail('console: ' + errors.join(' | '))
  if (!bad404.length) ok('no failed requests'); else fail('4xx/5xx: ' + bad404.join(', '))
  await page.close()
}

// ── Each case study ───────────────────────────────────────────────────
for (const slug of slugs) {
  console.log('\n== /work/' + slug + ' ==')
  const { page, errors, bad404, status } = await open('/work/' + slug)
  if (status !== 200) fail('status ' + status)

  // Reveals are checked before sweeping — above-fold elements must fire on their own.
  const revealHidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal]')].filter(e => !e.classList.contains('in') && e.getBoundingClientRect().top < innerHeight * 0.9).length)
  await sweep(page)

  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content || '',
    h1: document.querySelector('h1')?.innerText || '',
    sections: document.querySelectorAll('.cs-sec').length,
    feats: document.querySelectorAll('.cs-feat').length,
    figs: document.querySelectorAll('.cs-fig').length,
    imgs: [...document.images].map(i => ({ src: i.currentSrc || i.src, w: i.naturalWidth })),
    prev: document.querySelector('.case-nav a:not(.next)')?.getAttribute('href'),
    next: document.querySelector('.case-nav .next')?.getAttribute('href'),
    visit: document.querySelector('.cs-actions .visit')?.getAttribute('href'),
    back: document.querySelector('.cs-back')?.getAttribute('href'),
    status: document.querySelector('.cs-status')?.innerText,
    tone: document.querySelector('main.cs')?.className,
  }))

  if (info.h1) ok('h1: "' + info.h1 + '"'); else fail('missing h1')
  if (info.sections >= 6) ok(info.sections + ' chapters'); else fail('only ' + info.sections + ' sections')
  if (info.feats >= 5) ok(info.feats + ' features'); else fail('only ' + info.feats + ' features')
  if (info.figs >= 5) ok(info.figs + ' figures'); else fail('only ' + info.figs + ' figures')

  const broken = info.imgs.filter(i => !i.w)
  const expectedCount = info.imgs.length
  if (!broken.length && expectedCount > 5) ok(`all ${expectedCount} images decoded`); else fail(`${broken.length}/${expectedCount} broken: ` + broken.map(b => b.src.split('/').pop()).join(', '))

  if (info.prev && info.next && info.prev !== info.next) ok('prev/next: ' + info.prev + ' → ' + info.next)
  else fail('prev/next missing')
  if (info.back === '/#work') ok('back link → /#work'); else fail('back link: ' + info.back)
  if (info.visit) ok('visit button → ' + info.visit)
  else if (slug === 'ruhi-collections' || slug === 'hindustan-courier') fail('expected visit button')
  else ok('no visit button (no live URL) — correct')

  if (/In Development|Awaiting client approval|Live|Complete/.test(info.status)) ok('status: ' + info.status); else fail('status: ' + info.status)
  if (info.tone && info.tone.includes('cs--')) ok('tone class: ' + info.tone.split(' ').pop())
  if (!info.title.includes('Case Study')) fail('title: ' + info.title)
  else ok('title: ' + info.title)
  if (info.desc.length > 60) ok('description set (' + info.desc.length + ' chars)'); else fail('description missing/short')
  if (revealHidden === 0) ok('above-fold reveals triggered'); else fail(revealHidden + ' revealed elements still hidden above fold')

  if (!errors.length) ok('no console errors'); else fail('console: ' + errors.join(' | '))
  if (!bad404.length) ok('no failed requests'); else fail('4xx/5xx: ' + bad404.join(', '))

  // theme toggle on a case study
  const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme)
  await page.click('.nav .icon')
  await sleep(700)
  const themeAfter = await page.evaluate(() => document.documentElement.dataset.theme)
  if (themeBefore !== themeAfter) ok('theme toggle: ' + themeBefore + ' → ' + themeAfter)
  else fail('theme toggle did nothing')
  await page.click('.nav .icon'); await sleep(400)

  // next navigation actually navigates
  const nextHref = info.next
  await page.evaluate(h => document.querySelector('.case-nav .next').click(), nextHref)
  await sleep(1400)
  const nowUrl = await page.evaluate(() => location.pathname)
  if (nowUrl === nextHref) ok('next navigation → ' + nowUrl)
  else fail('next nav landed on ' + nowUrl + ', expected ' + nextHref)
  const h1b = await page.evaluate(() => document.querySelector('h1')?.innerText)
  if (h1b && h1b !== info.h1) ok('next page renders "' + h1b + '"')
  else fail('next page h1 unchanged: ' + h1b)
  await page.close()
}

// ── 404 for unknown project ───────────────────────────────────────────
console.log('\n== /work/does-not-exist ==')
{
  const { page, errors } = await open('/work/does-not-exist')
  const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText)
  if (h1 && h1.includes('isn’t here')) ok('404 page renders'); else fail('404 h1: ' + h1)
  if (!errors.length) ok('no console errors'); else fail('console: ' + errors.join(' | '))
  await page.close()
}

// ── Mobile spot check (one page) ──────────────────────────────────────
console.log('\n== mobile 390px /work/ruhi-collections ==')
{
  const { page, errors } = await open('/work/ruhi-collections')
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await sleep(900)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  if (overflow <= 1) ok('no horizontal overflow (' + overflow + 'px)'); else fail('horizontal overflow: ' + overflow + 'px')
  await sweep(page)
  const imgs = await page.evaluate(() => [...document.images].filter(i => !i.naturalWidth).length)
  if (!imgs) ok('all images decoded at mobile width'); else fail(imgs + ' broken at mobile width')
  if (!errors.length) ok('no console errors'); else fail('console: ' + errors.join(' | '))
  await page.close()
}

// ── Back-to-work from a case study ────────────────────────────────────
console.log('\n== back to work ==')
{
  const { page } = await open('/work/nextwave')
  await page.click('.cs-back')
  await sleep(1500)
  const url = await page.evaluate(() => location.pathname + location.hash)
  if (url === '/#work' || url === '/') ok('back link → ' + url)
  else fail('back landed on ' + url)
  const onWork = await page.evaluate(() => !!document.getElementById('work'))
  if (onWork) ok('homepage work section present')
  else fail('homepage did not render')
  await page.close()
}

await browser.close()
console.log('\n' + (failures ? `✗ ${failures} FAILURE(S)` : '✓ ALL CHECKS PASSED'))
process.exit(failures ? 1 : 0)
