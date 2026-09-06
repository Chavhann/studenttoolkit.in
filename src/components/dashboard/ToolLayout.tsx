import React from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import RelatedTools from './RelatedTools'

export default function ToolLayout({
  title,
  description,
  children,
  tips
}: {
  title: string
  description?: string
  children: React.ReactNode
  tips?: React.ReactNode
}) {
  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        {description && <p className="text-slate-600 mt-2">{description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {children}
        </div>

        <aside className="space-y-4">
          <Card>
            <h3 className="font-semibold">Tips</h3>
            <div className="mt-2 text-slate-600">{tips}</div>
            {/* Export removed per request */}
          </Card>

          <Card>
            <h4 className="font-semibold">Related Tools</h4>
            <RelatedTools />
          </Card>
        </aside>
      </div>
    </div>
  )
}
