import { NavLink, useLocation } from 'react-router-dom'

const studentLinks = [
  { to: '/student', icon: '📊', label: 'Dashboard', exact: true },
  { section: 'Academics' },
  { to: '/student/lms', icon: '📚', label: 'LMS' },
  { to: '/student/timetable', icon: '🗓️', label: 'Timetable' },
  { to: '/student/attendance', icon: '✅', label: 'Attendance' },
  { to: '/student/exam-result', icon: '📝', label: 'Exam Result' },
  { to: '/student/quiz-mark', icon: '🎯', label: 'Quiz Mark' },
  { to: '/student/monitor', icon: '👩‍🎓', label: 'Class Monitor' },
  { section: 'Finance' },
  { to: '/student/fees', icon: '💰', label: 'Fees' },
  { section: 'Information' },
  { to: '/student/notifications', icon: '🔔', label: 'Notifications', badge: 3 },
  { to: '/student/announcement', icon: '📢', label: 'Announcement' },
  { to: '/student/academic-calendar', icon: '📅', label: 'Academic Calendar' },
  { to: '/student/certificate', icon: '🎓', label: 'Certificate' },
]

const facultyLinks = [
  { to: '/faculty', icon: '📊', label: 'Dashboard', exact: true },
  { section: 'Academic Management' },
  { to: '/faculty/marks', icon: '📝', label: 'Marks Entry' },
  { to: '/faculty/attendance', icon: '✅', label: 'Attendance' },
  { to: '/faculty/lms', icon: '📚', label: 'LMS Upload' },
  { to: '/faculty/timetable', icon: '🗓️', label: 'My Timetable' },
]

export default function Sidebar({ role, isOpen, onClose }) {
  const location = useLocation()
  const links = role === 'faculty' ? facultyLinks : studentLinks
  const userName = localStorage.getItem('userName') || 'User'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    window.location.href = '/'
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo" className="brand-icon-img" />
          <div className="brand-text">
            <h2>FFPMHS</h2>
            <span>E-Portal</span>
          </div>
        </div>

        <div className="sidebar-user-profile">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-status">
              <span className="status-dot"></span>
              Is there
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map((item, idx) => {
            if (item.section) {
              return (
                <div key={`section-${idx}`} className="nav-section-title">
                  {item.section}
                </div>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
