export function initAdsense() {
  const client = import.meta.env.VITE_ADSENSE_CLIENT
  if (!client || typeof document === 'undefined') return
  if (document.getElementById('adsbygoogle-js')) return
  const s = document.createElement('script')
  s.id = 'adsbygoogle-js'
  s.async = true
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
  s.crossOrigin = 'anonymous'
  document.head.appendChild(s)
}

export function pushAdSlot(element: HTMLElement | null) {
  if (!element) return
  try {
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})
  } catch (e) {
    // ignore
  }
}
