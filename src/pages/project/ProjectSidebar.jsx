import React from 'react';

const ProjectSidebar = ({ project, daysLeft }) => (
  <div className="position-sticky" style={{ top: '20px' }}>
    <div className="card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Support This Project</h3>
        <div className="d-grid gap-2 mb-4">
          <button
            className="btn btn-primary btn-lg"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Contribute to this project"
          >
            <i className="bi bi-coin me-2"></i>Donate Now
          </button>
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Choose a reward"
          >
            <i className="bi bi-gift me-2"></i>Select Reward
          </button>
        </div>
        <div className="mb-4">
          <h5 className="mb-3">Project Creator</h5>
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary me-3 d-flex align-items-center justify-content-center"
              style={{ width: '50px', height: '50px' }}
            >
              <span className="text-white">{project.user?.username?.charAt(0) || 'A'}</span>
            </div>
            <div>
              <p className="mb-0 fw-bold">{project.user?.username || 'Anonymous'}</p>
              <small className="text-muted">Member since 2023</small>
            </div>
          </div>
        </div>
        <div className="border-top pt-3">
          <h5 className="mb-3">Project Stats</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Backers
              <span className="badge bg-primary rounded-pill">142</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Days to go
              <span className="badge bg-primary rounded-pill">{daysLeft || 'N/A'}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Updates
              <span className="badge bg-primary rounded-pill">5</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Share This Project</h5>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary flex-fill"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Share on Facebook"
          >
            <i className="bi bi-facebook me-1"></i>Facebook
          </button>
          <button
            className="btn btn-outline-info flex-fill"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Share on Twitter"
          >
            <i className="bi bi-twitter me-1"></i>Twitter
          </button>
          <button
            className="btn btn-outline-danger flex-fill"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Copy project link"
          >
            <i className="bi bi-link-45deg"></i>Copy Link
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectSidebar;