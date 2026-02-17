import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Student'

  const quickLinks = [
    { icon: '📚', label: 'LMS', path: '/student/lms', color: 'info' },
    { icon: '💰', label: 'Fees', path: '/student/fees', color: 'warning' },
    { icon: '✅', label: 'Attendance', path: '/student/attendance', color: 'success' },
    { icon: '🗓️', label: 'Timetable', path: '/student/timetable', color: 'accent' },
    { icon: '📝', label: 'Exam Result', path: '/student/exam-result', color: 'danger' },
    { icon: '🎯', label: 'Quiz Mark', path: '/student/quiz-mark', color: 'info' },
  ]

  return (
    <div>
      {/* Hero Banner with School Photo */}
      <div className="dashboard-hero">
        <img src="/school-photo.jpg" alt="Foya Free Pentecostal Mission High School" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Foya Free Pentecostal Mission High School</h1>
          <p className="hero-subtitle">Empowering minds, shaping futures — Welcome, {userName}!</p>
        </div>
      </div>

      <div className="page-header" style={{ marginTop: 'var(--sp-lg)' }}>
        <h1>Dashboard</h1>
        <p>Here's your academic overview.</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Attendance</h4>
            <div className="stat-value">92%</div>
            <div className="stat-change positive">↑ 3% this month</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h4>Fees Status</h4>
            <div className="stat-value">Paid</div>
            <div className="stat-change positive">All cleared</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h4>Upcoming Exams</h4>
            <div className="stat-value">3</div>
            <div className="stat-change">Next: March 5</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h4>Notifications</h4>
            <div className="stat-value">5</div>
            <div className="stat-change negative">2 unread</div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="card-header">
          <h3>Quick Access</h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 'var(--sp-md)'
        }}>
          {quickLinks.map((link) => (
            <div
              key={link.label}
              onClick={() => navigate(link.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: 'var(--sp-lg) var(--sp-md)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                border: '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '2rem' }}>{link.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{link.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <h3>📢 Recent Announcements</h3>
          </div>
          <div className="notif-list">
            <div className="notif-item">
              <div className="notif-icon info">📋</div>
              <div className="notif-body">
                <h4>Mid-Term Exams Schedule Released</h4>
                <p>Check your timetable for the updated examination dates.</p>
                <span className="notif-time">2 hours ago</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon success">✅</div>
              <div className="notif-body">
                <h4>Fee Payment Deadline Extended</h4>
                <p>The deadline has been extended to March 15, 2026.</p>
                <span className="notif-time">1 day ago</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon warning">🏆</div>
              <div className="notif-body">
                <h4>Inter-School Science Competition</h4>
                <p>Register before February 28 to participate.</p>
                <span className="notif-time">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>📅 Upcoming Schedule</h3>
          </div>
          <div className="notif-list">
            <div className="notif-item">
              <div className="notif-icon info">📖</div>
              <div className="notif-body">
                <h4>Mathematics — Chapter Test</h4>
                <p>Chapters 5-7 • Room 204</p>
                <span className="notif-time">Tomorrow, 9:00 AM</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon success">🧪</div>
              <div className="notif-body">
                <h4>Science Lab — Practical</h4>
                <p>Chemistry experiment • Lab 3</p>
                <span className="notif-time">Feb 20, 11:00 AM</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon warning">🎨</div>
              <div className="notif-body">
                <h4>Art Exhibition Submission</h4>
                <p>Submit your art piece by end of day</p>
                <span className="notif-time">Feb 25, All Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
