import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = 'http://localhost:4173'
const slugs = ['ruhi-collections', 'chawala-dental-clinic', 'nextwave', 'hindustan-courier', 'earringqueen']
const sleep = ms => new Promise(r => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
fs.mkdirSync('/tmp/qa', { recursive: true })

async function sweep(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)) }
    scrollTo(0, 0)
  })
  await sleep(700)
}

for (const slug of slugs) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1300)
  await sweep(page)

  const shots = []
  // 1. hero
  shots.push(await page.screenshot({ type: 'png' }))
  // 2. first feature block
  await page.evaluate(() => document.querySelector('.cs-feat')?.scrollIntoView({ block: 'center' }))
  await sleep(1100)
  shots.push(await page.screenshot({ type: 'png' }))
  // 3. first gallery block — only Ruhi Collections still has one
  const hasGal = await page.evaluate(() => !!document.querySelector('.cs-gal'))
  if (hasGal) {
    await page.evaluate(() => document.querySelector('.cs-gal')?.scrollIntoView({ block: 'center' }))
    await sleep(1100)
    shots.push(await page.screenshot({ type: 'png' }))
  }
  // 4. end / project navigation + CTA
  await page.evaluate(() => document.querySelector('.cs-end')?.scrollIntoView({ block: 'start' }))
  await sleep(1100)
  shots.push(await page.screenshot({ type: 'png' }))
  // 5. dark hero
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; scrollTo(0, 0) })
  await sleep(900)
  shots.push(await page.screenshot({ type: 'png' }))

  // stack vertically with small labels
  const W = 1440, LBL = 34, comps = []
  let y = 0
  const labels = ['hero (light)', 'features', ...(hasGal ? ['gallery'] : []), 'project navigation + CTA', 'hero (dark)']
  for (let i = 0; i < shots.length; i++) {
    const label = `<svg width="${W}" height="${LBL}"><rect width="100%" height="100%" fill="#111"/><text x="10" y="24" font-family="monospace" font-size="20" fill="#00ff88">${slug} — ${labels[i]}</text></svg>`
    comps.push({ input: Buffer.from(label), left: 0, top: y }); y += LBL
    comps.push({ input: shots[i], left: 0, top: y }); y += 900
  }
  const out = `/tmp/qa/${slug}.png`
  await sharp({ create: { width: W, height: y, channels: 3, background: '#000' } }).composite(comps).png().toFile(out)
  console.log('wrote', out)
  await page.close()
}

// homepage hero (light) to confirm it's untouched
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1500)
  const hero = await page.screenshot({ type: 'png' })
  await page.evaluate(() => document.getElementById('work')?.scrollIntoView())
  await sleep(1400)
  const work = await page.screenshot({ type: 'png' })
  const comps = [{ input: Buffer.from('<svg width="1440" height="34"><rect width="100%" height="100%" fill="#111"/><text x="10" y="24" font-family="monospace" font-size="20" fill="#00ff88">HOMEPAGE — hero</text></svg>'), left: 0, top: 0 },
    { input: hero, left: 0, top: 34 },
    { input: Buffer.from('<svg width="1440" height="34"><rect width="100%" height="100%" fill="#111"/><text x="10" y="24" font-family="monospace" font-size="20" fill="#00ff88">HOMEPAGE — selected work</text></svg>'), left: 0, top: 934 },
    { input: work, left: 0, top: 968 }]
  await sharp({ create: { width: 1440, height: 1868, channels: 3, background: '#000' } }).composite(comps).png().toFile('/tmp/qa/homepage.png')
  console.log('wrote /tmp/qa/homepage.png')
  await page.close()
}

// mobile hero of one case study
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await page.goto(BASE + '/work/ruhi-collections', { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1400)
  const a = await page.screenshot({ type: 'png' })
  await page.evaluate(() => document.querySelector('.cs-feat')?.scrollIntoView({ block: 'center' }))
  await sleep(1100)
  const b = await page.screenshot({ type: 'png' })
  await sharp({ create: { width: 780, height: 3376, channels: 3, background: '#000' } })
    .composite([{ input: a, left: 0, top: 0 }, { input: b, left: 0, top: 1688 }]).png().toFile('/tmp/qa/mobile-ruhi.png')
  console.log('wrote /tmp/qa/mobile-ruhi.png')
  await page.close()
}

await browser.close()
