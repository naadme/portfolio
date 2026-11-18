import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.argv[2] || 'http://localhost:4173'
const OUT = process.argv[3] || '/tmp/qa-current'
const slugs = ['ruhi-collections', 'chawala-dental-clinic', 'nextwave', 'hindustan-courier', 'earringqueen']
const sleep = ms => new Promise(r => setTimeout(r, ms))
fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })

async function sweep(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.7)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)) }
    scrollTo(0, 0)
  })
  await sleep(700)
}

// homepage project cards
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1500)
  await sweep(page)
  for (const id of ['earringqueen', 'hindustan-courier', 'nextwave', 'chawala-dental', 'ruhi-collections']) {
    await page.evaluate(i => document.getElementById(i)?.scrollIntoView({ block: 'center' }), id)
    await sleep(1400)
    const el = await page.$('#' + id)
    if (el) await el.screenshot({ path: `${OUT}/home-${id}.png` })
    else console.log('no el', id)
  }
  await page.close()
}

for (const slug of slugs) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1300)
  await sweep(page)
  // hero
  await page.screenshot({ path: `${OUT}/${slug}-hero.png` })
  // phone-framed figures
  const phones = await page.$$('.cs-fig--phone')
  let i = 0
  for (const p of phones) {
    await p.scrollIntoView()
    await sleep(1000)
    await p.screenshot({ path: `${OUT}/${slug}-phone${i}.png` })
    i++
  }
  // gallery blocks
  const gals = await page.$$('.cs-gal')
  let g = 0
  for (const gal of gals) {
    await gal.scrollIntoView()
    await sleep(1000)
    await gal.screenshot({ path: `${OUT}/${slug}-gal${g}.png` })
    g++
  }
  await page.close()
  console.log('shot', slug, 'phones:', i, 'gals:', g)
}

// mobile viewport of each case study
for (const slug of slugs) {
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1300)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  console.log('mobile', slug, 'overflow:', overflow)
  await sweep(page)
  const phones = await page.$$('.cs-fig--phone')
  let i = 0
  for (const p of phones) {
    await p.scrollIntoView()
    await sleep(900)
    await p.screenshot({ path: `${OUT}/${slug}-mphone${i}.png` })
    i++
  }
  await page.screenshot({ path: `${OUT}/${slug}-m-top.png` })
  await page.close()
}

await browser.close()
console.log('done →', OUT)
