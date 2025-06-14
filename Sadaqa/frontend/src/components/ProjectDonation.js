import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DonationButton from './DonationButton';

const ProjectDonation = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated initially
  const { projectId } = useParams();

  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/user/status/', { credentials: 'include' })
      .then(response => {
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
        return response.json();
      })
      .catch(() => {
        setIsAuthenticated(false);
      });

    // Fetch project details
    fetch(`/api/projects/${projectId}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        return response.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [projectId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: `/projects/${projectId}` }} />;
  }

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!project) {
    return <div className="alert alert-warning mt-3">Project not found</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>{project.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{project.description}</p>
          <div className="progress mb-3">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${(project.current_funding / project.target_amount) * 100}%` }}
              aria-valuenow={(project.current_funding / project.target_amount) * 100}
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {Math.round((project.current_funding / project.target_amount) * 100)}%
            </div>
          </div>
          <p>
            <strong>Raised:</strong> {project.current_funding} {project.currency} of {project.target_amount} {project.currency}
          </p>
          <DonationButton projectId={project.id} projectTitle={project.title} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDonation;