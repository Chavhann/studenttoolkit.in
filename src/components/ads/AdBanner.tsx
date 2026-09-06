import React, { useEffect, useRef } from 'react'
import { initAdsense, pushAdSlot } from '../../services/adsense'

export default function AdBanner() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    initAdsense()
    pushAdSlot(ref.current)
  }, [])

  return (
    <div ref={ref} role="complementary" aria-label="Advertisement" className="w-full glass rounded-md p-4 flex items-center justify-center text-slate-500">
      {/* AdSense responsive banner */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
        data-ad-slot={import.meta.env.VITE_ADSENSE_BANNER_SLOT || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <noscript><div style={{color:'#6b7280',fontSize:12}}>Advertisement</div></noscript>
    </div>
  )
}
