import React, { useState } from 'react'
import Seo from '../../seo/Seo'
import ToolLayout from '../../components/dashboard/ToolLayout'
import Card from '../../components/ui/Card'

function percentageToCgpa(p: number) {
  // simple mapping: 10-point CGPA = percentage / 9.5
  return Math.round((p / 9.5) * 100) / 100
}

function cgpaToPercentage(c: number) {
  return Math.round((c * 9.5) * 100) / 100
}

export default function Converter() {
  const [percentage, setPercentage] = useState<number | ''>('')
  const [cgpa, setCgpa] = useState<number | ''>('')

  return (
    <ToolLayout title="Percentage ↔ CGPA Converter" description="Convert marks between percentage and CGPA." tips={<div>Different universities use different scales. This is an approximate conversion.</div>}>
      <Seo title="Percentage to CGPA Converter" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <label className="block text-sm font-medium">Percentage</label>
          <input type="number" value={percentage as any} onChange={e => setPercentage(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />
          <div className="mt-3 text-slate-700">CGPA: {percentage === '' ? '—' : percentageToCgpa(Number(percentage))}</div>
        </Card>

        <Card>
          <label className="block text-sm font-medium">CGPA</label>
          <input type="number" value={cgpa as any} onChange={e => setCgpa(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />
          <div className="mt-3 text-slate-700">Percentage: {cgpa === '' ? '—' : cgpaToPercentage(Number(cgpa))}</div>
        </Card>
      </div>
    </ToolLayout>
  )
}
