import './Announcement.css'

export default function Announcement() {
  const announcements = [
    {
      id: 1,
      title: 'School Reopening After Mid-Term Break',
      content: 'All students are expected to resume classes on March 3, 2026. Please ensure you have all required textbooks and materials. Late arrivals will not be tolerated.',
      author: 'Principal — Rev. J. K. Morris',
      date: 'Feb 17, 2026',
      category: 'General',
      pinned: true,
    },
    {
      id: 2,
      title: 'Inter-School Science Competition 2026',
      content: 'We are pleased to announce that FFPMHS will be participating in the annual Inter-School Science Competition. Interested students should register with their science teacher before February 28, 2026.',
      author: 'Dr. Smith — Science Department',
      date: 'Feb 15, 2026',
      category: 'Competition',
      pinned: true,
    },
    {
      id: 3,
      title: 'New Library Books Available',
      content: 'The school library has received a new collection of books covering Mathematics, Science, and Literature. Students are encouraged to visit the library during free periods.',
      author: 'Mrs. Parker — Librarian',
      date: 'Feb 12, 2026',
      category: 'Library',
      pinned: false,
    },
    {
      id: 4,
      title: 'Sports Day Announcement',
      content: 'The annual Sports Day will be held on March 20, 2026. All students are expected to participate. House captains should meet Coach Wilson for event assignments.',
      author: 'Coach Wilson — Sports Department',
      date: 'Feb 10, 2026',
      category: 'Sports',
      pinned: false,
    },
    {
      id: 5,
      title: 'Community Service Day',
      content: 'FFPMHS will participate in a community service event on March 8, 2026. Students will help clean and beautify the local community center. Volunteers should sign up at the front office.',
      author: 'Student Council',
      date: 'Feb 08, 2026',
      category: 'Community',
      pinned: false,
    },
    {
      id: 6,
      title: 'Updated School Uniform Policy',
      content: 'Starting March 2026, all students must wear the updated school uniform as specified in the handbook. Please ensure compliance to avoid disciplinary action.',
      author: 'Admin Office',
      date: 'Feb 05, 2026',
      category: 'Policy',
      pinned: false,
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>📢 Announcements</h1>
        <p>Official school announcements and notices</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {announcements.map((a) => (
          <div key={a.id} className="card animate-in" style={{ position: 'relative' }}>
            {a.pinned && (
              <div style={{
                position: 'absolute', top: 'var(--sp-md)', right: 'var(--sp-md)',
                background: 'var(--accent)', color: 'var(--primary-dark)',
                fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px',
                borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                📌 Pinned
              </div>
            )}
            <div style={{ display: 'flex', gap: 'var(--sp-sm)', marginBottom: 'var(--sp-sm)', flexWrap: 'wrap' }}>
              <span className="badge info">{a.category}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>📅 {a.date}</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 'var(--sp-sm)' }}>{a.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{a.content}</p>
            <div style={{
              marginTop: 'var(--sp-md)', paddingTop: 'var(--sp-md)',
              borderTop: '1px solid var(--border-light)',
              fontSize: '0.8rem', color: 'var(--text-light)'
            }}>
              ✍️ {a.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
