import { Outlet } from 'react-router-dom'
import { Header } from './components/layout'

export function Layout() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
