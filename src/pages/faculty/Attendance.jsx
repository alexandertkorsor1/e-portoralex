import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Attendance.css'

export default function FacultyAttendance() {
  const location = useLocation()
  const [selectedClass, setSelectedClass] = useState('10A')
  // Initialize from location state if available (from Timetable)
  useEffect(() => {
    if (location.state?.className) {
        // Simple mapping or use directly
        setSelectedClass(location.state.className.includes('10A') ? '10A' : '11B')
    }
  }, [location])

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', roll: '10A01', status: 'present' },
    { id: 2, name: 'Bob Smith', roll: '10A02', status: 'present' },
    { id: 3, name: 'Charlie Davis', roll: '10A03', status: 'absent' },
    { id: 4, name: 'Diana Evans', roll: '10A04', status: 'present' },
    { id: 5, name: 'Ethan Hunt', roll: '10A05', status: 'present' },
    { id: 6, name: 'Fiona Gallagher', roll: '10A06', status: 'present' },
    { id: 7, name: 'George Martin', roll: '10A07', status: 'present' },
    { id: 8, name: 'Hannah White', roll: '10A08', status: 'present' },
  ])

  const toggleAttendance = (id) => {
    setStudents(students.map(s => 
        s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
    ))
  }

  const presentCount = students.filter(s => s.status === 'present').length
  const absentCount = students.length - presentCount

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>✅ Class Attendance</h1>
        <p>Mark attendance for today or view past records</p>
      </div>

      <div className="marks-filters">
        <div className="filter-group">
            <label>Date</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
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
      </div>

      <div className="attendance-grid">
        {students.map((student) => (
            <div 
                key={student.id} 
                className={`student-card ${student.status}`}
                onClick={() => toggleAttendance(student.id)}
            >
                <div style={{ fontSize: '2rem' }}>
                    {student.status === 'present' ? '🙋‍♂️' : '🏠'}
                </div>
                <h4>{student.name}</h4>
                <p>{student.roll}</p>
                <div className="status-indicator">
                    {student.status}
                </div>
            </div>
        ))}
      </div>

      <div className="action-bar">
        <button className="save-btn">
            🗳️ Submit Attendance
        </button>
      </div>
    </div>
  )
}
