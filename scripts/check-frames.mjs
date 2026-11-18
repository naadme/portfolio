import puppeteer from 'puppeteer-core'

/**
 * Verifies every image frame on the homepage and the five case studies:
 *  - image actually decoded (naturalWidth > 0)
 *  - object-fit behaviour: how many px get cropped by `cover`, if any
 *  - stretch check: computed rendered aspect vs natural aspect
 * Prints a table and exits non-zero on broken images or visible cropping.
 */
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = process.argv[2] || 'http://localhost:4173'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const slugs = ['ruhi-collections', 'chawala-dental-clinic', 'nextwave', 'hindustan-courier', 'earringqueen']

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
let bad = 0

const AUDIT = () => [...document.querySelectorAll('.frame img, .cs-fig-box img')].map(img => {
  const box = img.closest('.frame, .cs-fig-box')
  const frame = img.closest('.frame')
  const fig = img.closest('.cs-fig, .cs-hero-fig')
  const kind = frame
    ? 'frame.' + [...frame.classList].filter(c => c !== 'frame').join('.')
    : fig ? [...fig.classList].filter(c => c.startsWith('cs-')).join(' ') : 'fig'
  const br = box.getBoundingClientRect()
  const cs = getComputedStyle(img)
  const iw = img.naturalWidth, ih = img.naturalHeight
  if (!iw || !ih) return { kind, src: img.src.split('/').pop(), broken: true }
  const boxAR = br.width / br.height, imgAR = iw / ih
  let cropX = 0, cropY = 0, stretch = false
  if (cs.objectFit === 'cover') {
    const scale = Math.max(br.width / iw, br.height / ih)
    cropX = Math.round(iw * scale - br.width)
    cropY = Math.round(ih * scale - br.height)
  } else if (cs.objectFit === 'fill' && Math.abs(boxAR - imgAR) > 0.01) {
    stretch = true
  } else if (cs.objectFit === 'none' || cs.objectFit === 'contain') {
    // contain pads, none lets the box clip via overflow — neither distorts
    cropX = cs.objectFit === 'none' ? Math.round(Math.max(0, iw - br.width)) : 0
    cropY = cs.objectFit === 'none' ? Math.round(Math.max(0, ih - br.height)) : 0
  }
  return {
    kind, src: img.src.split('/').pop(), box: Math.round(br.width) + 'x' + Math.round(br.height),
    img: iw + 'x' + ih, fit: cs.objectFit, cropX, cropY, stretch,
    arDiff: +(Math.abs(boxAR - imgAR)).toFixed(4),
  }
})

async function audit(path, label) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(900)
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)) }
    scrollTo(0, 0)
  })
  await sleep(800)
  const rows = await page.evaluate(AUDIT)
  console.log('\n== ' + label + ' (' + rows.length + ' images) ==')
  for (const r of rows) {
    const flag = r.broken ? 'BROKEN' : r.stretch ? 'STRETCHED' : (r.cropX > 2 || r.cropY > 2) ? `CROP ${r.cropX}x${r.cropY}px` : 'ok'
    if (flag !== 'ok') bad++
    console.log(`  ${flag.padEnd(16)} ${r.kind.padEnd(16)} ${String(r.src).padEnd(28)} box ${r.box} img ${r.img} fit ${r.fit} arΔ ${r.arDiff}`)
  }
  await page.close()
}

await audit('/', 'HOME — project preview frames')
for (const slug of slugs) await audit('/work/' + slug, slug)

await browser.close()
console.log(bad ? `\n✗ ${bad} frame problem(s)` : '\n✓ every frame: image loaded, no crop, no stretch')
process.exit(bad ? 1 : 0)
