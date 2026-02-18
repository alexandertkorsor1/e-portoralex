import { useState } from 'react'
import './LMS.css'

export default function FacultyLMS() {
  const [selectedClass, setSelectedClass] = useState('10A')
  
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Chapter 7 - Quadratic Equations.pdf', size: '2.4 MB', date: 'Feb 15, 2026', type: 'PDF' },
    { id: 2, name: 'Algebra Homework Sheet 3.docx', size: '156 KB', date: 'Feb 12, 2026', type: 'DOC' },
    { id: 3, name: 'Lecture Slides - Week 4.pptx', size: '5.1 MB', date: 'Feb 10, 2026', type: 'PPT' },
  ])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this file?')) {
        setMaterials(materials.filter(m => m.id !== id))
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📚 Learning Management System</h1>
        <p>Upload lecture notes, assignments, and resources for students</p>
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
      </div>

      <div className="upload-zone">
        <div className="upload-icon">☁️</div>
        <div className="upload-text">Click or Drag files to upload</div>
        <div className="upload-subtext">Supported formats: PDF, DOCX, PPTX, JPG, PNG (Max 25MB)</div>
      </div>

      <div className="section-title" style={{ marginBottom: 'var(--sp-md)' }}>
        <h3>Uploaded Materials ({materials.length})</h3>
      </div>

      <div className="materials-list">
        {materials.map((file) => (
            <div key={file.id} className="material-item">
                <div className="file-icon">
                    {file.type === 'PDF' ? '📄' : file.type === 'PPT' ? '📊' : '📝'}
                </div>
                <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-meta">{file.size} • Uploaded on {file.date}</div>
                </div>
                <div className="file-actions">
                    <button className="icon-btn" title="Download">⬇️</button>
                    <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(file.id)}>🗑️</button>
                </div>
            </div>
        ))}
        {materials.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                No materials uploaded yet.
            </div>
        )}
      </div>
    </div>
  )
}
