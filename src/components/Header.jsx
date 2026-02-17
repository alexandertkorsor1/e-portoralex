import { useNavigate } from 'react-router-dom'

export default function Header({ role, onMenuToggle }) {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'User'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle}>☰</button>
        <div>
          <h2>Foya Free Pentecostal Mission High School</h2>
          <span className="breadcrumb">Welcome back, {userName} 👋</span>
        </div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" onClick={() => navigate(`/${role}/notifications`)}>
          🔔
          <span className="notif-dot"></span>
        </button>
        <div className="header-user" onClick={() => navigate(`/${role}/profile`)}>
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">{role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
