# StudentToolkit.in

Production-ready SaaS-style frontend scaffold built with React 19, TypeScript, Vite, and Tailwind CSS.

Quick start

```bash
npm install
npm run dev
```

Build

```bash
npm run build
```

Deployment

- This project is set up to be deployed on Vercel — push to Git and connect to Vercel.
- Ensure environment variables from `.env.example` are set in Vercel.

Analytics & AdSense

- Set `VITE_GA_ID` for Google Analytics (GA4) to enable analytics.
- Set `VITE_CLARITY_ID` for Microsoft Clarity session recording.
- Set `VITE_ADSENSE_CLIENT` for Google AdSense (e.g. `ca-pub-XXXXXXXXXXXX`).
- Optionally set ad slot IDs: `VITE_ADSENSE_BANNER_SLOT`, `VITE_ADSENSE_SIDEBAR_SLOT`, `VITE_ADSENSE_INCONTENT_SLOT`.


Notes

- AdSense placeholders are in `src/components/ads` and `public/ads.txt`.
- SEO uses `react-helmet-async` and `public/sitemap.xml` and `robots.txt` are included.
