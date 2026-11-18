import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const targets = process.argv.slice(2)

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
for (const url of targets) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
    await new Promise(r => setTimeout(r, 2500))
    const info = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a')].map(a => ({ t: (a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40), h: a.getAttribute('href') })).filter(l => l.h)
      const heads = [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ': ' + h.innerText.trim().replace(/\s+/g, ' ').slice(0, 90))
      const forms = [...document.forms].map(f => ({ action: f.action, inputs: [...f.elements].map(e => e.name || e.type).slice(0, 12) }))
      const imgs = document.images.length
      return { title: document.title, links: links.slice(0, 60), heads: heads.slice(0, 40), forms, imgs, height: document.body.scrollHeight }
    })
    console.log('\n===== ' + url + ' =====')
    console.log(JSON.stringify(info, null, 1))
  } catch (e) { console.log('ERR ' + url + ' ' + e.message) }
  await page.close()
}
await browser.close()
