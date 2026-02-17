import './Attendance.css'

export default function Attendance() {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
  const attendanceData = [
    { month: 'Sep', present: 22, absent: 1, late: 1, total: 24 },
    { month: 'Oct', present: 20, absent: 2, late: 0, total: 22 },
    { month: 'Nov', present: 19, absent: 1, late: 2, total: 22 },
    { month: 'Dec', present: 15, absent: 0, late: 1, total: 16 },
    { month: 'Jan', present: 21, absent: 1, late: 0, total: 22 },
    { month: 'Feb', present: 14, absent: 0, late: 1, total: 15 },
  ]

  const totalPresent = attendanceData.reduce((s, d) => s + d.present, 0)
  const totalAbsent = attendanceData.reduce((s, d) => s + d.absent, 0)
  const totalLate = attendanceData.reduce((s, d) => s + d.late, 0)
  const totalDays = attendanceData.reduce((s, d) => s + d.total, 0)
  const percentage = Math.round((totalPresent / totalDays) * 100)

  return (
    <div>
      <div className="page-header">
        <h1>✅ Attendance</h1>
        <p>Track your daily attendance record</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Present</h4>
            <div className="stat-value">{totalPresent}</div>
            <div className="stat-change positive">days</div>
          </div>
        </div>
        <div className="stat-card danger animate-in">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h4>Absent</h4>
            <div className="stat-value">{totalAbsent}</div>
            <div className="stat-change negative">days</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <h4>Late</h4>
            <div className="stat-value">{totalLate}</div>
            <div className="stat-change">days</div>
          </div>
        </div>
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Overall</h4>
            <div className="stat-value">{percentage}%</div>
            <div className="stat-change positive">attendance rate</div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="card-header">
          <h3>Monthly Attendance Overview</h3>
        </div>
        <div className="attendance-chart">
          {attendanceData.map((d) => (
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

      {/* Detail Table */}
      <div className="card">
        <div className="card-header">
          <h3>Monthly Breakdown</h3>
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
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((d) => (
                <tr key={d.month}>
                  <td style={{ fontWeight: 600 }}>{d.month} 2025</td>
                  <td>{d.total}</td>
                  <td><span className="badge present">{d.present}</span></td>
                  <td><span className="badge absent">{d.absent}</span></td>
                  <td><span className="badge late">{d.late}</span></td>
                  <td style={{ fontWeight: 700 }}>{Math.round((d.present / d.total) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
