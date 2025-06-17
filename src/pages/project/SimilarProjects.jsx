import React from 'react';
import { Link } from 'react-router-dom';

const SimilarProjects = () => (
  <div className="card border-0 shadow-sm">
    <div className="card-body">
      <h2 className="card-title mb-4">Similar Projects</h2>
      <div className="row">
        {[1, 2, 3].map(item => (
          <div key={item} className="col-md-4 mb-4">
            <div className="card h-100">
              <div
                className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                style={{ height: '150px' }}
              >
                <span className="text-white">Project Image</span>
              </div>
              <div className="card-body">
                <h5 className="card-title">Project Title {item}</h5>
                <p className="card-text">Short description of the project goes here...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">Category</span>
                  <span className="text-success fw-bold">45% Funded</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        <Link to="/projects" className="btn btn-outline-primary">
          View All Projects
        </Link>
      </div>
    </div>
  </div>
);

export default SimilarProjects;