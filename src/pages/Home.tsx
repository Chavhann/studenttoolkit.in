import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import AdBanner from '../components/ads/AdBanner'
import { motion } from 'framer-motion'

const gradientSteps = [
  'linear-gradient(90deg, rgba(91,108,255,0.12), rgba(139,92,246,0.08))',
  'linear-gradient(90deg, rgba(16,185,129,0.06), rgba(99,102,241,0.06))',
  'linear-gradient(90deg, rgba(253,186,116,0.06), rgba(244,63,94,0.06))'
]

export default function Home() {
  return (
    <div className="py-12">
      <Seo title="StudentToolkit.in — Tools for Students" />
      <section className="py-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div className="p-8 rounded-2xl hero-gradient" animate={{ background: gradientSteps }} transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' as const }}>
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Academic & Placement Toolkit
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4 text-slate-600">GPA, Attendance, Placement eligibility, Salary & more — built for students.</motion.p>
          </motion.div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/dashboard"><Button>Open Dashboard</Button></Link>
            <a href="#features" className="text-sm text-slate-600">How it works</a>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="max-w-7xl mx-auto">
          <AdBanner />
        </div>
      </section>

      <section id="features" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold">Premium Tools</h3>
          <p className="text-slate-500 mt-2">10 essential student tools, accurate and fast.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Insights</h3>
          <p className="text-slate-500 mt-2">Actionable tips, placement readiness and study plans.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Secure</h3>
          <p className="text-slate-500 mt-2">Privacy-first by design, secure reports.</p>
        </Card>
      </section>

      <section className="mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold">Popular Tools</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/tools/gpa"><Card><div className="font-medium">GPA Calculator</div></Card></Link>
            <Link to="/tools/attendance"><Card><div className="font-medium">Attendance Calculator</div></Card></Link>
            <Link to="/tools/gpa-predictor"><Card><div className="font-medium">GPA Predictor</div></Card></Link>
            <Link to="/tools/converter"><Card><div className="font-medium">Percentage ↔ CGPA</div></Card></Link>
            <Link to="/tools/salary"><Card><div className="font-medium">Salary In-Hand Calculator</div></Card></Link>
            <Link to="/tools/study-planner"><Card><div className="font-medium">Study Planner</div></Card></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
