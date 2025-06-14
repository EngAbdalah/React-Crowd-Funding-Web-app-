import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonationButton = ({ projectId, projectTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EGP');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleDonate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/donation/api/donations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          project: projectId,
          amount: parseFloat(amount),
          currency: currency
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Donation failed');
      }
      
      // Redirect to success page
      navigate('/donation/success/');
    } catch (error) {
      console.error('Error making donation:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get CSRF token
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div className="donation-container">
      {!showForm ? (
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(true)}
        >
          Donate Now
        </button>
      ) : (
        <form onSubmit={handleDonate} className="donation-form">
          <h4>Donate to: {projectTitle}</h4>
          
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">Currency</label>
            <select
              className="form-select"
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EGP">Egyptian Pound</option>
              <option value="USD">US Dollar</option>
              <option value="EUR">Euro</option>
            </select>
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : 'Confirm Donation'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonationButton;