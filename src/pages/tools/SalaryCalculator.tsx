import React, { useState } from 'react'
import Seo from '../../seo/Seo'
import ToolLayout from '../../components/dashboard/ToolLayout'
import Card from '../../components/ui/Card'
import { toCurrency } from '../../utils/format'

export default function SalaryCalculator() {
  const [gross, setGross] = useState<number | ''>('')

  function computeInHand() {
    const g = Number(gross || 0)
    const pf = g * 0.12
    const tax = g > 500000 ? (g - 500000) * 0.2 : 0
    const inHand = g - pf - tax
    return Math.round(inHand)
  }

  return (
    <ToolLayout title="Salary In-Hand Calculator" description="Estimate monthly in-hand salary from gross CTC." tips={<div>Taxes and deductions vary; this is a rough estimate.</div>}>
      <Seo title="Salary In-Hand Calculator" />
      <Card>
        <label className="block text-sm font-medium">Annual Gross CTC (INR)</label>
        <input type="number" value={gross as any} onChange={e => setGross(e.target.value === '' ? '' : Number(e.target.value))} className="mt-2 w-full p-3 rounded-md border" />

        <div className="mt-4 text-slate-700">Estimated In-Hand (Annual): {toCurrency(computeInHand())}</div>
      </Card>
    </ToolLayout>
  )
}
