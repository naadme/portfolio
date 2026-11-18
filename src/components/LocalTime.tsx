import { useEffect, useState } from 'react'
const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date())
export default function LocalTime() {
  const [t, setT] = useState(fmt)
  useEffect(() => { const i = setInterval(() => setT(fmt()), 20000); return () => clearInterval(i) }, [])
  return <span>{t} IST</span>
}
