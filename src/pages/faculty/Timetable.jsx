import { useNavigate } from 'react-router-dom'
import './Timetable.css'

export default function FacultyTimetable() {
  const navigate = useNavigate()

  const handleClassClick = (className) => {
    // Navigate to Attendance page with pre-selected class
    navigate('/faculty/attendance', { state: { className } })
  }

  // Simple mock data for timetable structure
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00']

  const getSchedule = (day, time) => {
    // Mock logic to return class data
    if (day === 'Mon' && time === '8:00') return { subject: 'Math 10A', room: '204' }
    if (day === 'Mon' && time === '10:00') return { subject: 'Math 11B', room: '301' }
    if (day === 'Tue' && time === '9:00') return { subject: 'Math 9C', room: '105' }
    if (day === 'Wed' && time === '11:00') return { subject: 'Math 10A', room: '204' }
    if (day === 'Thu' && time === '8:00') return { subject: 'Math 11B', room: '301' }
    if (day === 'Fri' && time === '10:00') return { subject: 'Math 9C', room: '105' }
    return null
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🗓️ Class Timetable</h1>
        <p>Click on any class to take attendance</p>
      </div>

      <div className="timetable-grid">
        <div className="timetable-header">Time</div>
        {days.map(day => <div key={day} className="timetable-header">{day}</div>)}

        {times.map(time => (
            <>
                <div key={time} className="time-slot">{time}</div>
                {days.map(day => {
                    const schedule = getSchedule(day, time)
                    return (
                        <div 
                            key={`${day}-${time}`} 
                            className={`class-slot ${schedule ? '' : 'empty'}`}
                            onClick={() => schedule && handleClassClick(schedule.subject)}
                        >
                            {schedule && (
                                <>
                                    <div className="slot-subject">{schedule.subject}</div>
                                    <div className="slot-room">Room {schedule.room}</div>
                                </>
                            )}
                        </div>
                    )
                })}
            </>
        ))}
      </div>
    </div>
  )
}
