import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Spinner from './components/ui/Spinner'
import AnalyticsTracker from './components/common/AnalyticsTracker'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Gpa = lazy(() => import('./pages/tools/GpaCalculator'))
const ToolsIndex = lazy(() => import('./pages/ToolsIndex'))
const Attendance = lazy(() => import('./pages/tools/AttendanceCalculator'))
const Converter = lazy(() => import('./pages/tools/Converter'))
const GpaPredictor = lazy(() => import('./pages/tools/GpaPredictor'))
const Salary = lazy(() => import('./pages/tools/SalaryCalculator'))
const StudyPlanner = lazy(() => import('./pages/tools/StudyPlanner'))
// Removed unused tool imports: PlacementChecker, SemesterAnalyzer, BacklogRisk, ProgressDashboard

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <Header />
      <main id="main-content" role="main" className="max-w-7xl mx-auto px-6">
        <Suspense fallback={<Spinner />}>
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tools" element={<ToolsIndex />} />
                <Route path="/tools/gpa" element={<Gpa />} />
                <Route path="/tools/attendance" element={<Attendance />} />
                <Route path="/tools/converter" element={<Converter />} />
                <Route path="/tools/gpa-predictor" element={<GpaPredictor />} />
                <Route path="/tools/salary" element={<Salary />} />
                <Route path="/tools/study-planner" element={<StudyPlanner />} />
                {/* Removed routes for Placement, Semester Analyzer, Backlog Risk, and Academic Progress */}
              </Routes>
            </motion.div>
            <AnalyticsTracker />
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
