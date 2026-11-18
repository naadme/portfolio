import { useState } from 'react'
import { EMAIL } from '../data/profile'
import { copyText } from '../lib/clipboard'
export default function CopyEmail() {
  const [s, setS] = useState<'idle' | 'ok' | 'fail'>('idle')
  const copy = async () => { setS((await copyText(EMAIL)) ? 'ok' : 'fail'); setTimeout(() => setS('idle'), 2200) }
  return <><button className="btn copy" onClick={copy}>{s === 'ok' ? 'Copied ✓' : s === 'fail' ? 'Copy failed' : 'Copy email'}</button><span className="sr" role="status">{s === 'ok' ? 'Email address copied' : ''}</span></>
}
