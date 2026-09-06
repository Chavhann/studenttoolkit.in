import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../../services/analytics'

export default function AnalyticsTracker() {
  const location = useLocation()
  useEffect(() => {
    // send page_view on route change
    try {
      trackEvent('page_view', { page_path: location.pathname })
    } catch (e) {
      // noop
    }
  }, [location.pathname])

  return null
}
