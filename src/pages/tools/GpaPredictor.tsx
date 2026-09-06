import React, { useState } from 'react'
import Seo from '../../seo/Seo'
import ToolLayout from '../../components/dashboard/ToolLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function GpaPredictor() {
  const [currentGpa, setCurrentGpa] = useState<number | ''>('')
  const [completedCredits, setCompletedCredits] = useState<number | ''>('')
  const [remainingCredits, setRemainingCredits] = useState<number | ''>('')
  const [expectedGpa, setExpectedGpa] = useState<number | ''>('')
  const [predicted, setPredicted] = useState<number | null>(null)

  function predict() {
    if (currentGpa === '' || completedCredits === '' || remainingCredits === '' || expectedGpa === '') return
    const cGpa = Number(currentGpa)
    const cCred = Number(completedCredits)
    const rCred = Number(remainingCredits)
    const eGpa = Number(expectedGpa)
    const total = (cGpa * cCred + eGpa * rCred) / (cCred + rCred)
    setPredicted(Math.round(total * 100) / 100)
  }

  return (
    <ToolLayout title="GPA Predictor" description="Estimate your future GPA based on expected grades and credit distribution." tips={<div>Provide completed and remaining credits for accurate prediction.</div>}>
      <Seo title="GPA Predictor" />
      <Card>
        <label className="block text-sm font-medium">Current GPA</label>
        <input type="number" value={currentGpa as any} onChange={e => setCurrentGpa(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <label className="block text-sm font-medium mt-4">Completed Credits</label>
        <input type="number" value={completedCredits as any} onChange={e => setCompletedCredits(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <label className="block text-sm font-medium mt-4">Remaining Credits</label>
        <input type="number" value={remainingCredits as any} onChange={e => setRemainingCredits(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <label className="block text-sm font-medium mt-4">Expected GPA (next sem)</label>
        <input type="number" value={expectedGpa as any} onChange={e => setExpectedGpa(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <div className="mt-4 flex gap-3">
          <Button onClick={predict}>Predict</Button>
        </div>

        <div className="mt-4 text-slate-700">Predicted GPA: {predicted ?? '—'}</div>
      </Card>
    </ToolLayout>
  )
}
