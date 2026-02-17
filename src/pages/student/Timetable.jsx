import './Timetable.css'

export default function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']

  const schedule = {
    'Monday':    ['Mathematics\nMr. Johnson', 'English\nMrs. Williams', 'Break', 'Science\nDr. Smith', 'Lunch', 'History\nMr. Davis', 'Geography\nMs. Brown'],
    'Tuesday':   ['English\nMrs. Williams', 'Mathematics\nMr. Johnson', 'Break', 'Arts\nMrs. Taylor', 'Lunch', 'Science\nDr. Smith', 'P.E.\nCoach Wilson'],
    'Wednesday': ['Science\nDr. Smith', 'History\nMr. Davis', 'Break', 'Mathematics\nMr. Johnson', 'Lunch', 'English\nMrs. Williams', 'ICT\nMr. Adams'],
    'Thursday':  ['Geography\nMs. Brown', 'Science\nDr. Smith', 'Break', 'English\nMrs. Williams', 'Lunch', 'Mathematics\nMr. Johnson', 'Arts\nMrs. Taylor'],
    'Friday':    ['Mathematics\nMr. Johnson', 'Geography\nMs. Brown', 'Break', 'History\nMr. Davis', 'Lunch', 'Science\nDr. Smith', 'Assembly'],
  }

  return (
    <div>
      <div className="page-header">
        <h1>🗓️ Timetable</h1>
        <p>Your weekly class schedule</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Weekly Schedule — Grade 10A</h3>
          <span className="badge info">Current Week</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div className="timetable-grid">
            {/* Header Row */}
            <div className="tt-header">Time</div>
            {days.map(d => <div key={d} className="tt-header">{d}</div>)}

            {/* Body */}
            {times.map((time, tIdx) => (
              <>
                <div key={`time-${tIdx}`} className="tt-time">{time}</div>
                {days.map((day) => {
                  const cell = schedule[day][tIdx]
                  const [subject, teacher] = cell.split('\n')
                  const isBreak = subject === 'Break' || subject === 'Lunch' || subject === 'Assembly'
                  return (
                    <div
                      key={`${day}-${tIdx}`}
                      className="tt-cell"
                      style={isBreak ? {
                        background: 'var(--bg)',
                        fontStyle: 'italic',
                        color: 'var(--text-light)'
                      } : {}}
                    >
                      <div className="subject">{subject}</div>
                      {teacher && <div className="teacher">{teacher}</div>}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
