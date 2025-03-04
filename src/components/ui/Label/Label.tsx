import s from './Label.module.css'
import clsx from 'clsx'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  required?: boolean
  error?: string
}

export function Label({
  className,
  htmlFor,
  required,
  error,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(s.label, error ? s.errorMessage : s.normalText, className)}
      {...props}
    >
      {children}
      {required && <span className={s.required}>*</span>}
      {/* Звездочка для обязательных полей */}
    </label>
  )
}
