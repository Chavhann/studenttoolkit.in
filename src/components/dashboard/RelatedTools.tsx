import React from 'react'
import { Link } from 'react-router-dom'

const tools = [
  { name: 'GPA Calculator', path: '/tools/gpa' },
  { name: 'Attendance Calculator', path: '/tools/attendance' },
  { name: 'Percentage ↔ CGPA', path: '/tools/converter' },
  { name: 'GPA Predictor', path: '/tools/gpa-predictor' },
  { name: 'Salary In-Hand', path: '/tools/salary' },
  { name: 'Study Planner', path: '/tools/study-planner' }
]

export default function RelatedTools() {
  return (
    <ul className="space-y-2 text-sm">
      {tools.map(t => (
        <li key={t.path}>
          <Link to={t.path} className="text-slate-700">{t.name}</Link>
        </li>
      ))}
    </ul>
  )
}
