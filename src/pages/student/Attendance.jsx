import { useState } from 'react'
import './Attendance.css'

export default function Attendance() {
  const [selectedDay, setSelectedDay] = useState(null)

  // Daily class schedule with period info
  const weeklySchedule = [
    {
      day: 'Monday', date: 'Feb 17, 2026',
      classes: [
        { subject: 'Mathematics', time: '08:00 - 09:30', period: 'double', status: 'present' },
        { subject: 'English', time: '09:45 - 10:30', period: 'single', status: 'present' },
        { subject: 'Science', time: '10:45 - 12:15', period: 'double', status: 'present' },
        { subject: 'History', time: '12:30 - 13:15', period: 'single', status: 'late' },
        { subject: 'Geography', time: '13:30 - 14:15', period: 'single', status: 'present' },
      ]
    },
    {
      day: 'Tuesday', date: 'Feb 18, 2026',
      classes: [
        { subject: 'English', time: '08:00 - 09:30', period: 'double', status: 'present' },
        { subject: 'Mathematics', time: '09:45 - 10:30', period: 'single', status: 'present' },
        { subject: 'Creative Arts', time: '10:45 - 12:15', period: 'double', status: 'absent' },
        { subject: 'Science', time: '12:30 - 13:15', period: 'single', status: 'present' },
      ]
    },
    {
      day: 'Wednesday', date: 'Feb 19, 2026',
      classes: [
        { subject: 'Science', time: '08:00 - 09:30', period: 'double', status: 'present' },
        { subject: 'Geography', time: '09:45 - 10:30', period: 'single', status: 'present' },
        { subject: 'History', time: '10:45 - 11:30', period: 'single', status: 'present' },
        { subject: 'Mathematics', time: '11:45 - 13:15', period: 'double', status: 'present' },
        { subject: 'English', time: '13:30 - 14:15', period: 'single', status: 'present' },
      ]
    },
    {
      day: 'Thursday', date: 'Feb 20, 2026',
      classes: [
        { subject: 'History', time: '08:00 - 09:30', period: 'double', status: 'present' },
        { subject: 'Creative Arts', time: '09:45 - 10:30', period: 'single', status: 'present' },
        { subject: 'Mathematics', time: '10:45 - 11:30', period: 'single', status: 'present' },
        { subject: 'English', time: '11:45 - 13:15', period: 'double', status: 'late' },
      ]
    },
    {
      day: 'Friday', date: 'Feb 21, 2026',
      classes: [
        { subject: 'Geography', time: '08:00 - 09:30', period: 'double', status: 'present' },
        { subject: 'Science', time: '09:45 - 10:30', period: 'single', status: 'present' },
        { subject: 'Creative Arts', time: '10:45 - 12:15', period: 'double', status: 'present' },
        { subject: 'Mathematics', time: '12:30 - 13:15', period: 'single', status: 'absent' },
      ]
    },
  ]

  // Monthly attendance data
  const monthlyData = [
    { month: 'Sep', present: 22, absent: 1, late: 1, total: 24 },
    { month: 'Oct', present: 20, absent: 2, late: 0, total: 22 },
    { month: 'Nov', present: 19, absent: 1, late: 2, total: 22 },
    { month: 'Dec', present: 15, absent: 0, late: 1, total: 16 },
    { month: 'Jan', present: 21, absent: 1, late: 0, total: 22 },
    { month: 'Feb', present: 14, absent: 0, late: 1, total: 15 },
  ]

  // Calculate percentage per class: double = 1.1%, single = 0.06%
  const DOUBLE_PERIOD_WEIGHT = 1.1
  const SINGLE_PERIOD_WEIGHT = 0.06

  // Flatten all classes
  const allClasses = weeklySchedule.flatMap(day => day.classes)
  const totalClasses = allClasses.length
  const attendedClasses = allClasses.filter(c => c.status === 'present' || c.status === 'late').length
  const missedClasses = allClasses.filter(c => c.status === 'absent').length
  const lateClasses = allClasses.filter(c => c.status === 'late').length

  // Calculate weighted attendance %
  const totalWeightedPoints = allClasses.reduce((sum, c) => {
    return sum + (c.period === 'double' ? DOUBLE_PERIOD_WEIGHT : SINGLE_PERIOD_WEIGHT)
  }, 0)

  const earnedWeightedPoints = allClasses.reduce((sum, c) => {
    if (c.status === 'present') return sum + (c.period === 'double' ? DOUBLE_PERIOD_WEIGHT : SINGLE_PERIOD_WEIGHT)
    if (c.status === 'late') return sum + (c.period === 'double' ? DOUBLE_PERIOD_WEIGHT * 0.75 : SINGLE_PERIOD_WEIGHT * 0.75)
    return sum
  }, 0)

  const weightedPercentage = ((earnedWeightedPoints / totalWeightedPoints) * 100).toFixed(1)
  const attendedPercent = ((attendedClasses / totalClasses) * 100).toFixed(1)
  const missedPercent = ((missedClasses / totalClasses) * 100).toFixed(1)

  // Monthly totals
  const totalPresent = monthlyData.reduce((s, d) => s + d.present, 0)
  const totalAbsent = monthlyData.reduce((s, d) => s + d.absent, 0)
  const totalLate = monthlyData.reduce((s, d) => s + d.late, 0)
  const totalDays = monthlyData.reduce((s, d) => s + d.total, 0)
  const overallPercentage = Math.round((totalPresent / totalDays) * 100)

  const getStatusColor = (status) => {
    if (status === 'present') return 'var(--success)'
    if (status === 'absent') return 'var(--danger)'
    return 'var(--warning)'
  }

  const getStatusIcon = (status) => {
    if (status === 'present') return '✅'
    if (status === 'absent') return '❌'
    return '⏰'
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>✅ Attendance Tracker</h1>
        <p>Track your daily class attendance, periods, and overall performance</p>
      </div>

      {/* ===== Summary Stats ===== */}
      <div className="stats-grid">
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Classes Attended</h4>
            <div className="stat-value">{attendedClasses}</div>
            <div className="stat-change positive">{attendedPercent}% of all classes</div>
          </div>
        </div>
        <div className="stat-card danger animate-in">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h4>Classes Missed</h4>
            <div className="stat-value">{missedClasses}</div>
            <div className="stat-change negative">{missedPercent}% of all classes</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <h4>Late Arrivals</h4>
            <div className="stat-value">{lateClasses}</div>
            <div className="stat-change">counts as 75% credit</div>
          </div>
        </div>
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Weighted Score</h4>
            <div className="stat-value">{weightedPercentage}%</div>
            <div className="stat-change positive">double=1.1% • single=0.06%</div>
          </div>
        </div>
      </div>

      {/* ===== Attendance Ring ===== */}
      <div className="attendance-ring-section">
        <div className="ring-card card">
          <div className="ring-container">
            <svg viewBox="0 0 120 120" className="ring-svg">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="10" />
              <circle 
                cx="60" cy="60" r="52" fill="none" 
                stroke="url(#gradient)" strokeWidth="10" 
                strokeLinecap="round"
                strokeDasharray={`${(weightedPercentage / 100) * 327} 327`}
                transform="rotate(-90 60 60)"
                className="ring-progress"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--success)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ring-center-text">
              <span className="ring-percent">{weightedPercentage}%</span>
              <span className="ring-label">Weighted</span>
            </div>
          </div>
          <div className="ring-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--success)' }} />
              <span>Attended: <strong>{attendedClasses}</strong></span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--danger)' }} />
              <span>Missed: <strong>{missedClasses}</strong></span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--warning)' }} />
              <span>Late: <strong>{lateClasses}</strong></span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: 'var(--accent)' }} />
              <span>Total: <strong>{totalClasses}</strong></span>
            </div>
          </div>
        </div>

        {/* Period Weight Info */}
        <div className="period-info card">
          <h3>📖 How Attendance is Calculated</h3>
          <div className="weight-cards">
            <div className="weight-card double">
              <div className="weight-value">1.1%</div>
              <div className="weight-label">Double Period</div>
              <div className="weight-desc">80+ min class</div>
            </div>
            <div className="weight-card single">
              <div className="weight-value">0.06%</div>
              <div className="weight-label">Single Period</div>
              <div className="weight-desc">45 min class</div>
            </div>
          </div>
          <p className="weight-note">
            Late arrivals receive <strong>75%</strong> of the period's weight. 
            Absent = <strong>0%</strong>. Your weighted score reflects the importance of each class.
          </p>
        </div>
      </div>

      {/* ===== Daily Class Breakdown ===== */}
      <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
        <h3>📅 This Week — Daily Class Breakdown</h3>
      </div>

      <div className="daily-cards-grid">
        {weeklySchedule.map((day) => {
          const dayPresent = day.classes.filter(c => c.status === 'present').length
          const dayAbsent = day.classes.filter(c => c.status === 'absent').length
          const dayLate = day.classes.filter(c => c.status === 'late').length
          const dayTotal = day.classes.length
          const dayDouble = day.classes.filter(c => c.period === 'double').length
          const daySingle = day.classes.filter(c => c.period === 'single').length
          const dayRate = Math.round((dayPresent / dayTotal) * 100)
          const isSelected = selectedDay === day.day

          return (
            <div key={day.day}>
              <div 
                className={`day-card card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedDay(isSelected ? null : day.day)}
              >
                <div className="day-card-header">
                  <div>
                    <h4>{day.day}</h4>
                    <span className="day-date">{day.date}</span>
                  </div>
                  <div className="day-rate" style={{ color: dayRate >= 80 ? 'var(--success)' : dayRate >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                    {dayRate}%
                  </div>
                </div>
                <div className="day-stats-row">
                  <span className="day-stat">
                    <span className="day-stat-dot present" /> {dayPresent} Present
                  </span>
                  {dayAbsent > 0 && (
                    <span className="day-stat">
                      <span className="day-stat-dot absent" /> {dayAbsent} Absent
                    </span>
                  )}
                  {dayLate > 0 && (
                    <span className="day-stat">
                      <span className="day-stat-dot late" /> {dayLate} Late
                    </span>
                  )}
                </div>
                <div className="day-period-row">
                  <span>🔁 {dayDouble} Double</span>
                  <span>▪️ {daySingle} Single</span>
                  <span>📚 {dayTotal} Classes</span>
                </div>
                <div className="day-expand-hint">{isSelected ? '▲ Hide Classes' : '▼ View Classes'}</div>
              </div>

              {/* Expanded Class List */}
              {isSelected && (
                <div className="class-list animate-in">
                  {day.classes.map((cls, idx) => (
                    <div key={idx} className="class-item" style={{ borderLeft: `4px solid ${getStatusColor(cls.status)}` }}>
                      <div className="class-status-icon">{getStatusIcon(cls.status)}</div>
                      <div className="class-details">
                        <div className="class-subject">{cls.subject}</div>
                        <div className="class-time">{cls.time}</div>
                      </div>
                      <div className="class-badges">
                        <span className={`period-badge ${cls.period}`}>
                          {cls.period === 'double' ? '🔁 Double' : '▪️ Single'}
                        </span>
                        <span className="weight-badge">
                          {cls.period === 'double' ? '+1.1%' : '+0.06%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ===== Monthly Bar Chart ===== */}
      <div className="card" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-xl)' }}>
        <div className="card-header">
          <h3>📊 Monthly Attendance Trend</h3>
        </div>
        <div className="attendance-chart">
          {monthlyData.map((d) => (
            <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', height: '120px', justifyContent: 'flex-end', width: '100%' }}>
                <div className="bar present" style={{ height: `${(d.present / d.total) * 100}%` }} title={`Present: ${d.present}`} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{d.month}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-lg)', justifyContent: 'center', marginTop: 'var(--sp-md)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--success)', display: 'inline-block' }} /> Present
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--danger)', display: 'inline-block' }} /> Absent
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--warning)', display: 'inline-block' }} /> Late
          </span>
        </div>
      </div>

      {/* ===== Monthly Table ===== */}
      <div className="card">
        <div className="card-header">
          <h3>📋 Monthly Summary</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Days</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Attended %</th>
                <th>Missed %</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d) => {
                const rate = Math.round((d.present / d.total) * 100)
                const missRate = Math.round((d.absent / d.total) * 100)
                return (
                  <tr key={d.month}>
                    <td style={{ fontWeight: 600 }}>{d.month} 2025</td>
                    <td>{d.total}</td>
                    <td><span className="badge present">{d.present}</span></td>
                    <td><span className="badge absent">{d.absent}</span></td>
                    <td><span className="badge late">{d.late}</span></td>
                    <td style={{ fontWeight: 700, color: rate >= 80 ? 'var(--success)' : 'var(--danger)' }}>{rate}%</td>
                    <td style={{ fontWeight: 700, color: 'var(--danger)' }}>{missRate}%</td>
                  </tr>
                )
              })}
              <tr className="totals-row">
                <td style={{ fontWeight: 800 }}>Total</td>
                <td style={{ fontWeight: 700 }}>{totalDays}</td>
                <td><span className="badge present">{totalPresent}</span></td>
                <td><span className="badge absent">{totalAbsent}</span></td>
                <td><span className="badge late">{totalLate}</span></td>
                <td style={{ fontWeight: 800, color: 'var(--success)' }}>{overallPercentage}%</td>
                <td style={{ fontWeight: 800, color: 'var(--danger)' }}>{Math.round((totalAbsent / totalDays) * 100)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
