import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('student')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }

    // Mock authentication
    localStorage.setItem('userRole', role)
    localStorage.setItem('userName', username)
    navigate(role === 'student' ? '/student' : '/faculty')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="school-crest">🏫</div>
          <h1>Foya Free Pentecostal<br />Mission High School</h1>
          <p>Student & Faculty E-Portal</p>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
          <div
            className="role-slider"
            style={{ transform: role === 'faculty' ? 'translateX(100%)' : 'translateX(0)' }}
          />
          <button
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
            type="button"
          >
            🎓 Student
          </button>
          <button
            className={`role-btn ${role === 'faculty' ? 'active' : ''}`}
            onClick={() => setRole('faculty')}
            type="button"
          >
            👨‍🏫 Faculty
          </button>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username / ID</label>
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder={role === 'student' ? 'Enter student ID' : 'Enter faculty ID'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '0.82rem',
              textAlign: 'center',
              padding: '8px',
              background: 'rgba(231, 76, 60, 0.1)',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="login-btn">
            Sign In as {role === 'student' ? 'Student' : 'Faculty'} →
          </button>
        </form>

        <div className="login-footer">
          © 1980 Foya Free Pentecostal Mission High School
        </div>
      </div>
    </div>
  )
}
