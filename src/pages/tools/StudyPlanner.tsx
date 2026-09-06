import React, { useEffect, useRef, useState } from 'react'
import Seo from '../../seo/Seo'
import ToolLayout from '../../components/dashboard/ToolLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

type DayPlan = { day: string; hours: number; subject?: string }

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function StudyPlanner() {
  const [defaultHours, setDefaultHours] = useState<number>(2)
  const [days, setDays] = useState<DayPlan[]>(() => DAY_NAMES.map(d => ({ day: d, hours: 2 })))
  const [subjectInput, setSubjectInput] = useState('')
  const [subjects, setSubjects] = useState<string[]>(['Math', 'Physics'])

  // Timer state: popup modal, pause/resume, reset
  const [timerRunning, setTimerRunning] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)
  const [timerMinutesInput, setTimerMinutesInput] = useState<number>(25)
  const [timerUnit, setTimerUnit] = useState<'minutes' | 'hours'>('minutes')
  const [timerSubject, setTimerSubject] = useState<string | ''>('')
  const [showTimerModal, setShowTimerModal] = useState(false)
  const timerRef = useRef<number | null>(null)
  const pointerRef = useRef<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null)
  const [modalPos, setModalPos] = useState<{ left: number; top: number }>({ left: Math.max(20, window.innerWidth - 340), top: Math.max(60, window.innerHeight - 200) })

  useEffect(() => {
    if (showTimerModal) {
      // center modal when opened
      const w = 420, h = 220
      setModalPos({ left: Math.max(20, Math.round((window.innerWidth - w) / 2)), top: Math.max(20, Math.round((window.innerHeight - h) / 2)) })
    }
  }, [showTimerModal])

  useEffect(() => {
    if (timerRunning) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = window.setInterval(() => {
        setRemainingSeconds(s => {
          if (s <= 1) {
            if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null }
            setTimerRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null }
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
  }, [timerRunning])

  // Sound / notification settings
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notifyEnabled, setNotifyEnabled] = useState(false)
  const prevRemainingRef = useRef<number | null>(null)

  function playFinishSound() {
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      const durationMs = 10_000
      const beepMs = 60 // length of each quick beep
      const intraGap = 60 // gap between quick beeps in a group
      const groupInterval = 500 // time between group starts

      function playSingleBeep() {
        try {
          const ctx = new AudioContext()
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.type = 'sine'
          o.frequency.value = 1000
          o.connect(g)
          g.connect(ctx.destination)
          const now = ctx.currentTime
          g.gain.setValueAtTime(0.0001, now)
          g.gain.linearRampToValueAtTime(0.18, now + 0.01)
          o.start(now)
          g.gain.linearRampToValueAtTime(0.0001, now + beepMs / 1000)
          o.stop(now + beepMs / 1000 + 0.02)
          setTimeout(() => { try { ctx.close() } catch {} }, beepMs + 200)
        } catch (e) {}
      }

      // play first group immediately and schedule repeating groups
      let elapsed = 0
      function playGroup() {
        for (let i = 0; i < 4; i++) {
          setTimeout(playSingleBeep, i * (beepMs + intraGap))
        }
      }

      playGroup()
      elapsed += groupInterval
      const intervalId = window.setInterval(() => {
        playGroup()
        elapsed += groupInterval
        if (elapsed >= durationMs) {
          window.clearInterval(intervalId)
        }
      }, groupInterval)

      // vibration pattern matching groups of 4 quick pulses
      try {
        if (navigator && 'vibrate' in navigator) {
          const pattern: number[] = []
          let acc = 0
          while (acc < durationMs) {
            // 4 quick pulses
            for (let i = 0; i < 4; i++) {
              pattern.push(beepMs)
              acc += beepMs
              if (acc >= durationMs) break
              if (i < 3) { pattern.push(intraGap); acc += intraGap }
            }
            if (acc >= durationMs) break
            const pause = Math.max(0, groupInterval - (4 * (beepMs + intraGap)))
            pattern.push(pause)
            acc += pause
          }
          try { navigator.vibrate(pattern) } catch (e) {}
        }
      } catch (e) {}
    } catch (e) {
      // ignore
    }
  }

  function showBrowserNotification() {
    try {
      if (!('Notification' in window)) return
      if (Notification.permission === 'granted') {
        new Notification('Timer finished', { body: timerSubject ? `Focus time for ${timerSubject} is up.` : 'Timer finished.' })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(p => {
          if (p === 'granted') new Notification('Timer finished', { body: timerSubject ? `Focus time for ${timerSubject} is up.` : 'Timer finished.' })
        })
      }
    } catch (e) {}
  }

  // watch for finish event
  useEffect(() => {
    const prev = prevRemainingRef.current
    if (prev != null && prev > 0 && remainingSeconds === 0) {
      if (soundEnabled) playFinishSound()
      if (notifyEnabled) showBrowserNotification()
    }
    prevRemainingRef.current = remainingSeconds
  }, [remainingSeconds, soundEnabled, notifyEnabled, timerSubject])

  function addSubject() {
    const s = subjectInput.trim()
    if (!s) return
    setSubjects(prev => Array.from(new Set([...prev, s])))
    setSubjectInput('')
  }

  function updateDayHours(index: number, hours: number) {
    setDays(d => d.map((x, i) => i === index ? { ...x, hours } : x))
  }

  function assignSubjectToDay(index: number, subject?: string) {
    setDays(d => d.map((x, i) => i === index ? { ...x, subject } : x))
  }

  function applyDefaultToAll() {
    setDays(DAY_NAMES.map(d => ({ day: d, hours: defaultHours })))
  }

  function startTimer() {
    // initialize remaining if it's zero
    const multiplier = timerUnit === 'hours' ? 3600 : 60
    setRemainingSeconds(prev => prev === 0 ? timerMinutesInput * multiplier : prev)
    setTimerRunning(true)
    setShowTimerModal(true)
  }

  function stopTimer() {
    setTimerRunning(false)
  }

  function resetTimer() {
    setTimerRunning(false)
    const multiplier = timerUnit === 'hours' ? 3600 : 60
    setRemainingSeconds(timerMinutesInput * multiplier)
  }

  const timerRemaining = remainingSeconds
  const mm = String(Math.floor(timerRemaining / 60)).padStart(2, '0')
  const ss = String(timerRemaining % 60).padStart(2, '0')

  return (
    <ToolLayout title="Study Planner" description="Flexible weekly study planner with per-day hours, subjects and a timer." tips={<div>Define subjects, set hours per day, and use the timer for focused sessions.</div>}>
      <Seo title="Study Planner" />
      <Card>
        <h3 className="font-semibold">Subjects</h3>
        <div className="mt-2 flex gap-2">
          <input value={subjectInput} onChange={e => setSubjectInput(e.target.value)} placeholder="Add subject (e.g., Chemistry)" className="w-full p-2 rounded-md border" />
          <Button onClick={addSubject}>Add</Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {subjects.map(s => (
            <div key={s} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{s}</div>
          ))}
        </div>

        <h3 className="font-semibold mt-4">Weekly Schedule</h3>
        <div className="mt-2 space-y-2">
          {days.map((d, i) => (
            <div key={d.day} className="flex items-center gap-3">
              <div className="w-16">{d.day}</div>
              <input type="number" value={d.hours} min={0} onChange={e => updateDayHours(i, Number(e.target.value))} className="w-24 p-2 rounded-md border" />
              <select value={d.subject || ''} onChange={e => assignSubjectToDay(i, e.target.value || undefined)} className="flex-1 p-2 rounded-md border">
                <option value="">-- Choose subject --</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <label className="text-sm">Default hours:</label>
          <input type="number" value={defaultHours} onChange={e => setDefaultHours(Number(e.target.value))} className="w-24 p-2 rounded-md border" />
          <Button variant="ghost" onClick={applyDefaultToAll}>Apply to all days</Button>
        </div>

        <h3 className="font-semibold mt-6">Focus Timer</h3>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
          <select value={timerSubject} onChange={e => setTimerSubject(e.target.value)} className="p-2 rounded-md border">
            <option value="">(No subject)</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="number" value={timerMinutesInput} min={1} onChange={e => setTimerMinutesInput(Number(e.target.value))} className="w-32 p-2 rounded-md border" />
          <select value={timerUnit} onChange={e => setTimerUnit(e.target.value as 'minutes' | 'hours') } className="p-2 rounded-md border w-28">
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
          <div className="flex gap-2">
            {!timerRunning ? <Button onClick={startTimer}>Start</Button> : <Button onClick={stopTimer}>Pause</Button>}
            <Button variant="ghost" onClick={resetTimer}>Reset</Button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)} /> Sound</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={notifyEnabled} onChange={e => setNotifyEnabled(e.target.checked)} /> Desktop notification</label>
        </div>

        <div className="mt-4 text-lg font-mono">{mm}:{ss} {timerSubject ? `— ${timerSubject}` : ''}</div>

        {showTimerModal && (
          <div
            onPointerDown={e => {
              pointerRef.current = { startX: e.clientX, startY: e.clientY, startLeft: modalPos.left, startTop: modalPos.top }
              ;(e.target as Element).setPointerCapture((e as any).pointerId)
            }}
            onPointerMove={e => {
              if (!pointerRef.current) return
              const dx = e.clientX - pointerRef.current.startX
              const dy = e.clientY - pointerRef.current.startY
              setModalPos({ left: pointerRef.current.startLeft + dx, top: pointerRef.current.startTop + dy })
            }}
            onPointerUp={e => { pointerRef.current = null; try { (e.target as Element).releasePointerCapture((e as any).pointerId) } catch {} }}
            style={{ position: 'fixed', left: modalPos.left, top: modalPos.top, zIndex: 60, width: 420 }}
            className="bg-white rounded-lg shadow-2xl p-6 border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Timer {timerSubject ? `— ${timerSubject}` : ''}</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowTimerModal(false)} className="text-sm text-slate-500">Minimize</button>
                <button onClick={() => { setShowTimerModal(false); setTimerRunning(false) }} className="text-sm text-rose-600">Close</button>
              </div>
            </div>
            <div className="text-4xl font-mono text-center">{mm}:{ss}</div>
            <div className="mt-4 flex justify-center gap-3">
              {!timerRunning ? <Button onClick={startTimer}>Start/Resume</Button> : <Button onClick={stopTimer}>Pause</Button>}
              <Button variant="ghost" onClick={resetTimer}>Reset</Button>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  )
}
