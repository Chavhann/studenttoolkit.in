import React from 'react'
import Seo from '../seo/Seo'
import Card from '../components/ui/Card'
import { Link } from 'react-router-dom'

export default function ToolsIndex() {
  const tools = [
    { name: 'GPA Calculator', path: '/tools/gpa' },
    { name: 'Attendance Calculator', path: '/tools/attendance' },
    { name: 'Percentage ↔ CGPA', path: '/tools/converter' },
    { name: 'GPA Predictor', path: '/tools/gpa-predictor' },
    { name: 'Salary In-Hand', path: '/tools/salary' },
    { name: 'Study Planner', path: '/tools/study-planner' }
  ]

  return (
    <div className="py-12">
      <Seo title="All Tools" />
      <h2 className="text-2xl font-semibold">All Tools</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map(t => (
          <Link key={t.path} to={t.path} className="block">
            <div className="glass rounded-lg p-4 h-full hover:shadow-lg transition">{t.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
