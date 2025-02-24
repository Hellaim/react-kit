import s from './Container.module.css'
import clsx from 'clsx'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={clsx(s.container, className)} {...props}>
      {children}
    </div>
  )
}
