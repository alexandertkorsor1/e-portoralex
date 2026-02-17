import './Certificate.css'

export default function Certificate() {
  const certificates = [
    {
      id: 1,
      icon: '🎓',
      title: 'Certificate of Enrollment',
      description: 'Official enrollment certificate for the academic year 2025-2026',
      date: 'Issued: Sep 15, 2025',
      status: 'available',
    },
    {
      id: 2,
      icon: '📜',
      title: 'Transfer Certificate',
      description: 'Transfer certificate for school transfer purposes',
      date: 'Request when needed',
      status: 'request',
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Academic Excellence Award',
      description: 'Certificate for achieving 1st position in Grade 10 — Term 1',
      date: 'Issued: Dec 20, 2025',
      status: 'available',
    },
    {
      id: 4,
      icon: '🧪',
      title: 'Science Fair Participation',
      description: 'Certificate of participation in the Inter-School Science Fair 2025',
      date: 'Issued: Nov 10, 2025',
      status: 'available',
    },
    {
      id: 5,
      icon: '⚽',
      title: 'Sports Achievement',
      description: 'Certificate for winning the 100m sprint at the Annual Sports Day',
      date: 'Issued: Oct 25, 2025',
      status: 'available',
    },
    {
      id: 6,
      icon: '📋',
      title: 'Character Certificate',
      description: 'Good character and conduct certificate',
      date: 'Request when needed',
      status: 'request',
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>🎓 Certificates</h1>
        <p>View and download your certificates</p>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--sp-xl)' }}>
        <div className="stat-card accent animate-in">
          <div className="stat-icon">📜</div>
          <div className="stat-info">
            <h4>Available</h4>
            <div className="stat-value">{certificates.filter(c => c.status === 'available').length}</div>
          </div>
        </div>
        <div className="stat-card info animate-in">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h4>On Request</h4>
            <div className="stat-value">{certificates.filter(c => c.status === 'request').length}</div>
          </div>
        </div>
      </div>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card animate-in">
            <div className="cert-icon">{cert.icon}</div>
            <h3>{cert.title}</h3>
            <p>{cert.description}</p>
            <div className="cert-date">{cert.date}</div>
            <button className="download-btn">
              {cert.status === 'available' ? '⬇️ Download' : '📩 Request'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
