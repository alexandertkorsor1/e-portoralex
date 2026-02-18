import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('student')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }

    // console.log('Attempting login with:', { username, password, role }) // Debug log

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login Successful
        localStorage.setItem('userRole', data.user.role)
        localStorage.setItem('userName', data.user.fullName) // Backend returns fullName
        navigate(data.user.role === 'student' ? '/student' : '/faculty')
      } else {
        // Login Failed
        setError(data.msg || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Ensure backend is running.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="School Crest" className="school-crest-img" />
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
