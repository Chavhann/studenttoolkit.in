declare module '*.svg'

interface Window {
	dataLayer?: any[]
	gtag?: (...args: any[]) => void
	clarity?: (...args: any[]) => void
	adsbygoogle?: any[]
}
