import { useState } from 'react'
import './Monitor.css'

// ===== MOCK DATA =====
const classStudents = [
  { id: 1, name: 'Amara Osei', rollNo: '001', status: 'present' },
  { id: 2, name: 'Kwame Mensah', rollNo: '002', status: 'present' },
  { id: 3, name: 'Abena Darko', rollNo: '003', status: 'absent' },
  { id: 4, name: 'Kofi Asante', rollNo: '004', status: 'present' },
  { id: 5, name: 'Esi Bonsu', rollNo: '005', status: 'present' },
  { id: 6, name: 'Yaw Owusu', rollNo: '006', status: 'late' },
  { id: 7, name: 'Ama Serwaa', rollNo: '007', status: 'present' },
  { id: 8, name: 'Nana Adjei', rollNo: '008', status: 'absent' },
  { id: 9, name: 'Akua Boateng', rollNo: '009', status: 'present' },
  { id: 10, name: 'Kojo Frimpong', rollNo: '010', status: 'present' },
  { id: 11, name: 'Efua Mensimah', rollNo: '011', status: 'present' },
  { id: 12, name: 'Kwesi Appiah', rollNo: '012', status: 'present' },
  { id: 13, name: 'Afia Poku', rollNo: '013', status: 'absent' },
  { id: 14, name: 'Yaa Asantewaa', rollNo: '014', status: 'present' },
  { id: 15, name: 'Kweku Antwi', rollNo: '015', status: 'present' },
  { id: 16, name: 'Adjoa Nyarko', rollNo: '016', status: 'late' },
  { id: 17, name: 'Fiifi Mensah', rollNo: '017', status: 'present' },
  { id: 18, name: 'Maame Sarpong', rollNo: '018', status: 'present' },
  { id: 19, name: 'Kobi Adu', rollNo: '019', status: 'present' },
  { id: 20, name: 'Adwoa Kyeremeh', rollNo: '020', status: 'present' },
  { id: 21, name: 'Ekow Baidoo', rollNo: '021', status: 'absent' },
  { id: 22, name: 'Serwaa Amoah', rollNo: '022', status: 'present' },
  { id: 23, name: 'Nii Armah', rollNo: '023', status: 'present' },
  { id: 24, name: 'Akosua Tetteh', rollNo: '024', status: 'present' },
  { id: 25, name: 'Kwadwo Opoku', rollNo: '025', status: 'present' },
]

const disciplineRecords = [
  { id: 1, student: 'Abena Darko', type: 'warning', issue: 'Talking during class', date: 'Feb 19, 2026', action: 'Verbal Warning', severity: 'low' },
  { id: 2, student: 'Yaw Owusu', type: 'incident', issue: 'Late to class (3rd time this week)', date: 'Feb 19, 2026', action: 'Reported to Class Teacher', severity: 'medium' },
  { id: 3, student: 'Nana Adjei', type: 'warning', issue: 'Using phone during lesson', date: 'Feb 18, 2026', action: 'Phone confiscated', severity: 'medium' },
  { id: 4, student: 'Kojo Frimpong', type: 'positive', issue: 'Helped organize classroom', date: 'Feb 18, 2026', action: 'Commendation', severity: 'positive' },
  { id: 5, student: 'Afia Poku', type: 'incident', issue: 'Skipped assembly', date: 'Feb 17, 2026', action: 'Referred to Discipline Committee', severity: 'high' },
  { id: 6, student: 'Adjoa Nyarko', type: 'warning', issue: 'Incomplete uniform', date: 'Feb 17, 2026', action: 'Verbal Warning', severity: 'low' },
  { id: 7, student: 'Ama Serwaa', type: 'positive', issue: 'Volunteered for extra clean-up', date: 'Feb 17, 2026', action: 'Commendation', severity: 'positive' },
  { id: 8, student: 'Ekow Baidoo', type: 'incident', issue: 'Fighting during break', date: 'Feb 14, 2026', action: 'Parents contacted', severity: 'high' },
]

