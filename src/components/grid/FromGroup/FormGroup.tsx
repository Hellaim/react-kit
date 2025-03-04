import s from './FromGroup.module.css'
import clsx from 'clsx'

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export function FormGroup({
  className,
  direction = 'column',
  children,
  ...props
}: FormGroupProps) {
  return (
    <div className={clsx(s['form-group'], s[direction], className)} {...props}>
      {children}
    </div>
  )
}
