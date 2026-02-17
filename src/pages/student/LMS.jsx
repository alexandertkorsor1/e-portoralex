import './LMS.css'

export default function LMS() {
  const courses = [
    { name: 'Mathematics', teacher: 'Mr. Johnson', progress: 75, banner: 'math', icon: '📐' },
    { name: 'English Language', teacher: 'Mrs. Williams', progress: 60, banner: 'english', icon: '📖' },
    { name: 'General Science', teacher: 'Dr. Smith', progress: 85, banner: 'science', icon: '🔬' },
    { name: 'History', teacher: 'Mr. Davis', progress: 45, banner: 'history', icon: '🏛️' },
    { name: 'Geography', teacher: 'Ms. Brown', progress: 55, banner: 'geography', icon: '🌍' },
    { name: 'Creative Arts', teacher: 'Mrs. Taylor', progress: 90, banner: 'arts', icon: '🎨' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>📚 Learning Management System</h1>
        <p>Access your courses, materials, and assignments</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h4>Total Courses</h4>
            <div className="stat-value">6</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h4>Completed</h4>
            <div className="stat-value">2</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h4>Pending Tasks</h4>
            <div className="stat-value">8</div>
          </div>
        </div>
        <div className="stat-card accent animate-in">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h4>Study Hours</h4>
            <div className="stat-value">47h</div>
          </div>
        </div>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.name} className="course-card animate-in">
            <div className={`course-banner ${course.banner}`}>
              {course.icon}
            </div>
            <div className="course-body">
              <h3>{course.name}</h3>
              <p>Instructor: {course.teacher}</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="progress-percent">{course.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
