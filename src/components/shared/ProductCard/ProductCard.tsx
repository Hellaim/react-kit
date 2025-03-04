import s from './ProductCard.module.css'
import clsx from 'clsx'

interface ProductCartProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  title: string
  description?: string
  price: number
  count?: number
}

export function ProductCard({
  className,
  children,
  title,
  description,
  price,
  count,
  ...props
}: ProductCartProps) {
  return (
    <div className={clsx(s.cart, className)} {...props}>
      <div className={s.title}>{title}</div>
      {description && <div className={s.description}>{description}</div>}
      <div className={s.price}>Цена: {price}</div>
      {count && <div className={s.count}>В наличии: {count}</div>}
      {children}
    </div>
  )
}
