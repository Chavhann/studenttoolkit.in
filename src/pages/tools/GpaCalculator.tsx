import React, { useEffect, useMemo, useState } from 'react'
import Seo from '../../seo/Seo'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import GradeConversionChart from '../../components/dashboard/GradeConversionChart'
import { saveJSON, loadJSON } from '../../utils/storage'
import { exportHtmlAsPdf } from '../../utils/exporter'

type GradeMap = Record<string, number>

const LETTER_MAP: GradeMap = {
  A: 10,
  'A-': 9,
  B: 8,
  'B-': 7,
  C: 6,
  'C-': 5,
  D: 4,
  F: 0
}

type Course = { id: string; name?: string; credits: number; grade: string }
type Semester = { id: string; name: string; courses: Course[] }

const STORAGE_KEY = 'studenttoolkit:gpa:semesters'

function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9)
}

export default function GpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>(() => loadJSON(STORAGE_KEY, []))
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    saveJSON(STORAGE_KEY, semesters)
  }, [semesters])

  const addSemester = () => {
    const s: Semester = { id: uid('s_'), name: `Semester ${semesters.length + 1}`, courses: [] }
    setSemesters(prev => [...prev, s])
    setSelected(s.id)
  }

  const removeSemester = (id: string) => {
    setSemesters(prev => prev.filter(s => s.id !== id))
    if (selected === id) setSelected(null)
  }

  const addCourse = (semId: string) => {
    setSemesters(prev => prev.map(s => s.id === semId ? { ...s, courses: [...s.courses, { id: uid('c_'), name: '', credits: 3, grade: 'A' }] } : s))
  }

  const updateCourse = (semId: string, courseId: string, patch: Partial<Course>) => {
    setSemesters(prev => prev.map(s => s.id === semId ? { ...s, courses: s.courses.map(c => c.id === courseId ? { ...c, ...patch } : c) } : s))
  }

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(prev => prev.map(s => s.id === semId ? { ...s, courses: s.courses.filter(c => c.id !== courseId) } : s))
  }

  function gradeToPoint(g: string) {
    const s = g.trim().toUpperCase()
    return (LETTER_MAP as any)[s] ?? null
  }

  function sgpaOf(sem: Semester) {
    const credits = sem.courses.map(c => Number(c.credits) || 0)
    const points = sem.courses.map(c => (gradeToPoint(c.grade) ?? 0) * (Number(c.credits) || 0))
    const totalCredits = credits.reduce((a, b) => a + b, 0)
    if (totalCredits === 0) return null
    return Math.round((points.reduce((a, b) => a + b, 0) / totalCredits) * 100) / 100
  }

  const overall = useMemo(() => {
    const all = semesters.flatMap(s => s.courses.map(c => ({ credits: Number(c.credits) || 0, points: (gradeToPoint(c.grade) ?? 0) * (Number(c.credits) || 0) })))
    const totalCredits = all.reduce((a, b) => a + b.credits, 0)
    if (totalCredits === 0) return null
    const weighted = all.reduce((a, b) => a + b.points, 0)
    return Math.round((weighted / totalCredits) * 100) / 100
  }, [semesters])

  function exportResults() {
    const html = `
      <h1>GPA Report</h1>
      <div>CGPA: ${overall ?? '—'}</div>
      <div>${semesters.map(s => `<h3>${s.name} — SGPA: ${sgpaOf(s) ?? '—'}</h3>`).join('')}</div>
    `
    exportHtmlAsPdf(html, 'gpa-report')
  }

  // What grade do I need — simple calculator for a semester
  function requiredGradeForTarget(sem: Semester, remainingCredits: number, target: number) {
    const currentCredits = sem.courses.map(c => Number(c.credits) || 0).reduce((a, b) => a + b, 0)
    const currentWeighted = sem.courses.map(c => (gradeToPoint(c.grade) ?? 0) * (Number(c.credits) || 0)).reduce((a, b) => a + b, 0)
    const totalNeeded = target * (currentCredits + remainingCredits)
    const remainingPointsNeeded = totalNeeded - currentWeighted
    if (remainingCredits <= 0) return null
    const perCredit = remainingPointsNeeded / remainingCredits
    return Math.round(perCredit * 100) / 100
  }

  // GPA improvement planner: required next-semester GPA to hit a CGPA target
  function requiredNextSemesterGpa(targetCgpa: number, nextSemesterCredits: number) {
    const all = semesters.flatMap(s => s.courses.map(c => ({ credits: Number(c.credits) || 0, points: (gradeToPoint(c.grade) ?? 0) * (Number(c.credits) || 0) })))
    const totalCredits = all.reduce((a, b) => a + b.credits, 0)
    const totalPoints = all.reduce((a, b) => a + b.points, 0)
    const neededTotalPoints = targetCgpa * (totalCredits + nextSemesterCredits)
    const remainingPoints = neededTotalPoints - totalPoints
    if (nextSemesterCredits <= 0) return null
    const required = remainingPoints / nextSemesterCredits
    return Math.round(required * 100) / 100
  }

  // Basic validation message
  useEffect(() => {
    setError(null)
  }, [semesters])

  return (
    <div className="py-12">
      <Seo title="GPA Calculator" />
      <h2 className="text-2xl font-semibold">GPA Calculator</h2>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Semesters</h3>
              <div className="flex gap-2">
                <Button onClick={addSemester}>+ Add</Button>
                <Button variant="ghost" onClick={() => { setSemesters([]); setSelected(null) }}>Clear</Button>
              </div>
            </div>

            <div className="mt-4 space-y-2 max-h-72 overflow-auto">
              {semesters.map(s => (
                <div key={s.id} className={`p-2 rounded-md border ${selected === s.id ? 'bg-slate-50' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{s.name}</div>
                      <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => { setSelected(s.id) }}>Open</Button>
                      <Button variant="ghost" onClick={() => removeSemester(s.id)}>Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
              {semesters.length === 0 && <div className="text-sm text-slate-500">No semesters yet. Add one to begin.</div>}
            </div>
          </Card>

          <Card className="mt-4">
            <h4 className="font-semibold">Actions</h4>
            <div className="mt-3 flex flex-col gap-2">
              <Button onClick={exportResults}>Export PDF</Button>
              <Button variant="ghost" onClick={() => { saveJSON(STORAGE_KEY + ':backup', semesters); alert('Backup saved to localStorage') }}>Backup</Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selected ? (
            <div>
              {semesters.filter(s => s.id === selected).map(s => (
                <div key={s.id}>
                  <Card>
                    <div className="flex justify-between items-center">
                      <input className="text-xl font-semibold" value={s.name} onChange={e => setSemesters(prev => prev.map(p => p.id === s.id ? { ...p, name: e.target.value } : p))} />
                      <div>SGPA: <strong>{sgpaOf(s) ?? '—'}</strong></div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {s.courses.map(c => (
                        <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
                          <input className="col-span-5 p-2 border rounded" placeholder="Course name" value={c.name ?? ''} onChange={e => updateCourse(s.id, c.id, { name: e.target.value })} />
                          <input type="number" min={0} className="col-span-2 p-2 border rounded" value={c.credits} onChange={e => updateCourse(s.id, c.id, { credits: Number(e.target.value) })} />
                          <select className="col-span-3 p-2 border rounded" value={c.grade} onChange={e => updateCourse(s.id, c.id, { grade: e.target.value })}>
                            {Object.keys(LETTER_MAP).map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                          <div className="col-span-2 flex gap-2">
                            <Button variant="ghost" onClick={() => removeCourse(s.id, c.id)}>Remove</Button>
                          </div>
                        </div>
                      ))}

                      <div>
                        <Button onClick={() => addCourse(s.id)}>+ Add Course</Button>
                      </div>
                    </div>
                  </Card>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <h4 className="font-semibold">What grade do I need?</h4>
                      <div className="mt-2 text-sm text-slate-600">Estimate required average grade points for remaining credits to reach a target SGPA.</div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Remaining credits" id="remainCredits" className="p-2 border rounded" />
                        <input type="number" placeholder="Target SGPA" id="targetSgpa" className="p-2 border rounded" />
                      </div>
                      <div className="mt-2">
                        <Button onClick={() => {
                          const rem = Number((document.getElementById('remainCredits') as HTMLInputElement).value) || 0
                          const tgt = Number((document.getElementById('targetSgpa') as HTMLInputElement).value) || 0
                          const req = requiredGradeForTarget(s, rem, tgt)
                          if (req === null) alert('Enter remaining credits > 0')
                          else alert(`Required average grade points per credit: ${req} (10-point scale)`)
                        }}>Calculate</Button>
                      </div>
                    </Card>

                    <Card>
                      <h4 className="font-semibold">Improvement Planner</h4>
                      <div className="mt-2 text-sm text-slate-600">Given a target CGPA, estimate required GPA next semester.</div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Target CGPA" id="targetCgpa" className="p-2 border rounded" />
                        <input type="number" placeholder="Next sem credits" id="nextCredits" className="p-2 border rounded" />
                      </div>
                      <div className="mt-2">
                        <Button onClick={() => {
                          const tgt = Number((document.getElementById('targetCgpa') as HTMLInputElement).value) || 0
                          const nc = Number((document.getElementById('nextCredits') as HTMLInputElement).value) || 0
                          const req = requiredNextSemesterGpa(tgt, nc)
                          if (req === null) alert('Enter valid next semester credits')
                          else alert(`Required average grade points next semester: ${req} (10-point scale)`)
                        }}>Estimate</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <h3 className="font-semibold">Overview</h3>
              <div className="mt-4 text-3xl font-bold">{overall ?? '—'}</div>
              <div className="mt-2 text-slate-600">CGPA across saved semesters.</div>
              <div className="mt-4">
                <GradeConversionChart />
              </div>
            </Card>
          )}
        </div>
      </div>

      {error && <div className="mt-4 text-rose-600">{error}</div>}
    </div>
  )
}
