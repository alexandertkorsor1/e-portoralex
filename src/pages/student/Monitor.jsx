import './Monitor.css'

export default function Monitor() {
  const monitor = {
    name: 'Sarah Jenkins',
    grade: '12th Grade',
    section: 'Science A',
    role: 'Class Monitor',
    image: null, // Placeholder for image logic if needed
    duties: [
      {
        id: 1,
        title: 'Class Attendance',
        icon: '📋',
        desc: 'Responsible for marking daily attendance and reporting absentees to the class teacher.',
      },
      {
        id: 2,
        title: 'Discipline Management',
        icon: '⚖️',
        desc: 'Ensures silence and order during class transitions and teacher absence.',
      },
      {
        id: 3,
        title: 'Resource Distribution',
        icon: '📚',
        desc: 'Distributes textbooks, worksheets, and other learning materials to fellow students.',
      },
      {
        id: 4,
        title: 'Teacher Assistance',
        icon: '🍎',
        desc: 'Assists subject teachers with collecting assignments and setting up audio-visual equipment.',
      },
    ],
  }

  return (
    <div className="monitor-page animate-in">
      <div className="page-header">
        <h1>Class Leadership</h1>
        <p>Know your class representative and their responsibilities</p>
      </div>

      <div className="monitor-profile-card">
        <div className="monitor-avatar animate-pop">
            {/* If you have a real image, use <img src={...} /> */}
            👩‍🎓
        </div>
        <h2 className="monitor-name">{monitor.name}</h2>
        <div className="monitor-role">
            {monitor.grade} — {monitor.section} • {monitor.role}
        </div>
        
        <div className="monitor-actions">
            <button className="action-btn primary">
                💬 Send Message
            </button>
            <button className="action-btn secondary">
                📅 Request Meeting
            </button>
        </div>
      </div>

      <div className="section-title" style={{ marginBottom: 'var(--sp-lg)' }}>
        <h3>Duties & Responsibilities</h3>
      </div>

      <div className="duties-section">
        {monitor.duties.map((duty) => (
            <div key={duty.id} className="duty-card">
                <div className="duty-header">
                    <div className="duty-icon">{duty.icon}</div>
                    <div className="duty-title">{duty.title}</div>
                </div>
                <p className="duty-desc">{duty.desc}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
