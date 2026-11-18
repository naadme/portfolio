import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || 'public/projects'
const out = process.argv[3] || '/tmp/contact-sheet.png'
const files = []
for (const entry of fs.readdirSync(root)) {
  const full = path.join(root, entry)
  if (fs.statSync(full).isDirectory()) {
    for (const f of fs.readdirSync(full)) if (/\.(jpg|png)$/i.test(f)) files.push(path.join(full, f))
  } else if (/\.(jpg|png)$/i.test(entry)) {
    files.push(full)
  }
}
files.sort()

const CW = 320, CH = 240, LBL = 26, COLS = 4
const rows = Math.ceil(files.length / COLS)
const comps = []
for (let i = 0; i < files.length; i++) {
  const col = i % COLS, row = Math.floor(i / COLS)
  const thumb = await sharp(files[i]).resize(CW - 8, CH - 8, { fit: 'inside' }).toBuffer()
  const meta = await sharp(files[i]).metadata()
  const label = `<svg width="${CW}" height="${LBL}"><rect width="100%" height="100%" fill="#222"/><text x="6" y="18" font-family="monospace" font-size="13" fill="#fff">${path.basename(path.dirname(files[i]))}/${path.basename(files[i])} ${meta.width}x${meta.height}</text></svg>`
  comps.push({ input: Buffer.from(label), left: col * CW, top: row * (CH + LBL) })
  const tm = await sharp(thumb).metadata()
  comps.push({ input: thumb, left: col * CW + Math.round((CW - tm.width) / 2), top: row * (CH + LBL) + LBL + Math.round((CH - 8 - tm.height) / 2) })
}
const W = COLS * CW, H = rows * (CH + LBL)
await sharp({ create: { width: W, height: H, channels: 3, background: '#111' } }).composite(comps).png().toFile(out)
console.log('wrote', out, `${W}x${H}`, files.length, 'files')
