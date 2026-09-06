import React from 'react'
import Seo from '../seo/Seo'
import Card from '../components/ui/Card'
import AdBanner from '../components/ads/AdBanner'

export default function Dashboard() {
  return (
    <div className="py-12">
      <Seo title="Dashboard" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold">Academic Progress</h2>
            <div className="mt-4 text-slate-600">Overview, GPA trends, and upcoming deadlines.</div>
          </Card>
          <div className="mt-6">
            <Card>
              <h3 className="font-semibold">Tools</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <a href="/tools/gpa" className="p-4 rounded-md bg-white/60 border">GPA Calculator</a>
                <a href="#" className="p-4 rounded-md bg-white/60 border">Attendance</a>
                <a href="#" className="p-4 rounded-md bg-white/60 border">GPA Predictor</a>
                <a href="#" className="p-4 rounded-md bg-white/60 border">Study Planner</a>
              </div>
            </Card>
          </div>
        </div>

        <aside>
          <AdBanner />
          <div className="mt-6">
            <Card>
              <h4 className="font-semibold">Tips</h4>
              <ul className="mt-3 text-slate-600 list-disc list-inside">
                <li>Keep attendance above 75%.</li>
                <li>Prioritise core subjects for placements.</li>
              </ul>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
