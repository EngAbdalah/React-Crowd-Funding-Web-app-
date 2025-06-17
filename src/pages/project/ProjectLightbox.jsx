import React from 'react';
import { BASE_URL } from '../../api/axios';
const ProjectLightbox = ({ lightboxOpen, setLightboxOpen, photoIndex, setPhotoIndex, pictures, projectTitle }) => {
  const handlePrevImage = () => setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length);
  const handleNextImage = () => setPhotoIndex((photoIndex + 1) % pictures.length);

  return lightboxOpen && pictures.length > 0 ? (
    <div
      className="modal modal-lightbox fade show"
      style={{ display: 'block' }}
      tabIndex="-1"
      aria-labelledby="lightboxModalLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1050 }}
            ></button>
            <img
              src={`${BASE_URL}${pictures[photoIndex].pic}`}
              alt={`${projectTitle} picture ${photoIndex + 1}`}
              className="img-fluid"
            />
            <button
              className="carousel-control-prev"
              type="button"
              onClick={handlePrevImage}
              style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={handleNextImage}
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="text-center mt-2">
              <p className="text-white bg-dark bg-opacity-50 p-2 rounded mx-auto">
                {pictures[photoIndex].caption || `${projectTitle} Image ${photoIndex + 1}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={() => setLightboxOpen(false)}></div>
    </div>
  ) : null;
};

export default ProjectLightbox;