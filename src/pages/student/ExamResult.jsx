import './ExamResult.css'

export default function ExamResult() {
  const results = [
    { subject: 'Mathematics', marks: 88, total: 100, grade: 'A' },
    { subject: 'English Language', marks: 76, total: 100, grade: 'B' },
    { subject: 'General Science', marks: 92, total: 100, grade: 'A' },
    { subject: 'History', marks: 65, total: 100, grade: 'C' },
    { subject: 'Geography', marks: 78, total: 100, grade: 'B' },
    { subject: 'Creative Arts', marks: 95, total: 100, grade: 'A' },
    { subject: 'Physical Education', marks: 85, total: 100, grade: 'A' },
    { subject: 'ICT', marks: 70, total: 100, grade: 'B' },
  ]

  const totalMarks = results.reduce((s, r) => s + r.marks, 0)
  const totalPossible = results.reduce((s, r) => s + r.total, 0)
  const average = Math.round(totalMarks / results.length)

  return (
    <div>
      <div className="page-header">
        <h1>📝 Exam Results</h1>
        <p>View your examination performance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Total Score</h4>
            <div className="stat-value">{totalMarks}/{totalPossible}</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h4>Average</h4>
            <div className="stat-value">{average}%</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h4>Highest</h4>
            <div className="stat-value">Creative Arts (95)</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h4>Subjects</h4>
            <div className="stat-value">{results.length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Mid-Term Examination Results — 2025-2026</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={r.subject}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 600 }}>{r.subject}</td>
                  <td>{r.marks}</td>
                  <td>{r.total}</td>
                  <td>{Math.round((r.marks / r.total) * 100)}%</td>
                  <td>
                    <span className={`grade-badge ${r.grade.toLowerCase()}`}>
                      {r.grade}
                    </span>
                  </td>
                </tr>
              ))}
              <tr style={{ background: 'var(--bg)', fontWeight: 700 }}>
                <td></td>
                <td>Total / Average</td>
                <td>{totalMarks}</td>
                <td>{totalPossible}</td>
                <td>{Math.round((totalMarks / totalPossible) * 100)}%</td>
                <td><span className="grade-badge a">A</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
