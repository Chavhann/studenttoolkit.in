# StudentToolkit.in

A modern, student-focused productivity web app designed to simplify academic planning and performance tracking. Built with React, TypeScript, Vite, and Tailwind CSS, StudentToolkit.in brings multiple essential tools into one clean dashboard for students to calculate GPA, track attendance, convert academic percentages, estimate salary in-hand, and plan study routines more effectively.

## Overview

StudentToolkit.in is a portfolio-grade frontend project created to solve everyday academic challenges for college and university students. The platform combines a premium SaaS-style interface with practical utility tools and analytics-ready architecture, making it suitable for both real-world use and professional portfolio presentation.

## Key Features

- GPA and CGPA calculator with academic grade conversion guidance
- Attendance percentage tracker for eligibility monitoring
- Percentage to CGPA and CGPA to percentage conversion tool
- GPA predictor to estimate future academic performance
- Salary in-hand calculator for understanding take-home pay
- Study planner for managing academic priorities and schedules
- Clean dashboard layout and responsive design for mobile and desktop
- SEO-friendly structure with metadata and sitemap support
- Analytics and ad integration ready for production deployment

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Helmet Async
- Lucide React

## Project Structure

```bash
studenttoolkit.in/
├── public/
│   ├── ads.txt
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   ├── pages/
│   ├── seo/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
```

## Tools Included

- GPA Calculator
- Attendance Calculator
- Percentage ↔ CGPA Converter
- GPA Predictor
- Salary Calculator
- Study Planner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The application will start in development mode and can be opened in your browser at the local Vite URL.

### Production build

```bash
npm run build
```

## Environment Variables

The project includes analytics and monetization support for production deployment. Configure the following values in your environment as needed:

```bash
VITE_GA_ID
VITE_CLARITY_ID
VITE_ADSENSE_CLIENT
VITE_ADSENSE_BANNER_SLOT
VITE_ADSENSE_SIDEBAR_SLOT
VITE_ADSENSE_INCONTENT_SLOT
```

These are used for Google Analytics, Microsoft Clarity, and Google AdSense integration.

## Deployment

This app is ready to be deployed on Vercel or any static hosting platform that supports Vite applications.

### Vercel

1. Push the project to GitHub
2. Import the repository in Vercel
3. Set environment variables in the project settings
4. Deploy the app

## Analytics and Monetization

The project is structured to support:

- GA4 event tracking
- Microsoft Clarity session recording
- Google AdSense placements
- SEO metadata and sitemap generation

## Design Notes

The interface uses a modern SaaS-inspired layout with soft gradients, card-based components, and mobile-responsive sections to create a polished user experience. The project is intentionally structured in a way that feels production-ready and easy to extend with additional academic tools.

## Future Enhancements

Possible roadmap additions include:

- semester-wise academic dashboard
- placement eligibility tracker
- backlog and risk analysis tools
- personalized academic recommendations
- authentication and saved student profiles

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Portfolio Summary

StudentToolkit.in demonstrates frontend engineering, product thinking, UI/UX design, responsive development, and deployment-ready architecture in a real-world student utility application. It is suitable for showcasing as a portfolio project focused on education technology and productivity tools.
