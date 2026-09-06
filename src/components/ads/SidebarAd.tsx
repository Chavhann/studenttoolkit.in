import React, { useEffect, useRef } from 'react'
import { initAdsense, pushAdSlot } from '../../services/adsense'

export default function SidebarAd() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    initAdsense()
    pushAdSlot(ref.current)
  }, [])

  return (
    <aside ref={ref} role="complementary" aria-label="Advertisement" className="w-72 glass rounded-lg p-4 text-slate-500 hidden lg:block">
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT} data-ad-slot={import.meta.env.VITE_ADSENSE_SIDEBAR_SLOT || '1234567890'} data-ad-format="auto"></ins>
      <noscript><div style={{color:'#6b7280',fontSize:12}}>Advertisement</div></noscript>
    </aside>
  )
}
