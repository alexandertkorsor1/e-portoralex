import { useState } from 'react'
import './LMS.css'

export default function FacultyLMS() {
  const [selectedClass, setSelectedClass] = useState('10A')
  
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Chapter 7 - Quadratic Equations.pdf', size: '2.4 MB', date: 'Feb 15, 2026', type: 'note', fileType: 'PDF' },
    { id: 2, name: 'Algebra Homework Sheet 3.docx', size: '156 KB', date: 'Feb 12, 2026', type: 'assignment', deadline: '2026-02-20T23:59', fileType: 'DOC' },
    { id: 3, name: 'Lecture Slides - Week 4.pptx', size: '5.1 MB', date: 'Feb 10, 2026', type: 'note', fileType: 'PPT' },
  ])
  
  const [uploadType, setUploadType] = useState('note')
  const [deadline, setDeadline] = useState('')

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

      <div className="upload-controls" style={{ marginBottom: 'var(--sp-md)', display: 'flex', gap: 'var(--sp-md)', alignItems: 'center' }}>
        <select 
            value={uploadType} 
            onChange={(e) => setUploadType(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
        >
            <option value="note">📄 Lecture Note</option>
            <option value="assignment">📝 Assignment</option>
        </select>
        
        {uploadType === 'assignment' && (
            <input 
                type="datetime-local" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
            />
        )}
      </div>

      <div className="upload-zone">
        <div className="upload-icon">☁️</div>
        <div className="upload-text">
            Upload {uploadType === 'assignment' ? 'Assignment' : 'Lecture Note'}
        </div>
        <div className="upload-subtext">Supported formats: PDF, DOCX, PPTX, JPG, PNG (Max 25MB)</div>
      </div>

      <div className="section-title" style={{ marginBottom: 'var(--sp-md)' }}>
        <h3>Uploaded Materials ({materials.length})</h3>
      </div>

      <div className="materials-list">
        {materials.map((file) => (
            <div key={file.id} className="material-item">
                <div className="file-icon">
                    {file.type === 'assignment' ? '📝' : file.fileType === 'PDF' ? '📄' : '📊'}
                </div>
                <div className="file-info">
                    <div className="file-name">
                        {file.name} 
                        {file.type === 'assignment' && <span className="badge warning" style={{ marginLeft: '8px', fontSize: '0.7rem' }}>Assignment</span>}
                    </div>
                    <div className="file-meta">
                        {file.size} • Uploaded on {file.date}
                        {file.type === 'assignment' && file.deadline && (
                            <span style={{ color: 'var(--danger)', marginLeft: '10px', fontWeight: 600 }}>
                                Due: {new Date(file.deadline).toLocaleString()}
                            </span>
                        )}
                    </div>
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
