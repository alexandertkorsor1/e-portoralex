import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function FacultyDashboard() {
  const userName = localStorage.getItem('userName') || 'Faculty'
  const navigate = useNavigate()
  const [selectedClassTasks, setSelectedClassTasks] = useState(null)

  // All classes this faculty teaches
  const myClasses = [
    {
      id: 1, name: 'Mathematics', grade: '10A', students: 32, room: '204',
      conducted: 42, total: 48, icon: '📐',
      color: '#667eea',
      pendingTasks: [
        { task: 'Grade Mid-Term Papers', due: 'Feb 20, 2026', urgent: true, type: 'grading' },
        { task: 'Upload Chapter 8 Notes', due: 'Feb 22, 2026', urgent: false, type: 'lms' },
      ]
    },
    {
      id: 2, name: 'Mathematics', grade: '11B', students: 28, room: '301',
      conducted: 38, total: 44, icon: '📐',
      color: '#764ba2',
      pendingTasks: [
        { task: 'Prepare Chapter 3 Quiz', due: 'Feb 22, 2026', urgent: false, type: 'quiz' },
        { task: 'Submit Progress Report', due: 'Mar 1, 2026', urgent: false, type: 'report' },
      ]
    },
    {
      id: 3, name: 'Mathematics', grade: '9C', students: 35, room: '105',
      conducted: 45, total: 48, icon: '📐',
      color: '#11998e',
      pendingTasks: [
        { task: 'Grade Homework Set 5', due: 'Feb 19, 2026', urgent: true, type: 'grading' },
      ]
    },
    {
      id: 4, name: 'Mathematics', grade: '12A', students: 22, room: '401',
      conducted: 40, total: 44, icon: '📐',
      color: '#f093fb',
      pendingTasks: [
        { task: 'Upload Final Exam Prep Material', due: 'Feb 25, 2026', urgent: false, type: 'lms' },
        { task: 'Grade Assignment 4', due: 'Feb 21, 2026', urgent: true, type: 'grading' },
        { task: 'Parent-Teacher Report', due: 'Mar 1, 2026', urgent: false, type: 'report' },
      ]
    },
    {
      id: 5, name: 'Mathematics', grade: '10B', students: 30, room: '206',
      conducted: 44, total: 48, icon: '📐',
      color: '#fa709a',
      pendingTasks: []
    },
  ]

  // Today's timetable
  const todaySchedule = [
    { time: '08:00 - 09:30', class: 'Mathematics — Grade 10A', room: '204', period: 'double', status: 'completed', topic: 'Quadratic Equations' },
    { time: '09:45 - 10:30', class: 'Mathematics — Grade 11B', room: '301', period: 'single', status: 'completed', topic: 'Trigonometry Review' },
    { time: '10:45 - 12:15', class: 'Mathematics — Grade 9C', room: '105', period: 'double', status: 'ongoing', topic: 'Statistics & Probability' },
    { time: '12:30 - 13:15', class: 'Free Period', room: '—', period: 'single', status: 'upcoming', topic: '—' },
    { time: '13:30 - 14:15', class: 'Mathematics — Grade 12A', room: '401', period: 'single', status: 'upcoming', topic: 'Calculus - Integration' },
  ]

  // Full week timetable
  const weekTimetable = [
    { day: 'Monday', classes: 5, periods: ['10A', '11B', '9C', 'Free', '12A'] },
    { day: 'Tuesday', classes: 4, periods: ['12A', '10B', '10A', '11B'] },
    { day: 'Wednesday', classes: 5, periods: ['9C', '10B', '11B', '12A', '10A'] },
    { day: 'Thursday', classes: 4, periods: ['10A', '9C', 'Free', '10B'] },
    { day: 'Friday', classes: 3, periods: ['11B', '12A', '9C'] },
  ]

  // Totals
  const totalStudents = myClasses.reduce((sum, c) => sum + c.students, 0)
  const totalConducted = myClasses.reduce((sum, c) => sum + c.conducted, 0)
  const totalScheduled = myClasses.reduce((sum, c) => sum + c.total, 0)
  const conductedPercent = Math.round((totalConducted / totalScheduled) * 100)
  const totalPending = myClasses.reduce((sum, c) => sum + c.pendingTasks.length, 0)
  const urgentTasks = myClasses.reduce((sum, c) => sum + c.pendingTasks.filter(t => t.urgent).length, 0)

  const getStatusStyle = (status) => {
    if (status === 'completed') return { bg: 'rgba(46, 213, 115, 0.12)', color: '#2ed573', label: '✅ Done' }
    if (status === 'ongoing') return { bg: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', label: '🔴 Now' }
    return { bg: 'rgba(255, 165, 2, 0.1)', color: '#ffa502', label: '⏳ Next' }
  }

  const getTaskIcon = (type) => {
    if (type === 'grading') return '📝'
    if (type === 'lms') return '📚'
    if (type === 'quiz') return '🎯'
    return '📋'
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>👨‍🏫 Faculty Dashboard</h1>
        <p>Welcome, {userName}! Here's your overview for today.</p>
      </div>

      {/* ===== Overview Stats ===== */}
      <div className="stats-grid">
        <div className="stat-card accent animate-in">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h4>Total Students</h4>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-change positive">Across {myClasses.length} classes</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h4>My Classes</h4>
            <div className="stat-value">{myClasses.length}</div>
            <div className="stat-change">This semester</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Classes Conducted</h4>
            <div className="stat-value">{totalConducted}/{totalScheduled}</div>
            <div className="stat-change positive">{conductedPercent}% completed</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h4>Pending Tasks</h4>
            <div className="stat-value">{totalPending}</div>
            <div className="stat-change negative">{urgentTasks} urgent</div>
          </div>
        </div>
      </div>

      {/* ===== Today's Schedule ===== */}
      <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
        <h3>📅 Today's Schedule — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h3>
      </div>

      <div className="today-schedule-list">
        {todaySchedule.map((slot, idx) => {
          const st = getStatusStyle(slot.status)
          return (
            <div key={idx} className={`schedule-slot ${slot.status}`}>
              <div className="slot-time">
                <span className="time-text">{slot.time}</span>
                <span className={`period-tag ${slot.period}`}>
                  {slot.period === 'double' ? '🔁 Double' : '▪️ Single'}
                </span>
              </div>
              <div className="slot-details">
                <h4>{slot.class}</h4>
                <p>📍 Room {slot.room} • 📖 {slot.topic}</p>
              </div>
              <div className="slot-status" style={{ background: st.bg, color: st.color }}>
                {st.label}
              </div>
            </div>
          )
        })}
      </div>

      <div className="fac-content-grid">
        {/* ===== My Classes — Attendance Overview ===== */}
        <div className="card">
          <div className="card-header">
            <h3>📊 My Classes — Attendance Overview</h3>
          </div>
          <div className="fac-class-list">
            {myClasses.map((cls) => {
              const rate = Math.round((cls.conducted / cls.total) * 100)
              return (
                <div key={cls.id} className="fac-class-card" style={{ borderLeft: `4px solid ${cls.color}` }}>
                  <div className="fac-class-info">
                    <div className="fac-class-name">
                      <span className="fac-class-icon" style={{ background: cls.color }}>{cls.icon}</span>
                      <div>
                        <h4>{cls.name} — Grade {cls.grade}</h4>
                        <span className="fac-class-meta">Room {cls.room} • {cls.students} students</span>
                      </div>
                    </div>
                    <div className="fac-class-stats">
                      <div className="fac-conducted">
                        <span className="fac-conducted-num">{cls.conducted}</span>
                        <span className="fac-conducted-label">/ {cls.total} conducted</span>
                      </div>
                      <div className="fac-progress-mini">
                        <div className="fac-progress-bar">
                          <div className="fac-progress-fill" style={{ width: `${rate}%`, background: cls.color }} />
                        </div>
                        <span style={{ color: cls.color, fontWeight: 700, fontSize: '0.8rem' }}>{rate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="fac-class-actions">
                    <button className="fac-action-btn" onClick={() => navigate('/faculty/attendance')}>
                      ✅ Take Attendance
                    </button>
                    {cls.pendingTasks.length > 0 && (
                      <span className="fac-task-badge">{cls.pendingTasks.length} tasks</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ===== Week Timetable Overview ===== */}
        <div className="card">
          <div className="card-header">
            <h3>🗓️ Weekly Timetable Overview</h3>
          </div>
          <div className="week-overview">
            {weekTimetable.map((day) => (
              <div key={day.day} className="week-day-row">
                <div className="week-day-name">{day.day}</div>
                <div className="week-day-periods">
                  {day.periods.map((p, i) => (
                    <span key={i} className={`week-period-chip ${p === 'Free' ? 'free' : ''}`}>
                      {p === 'Free' ? '☕ Free' : p}
                    </span>
                  ))}
                </div>
                <div className="week-day-count">{day.classes} classes</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Pending Tasks Per Class ===== */}
      <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
        <h3>📋 Pending Tasks — Click a class to view</h3>
      </div>

      <div className="task-class-selector">
        {myClasses.map((cls) => (
          <button
            key={cls.id}
            className={`task-class-btn ${selectedClassTasks === cls.id ? 'active' : ''}`}
            onClick={() => setSelectedClassTasks(selectedClassTasks === cls.id ? null : cls.id)}
            style={{ '--cls-color': cls.color }}
          >
            {cls.icon} Grade {cls.grade}
            {cls.pendingTasks.length > 0 && (
              <span className="task-count-badge">{cls.pendingTasks.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Expanded Task List */}
      {selectedClassTasks && (() => {
        const cls = myClasses.find(c => c.id === selectedClassTasks)
        if (!cls) return null
        return (
          <div className="task-expanded-list animate-in">
            <div className="task-expanded-header" style={{ borderColor: cls.color }}>
              <h4>{cls.name} — Grade {cls.grade}</h4>
              <span>{cls.pendingTasks.length} pending task{cls.pendingTasks.length !== 1 ? 's' : ''}</span>
            </div>
            {cls.pendingTasks.length === 0 ? (
              <div className="empty-state">🎉 No pending tasks! All caught up.</div>
            ) : (
              cls.pendingTasks.map((t, idx) => (
                <div key={idx} className={`task-item ${t.urgent ? 'urgent' : ''}`}>
                  <div className="task-item-icon">{getTaskIcon(t.type)}</div>
                  <div className="task-item-info">
                    <h4>{t.task}</h4>
                    <span>Due: {t.due}</span>
                  </div>
                  {t.urgent && <span className="urgent-badge">⚡ Urgent</span>}
                </div>
              ))
            )}
          </div>
        )
      })()}

      {/* ===== Quick Actions ===== */}
      <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
        <h3>⚡ Quick Actions</h3>
      </div>

      <div className="quick-actions-grid">
        <button className="quick-action-card" onClick={() => navigate('/faculty/attendance')}>
          <span className="qa-icon">✅</span>
          <span>Take Attendance</span>
        </button>
        <button className="quick-action-card" onClick={() => navigate('/faculty/marks')}>
          <span className="qa-icon">📝</span>
          <span>Enter Marks</span>
        </button>
        <button className="quick-action-card" onClick={() => navigate('/faculty/lms')}>
          <span className="qa-icon">📚</span>
          <span>Upload Material</span>
        </button>
        <button className="quick-action-card" onClick={() => navigate('/faculty/timetable')}>
          <span className="qa-icon">🗓️</span>
          <span>My Timetable</span>
        </button>
      </div>
    </div>
  )
}
