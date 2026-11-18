import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.argv[2] || 'https://piyush-panbude.vercel.app'
const OUT = process.argv[3] || '/tmp/qa-live'
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

{
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  const bad = []
  page.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()) })
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1500)
  await sweep(page)
  for (const id of ['earringqueen', 'hindustan-courier', 'nextwave', 'chawala-dental', 'ruhi-collections']) {
    await page.evaluate(i => document.getElementById(i)?.scrollIntoView({ block: 'center' }), id)
    await sleep(1400)
    const el = await page.$('#' + id)
    if (el) await el.screenshot({ path: `${OUT}/home-${id}.png` })
  }
  console.log('HOME bad responses:', bad.length ? bad : 'none')
  await page.close()
}

for (const slug of slugs) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  const bad = []
  page.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()) })
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1300)
  await sweep(page)
  const info = await page.evaluate(() => ({
    broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
    total: document.images.length,
    phones: document.querySelectorAll('.cs-fig--phone').length,
    gals: document.querySelectorAll('.cs-gal').length,
  }))
  const phones = await page.$$('.cs-fig--phone')
  let i = 0
  for (const p of phones) {
    await p.scrollIntoView(); await sleep(900)
    await p.screenshot({ path: `${OUT}/${slug}-phone${i}.png` }); i++
  }
  const gals = await page.$$('.cs-gal')
  let g = 0
  for (const gal of gals) {
    await gal.scrollIntoView(); await sleep(900)
    await gal.screenshot({ path: `${OUT}/${slug}-gal${g}.png` }); g++
  }
  console.log(slug, '| images:', info.total, '| broken:', info.broken.length, info.broken.map(b => b.split('/').pop()).join(','), '| phones:', i, '| gals:', g, '| 4xx:', bad.length ? bad.join(' ') : 'none')
  await page.close()
}

await browser.close()
console.log('done →', OUT)
