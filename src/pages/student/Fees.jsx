import { useState } from 'react'
import './Fees.css'

export default function Fees() {
  const [currency, setCurrency] = useState('USD')
  const [showPayModal, setShowPayModal] = useState(false)
  const [payMethod, setPayMethod] = useState('')
  const [paymentProof, setPaymentProof] = useState(null)
  const [paymentProofName, setPaymentProofName] = useState('')
  const [selectedFee, setSelectedFee] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [customAmount, setCustomAmount] = useState('')

  const exchangeRate = 192 // 1 USD = 192 LRD approx

  const feeItems = [
    { id: 1, item: 'Tuition Fee', amountUSD: 500, status: 'paid', date: 'Jan 15, 2026' },
    { id: 2, item: 'Library Fee', amountUSD: 50, status: 'paid', date: 'Jan 15, 2026' },
    { id: 3, item: 'Lab Fee', amountUSD: 75, status: 'paid', date: 'Jan 15, 2026' },
    { id: 4, item: 'Sports Fee', amountUSD: 40, status: 'pending', date: '—' },
    { id: 5, item: 'Exam Fee', amountUSD: 100, status: 'pending', date: '—' },
    { id: 6, item: 'Development Fee', amountUSD: 60, status: 'unpaid', date: '—' },
  ]

  const formatAmount = (usd) => {
    if (currency === 'USD') return `$${usd.toLocaleString()}`
    return `LRD ${(usd * exchangeRate).toLocaleString()}`
  }

  const totalFee = feeItems.reduce((sum, f) => sum + f.amountUSD, 0)
  const paidFee = feeItems.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amountUSD, 0)
  const pendingFee = totalFee - paidFee

  const handlePayClick = (fee) => {
    setSelectedFee(fee)
    setPayMethod('')
    setPaymentProof(null)
    setPaymentProofName('')
    setPaymentSuccess(false)
    setCustomAmount('')
    setShowPayModal(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPaymentProof(file)
      setPaymentProofName(file.name)
    }
  }

  const handleSubmitPayment = () => {
    if (!payMethod) {
      alert('Please select a payment method')
      return
    }
    if (!paymentProof) {
      alert('Please upload your payment proof')
      return
    }
    setPaymentSuccess(true)
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>💰 Fees & Payment</h1>
        <p>View fee breakdown, make payments, and upload payment proof</p>
      </div>

      {/* Currency Selector */}
      <div className="currency-selector">
        <span className="currency-label">💱 Currency:</span>
        <button 
          className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
          onClick={() => setCurrency('USD')}
        >
          🇺🇸 USD
        </button>
        <button 
          className={`currency-btn ${currency === 'LRD' ? 'active' : ''}`}
          onClick={() => setCurrency('LRD')}
        >
          🇱🇷 LRD
        </button>
        {currency === 'LRD' && (
          <span className="exchange-note">Rate: 1 USD = {exchangeRate} LRD</span>
        )}
      </div>

      {/* Fee Summary */}
      <div className="fee-summary">
        <div className="fee-box total">
          <h4>Total Fees</h4>
          <div className="fee-amount">{formatAmount(totalFee)}</div>
        </div>
        <div className="fee-box paid">
          <h4>Paid</h4>
          <div className="fee-amount">{formatAmount(paidFee)}</div>
        </div>
        <div className="fee-box pending-fee">
          <h4>Outstanding</h4>
          <div className="fee-amount">{formatAmount(pendingFee)}</div>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="payment-methods-section">
        <div className="card">
          <div className="card-header">
            <h3>📱 Payment Methods Available</h3>
          </div>
          <div className="payment-methods-grid">
            <div className="pay-method-card">
              <div className="pay-method-icon">🏦</div>
              <h4>Bank Transfer</h4>
              <p>Transfer directly to school bank account</p>
            </div>
            <div className="pay-method-card">
              <div className="pay-method-icon">📱</div>
              <h4>Mobile Money</h4>
              <p className="pay-numbers">
                <strong>0886 326 999</strong>
                <br />
                <strong>0775 577 593</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Table */}
      <div className="card">
        <div className="card-header">
          <h3>📋 Fee Breakdown — Academic Year 2025-2026</h3>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feeItems.map((fee, idx) => (
                <tr key={fee.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 600 }}>{fee.item}</td>
                  <td style={{ fontWeight: 600 }}>{formatAmount(fee.amountUSD)}</td>
                  <td>
                    <span className={`badge ${fee.status}`}>
                      {fee.status === 'paid' ? '✅ Paid' : fee.status === 'pending' ? '⏳ Pending' : '❌ Unpaid'}
                    </span>
                  </td>
                  <td>{fee.date}</td>
                  <td>
                    {fee.status !== 'paid' ? (
                      <button 
                        className="pay-now-btn"
                        onClick={() => handlePayClick(fee)}
                      >
                        💳 Pay Now
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.8rem' }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="totals-row">
                <td></td>
                <td style={{ fontWeight: 800 }}>Total</td>
                <td style={{ fontWeight: 800 }}>{formatAmount(totalFee)}</td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content pay-modal" onClick={(e) => e.stopPropagation()}>
            
            {paymentSuccess ? (
              /* Success State */
              <div className="payment-success-view">
                <div className="success-icon">✅</div>
                <h2>Payment Submitted!</h2>
                <p>Your payment proof for <strong>{selectedFee?.item}</strong> ({formatAmount(selectedFee?.amountUSD)}) has been uploaded successfully.</p>
                <p className="success-note">The school administration will verify your payment within 24-48 hours.</p>
                <button className="confirm-btn" onClick={() => setShowPayModal(false)}>
                  Done
                </button>
              </div>
            ) : (
              /* Payment Form */
              <>
                <div className="pay-modal-header">
                  <h3>💳 Make Payment</h3>
                  <button className="close-modal-btn" onClick={() => setShowPayModal(false)}>✕</button>
                </div>

                <div className="pay-modal-fee-info">
                  <span>{selectedFee?.item}</span>
                  <span className="pay-modal-amount">{formatAmount(selectedFee?.amountUSD)}</span>
                </div>

                {/* Custom Amount Input */}
                <div className="custom-amount-section">
                  <label className="custom-amount-label">Enter Amount You Are Paying ({currency})</label>
                  <div className="custom-amount-input-wrap">
                    <span className="amount-prefix">{currency === 'USD' ? '$' : 'LRD'}</span>
                    <input
                      type="number"
                      className="custom-amount-input"
                      placeholder={`e.g. ${currency === 'USD' ? selectedFee?.amountUSD : selectedFee?.amountUSD * exchangeRate}`}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="0"
                    />
                  </div>
                  {customAmount && currency === 'LRD' && (
                    <span className="converted-note">≈ ${(Number(customAmount) / exchangeRate).toFixed(2)} USD</span>
                  )}
                  {customAmount && currency === 'USD' && (
                    <span className="converted-note">≈ LRD {(Number(customAmount) * exchangeRate).toLocaleString()}</span>
                  )}
                </div>

                {/* Step 1: Choose Method */}
                <div className="pay-step">
                  <div className="pay-step-num">1</div>
                  <h4>Select Payment Method</h4>
                </div>

                <div className="pay-options">
                  <div 
                    className={`pay-option ${payMethod === 'bank' ? 'selected' : ''}`}
                    onClick={() => setPayMethod('bank')}
                  >
                    <div className="pay-option-icon">🏦</div>
                    <div>
                      <strong>Bank Transfer</strong>
                      <p>Transfer to school bank account</p>
                    </div>
                    {payMethod === 'bank' && <span className="check-mark">✓</span>}
                  </div>

                  <div 
                    className={`pay-option ${payMethod === 'mobile' ? 'selected' : ''}`}
                    onClick={() => setPayMethod('mobile')}
                  >
                    <div className="pay-option-icon">📱</div>
                    <div>
                      <strong>Mobile Money</strong>
                      <p>Send to the numbers below</p>
                    </div>
                    {payMethod === 'mobile' && <span className="check-mark">✓</span>}
                  </div>
                </div>

                {/* Show contact numbers for mobile money */}
                {payMethod === 'mobile' && (
                  <div className="mobile-numbers-box">
                    <p>📱 Send payment to either number:</p>
                    <div className="number-row">
                      <span className="phone-number">0886 326 999</span>
                      <button className="copy-btn" onClick={() => {navigator.clipboard.writeText('0886326999'); alert('Number copied!')}}>📋 Copy</button>
                    </div>
                    <div className="number-row">
                      <span className="phone-number">0775 577 593</span>
                      <button className="copy-btn" onClick={() => {navigator.clipboard.writeText('0775577593'); alert('Number copied!')}}>📋 Copy</button>
                    </div>
                    <p className="mobile-note">After sending, take a screenshot of the confirmation and upload it below.</p>
                  </div>
                )}

                {/* Show bank info */}
                {payMethod === 'bank' && (
                  <div className="mobile-numbers-box">
                    <p>🏦 Transfer to the school's bank account. After payment, take a screenshot or photo of the transaction receipt and upload it below.</p>
                  </div>
                )}

                {/* Step 2: Upload Proof */}
                {payMethod && (
                  <>
                    <div className="pay-step">
                      <div className="pay-step-num">2</div>
                      <h4>Upload Payment Proof</h4>
                    </div>

                    <div className="upload-proof-zone">
                      {paymentProofName ? (
                        <div className="proof-uploaded">
                          <span className="proof-icon">🖼️</span>
                          <span className="proof-name">{paymentProofName}</span>
                          <button className="remove-proof" onClick={() => { setPaymentProof(null); setPaymentProofName('') }}>✕</button>
                        </div>
                      ) : (
                        <label className="upload-proof-label">
                          <div className="upload-proof-content">
                            <span>📸</span>
                            <p>Click to upload payment screenshot</p>
                            <span className="upload-hint">JPG, PNG, or PDF (Max 10MB)</span>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*,.pdf" 
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>

                    {/* Step 3: Submit */}
                    <div className="pay-step">
                      <div className="pay-step-num">3</div>
                      <h4>Confirm & Submit</h4>
                    </div>

                    <div className="pay-summary-box">
                      <div className="pay-summary-row">
                        <span>Fee:</span><strong>{selectedFee?.item}</strong>
                      </div>
                      <div className="pay-summary-row">
                        <span>Amount Paying:</span><strong>{customAmount ? `${currency === 'USD' ? '$' : 'LRD '}${Number(customAmount).toLocaleString()}` : formatAmount(selectedFee?.amountUSD)}</strong>
                      </div>
                      <div className="pay-summary-row">
                        <span>Method:</span><strong>{payMethod === 'bank' ? '🏦 Bank Transfer' : '📱 Mobile Money'}</strong>
                      </div>
                      <div className="pay-summary-row">
                        <span>Proof:</span><strong>{paymentProofName || 'Not uploaded'}</strong>
                      </div>
                    </div>

                    <button 
                      className="submit-payment-btn"
                      onClick={handleSubmitPayment}
                      disabled={!paymentProof}
                    >
                      ✅ Submit Payment
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
