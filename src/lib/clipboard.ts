export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true } catch {
    try {
      const a = document.createElement('textarea')
      a.value = text; a.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(a); a.select()
      const ok = document.execCommand('copy'); a.remove(); return ok
    } catch { return false }
  }
}
