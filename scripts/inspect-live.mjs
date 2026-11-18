import puppeteer from 'puppeteer-core'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.argv[2] || 'https://piyush-panbude.vercel.app'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })

{
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(BASE + '/', { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1200)
  const info = await page.evaluate(() => {
    const sec = document.getElementById('ruhi-collections')
    const frames = [...sec.querySelectorAll('.frame')].map(f => ({ cls: f.className, img: f.querySelector('img')?.src || null, alt: f.querySelector('img')?.alt || null }))
    const fallback = !!sec.querySelector('.ruhi')
    const imgs = [...sec.querySelectorAll('img')].map(i => ({ src: i.src, w: i.naturalWidth }))
    return { frames, fallback, imgs }
  })
  console.log('HOME RUHI:', JSON.stringify(info, null, 1))
  await page.close()
}

for (const slug of ['ruhi-collections', 'nextwave']) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(1200)
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.7)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
    scrollTo(0, 0)
  })
  await sleep(600)
  const phones = await page.evaluate(() => [...document.querySelectorAll('.cs-fig--phone')].map(f => {
    const box = f.querySelector('.cs-fig-box')
    const img = f.querySelector('img')
    const br = box.getBoundingClientRect()
    return { src: img?.src.split('/').pop(), nat: img ? img.naturalWidth + 'x' + img.naturalHeight : null, box: Math.round(br.width) + 'x' + Math.round(br.height), fit: img ? getComputedStyle(img).objectFit : null, pos: img ? getComputedStyle(img).objectPosition : null }
  }))
  console.log(slug, 'PHONES:', JSON.stringify(phones, null, 1))
  await page.close()
}
await browser.close()
