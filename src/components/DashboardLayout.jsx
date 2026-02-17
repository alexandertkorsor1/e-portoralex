import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'

export default function DashboardLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard">
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="main-content">
        <Header
          role={role}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
