import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Attendance.css'

export default function FacultyAttendance() {
  const location = useLocation()
  const [selectedClass, setSelectedClass] = useState('10A')
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    if (location.state?.className) {
      setSelectedClass(location.state.className.includes('10A') ? '10A' : location.state.className.includes('11B') ? '11B' : '9C')
    }
  }, [location])

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  // Class conduct history
  const classHistory = {
    '10A': { conducted: 42, total: 48, thisWeek: 4, percentage: 88 },
    '11B': { conducted: 38, total: 44, thisWeek: 3, percentage: 86 },
    '9C':  { conducted: 45, total: 48, thisWeek: 5, percentage: 94 },
  }

  // Generate mock class-by-class history for a student
  const generateClassHistory = (student) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    const subjects = ['Mathematics']
    const records = []
    const totalClasses = student.totalClasses
    let absent = totalClasses - student.attended

    // Generate last several weeks
    for (let week = 6; week >= 0; week--) {
      for (let d = 0; d < 5; d++) {
        if (records.length >= totalClasses) break
        const weekDate = new Date()
        weekDate.setDate(weekDate.getDate() - (week * 7) - (4 - d))
        const dateStr = weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        
        // Distribute absences somewhat randomly
        let wasAbsent = false
        if (absent > 0 && Math.random() < (absent / (totalClasses - records.length + 1)) * 1.5) {
          wasAbsent = true
          absent--
        }

        records.push({
          date: dateStr,
          day: days[d],
          subject: subjects[0],
          period: d % 2 === 0 ? 'Double' : 'Single',
          time: d === 0 ? '08:00-09:30' : d === 1 ? '09:45-10:30' : d === 2 ? '10:45-12:15' : d === 3 ? '13:30-14:15' : '14:30-15:15',
          status: wasAbsent ? 'absent' : 'present',
        })
      }
    }
    return records.slice(-totalClasses)
  }

  // Students with individual attendance records
  const initialStudents = {
    '10A': [
      { id: 1, name: 'Alice Johnson', roll: '10A01', status: 'present', attended: 42, totalClasses: 42 },
      { id: 2, name: 'Bob Smith', roll: '10A02', status: 'present', attended: 40, totalClasses: 42 },
      { id: 3, name: 'Charlie Davis', roll: '10A03', status: 'absent', attended: 36, totalClasses: 42 },
      { id: 4, name: 'Diana Evans', roll: '10A04', status: 'present', attended: 42, totalClasses: 42 },
      { id: 5, name: 'Ethan Hunt', roll: '10A05', status: 'present', attended: 39, totalClasses: 42 },
      { id: 6, name: 'Fiona Gallagher', roll: '10A06', status: 'present', attended: 41, totalClasses: 42 },
      { id: 7, name: 'George Martin', roll: '10A07', status: 'present', attended: 38, totalClasses: 42 },
      { id: 8, name: 'Hannah White', roll: '10A08', status: 'present', attended: 42, totalClasses: 42 },
    ],
    '11B': [
      { id: 9, name: 'Isaac Newton', roll: '11B01', status: 'present', attended: 38, totalClasses: 38 },
      { id: 10, name: 'Jane Austen', roll: '11B02', status: 'present', attended: 35, totalClasses: 38 },
      { id: 11, name: 'Kevin Hart', roll: '11B03', status: 'present', attended: 37, totalClasses: 38 },
      { id: 12, name: 'Laura Palmer', roll: '11B04', status: 'absent', attended: 30, totalClasses: 38 },
      { id: 13, name: 'Mike Ross', roll: '11B05', status: 'present', attended: 38, totalClasses: 38 },
      { id: 14, name: 'Nancy Drew', roll: '11B06', status: 'present', attended: 36, totalClasses: 38 },
    ],
    '9C': [
      { id: 15, name: 'Oliver Queen', roll: '9C01', status: 'present', attended: 45, totalClasses: 45 },
      { id: 16, name: 'Penny Lane', roll: '9C02', status: 'present', attended: 43, totalClasses: 45 },
      { id: 17, name: 'Quinn Hughes', roll: '9C03', status: 'absent', attended: 40, totalClasses: 45 },
      { id: 18, name: 'Rachel Green', roll: '9C04', status: 'present', attended: 44, totalClasses: 45 },
      { id: 19, name: 'Sam Wilson', roll: '9C05', status: 'present', attended: 45, totalClasses: 45 },
      { id: 20, name: 'Tina Turner', roll: '9C06', status: 'present', attended: 42, totalClasses: 45 },
      { id: 21, name: 'Uma Patel', roll: '9C07', status: 'present', attended: 41, totalClasses: 45 },
    ],
  }
  
  const [students, setStudents] = useState(initialStudents['10A'])

  useEffect(() => {
    setStudents(initialStudents[selectedClass] || initialStudents['10A'])
  }, [selectedClass])

  const toggleAttendance = (e, id) => {
    e.stopPropagation()
    setStudents(students.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'present' ? 'absent' : 'present'
        const newAttended = newStatus === 'absent' ? s.attended - 1 : s.attended + 1
        return { ...s, status: newStatus, attended: Math.max(0, newAttended) }
      }
      return s
    }))
  }

  const getAttendancePercent = (s) => {
    const total = s.totalClasses + 1
    const attended = s.status === 'present' ? s.attended + 1 : s.attended
    return Math.round((attended / total) * 100)
  }

  const getPercentColor = (pct) => {
    if (pct >= 90) return 'var(--success)'
    if (pct >= 75) return 'var(--warning)'
    return 'var(--danger)'
  }

  const presentCount = students.filter(s => s.status === 'present').length
  const absentCount = students.length - presentCount
  const history = classHistory[selectedClass] || classHistory['10A']
  const sortedStudents = [...students].sort((a, b) => getAttendancePercent(a) - getAttendancePercent(b))

  // Student detail modal data
  const studentHistory = selectedStudent ? generateClassHistory(selectedStudent) : []
  const studentPresentCount = studentHistory.filter(r => r.status === 'present').length
  const studentAbsentCount = studentHistory.filter(r => r.status === 'absent').length

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>✅ Class Attendance</h1>
        <p>Click any student to view their full attendance record. Use the toggle to mark present/absent.</p>
      </div>

      <div className="marks-filters">
        <div className="filter-group">
            <label>Date</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
            />
        </div>
        <div className="filter-group">
            <label>Select Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="10A">Grade 10A</option>
                <option value="11B">Grade 11B</option>
                <option value="9C">Grade 9C</option>
            </select>
        </div>
      </div>

      {/* Conduct Stats */}
      <div className="conduct-stats">
        <div className="conduct-stat-box">
          <span className="conduct-label">Classes Conducted</span>
          <span className="conduct-value">{history.conducted} / {history.total}</span>
        </div>
        <div className="conduct-stat-box">
          <span className="conduct-label">This Week</span>
          <span className="conduct-value highlight">{history.thisWeek}</span>
        </div>
        <div className="conduct-stat-box">
          <span className="conduct-label">Conduct Rate</span>
          <span className="conduct-value" style={{ color: history.percentage >= 85 ? 'var(--success)' : 'var(--warning)' }}>
            {history.percentage}%
          </span>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
            <h3>{students.length}</h3>
            <span>Total Students</span>
        </div>
        <div className="stat-item" style={{ color: '#2ecc71' }}>
            <h3>{presentCount}</h3>
            <span>Present</span>
        </div>
        <div className="stat-item" style={{ color: '#e74c3c' }}>
            <h3>{absentCount}</h3>
            <span>Absent</span>
        </div>
        <div className="stat-item" style={{ color: '#6366f1' }}>
            <h3>{Math.round((presentCount / students.length) * 100)}%</h3>
            <span>Today's Rate</span>
        </div>
      </div>

      {/* Attendance Grid - Click card to view details, toggle button to mark */}
      <div className="attendance-grid">
        {students.map((student) => {
          const pct = getAttendancePercent(student)
          return (
            <div 
                key={student.id} 
                className={`student-card ${student.status}`}
                onClick={() => setSelectedStudent(student)}
            >
                <div style={{ fontSize: '2rem' }}>
                    {student.status === 'present' ? '🙋‍♂️' : '🏠'}
                </div>
                <h4>{student.name}</h4>
                <p>{student.roll}</p>
                <div className="student-pct-bar">
                  <div className="student-pct-fill" style={{ width: `${pct}%`, background: getPercentColor(pct) }} />
                </div>
                <div className="student-pct-label" style={{ color: getPercentColor(pct) }}>{pct}%</div>
                <button 
                  className={`toggle-attendance-btn ${student.status}`}
                  onClick={(e) => toggleAttendance(e, student.id)}
                >
                  {student.status === 'present' ? '✅ Present' : '❌ Absent'}
                </button>
            </div>
          )
        })}
      </div>

      {/* Detailed Attendance Table */}
      <div className="card" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="card-header">
          <h3>📊 Individual Attendance Report — Grade {selectedClass}</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Student Name</th>
                <th>Attended</th>
                <th>Total</th>
                <th>Attendance %</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((s) => {
                const pct = getAttendancePercent(s)
                return (
                  <tr key={s.id} className="clickable-row" onClick={() => setSelectedStudent(s)}>
                    <td style={{ fontWeight: 600 }}>{s.roll}</td>
                    <td>{s.name}</td>
                    <td style={{ fontWeight: 700 }}>{s.status === 'present' ? s.attended + 1 : s.attended}</td>
                    <td>{s.totalClasses + 1}</td>
                    <td>
                      <div className="table-pct-container">
                        <div className="table-pct-bar">
                          <div className="table-pct-fill" style={{ width: `${pct}%`, background: getPercentColor(pct) }} />
                        </div>
                        <span style={{ color: getPercentColor(pct), fontWeight: 800, fontSize: '0.85rem' }}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${pct >= 90 ? 'present' : pct >= 75 ? 'late' : 'absent'}`}>
                        {pct >= 90 ? '✅ Good' : pct >= 75 ? '⚠️ Warning' : '❌ Critical'}
                      </span>
                    </td>
                    <td>
                      <button className="view-detail-btn" onClick={(e) => { e.stopPropagation(); setSelectedStudent(s) }}>
                        👁️ View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="action-bar">
        <button className="save-btn">
            🗳️ Submit Attendance
        </button>
      </div>

      {/* ===== Student Detail Modal ===== */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="student-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sdm-header">
              <div className="sdm-student-info">
                <div className="sdm-avatar">👤</div>
                <div>
                  <h3>{selectedStudent.name}</h3>
                  <span className="sdm-roll">{selectedStudent.roll} • Grade {selectedClass}</span>
                </div>
              </div>
              <button className="sdm-close" onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            {/* Summary Stats */}
            <div className="sdm-stats">
              <div className="sdm-stat-box">
                <span className="sdm-stat-value" style={{ color: 'var(--accent)' }}>
                  {getAttendancePercent(selectedStudent)}%
                </span>
                <span className="sdm-stat-label">Attendance</span>
              </div>
              <div className="sdm-stat-box">
                <span className="sdm-stat-value" style={{ color: 'var(--success)' }}>{studentPresentCount}</span>
                <span className="sdm-stat-label">Present</span>
              </div>
              <div className="sdm-stat-box">
                <span className="sdm-stat-value" style={{ color: 'var(--danger)' }}>{studentAbsentCount}</span>
                <span className="sdm-stat-label">Absent</span>
              </div>
              <div className="sdm-stat-box">
                <span className="sdm-stat-value">{selectedStudent.totalClasses}</span>
                <span className="sdm-stat-label">Total Classes</span>
              </div>
            </div>

            {/* Attendance % Bar */}
            <div className="sdm-pct-section">
              <div className="sdm-pct-bar">
                <div 
                  className="sdm-pct-fill" 
                  style={{ 
                    width: `${getAttendancePercent(selectedStudent)}%`, 
                    background: getPercentColor(getAttendancePercent(selectedStudent))
                  }} 
                />
              </div>
              <div className="sdm-pct-labels">
                <span>0%</span>
                <span style={{ color: getPercentColor(getAttendancePercent(selectedStudent)), fontWeight: 800 }}>
                  {getAttendancePercent(selectedStudent)}%
                </span>
                <span>100%</span>
              </div>
            </div>

            {/* Class-by-Class Record */}
            <div className="sdm-record-header">
              <h4>📋 Class-by-Class Record</h4>
              <div className="sdm-legend">
                <span className="sdm-legend-item present">✅ Present</span>
                <span className="sdm-legend-item absent">❌ Absent</span>
              </div>
            </div>

            <div className="sdm-record-scroll">
              <table className="sdm-record-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Period</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentHistory.map((record, idx) => (
                    <tr key={idx} className={`sdm-row ${record.status}`}>
                      <td style={{ fontWeight: 600 }}>{record.date}</td>
                      <td>{record.day}</td>
                      <td>
                        <span className={`sdm-period-tag ${record.period.toLowerCase()}`}>
                          {record.period}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{record.time}</td>
                      <td>
                        <span className={`sdm-status-tag ${record.status}`}>
                          {record.status === 'present' ? '✅ Present' : '❌ Absent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
