import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = 'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-transform'
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-[1.01] hover:brightness-105',
    ghost: 'bg-transparent text-slate-800 border border-slate-200 hover:bg-slate-50'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
