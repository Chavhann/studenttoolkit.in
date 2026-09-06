import React from 'react'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-transparent border-t-indigo-600" />
    </div>
  )
}
