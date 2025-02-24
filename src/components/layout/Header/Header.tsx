import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

export function Header() {
  return (
    <header className={s.header}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/demo">Demo</NavLink>
    </header>
  )
}
