function injectScript(src: string, id?: string) {
  if (typeof document === 'undefined') return
  if (id && document.getElementById(id)) return
  const s = document.createElement('script')
  s.src = src
  s.async = true
  if (id) s.id = id
  document.head.appendChild(s)
}

export function initAnalytics() {
  // Google Analytics (GA4)
  const gaId = import.meta.env.VITE_GA_ID
  if (gaId) {
    // gtag.js
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, 'ga-script')
    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      ;(window as any).dataLayer.push(args)
    }
    ;(window as any).gtag = gtag
    gtag('js', new Date())
    gtag('config', gaId, { anonymize_ip: true })
  }

  // Microsoft Clarity
  const clarity = import.meta.env.VITE_CLARITY_ID
  if (clarity) {
    injectScript(`https://www.clarity.ms/tag/${clarity}`, 'clarity-script')
  }
}

export function trackEvent(name: string, params?: Record<string, any>) {
  // GA4 event
  if ((window as any).gtag) {
    ;(window as any).gtag('event', name, params || {})
  }
}
