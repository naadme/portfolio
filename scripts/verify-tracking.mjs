import puppeteer from 'puppeteer-core'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

// 1. Homepage tracking widget
await page.goto('https://hindustancourier.com/', { waitUntil: 'networkidle2', timeout: 60000 })
const widget = await page.evaluate(() => {
  const h2s = [...document.querySelectorAll('h2')].map(h => h.innerText.trim())
  const inputs = [...document.querySelectorAll('input')].map(i => ({ type: i.type, name: i.name, ph: i.placeholder, formAction: i.form?.action }))
  const buttons = [...document.querySelectorAll('button,input[type=submit]')].map(b => (b.innerText || b.value || '').trim()).filter(Boolean)
  return { h2s, inputs, buttons }
})
console.log('HOME:', JSON.stringify(widget, null, 1))

// 2. Tracking page + submit a dummy number to see whether a lookup service responds
await page.goto('https://hindustancourier.com/track_shipment', { waitUntil: 'networkidle2', timeout: 60000 })
const trackPage = await page.evaluate(() => ({
  title: document.title,
  h1: document.querySelector('h1')?.innerText,
  h2: [...document.querySelectorAll('h2,h3')].map(h => h.innerText.trim()).slice(0, 10),
  inputs: [...document.querySelectorAll('input')].map(i => ({ type: i.type, name: i.name, ph: i.placeholder, formAction: i.form?.action, formMethod: i.form?.method })),
  buttons: [...document.querySelectorAll('button,input[type=submit]')].map(b => (b.innerText || b.value || '').trim()).filter(Boolean).slice(0, 10),
}))
console.log('TRACK PAGE:', JSON.stringify(trackPage, null, 1))

const input = await page.$('input[type="text"], input:not([type])')
if (input) {
  await input.type('TEST1234567')
  const res = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 25000 }).catch(() => null),
    page.evaluate(() => { const f = document.querySelector('form'); const btn = f?.querySelector('button,input[type=submit]'); (btn || f?.querySelector('input[type=submit]'))?.click(); if (btn) btn.click(); else f?.requestSubmit?.(); }),
  ])
  await new Promise(r => setTimeout(r, 3000))
  console.log('AFTER SUBMIT url:', page.url())
  const after = await page.evaluate(() => ({
    text: document.body.innerText.replace(/\s+/g, ' ').slice(0, 900),
    iframes: document.querySelectorAll('iframe').length,
  }))
  console.log('AFTER SUBMIT:', JSON.stringify(after, null, 1))
}
await browser.close()
