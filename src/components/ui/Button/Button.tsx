import s from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  ref?: React.RefObject<HTMLButtonElement>
}

export function Button({ className, children, ref, ...props }: ButtonProps) {
  return (
    <button ref={ref} className={clsx(s.btn, className)} {...props}>
      {children}
    </button>
  )
}
