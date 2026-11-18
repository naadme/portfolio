import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const sleep = ms => new Promise(r => setTimeout(r, ms))

const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const outDir = spec.out
fs.mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--font-render-hinting=none'] })

/** Scroll through the page so lazy images and scroll-triggered animations settle, then return. */
async function sweep(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) }
    scrollTo(0, 0)
  })
  await sleep(700)
}

for (const shot of spec.shots) {
  const page = await browser.newPage()
  const [w, h] = shot.viewport || [1440, 900]
  await page.setViewport({ width: w, height: h, deviceScaleFactor: shot.dsf || 1, isMobile: w < 600, hasTouch: w < 600 })
  try {
    // Optional localStorage seeding (key -> value) applied before the page loads,
    // for pages whose own script renders from stored state (e.g. the cart).
    if (shot.storage) await page.evaluateOnNewDocument(s => { for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v) }, shot.storage)
    await page.goto(new URL(shot.url, spec.base).href, { waitUntil: shot.waitUntil || 'networkidle2', timeout: 90000 })
    await sleep(shot.wait || 1600)
    if (shot.sweep !== false) await sweep(page)
    // Ordered steps after the sweep: clickText finds a control by its visible
    // text (regex), goto navigates — used for flows like add-to-cart → cart.
    for (const step of shot.steps || []) {
      if (step.goto) {
        await page.goto(new URL(step.goto, spec.base).href, { waitUntil: 'networkidle2', timeout: 90000 })
        await sleep(step.wait || 1600)
      } else if (step.clickText) {
        const hit = await page.evaluate(re => {
          const r = new RegExp(re, 'i')
          const el = [...document.querySelectorAll('button, a, [role=button]')].find(e => r.test((e.innerText || '').trim()))
          if (el) el.click()
          return !!el
        }, step.clickText)
        if (!hit) console.log('  ! no control matching', step.clickText)
        await sleep(step.wait || 900)
      }
    }
    for (const sel of shot.click || []) {
      await page.click(sel).catch(() => console.log('  ! click failed', sel))
      await sleep(shot.clickWait || 900)
    }
    if (shot.scrollFrac != null) {
      await page.evaluate(f => scrollTo(0, (document.body.scrollHeight - innerHeight) * f), shot.scrollFrac)
      await sleep(shot.settle || 1100)
    }
    if (shot.scroll != null) {
      await page.evaluate(y => scrollTo(0, typeof y === 'number' ? y : document.querySelector(y)?.getBoundingClientRect().top + scrollY - 90), shot.scroll)
      await sleep(shot.settle || 1100)
    }
    const buf = await page.screenshot({ fullPage: !!shot.full, type: 'png' })
    let img = sharp(buf)
    const meta = await img.metadata()
    if (shot.maxw && meta.width > shot.maxw) img = img.resize({ width: shot.maxw })
    const out = path.join(outDir, shot.name + '.jpg')
    await img.jpeg({ quality: shot.q || 84, chromaSubsampling: '4:4:4' }).toFile(out)
    const st = fs.statSync(out)
    console.log('OK', out, `${meta.width}x${meta.height}`, `${(st.size / 1024).toFixed(0)}KB`)
  } catch (e) {
    console.log('FAIL', shot.name, e.message)
  }
  await page.close()
}
await browser.close()
