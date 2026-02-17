import './Fees.css'

export default function Fees() {
  const feeItems = [
    { item: 'Tuition Fee', amount: 500, status: 'paid', date: 'Jan 15, 2026' },
    { item: 'Library Fee', amount: 50, status: 'paid', date: 'Jan 15, 2026' },
    { item: 'Lab Fee', amount: 75, status: 'paid', date: 'Jan 15, 2026' },
    { item: 'Sports Fee', amount: 40, status: 'pending', date: '—' },
    { item: 'Exam Fee', amount: 100, status: 'pending', date: '—' },
    { item: 'Development Fee', amount: 60, status: 'unpaid', date: '—' },
  ]

  const totalFee = feeItems.reduce((sum, f) => sum + f.amount, 0)
  const paidFee = feeItems.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0)
  const pendingFee = totalFee - paidFee

  return (
    <div>
      <div className="page-header">
        <h1>💰 Fees</h1>
        <p>View your fee breakdown and payment status</p>
      </div>

      {/* Fee Summary */}
      <div className="fee-summary">
        <div className="fee-box total">
          <h4>Total Fees</h4>
          <div className="fee-amount">${totalFee}</div>
        </div>
        <div className="fee-box paid">
          <h4>Paid</h4>
          <div className="fee-amount">${paidFee}</div>
        </div>
        <div className="fee-box pending-fee">
          <h4>Pending</h4>
          <div className="fee-amount">${pendingFee}</div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="card">
        <div className="card-header">
          <h3>Fee Breakdown — Academic Year 2025-2026</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fee Item</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {feeItems.map((fee, idx) => (
                <tr key={fee.item}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 600 }}>{fee.item}</td>
                  <td>${fee.amount}</td>
                  <td>
                    <span className={`badge ${fee.status}`}>
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </span>
                  </td>
                  <td>{fee.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
