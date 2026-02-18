import { useState } from 'react'
import './MarksEntry.css'

export default function MarksEntry() {
  const [selectedClass, setSelectedClass] = useState('10A')
  const [examType, setExamType] = useState('midterm')
  
  // Mock student data
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', roll: '10A01', marks: 0 },
    { id: 2, name: 'Bob Smith', roll: '10A02', marks: 0 },
    { id: 3, name: 'Charlie Davis', roll: '10A03', marks: 0 },
    { id: 4, name: 'Diana Evans', roll: '10A04', marks: 0 },
    { id: 5, name: 'Ethan Hunt', roll: '10A05', marks: 0 },
  ])

  const handleMarkChange = (id, value) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, marks: value } : s
    ))
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📝 Marks Entry</h1>
        <p>Record and update student performance for Exams and Quizzes</p>
      </div>

      <div className="marks-filters">
        <div className="filter-group">
            <label>Select Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="10A">Grade 10A — Mathematics</option>
                <option value="11B">Grade 11B — Physics</option>
                <option value="9C">Grade 9C — Chemistry</option>
            </select>
        </div>
        <div className="filter-group">
            <label>Assessment Type</label>
            <select value={examType} onChange={(e) => setExamType(e.target.value)}>
                <option value="midterm">Mid-Term Exam</option>
                <option value="final">Final Exam</option>
                <option value="quiz1">Quiz 1</option>
                <option value="quiz2">Quiz 2</option>
            </select>
        </div>
      </div>

      <div className="marks-table-container">
        <table className="data-table">
            <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Marks Obtained (100)</th>
                    <th>Grade</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.roll}</td>
                        <td style={{ fontWeight: 600 }}>{student.name}</td>
                        <td>
                            <input 
                                type="number" 
                                min="0" 
                                max="100" 
                                className="marks-input"
                                value={student.marks}
                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                            />
                        </td>
                        <td>
                            {student.marks >= 90 ? 'A+' : 
                             student.marks >= 80 ? 'A' :
                             student.marks >= 70 ? 'B' :
                             student.marks >= 60 ? 'C' : 'F'}
                        </td>
                        <td>
                            <span className={`badge ${student.marks >= 60 ? 'success' : 'danger'}`}>
                                {student.marks >= 60 ? 'Pass' : 'Fail'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="action-bar">
        <button className="save-btn">
            💾 Save Marks
        </button>
      </div>
    </div>
  )
}
