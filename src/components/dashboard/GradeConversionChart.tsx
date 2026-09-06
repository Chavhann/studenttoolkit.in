import React from 'react'
import Card from '../ui/Card'

const MAPPING: Array<[string, number]> = [
  ['A', 10],
  ['A-', 9],
  ['B', 8],
  ['B-', 7],
  ['C', 6],
  ['C-', 5],
  ['D', 4],
  ['F', 0]
]

export default function GradeConversionChart() {
  return (
    <Card>
      <h4 className="font-semibold">Grade Conversion</h4>
      <div className="mt-3 text-sm text-slate-600">Common letter → grade point mapping</div>
      <table className="w-full mt-4 text-sm">
        <thead>
          <tr className="text-left text-slate-500"><th>Letter</th><th>Grade Point</th></tr>
        </thead>
        <tbody>
          {MAPPING.map(([l, v]) => (
            <tr key={l} className="border-t"><td className="py-2">{l}</td><td className="py-2">{v}</td></tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
