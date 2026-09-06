import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

export default function Header() {
  const nav = useNavigate()
  return (
    <header className="py-6" aria-label="Main header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">ST</div>
            <div>
              <div className="text-lg font-semibold">StudentToolkit.in</div>
              <div className="text-sm text-slate-500">All-in-One Academic & Placement Toolkit</div>
            </div>
          </Link>
        </div>
        <nav className="flex items-center gap-4" aria-label="Primary">
          <Link to="/dashboard" className="text-sm text-slate-700">Dashboard</Link>
          <Link to="/tools" className="text-sm text-slate-700">Tools</Link>
          <Button onClick={() => nav('/dashboard')}>Get Started</Button>
        </nav>
      </div>
    </header>
  )
}
