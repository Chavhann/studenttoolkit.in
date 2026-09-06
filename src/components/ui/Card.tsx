import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass border border-white/60 shadow-md rounded-xl p-6 ${className}`}>{children}</div>
  )
}
