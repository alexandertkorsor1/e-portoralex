import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('student')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showForgot, setShowForgot] = useState(false)
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>

          <div className="forgot-password-row">
            <button type="button" className="forgot-link" onClick={() => setShowForgot(true)}>
              🔑 Forgot Password?
            </button>
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

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="forgot-modal-overlay" onClick={() => setShowForgot(false)}>
            <div className="forgot-modal" onClick={(e) => e.stopPropagation()}>
              <h3>🔑 Forgot Password</h3>
              <p>Enter your Username / ID below and contact the school administration to reset your password.</p>
              <div className="forgot-input-group">
                <input type="text" placeholder="Enter your Username / ID" className="forgot-input" />
              </div>
              <div className="forgot-contact">
                <p>📞 Contact Admin:</p>
                <span className="forgot-number">0886 326 999</span>
                <span className="forgot-number">0775 577 593</span>
              </div>
              <div className="forgot-actions">
                <button className="forgot-cancel" onClick={() => setShowForgot(false)}>Cancel</button>
                <button className="forgot-submit" onClick={() => { alert('Request sent! Contact admin for help.'); setShowForgot(false) }}>Send Request</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