const resources = [
  { id: 1, item: 'Mathematics Textbook', total: 30, distributed: 25, remaining: 5, category: 'textbook', date: 'Feb 17, 2026' },
  { id: 2, item: 'English Workbook', total: 30, distributed: 28, remaining: 2, category: 'textbook', date: 'Feb 17, 2026' },
  { id: 3, item: 'Lab Safety Goggles', total: 15, distributed: 15, remaining: 0, category: 'equipment', date: 'Feb 18, 2026' },
  { id: 4, item: 'Art Supplies Kit', total: 30, distributed: 22, remaining: 8, category: 'supplies', date: 'Feb 18, 2026' },
  { id: 5, item: 'Science Worksheets (Ch. 7)', total: 30, distributed: 30, remaining: 0, category: 'worksheet', date: 'Feb 19, 2026' },
  { id: 6, item: 'History Project Rubric', total: 30, distributed: 27, remaining: 3, category: 'worksheet', date: 'Feb 19, 2026' },
  { id: 7, item: 'Graphing Calculators', total: 10, distributed: 8, remaining: 2, category: 'equipment', date: 'Feb 19, 2026' },
]

const teacherTasks = [
  { id: 1, teacher: 'Mr. Boakye', subject: 'Mathematics', task: 'Collect homework notebooks', deadline: 'Feb 19, 2026', status: 'completed', priority: 'high' },
  { id: 2, teacher: 'Mrs. Ansah', subject: 'English', task: 'Set up projector for presentation', deadline: 'Feb 19, 2026', status: 'in-progress', priority: 'medium' },
  { id: 3, teacher: 'Dr. Mensah', subject: 'Science', task: 'Distribute lab safety forms', deadline: 'Feb 19, 2026', status: 'pending', priority: 'high' },
  { id: 4, teacher: 'Ms. Owusu', subject: 'History', task: 'Collect project submissions', deadline: 'Feb 20, 2026', status: 'pending', priority: 'medium' },
  { id: 5, teacher: 'Mr. Appiah', subject: 'Geography', task: 'Prepare maps for next class', deadline: 'Feb 20, 2026', status: 'pending', priority: 'low' },
  { id: 6, teacher: 'Mrs. Tetteh', subject: 'Creative Arts', task: 'Clean and organize art supplies', deadline: 'Feb 21, 2026', status: 'pending', priority: 'low' },
  { id: 7, teacher: 'Mr. Boakye', subject: 'Mathematics', task: 'Return graded quizzes', deadline: 'Feb 21, 2026', status: 'completed', priority: 'medium' },
]

