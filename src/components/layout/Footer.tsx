import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-24 py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="font-semibold text-lg">StudentToolkit.in</div>
          <div className="text-sm text-slate-500">Academic & Placement Toolkit</div>
        </div>
        <div className="flex gap-6 text-sm text-slate-600">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
