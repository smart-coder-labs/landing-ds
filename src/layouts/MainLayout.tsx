import { Outlet } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import { useTheme } from '../hooks/useTheme'

export default function MainLayout() {
  useTheme()

  return (
    <div className="min-h-screen bg-background-primary text-text-primary overflow-hidden">
      <SiteNav landingMode />
      <Outlet />
    </div>
  )
}
