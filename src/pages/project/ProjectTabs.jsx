import React from 'react';

const ProjectTabs = ({ activeTab, setActiveTab, project }) => (
  <>
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
          aria-current={activeTab === 'details' ? 'true' : 'false'}
        >
          Details
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === 'updates' ? 'active' : ''}`}
          onClick={() => setActiveTab('updates')}
          aria-current={activeTab === 'updates' ? 'true' : 'false'}
        >
          Updates
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveTab('comments')}
          aria-current={activeTab === 'comments' ? 'true' : 'false'}
        >
          Comments
        </button>
      </li>
    </ul>
    <div className="tab-content">
      <div className={activeTab === 'details' ? 'active' : ''}>
        <p className="lead">{project.details}</p>
        <div className="mt-4">
          <h4 className="mb-3">Tags</h4>
          <div className="d-flex flex-wrap gap-2">
            {project.tags && project.tags.length > 0 ? (
              project.tags.map(tag => (
                <span key={tag.id} className="badge bg-info p-2">
                  <i className="bi bi-tag me-1"></i> {tag.tagname}
                </span>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        </div>
      </div>
      <div className={activeTab === 'updates' ? 'active' : ''}>
        <div className="list-group">
          <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">Project Launched</h6>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">We've officially launched our project!</p>
          </div>
          <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">First Funding Milestone</h6>
              <small>1 day ago</small>
            </div>
            <p className="mb-1">Reached 25% of our funding goal!</p>
          </div>
        </div>
      </div>
      <div className={activeTab === 'comments' ? 'active' : ''}>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Add a comment..." aria-label="Comment input"></textarea>
          <button className="btn btn-primary mt-2">Post Comment</button>
        </div>
        <div className="list-group mt-3">
          <div className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>John Doe</strong>
              <small>2 hours ago</small>
            </div>
            <p>This project looks amazing! Can't wait to see it completed.</p>
          </div>
          <div className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>Jane Smith</strong>
              <small>5 hours ago</small>
            </div>
            <p>I've backed this project. Good luck with the funding!</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ProjectTabs;