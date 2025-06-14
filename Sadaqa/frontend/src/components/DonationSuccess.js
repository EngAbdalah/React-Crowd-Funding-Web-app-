import React from 'react';
import { Link } from 'react-router-dom';

const DonationSuccess = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <div className="mb-4">
          <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
        </div>
        <h2 className="mb-3">Thank You for Your Donation!</h2>
        <p className="lead mb-4">
          Your contribution makes a real difference. We've sent a confirmation to your email.
        </p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-3">
            Return to Home
          </Link>
          <Link to="/projects" className="btn btn-outline-secondary">
            Browse More Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;