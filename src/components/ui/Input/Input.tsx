import { type InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'
import s from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={clsx(s.input, className)} {...props} />
  },
)

Input.displayName = 'Input'
