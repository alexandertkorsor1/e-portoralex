import './QuizMark.css'

export default function QuizMark() {
  const quizzes = [
    { subject: 'Mathematics', quiz: 'Quiz 1 — Algebra', marks: 18, total: 20, date: 'Jan 10, 2026' },
    { subject: 'Mathematics', quiz: 'Quiz 2 — Geometry', marks: 16, total: 20, date: 'Jan 24, 2026' },
    { subject: 'English', quiz: 'Quiz 1 — Grammar', marks: 15, total: 20, date: 'Jan 12, 2026' },
    { subject: 'English', quiz: 'Quiz 2 — Comprehension', marks: 17, total: 20, date: 'Feb 02, 2026' },
    { subject: 'Science', quiz: 'Quiz 1 — Physics', marks: 19, total: 20, date: 'Jan 15, 2026' },
    { subject: 'Science', quiz: 'Quiz 2 — Chemistry', marks: 14, total: 20, date: 'Feb 05, 2026' },
    { subject: 'History', quiz: 'Quiz 1 — World War II', marks: 12, total: 20, date: 'Jan 20, 2026' },
    { subject: 'Geography', quiz: 'Quiz 1 — African Geography', marks: 16, total: 20, date: 'Jan 18, 2026' },
    { subject: 'ICT', quiz: 'Quiz 1 — Computer Basics', marks: 20, total: 20, date: 'Feb 10, 2026' },
  ]

  const totalScore = quizzes.reduce((s, q) => s + q.marks, 0)
  const totalPossible = quizzes.reduce((s, q) => s + q.total, 0)

  return (
    <div>
      <div className="page-header">
        <h1>🎯 Quiz Marks</h1>
        <p>Your quiz scores across all subjects</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card info animate-in">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h4>Total Quizzes</h4>
            <div className="stat-value">{quizzes.length}</div>
          </div>
        </div>
        <div className="stat-card success animate-in">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Overall Score</h4>
            <div className="stat-value">{totalScore}/{totalPossible}</div>
          </div>
        </div>
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h4>Average</h4>
            <div className="stat-value">{Math.round((totalScore / totalPossible) * 100)}%</div>
          </div>
        </div>
        <div className="stat-card warning animate-in">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h4>Perfect Scores</h4>
            <div className="stat-value">{quizzes.filter(q => q.marks === q.total).length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Quiz Results</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q, idx) => {
                const pct = Math.round((q.marks / q.total) * 100)
                const status = pct >= 80 ? 'pass' : pct >= 50 ? 'late' : 'fail'
                const statusLabel = pct >= 80 ? 'Excellent' : pct >= 50 ? 'Good' : 'Needs Work'
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td style={{ fontWeight: 600 }}>{q.subject}</td>
                    <td>{q.quiz}</td>
                    <td>{q.marks}/{q.total}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '60px', height: '6px', background: 'var(--bg)',
                          borderRadius: '3px', overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${pct}%`, height: '100%',
                            background: pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)',
                            borderRadius: '3px'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{q.date}</td>
                    <td><span className={`badge ${status}`}>{statusLabel}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
