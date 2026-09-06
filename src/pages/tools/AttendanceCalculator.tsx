import React, { useState } from 'react'
import Seo from '../../seo/Seo'
import ToolLayout from '../../components/dashboard/ToolLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function AttendanceCalculator() {
  const [present, setPresent] = useState<number | ''>('')
  const [total, setTotal] = useState<number | ''>('')
  const [target, setTarget] = useState<number>(75)

  function computeRequired() {
    if (present === '' || total === '') return null
    const p = Number(present)
    const t = Number(total)
    if (!t || t <= 0) return null
    const needed = Math.ceil((target / 100) * t - p)
    return needed > 0 ? needed : 0
  }

  const [required, setRequired] = React.useState<number | null>(null)

  return (
    <ToolLayout title="Attendance Calculator" description="Estimate classes required to reach attendance threshold." tips={<div>Try to maintain consistent attendance and mark excused leaves.</div>}>
      <Seo title="Attendance Calculator" />
      <Card>
        <label className="block text-sm font-medium">Classes Present</label>
        <input aria-label="classes-present" type="number" value={present} onChange={e => setPresent(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <label className="block text-sm font-medium mt-4">Total Classes</label>
        <input aria-label="total-classes" type="number" value={total} onChange={e => setTotal(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <label className="block text-sm font-medium mt-4">Target %</label>
        <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <div className="mt-4 flex gap-3">
          <Button onClick={() => setRequired(computeRequired())}>Calculate</Button>
          <Button variant="ghost" onClick={() => { setPresent(''); setTotal(''); setTarget(75); setRequired(null) }}>Clear</Button>
        </div>

        <div className="mt-4 text-slate-700 font-semibold">Classes Required: {required ?? '—'}</div>
      </Card>
    </ToolLayout>
  )
}
