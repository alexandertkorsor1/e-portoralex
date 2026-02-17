import './Notifications.css'

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'info',
      icon: '📋',
      title: 'Mid-Term Exam Schedule Published',
      message: 'The mid-term examination schedule for all grades has been published. Please check the timetable section.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      icon: '⚠️',
      title: 'Fee Payment Reminder',
      message: 'Your sports fee and exam fee are due by March 15, 2026. Please make the payment at the earliest.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      icon: '✅',
      title: 'Assignment Graded — Mathematics',
      message: 'Your Chapter 5 assignment has been graded. Score: 18/20. Great job!',
      time: '1 day ago',
      read: false,
    },
    {
      id: 4,
      type: 'info',
      icon: '📚',
      title: 'New Course Material Available',
      message: 'New study materials for General Science Chapter 8 have been uploaded to the LMS.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'danger',
      icon: '🚨',
      title: 'Attendance Warning',
      message: 'Your attendance for January was below 80% in History class. Please improve your attendance.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 6,
      type: 'success',
      icon: '🏆',
      title: 'Quiz Result — Science',
      message: 'You scored 19/20 in the Physics quiz. Excellent performance!',
      time: '4 days ago',
      read: true,
    },
    {
      id: 7,
      type: 'info',
      icon: '📅',
      title: 'Parent-Teacher Meeting',
      message: 'A parent-teacher meeting is scheduled for March 1, 2026 at 10:00 AM.',
      time: '5 days ago',
      read: true,
    },
    {
      id: 8,
      type: 'warning',
      icon: '📝',
      title: 'Assignment Due — English',
      message: 'Your English essay on "Climate Change" is due by February 20, 2026.',
      time: '1 week ago',
      read: true,
    },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div>
      <div className="page-header">
        <h1>🔔 Notifications</h1>
        <p>You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>All Notifications</h3>
          <span className="badge info">{unreadCount} New</span>
        </div>
        <div className="notif-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="notif-item"
              style={{
                borderLeft: !notif.read ? '3px solid var(--accent)' : '3px solid transparent',
                background: !notif.read ? 'rgba(212, 168, 67, 0.04)' : 'var(--bg)',
              }}
            >
              <div className={`notif-icon ${notif.type}`}>{notif.icon}</div>
              <div className="notif-body">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <span className="notif-time">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
