import React from 'react'
import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
  description?: string
  url?: string
}

export default function Seo({ title, description, url }: Props) {
  const fullTitle = title ? `${title} • StudentToolkit.in` : 'StudentToolkit.in'
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Academic & Placement Toolkit for students'} />
      <link rel="canonical" href={url || 'https://studenttoolkit.in'} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:url" content={url || 'https://studenttoolkit.in'} />
      <meta property="og:site_name" content="StudentToolkit.in" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{`{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "StudentToolkit.in",
        "url": "${url || 'https://studenttoolkit.in'}",
        "description": "Academic & Placement Toolkit for students"
      }`}</script>
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