// ===== COMPONENT =====
export default function Monitor() {
  const [activePanel, setActivePanel] = useState(null)
  const [attendanceData, setAttendanceData] = useState(classStudents)
  const [attendanceFilter, setAttendanceFilter] = useState('all')
  const [taskData, setTaskData] = useState(teacherTasks)
  const [disciplineFilter, setDisciplineFilter] = useState('all')

  const monitor = {
    name: 'Sarah Jenkins',
    grade: '12th Grade',
    section: 'Science A',
    role: 'Class Monitor',
  }

  const duties = [
    { id: 'attendance', title: 'Class Attendance', icon: '📋', desc: 'View and mark daily attendance. See who is present, absent, or late.', color: '#2ecc71' },
    { id: 'discipline', title: 'Discipline Management', icon: '⚖️', desc: 'View discipline records, incidents, warnings, and commendations.', color: '#e74c3c' },
    { id: 'resources', title: 'Resource Distribution', icon: '📚', desc: 'Track textbooks, worksheets, and materials distributed to students.', color: '#3498db' },
    { id: 'teacher-assist', title: 'Teacher Assistance', icon: '🍎', desc: 'Manage tasks assigned by teachers — collecting, setting up, and more.', color: '#f39c12' },
  ]

  // ===== ATTENDANCE HELPERS =====
  const toggleAttendance = (id, newStatus) => {
    setAttendanceData(prev =>
      prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
    )
  }

  const presentCount = attendanceData.filter(s => s.status === 'present').length
  const absentCount = attendanceData.filter(s => s.status === 'absent').length
  const lateCount = attendanceData.filter(s => s.status === 'late').length
  const totalStudents = attendanceData.length
  const attendanceRate = ((presentCount / totalStudents) * 100).toFixed(1)

  const filteredStudents = attendanceFilter === 'all'
    ? attendanceData
    : attendanceData.filter(s => s.status === attendanceFilter)

  // ===== DISCIPLINE HELPERS =====
  const filteredDiscipline = disciplineFilter === 'all'
    ? disciplineRecords
    : disciplineRecords.filter(r => r.type === disciplineFilter)

  const warningCount = disciplineRecords.filter(r => r.type === 'warning').length
  const incidentCount = disciplineRecords.filter(r => r.type === 'incident').length
  const positiveCount = disciplineRecords.filter(r => r.type === 'positive').length

  // ===== RESOURCE HELPERS =====
  const totalDistributed = resources.reduce((s, r) => s + r.distributed, 0)
  const totalItems = resources.reduce((s, r) => s + r.total, 0)
  const fullyDistributed = resources.filter(r => r.remaining === 0).length

  // ===== TASK HELPERS =====
  const toggleTask = (id) => {
    setTaskData(prev =>
      prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t)
    )
  }

  const completedTasks = taskData.filter(t => t.status === 'completed').length
  const pendingTasks = taskData.filter(t => t.status === 'pending').length
  const inProgressTasks = taskData.filter(t => t.status === 'in-progress').length

  // ===== PANEL TOGGLE =====
  const handleDutyClick = (dutyId) => {
    setActivePanel(activePanel === dutyId ? null : dutyId)
  }

  // ===== STATUS HELPERS =====
  const getStatusEmoji = (status) => {
    if (status === 'present') return '✅'
    if (status === 'absent') return '❌'
    return '⏰'
  }

  const getSeverityClass = (severity) => {
    if (severity === 'positive') return 'severity-positive'
    if (severity === 'high') return 'severity-high'
    if (severity === 'medium') return 'severity-medium'
    return 'severity-low'
  }

  const getPriorityClass = (priority) => {
    if (priority === 'high') return 'priority-high'
    if (priority === 'medium') return 'priority-medium'
    return 'priority-low'
  }

  return (
    <div className="monitor-page animate-in">
      {/* ===== HEADER ===== */}
      <div className="page-header">
        <h1>Class Leadership</h1>
        <p>Know your class representative and manage class duties</p>
      </div>

      {/* ===== PROFILE CARD ===== */}
      <div className="monitor-profile-card">
        <div className="monitor-avatar animate-pop">👩‍🎓</div>
        <h2 className="monitor-name">{monitor.name}</h2>
        <div className="monitor-role">
          {monitor.grade} — {monitor.section} • {monitor.role}
        </div>
        <div className="monitor-actions">
          <button className="action-btn primary">💬 Send Message</button>
          <button className="action-btn secondary">📅 Request Meeting</button>
        </div>
      </div>

      {/* ===== QUICK STATS ===== */}
      <div className="monitor-quick-stats">
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'rgba(46,204,113,0.12)', color: '#2ecc71' }}>📋</div>
          <div className="quick-stat-info">
            <span className="quick-stat-value">{attendanceRate}%</span>
            <span className="quick-stat-label">Today's Attendance</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'rgba(231,76,60,0.12)', color: '#e74c3c' }}>⚖️</div>
          <div className="quick-stat-info">
            <span className="quick-stat-value">{disciplineRecords.length}</span>
            <span className="quick-stat-label">Discipline Records</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'rgba(52,152,219,0.12)', color: '#3498db' }}>📚</div>
          <div className="quick-stat-info">
            <span className="quick-stat-value">{fullyDistributed}/{resources.length}</span>
            <span className="quick-stat-label">Fully Distributed</span>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="quick-stat-icon" style={{ background: 'rgba(243,156,18,0.12)', color: '#f39c12' }}>🍎</div>
          <div className="quick-stat-info">
            <span className="quick-stat-value">{completedTasks}/{taskData.length}</span>
            <span className="quick-stat-label">Tasks Done</span>
          </div>
        </div>
      </div>

      {/* ===== DUTIES ===== */}
      <div className="section-title" style={{ marginBottom: 'var(--sp-lg)' }}>
        <h3>Duties & Responsibilities</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>Click any card to expand details</p>
      </div>

      <div className="duties-section">
        {duties.map((duty) => (
          <div key={duty.id}>
            <div
              className={`duty-card ${activePanel === duty.id ? 'duty-card-active' : ''}`}
              onClick={() => handleDutyClick(duty.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="duty-header">
                <div className="duty-icon" style={{ background: `${duty.color}15`, color: duty.color }}>{duty.icon}</div>
                <div className="duty-title">{duty.title}</div>
                <div className={`duty-expand-arrow ${activePanel === duty.id ? 'rotated' : ''}`}>▼</div>
              </div>
              <p className="duty-desc">{duty.desc}</p>
            </div>

            {/* ===== ATTENDANCE PANEL ===== */}
            {activePanel === 'attendance' && duty.id === 'attendance' && (
              <div className="duty-panel animate-in">
                <div className="panel-header">
                  <h3>📋 Class Attendance — Today</h3>
                  <span className="panel-date">February 19, 2026</span>
                </div>

                {/* Attendance Summary */}
                <div className="attendance-summary">
                  <div className="att-summary-item present">
                    <span className="att-count">{presentCount}</span>
                    <span className="att-label">Present</span>
                  </div>
                  <div className="att-summary-item absent">
                    <span className="att-count">{absentCount}</span>
                    <span className="att-label">Absent</span>
                  </div>
                  <div className="att-summary-item late">
                    <span className="att-count">{lateCount}</span>
                    <span className="att-label">Late</span>
                  </div>
                  <div className="att-summary-item total">
                    <span className="att-count">{totalStudents}</span>
                    <span className="att-label">Total</span>
                  </div>
                </div>

                {/* Attendance Progress Bar */}
                <div className="attendance-progress-wrap">
                  <div className="attendance-progress-bar">
                    <div className="att-bar-seg present" style={{ width: `${(presentCount / totalStudents) * 100}%` }} />
                    <div className="att-bar-seg late" style={{ width: `${(lateCount / totalStudents) * 100}%` }} />
                    <div className="att-bar-seg absent" style={{ width: `${(absentCount / totalStudents) * 100}%` }} />
                  </div>
                  <span className="att-progress-label">{attendanceRate}% Present</span>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                  {['all', 'present', 'absent', 'late'].map(f => (
                    <button
                      key={f}
                      className={`filter-tab ${attendanceFilter === f ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setAttendanceFilter(f) }}
                    >
                      {f === 'all' ? `All (${totalStudents})` : f === 'present' ? `✅ Present (${presentCount})` : f === 'absent' ? `❌ Absent (${absentCount})` : `⏰ Late (${lateCount})`}
                    </button>
                  ))}
                </div>

                {/* Student List */}
                <div className="student-list">
                  {filteredStudents.map(student => (
                    <div key={student.id} className={`student-row ${student.status}`}>
                      <div className="student-info">
                        <span className="student-roll">{student.rollNo}</span>
                        <span className="student-name">{student.name}</span>
                      </div>
                      <div className="student-status-controls">
                        <button
                          className={`status-btn present ${student.status === 'present' ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleAttendance(student.id, 'present') }}
                          title="Mark Present"
                        >✅</button>
                        <button
                          className={`status-btn late ${student.status === 'late' ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleAttendance(student.id, 'late') }}
                          title="Mark Late"
                        >⏰</button>
                        <button
                          className={`status-btn absent ${student.status === 'absent' ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleAttendance(student.id, 'absent') }}
                          title="Mark Absent"
                        >❌</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== DISCIPLINE PANEL ===== */}
            {activePanel === 'discipline' && duty.id === 'discipline' && (
              <div className="duty-panel animate-in">
                <div className="panel-header">
                  <h3>⚖️ Discipline Records</h3>
                  <span className="panel-date">This Week</span>
                </div>

                {/* Discipline Summary */}
                <div className="discipline-summary">
                  <div className="disc-stat warning-stat">
                    <span className="disc-count">{warningCount}</span>
                    <span className="disc-label">⚠️ Warnings</span>
                  </div>
                  <div className="disc-stat incident-stat">
                    <span className="disc-count">{incidentCount}</span>
                    <span className="disc-label">🚨 Incidents</span>
                  </div>
                  <div className="disc-stat positive-stat">
                    <span className="disc-count">{positiveCount}</span>
                    <span className="disc-label">🌟 Commendations</span>
                  </div>
                </div>

                {/* Filter */}
                <div className="filter-tabs">
                  {['all', 'warning', 'incident', 'positive'].map(f => (
                    <button
                      key={f}
                      className={`filter-tab ${disciplineFilter === f ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setDisciplineFilter(f) }}
                    >
                      {f === 'all' ? 'All Records' : f === 'warning' ? '⚠️ Warnings' : f === 'incident' ? '🚨 Incidents' : '🌟 Positive'}
                    </button>
                  ))}
                </div>

                {/* Records List */}
                <div className="discipline-list">
                  {filteredDiscipline.map(record => (
                    <div key={record.id} className={`discipline-row ${record.type}`}>
                      <div className="disc-row-header">
                        <div className="disc-student-name">{record.student}</div>
                        <span className={`severity-badge ${getSeverityClass(record.severity)}`}>
                          {record.severity === 'positive' ? '🌟 Positive' : record.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="disc-issue">{record.issue}</div>
                      <div className="disc-row-footer">
                        <span className="disc-action">
                          <strong>Action:</strong> {record.action}
                        </span>
                        <span className="disc-date">{record.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== RESOURCES PANEL ===== */}
            {activePanel === 'resources' && duty.id === 'resources' && (
              <div className="duty-panel animate-in">
                <div className="panel-header">
                  <h3>📚 Resource Distribution</h3>
                  <span className="panel-date">Current Status</span>
                </div>

                {/* Resource Summary */}
                <div className="resource-summary">
                  <div className="res-stat">
                    <span className="res-count">{totalItems}</span>
                    <span className="res-label">Total Items</span>
                  </div>
                  <div className="res-stat">
                    <span className="res-count" style={{ color: 'var(--success)' }}>{totalDistributed}</span>
                    <span className="res-label">Distributed</span>
                  </div>
                  <div className="res-stat">
                    <span className="res-count" style={{ color: 'var(--warning)' }}>{totalItems - totalDistributed}</span>
                    <span className="res-label">Remaining</span>
                  </div>
                  <div className="res-stat">
                    <span className="res-count" style={{ color: 'var(--info)' }}>{fullyDistributed}</span>
                    <span className="res-label">Complete</span>
                  </div>
                </div>

                {/* Resource Table */}
                <div className="resource-table-wrap">
                  <table className="resource-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Distributed</th>
                        <th>Remaining</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resources.map(r => (
                        <tr key={r.id}>
                          <td className="res-item-name">{r.item}</td>
                          <td><span className={`res-category ${r.category}`}>{r.category}</span></td>
                          <td>{r.total}</td>
                          <td>{r.distributed}</td>
                          <td style={{ color: r.remaining === 0 ? 'var(--success)' : 'var(--warning)', fontWeight: 700 }}>{r.remaining}</td>
                          <td>
                            <span className={`res-status-badge ${r.remaining === 0 ? 'complete' : r.remaining <= 3 ? 'low' : 'available'}`}>
                              {r.remaining === 0 ? '✅ Complete' : r.remaining <= 3 ? '⚠️ Low' : '📦 Available'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Distribution Progress */}
                <div className="resource-progress-section">
                  <h4>Distribution Progress</h4>
                  {resources.map(r => (
                    <div key={r.id} className="res-progress-item">
                      <div className="res-progress-label">
                        <span>{r.item}</span>
                        <span>{Math.round((r.distributed / r.total) * 100)}%</span>
                      </div>
                      <div className="res-progress-bar">
                        <div
                          className="res-progress-fill"
                          style={{
                            width: `${(r.distributed / r.total) * 100}%`,
                            background: r.remaining === 0 ? 'var(--success)' : r.remaining <= 3 ? 'var(--warning)' : 'var(--info)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TEACHER ASSISTANCE PANEL ===== */}
            {activePanel === 'teacher-assist' && duty.id === 'teacher-assist' && (
              <div className="duty-panel animate-in">
                <div className="panel-header">
                  <h3>🍎 Teacher Assistance Tasks</h3>
                  <span className="panel-date">This Week</span>
                </div>

                {/* Task Summary */}
                <div className="task-summary">
                  <div className="task-stat completed">
                    <span className="task-count">{completedTasks}</span>
                    <span className="task-label">✅ Completed</span>
                  </div>
                  <div className="task-stat in-progress">
                    <span className="task-count">{inProgressTasks}</span>
                    <span className="task-label">🔄 In Progress</span>
                  </div>
                  <div className="task-stat pending">
                    <span className="task-count">{pendingTasks}</span>
                    <span className="task-label">⏳ Pending</span>
                  </div>
                </div>

                {/* Task List */}
                <div className="task-list">
                  {taskData.map(task => (
                    <div key={task.id} className={`task-row ${task.status}`}>
                      <div className="task-check" onClick={(e) => { e.stopPropagation(); toggleTask(task.id) }}>
                        <div className={`task-checkbox ${task.status === 'completed' ? 'checked' : ''}`}>
                          {task.status === 'completed' && '✓'}
                        </div>
                      </div>
                      <div className="task-details">
                        <div className="task-row-header">
                          <span className={`task-name ${task.status === 'completed' ? 'done' : ''}`}>{task.task}</span>
                          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>
                        </div>
                        <div className="task-meta">
                          <span className="task-teacher">👤 {task.teacher}</span>
                          <span className="task-subject">📖 {task.subject}</span>
                          <span className="task-deadline">📅 {task.deadline}</span>
                        </div>
                        <div className="task-status-row">
                          <span className={`task-status-badge ${task.status}`}>
                            {task.status === 'completed' ? '✅ Completed' : task.status === 'in-progress' ? '🔄 In Progress' : '⏳ Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
