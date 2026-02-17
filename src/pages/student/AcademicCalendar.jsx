import { useState } from 'react'
import './AcademicCalendar.css'

export default function AcademicCalendar() {
  const [currentMonth, setCurrentMonth] = useState(1) // Feb 2026 (0-indexed month = 1)
  const [currentYear] = useState(2026)

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const events = {
    '2026-01-06': { type: 'event', label: 'School Reopens' },
    '2026-01-26': { type: 'holiday', label: 'Republic Day' },
    '2026-02-14': { type: 'event', label: 'Valentine Charity' },
    '2026-02-17': { type: 'event', label: 'Science Fair' },
    '2026-03-01': { type: 'event', label: 'Parent-Teacher Meeting' },
    '2026-03-03': { type: 'event', label: 'Classes Resume' },
    '2026-03-05': { type: 'event', label: 'Mid-Term Exams Start' },
    '2026-03-15': { type: 'event', label: 'Mid-Term Exams End' },
    '2026-03-20': { type: 'event', label: 'Sports Day' },
    '2026-04-01': { type: 'holiday', label: 'April Break Begins' },
    '2026-04-14': { type: 'holiday', label: 'April Break Ends' },
    '2026-05-01': { type: 'holiday', label: 'Labour Day' },
    '2026-05-15': { type: 'event', label: 'Final Exams Start' },
    '2026-05-30': { type: 'event', label: 'Final Exams End' },
    '2026-06-15': { type: 'event', label: 'Graduation Ceremony' },
    '2026-06-20': { type: 'holiday', label: 'Summer Break Begins' },
  }

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const today = new Date()

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const prevMonth = () => setCurrentMonth(m => m === 0 ? 11 : m - 1)
  const nextMonth = () => setCurrentMonth(m => m === 11 ? 0 : m + 1)

  const getEventForDay = (day) => {
    if (!day) return null
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events[dateStr] || null
  }

  const isToday = (day) => {
    return day && today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  // Events for current month
  const monthEvents = Object.entries(events)
    .filter(([date]) => {
      const d = new Date(date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })
    .sort(([a], [b]) => new Date(a) - new Date(b))

  return (
    <div>
      <div className="page-header">
        <h1>📅 Academic Calendar</h1>
        <p>Important dates and school events for the academic year</p>
      </div>

      <div className="content-grid">
        {/* Calendar */}
        <div className="card">
          <div className="card-header">
            <button
              onClick={prevMonth}
              style={{
                padding: '6px 14px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg)', fontSize: '0.9rem', fontWeight: 600,
              }}
            >
              ←
            </button>
            <h3>{months[currentMonth]} {currentYear}</h3>
            <button
              onClick={nextMonth}
              style={{
                padding: '6px 14px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg)', fontSize: '0.9rem', fontWeight: 600,
              }}
            >
              →
            </button>
          </div>

          <div className="calendar-grid">
            {dayNames.map(d => (
              <div key={d} className="cal-header">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              const event = getEventForDay(day)
              let className = 'cal-day'
              if (!day) className += ' empty'
              else if (isToday(day)) className += ' today'
              else if (event?.type === 'holiday') className += ' holiday'
              else if (event?.type === 'event') className += ' event'
              return (
                <div
                  key={idx}
                  className={className}
                  title={event?.label || ''}
                >
                  {day}
                </div>
              )
            })}
          </div>

          <div style={{
            display: 'flex', gap: 'var(--sp-lg)', justifyContent: 'center',
            marginTop: 'var(--sp-lg)', flexWrap: 'wrap'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--accent)', display: 'inline-block' }} /> Today
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(52, 152, 219, 0.2)', display: 'inline-block' }} /> Event
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
              <span style={{ width: 14, height: 14, borderRadius: 4, background: 'rgba(231, 76, 60, 0.2)', display: 'inline-block' }} /> Holiday
            </span>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="card">
          <div className="card-header">
            <h3>📋 Events This Month</h3>
          </div>
          {monthEvents.length > 0 ? (
            <div className="notif-list">
              {monthEvents.map(([dateStr, evt]) => {
                const d = new Date(dateStr)
                return (
                  <div key={dateStr} className="notif-item">
                    <div className={`notif-icon ${evt.type === 'holiday' ? 'danger' : 'info'}`}>
                      {evt.type === 'holiday' ? '🏖️' : '📌'}
                    </div>
                    <div className="notif-body">
                      <h4>{evt.label}</h4>
                      <span className="notif-time">
                        {d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <span className={`badge ${evt.type === 'holiday' ? 'absent' : 'info'}`}>
                      {evt.type === 'holiday' ? 'Holiday' : 'Event'}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No events this month</h3>
              <p>Navigate to another month to see events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
