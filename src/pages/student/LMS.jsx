import { useState } from 'react'
import './LMS.css'

export default function LMS() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [submitModalOpen, setSubmitModalOpen] = useState(null)

  const courses = [
    {
      name: 'Mathematics', teacher: 'Mr. Johnson', progress: 75, banner: 'math', icon: '📐',
      materials: [
        { id: 1, title: 'Chapter 7 - Quadratic Equations', type: 'note', fileType: 'PDF', size: '2.4 MB', date: 'Feb 15, 2026' },
        { id: 2, title: 'Algebra Homework Sheet 3', type: 'assignment', fileType: 'DOC', size: '156 KB', date: 'Feb 12, 2026', deadline: '2026-02-20T23:59', status: 'pending' },
        { id: 3, title: 'Lecture Slides - Week 4', type: 'note', fileType: 'PPT', size: '5.1 MB', date: 'Feb 10, 2026' },
        { id: 4, title: 'Mid-Term Practice Problems', type: 'assignment', fileType: 'PDF', size: '340 KB', date: 'Feb 8, 2026', deadline: '2026-03-01T23:59', status: 'pending' },
      ]
    },
    {
      name: 'English Language', teacher: 'Mrs. Williams', progress: 60, banner: 'english', icon: '📖',
      materials: [
        { id: 5, title: 'Grammar Rules Handbook', type: 'note', fileType: 'PDF', size: '1.8 MB', date: 'Feb 14, 2026' },
        { id: 6, title: 'Essay Writing Assignment', type: 'assignment', fileType: 'DOC', size: '90 KB', date: 'Feb 11, 2026', deadline: '2026-02-18T12:00', status: 'submitted' },
      ]
    },
    {
      name: 'General Science', teacher: 'Dr. Smith', progress: 85, banner: 'science', icon: '🔬',
      materials: [
        { id: 7, title: 'Lab Safety Guidelines', type: 'note', fileType: 'PDF', size: '500 KB', date: 'Feb 13, 2026' },
        { id: 8, title: 'Chemistry Lab Report', type: 'assignment', fileType: 'DOC', size: '120 KB', date: 'Feb 9, 2026', deadline: '2026-02-22T17:00', status: 'pending' },
      ]
    },
    {
      name: 'History', teacher: 'Mr. Davis', progress: 45, banner: 'history', icon: '🏛️',
      materials: [
        { id: 9, title: 'World War II Overview', type: 'note', fileType: 'PDF', size: '3.2 MB', date: 'Feb 12, 2026' },
      ]
    },
    {
      name: 'Geography', teacher: 'Ms. Brown', progress: 55, banner: 'geography', icon: '🌍',
      materials: [
        { id: 10, title: 'Map Reading Exercise', type: 'assignment', fileType: 'PDF', size: '1.1 MB', date: 'Feb 10, 2026', deadline: '2026-02-25T23:59', status: 'pending' },
      ]
    },
    {
      name: 'Creative Arts', teacher: 'Mrs. Taylor', progress: 90, banner: 'arts', icon: '🎨',
      materials: [
        { id: 11, title: 'Color Theory Notes', type: 'note', fileType: 'PDF', size: '2.0 MB', date: 'Feb 14, 2026' },
        { id: 12, title: 'Art Portfolio Submission', type: 'assignment', fileType: 'PDF', size: '200 KB', date: 'Feb 7, 2026', deadline: '2026-02-28T23:59', status: 'pending' },
      ]
    },
  ]

  const handleSubmitWork = (itemId) => {
    setSubmitModalOpen(itemId)
  }

  const handleConfirmSubmit = () => {
    alert('✅ Work submitted successfully!')
    setSubmitModalOpen(null)
  }

  // ===== COURSE DETAIL VIEW =====
  if (selectedCourse) {
    const course = courses.find(c => c.name === selectedCourse)
    const notes = course.materials.filter(m => m.type === 'note')
    const assignments = course.materials.filter(m => m.type === 'assignment')

    return (
      <div className="animate-in">
        <button 
          className="back-btn" 
          onClick={() => setSelectedCourse(null)}
        >
          ← Back to Courses
        </button>

        <div className={`course-detail-header ${course.banner}`}>
          <span className="course-detail-icon">{course.icon}</span>
          <div>
            <h1>{course.name}</h1>
            <p>Instructor: {course.teacher}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
          <h3>📄 Lecture Notes ({notes.length})</h3>
        </div>

        {notes.length === 0 ? (
          <div className="empty-state">No notes uploaded yet.</div>
        ) : (
          <div className="materials-list-student">
            {notes.map(item => (
              <div key={item.id} className="material-item" style={{ borderLeft: '4px solid var(--info)' }}>
                <div className="file-icon-lg">
                  {item.fileType === 'PDF' ? '📄' : item.fileType === 'PPT' ? '📊' : '📝'}
                </div>
                <div className="file-info">
                  <div className="file-name">{item.title}</div>
                  <div className="file-meta">{item.fileType} • {item.size} • {item.date}</div>
                </div>
                <button className="download-btn" title="Download">
                  ⬇️ Download
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Assignments Section */}
        <div className="section-title" style={{ marginTop: 'var(--sp-xl)', marginBottom: 'var(--sp-md)' }}>
          <h3>📝 Assignments ({assignments.length})</h3>
        </div>

        {assignments.length === 0 ? (
          <div className="empty-state">No assignments yet.</div>
        ) : (
          <div className="materials-list-student">
            {assignments.map(item => {
              const isOverdue = new Date(item.deadline) < new Date()
              const isSubmitted = item.status === 'submitted'

              return (
                <div key={item.id} className={`material-item assignment-item ${isSubmitted ? 'submitted' : isOverdue ? 'overdue' : ''}`}>
                  <div className="file-icon-lg">📝</div>
                  <div className="file-info">
                    <div className="file-name">
                      {item.title}
                      {isSubmitted && <span className="status-badge success">✅ Submitted</span>}
                      {!isSubmitted && isOverdue && <span className="status-badge danger">⏰ Overdue</span>}
                      {!isSubmitted && !isOverdue && <span className="status-badge warning">⏳ Pending</span>}
                    </div>
                    <div className="file-meta">
                      {item.fileType} • {item.size} • Due: {new Date(item.deadline).toLocaleString()}
                    </div>
                  </div>
                  <div className="assignment-actions">
                    <button className="download-btn" title="Download Assignment">
                      ⬇️ Download
                    </button>
                    {!isSubmitted && !isOverdue && (
                      <button 
                        className="submit-btn" 
                        onClick={() => handleSubmitWork(item.id)}
                      >
                        📤 Submit Work
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Submit Modal */}
        {submitModalOpen && (
          <div className="modal-overlay" onClick={() => setSubmitModalOpen(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>📤 Submit Your Work</h3>
              <p>Upload your completed assignment file below.</p>
              
              <div className="upload-zone-student">
                <div>📁</div>
                <p>Click to select a file or drag & drop</p>
                <span>PDF, DOCX, JPG, PNG (Max 25MB)</span>
                <input type="file" className="file-input-hidden" />
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setSubmitModalOpen(null)}>Cancel</button>
                <button className="confirm-btn" onClick={handleConfirmSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ===== MAIN COURSES VIEW =====
  return (
    <div>
      <div className="page-header">
        <h1>📚 Learning Management System</h1>
        <p>Click on a course to view notes, assignments, and submit your work</p>
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
          <div 
            key={course.name} 
            className="course-card animate-in clickable"
            onClick={() => setSelectedCourse(course.name)}
          >
            <div className={`course-banner ${course.banner}`}>
              {course.icon}
            </div>
            <div className="course-body">
              <h3>{course.name}</h3>
              <p>Instructor: {course.teacher}</p>
              <div className="course-materials-count">
                📄 {course.materials.filter(m => m.type === 'note').length} Notes • 📝 {course.materials.filter(m => m.type === 'assignment').length} Assignments
              </div>
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
