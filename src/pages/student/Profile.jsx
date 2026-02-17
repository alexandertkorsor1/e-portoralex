import './Profile.css'

export default function Profile() {
  const userName = localStorage.getItem('userName') || 'John Doe'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const studentInfo = {
    'Student ID': 'FFPMHS-2025-0142',
    'Full Name': userName,
    'Grade': '10-A',
    'Date of Birth': 'March 15, 2010',
    'Gender': 'Male',
    'Email': 'student@ffpmhs.edu',
    'Phone': '+231 XXX XXX XXXX',
    'Address': 'Foya, Lofa County, Liberia',
    'Guardian Name': 'Mr. James Doe',
    'Guardian Phone': '+231 XXX XXX XXXX',
    'Enrollment Date': 'September 1, 2023',
    'Blood Group': 'O+',
  }

  return (
    <div>
      <div className="page-header">
        <h1>👤 Student Profile</h1>
        <p>View and manage your personal information</p>
      </div>

      <div className="content-grid">
        {/* Profile Card */}
        <div className="card profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name">{userName}</div>
          <div className="profile-role">Student — Grade 10-A</div>
          <div style={{
            display: 'flex', gap: 'var(--sp-sm)', justifyContent: 'center',
            marginTop: 'var(--sp-md)', flexWrap: 'wrap'
          }}>
            <span className="badge pass">Active</span>
            <span className="badge info">2025-2026</span>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--sp-sm)', marginTop: 'var(--sp-xl)'
          }}>
            <div style={{
              background: 'var(--bg)', borderRadius: 'var(--radius-md)',
              padding: 'var(--sp-md)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>92%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>Attendance</div>
            </div>
            <div style={{
              background: 'var(--bg)', borderRadius: 'var(--radius-md)',
              padding: 'var(--sp-md)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>A</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>Grade</div>
            </div>
            <div style={{
              background: 'var(--bg)', borderRadius: 'var(--radius-md)',
              padding: 'var(--sp-md)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--info)' }}>3rd</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>Rank</div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="card">
          <div className="card-header">
            <h3>Personal Information</h3>
          </div>
          <div className="profile-details">
            {Object.entries(studentInfo).map(([label, value]) => (
              <div key={label} className="detail-item">
                <label>{label}</label>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
