import { Outlet } from 'react-router'
import Header from '@/components/blocks/Header'

export default function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Outlet />
    </div>
  )
}
