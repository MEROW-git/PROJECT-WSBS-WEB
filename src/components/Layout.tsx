import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}
