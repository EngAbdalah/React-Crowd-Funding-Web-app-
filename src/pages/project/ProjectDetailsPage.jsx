import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API, BASE_URL } from '../../api/axios';
import ProjectCarousel from './ProjectCarousel';
import ProjectSidebar from './ProjectSidebar';
import ProjectGallery from './ProjectGallery';
import ProjectLightbox from './ProjectLightbox';
import ProjectTabs from './ProjectTabs';
import SimilarProjects from './SimilarProjects';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`api/projects/${id}/`);
        setProject(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project details', error);
        setIsLoading(false);
      }
    };

    const fetchPictures = async () => {
      try {
        const res = await API.get(`/api/project-pics/?project=${id}`);
        setPictures(res.data);
      } catch (error) {
        console.error("Error fetching pictures", error);
      }
    };

    setIsLoading(true);
    fetchProject();
    fetchPictures();

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

    return () => {
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltip = window.bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltip) tooltip.dispose();
      });
    };
  }, [id]);

  const handlePrevImage = () => setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length);
  const handleNextImage = () => setPhotoIndex((photoIndex + 1) % pictures.length);

  const fundingPercentage = project?.funding_percentage?.toFixed(2) || 0;
  const daysLeft = project?.end_date
    ? Math.ceil((new Date(project.end_date) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" aria-label="Loading project details">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container my-5 py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Project not found. Please try again later.
        </div>
        <Link to="/projects" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <style>{`
        .tab-content > div {
          transition: opacity 0.3s ease-in-out;
        }
        .tab-content > div:not(.active) {
          opacity: 0;
          height: 0;
          overflow: hidden;
        }
        .tab-content > div.active {
          opacity: 1;
          height: auto;
        }
        .transition-transform {
          transition: transform 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn-outline-primary:hover,
        .btn-primary:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
        .modal-lightbox .modal-content {
          background: none;
          border: none;
        }
        .modal-lightbox .modal-body {
          padding: 0;
          position: relative;
        }
        .modal-lightbox img {
          max-height: 80vh;
          object-fit: contain;
        }
      `}</style>

      <div className="mb-4">
        <Link to="/projects" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Return to projects list">
          <i className="bi bi-arrow-left me-2"></i>Back to Projects
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-8 col-12">
          <div className="card mb-4 border-0 shadow-sm">
            <ProjectCarousel pictures={pictures} projectTitle={project.title} />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="badge bg-primary me-2">{project.category?.name}</span>
                  <span className="badge bg-success">
                    <i className="bi bi-star-fill me-1"></i> {project.average_rating || 0}
                  </span>
                </div>
                <div>
                  <button className="btn btn-outline-danger me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Save this project">
                    <i className="bi bi-heart me-1"></i>Save
                  </button>
                  <button className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Share this project">
                    <i className="bi bi-share me-1"></i>Share
                  </button>
                </div>
              </div>
              <h1 className="card-title display-5 fw-bold mb-3">{project.title}</h1>
              <div className="d-flex flex-wrap mb-4 gap-3">
                <div>
                  <h5 className="text-muted">Funding Progress</h5>
                  <div className="d-flex align-items-center">
                    <div className="progress" style={{ width: "200px", height: "20px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${fundingPercentage > 100 ? 100 : fundingPercentage}%` }}
                        aria-valuenow={fundingPercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <span className="ms-2 fw-bold">{fundingPercentage}%</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-muted">Funding Goal</h5>
                  <p className="mb-0 fw-bold text-success">
                    <i className="bi bi-currency-dollar me-1"></i>
                    ${project.total_target?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                {daysLeft !== null && (
                  <div>
                    <h5 className="text-muted">Days Left</h5>
                    <p className="mb-0 fw-bold">
                      <i className="bi bi-calendar me-1"></i>
                      {daysLeft > 0 ? `${daysLeft} days` : 'Ended'}
                    </p>
                  </div>
                )}
              </div>
              <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} project={project} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <ProjectSidebar project={project} daysLeft={daysLeft} />
        </div>
      </div>

      <ProjectGallery
        pictures={pictures}
        projectTitle={project.title}
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
      />

      <ProjectLightbox
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
        pictures={pictures}
        projectTitle={project.title}
      />

      <SimilarProjects />
    </div>
  );
};

export default ProjectDetailsPage;