import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import { ThemeToggle } from '@/components/shared'

export function Header() {
  return (
    <header className={s.header}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/demo">Demo</NavLink>
      <NavLink to="/form-page">FormPage</NavLink>
      <NavLink to="/cart">Card</NavLink>
      <ThemeToggle />
    </header>
  )
}
