export default function FacultyDashboard() {
  const userName = localStorage.getItem('userName') || 'Faculty'

  return (
    <div>
      <div className="page-header">
        <h1>Faculty Dashboard</h1>
        <p>Welcome, {userName}! Here's your overview for today.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card accent animate-in">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h4>Total Students</h4>
            <div className="stat-value">156</div>
            <div className="stat-change positive">Active this term</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h4>My Classes</h4>
            <div className="stat-value">5</div>
            <div className="stat-change">This semester</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Avg Attendance</h4>
            <div className="stat-value">89%</div>
            <div className="stat-change positive">↑ 2% this week</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h4>Pending Tasks</h4>
            <div className="stat-value">8</div>
            <div className="stat-change negative">3 urgent</div>
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Today's Classes */}
        <div className="card">
          <div className="card-header">
            <h3>📅 Today's Schedule</h3>
          </div>
          <div className="notif-list">
            <div className="notif-item">
              <div className="notif-icon info">📐</div>
              <div className="notif-body">
                <h4>Mathematics — Grade 10A</h4>
                <p>Chapter 7: Quadratic Equations • Room 204</p>
                <span className="notif-time">8:00 AM - 9:00 AM</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon success">📐</div>
              <div className="notif-body">
                <h4>Mathematics — Grade 11B</h4>
                <p>Chapter 3: Trigonometry • Room 301</p>
                <span className="notif-time">10:00 AM - 11:00 AM</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon warning">📐</div>
              <div className="notif-body">
                <h4>Mathematics — Grade 9C</h4>
                <p>Chapter 12: Statistics • Room 105</p>
                <span className="notif-time">1:00 PM - 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements & Tasks */}
        <div className="card">
          <div className="card-header">
            <h3>📋 Pending Tasks</h3>
          </div>
          <div className="notif-list">
            <div className="notif-item">
              <div className="notif-icon danger">⚠️</div>
              <div className="notif-body">
                <h4>Grade Mid-Term Papers — 10A</h4>
                <p>28 papers remaining to be graded</p>
                <span className="notif-time">Due: Feb 20, 2026</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon warning">📝</div>
              <div className="notif-body">
                <h4>Submit Attendance Report</h4>
                <p>Monthly attendance report for January</p>
                <span className="notif-time">Due: Feb 18, 2026</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon info">📊</div>
              <div className="notif-body">
                <h4>Prepare Quiz — Grade 11B</h4>
                <p>Chapter 3 quiz on Trigonometry</p>
                <span className="notif-time">Due: Feb 22, 2026</span>
              </div>
            </div>
            <div className="notif-item">
              <div className="notif-icon success">📅</div>
              <div className="notif-body">
                <h4>Parent-Teacher Meeting Prep</h4>
                <p>Prepare progress reports for each student</p>
                <span className="notif-time">Mar 1, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
