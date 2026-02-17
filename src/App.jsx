import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import StudentDashboard from './pages/student/Dashboard.jsx'
import LMS from './pages/student/LMS.jsx'
import Fees from './pages/student/Fees.jsx'
import Attendance from './pages/student/Attendance.jsx'
import Timetable from './pages/student/Timetable.jsx'
import ExamResult from './pages/student/ExamResult.jsx'
import QuizMark from './pages/student/QuizMark.jsx'
import Notifications from './pages/student/Notifications.jsx'
import Announcement from './pages/student/Announcement.jsx'
import AcademicCalendar from './pages/student/AcademicCalendar.jsx'
import Certificate from './pages/student/Certificate.jsx'
import Profile from './pages/student/Profile.jsx'
import FacultyDashboard from './pages/faculty/Dashboard.jsx'

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem('userRole')
  if (!userRole) return <Navigate to="/" replace />
  if (role && userRole !== role) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute role="student">
            <DashboardLayout role="student" />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="lms" element={<LMS />} />
          <Route path="fees" element={<Fees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="exam-result" element={<ExamResult />} />
          <Route path="quiz-mark" element={<QuizMark />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="announcement" element={<Announcement />} />
          <Route path="academic-calendar" element={<AcademicCalendar />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={
          <ProtectedRoute role="faculty">
            <DashboardLayout role="faculty" />
          </ProtectedRoute>
        }>
          <Route index element={<FacultyDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
