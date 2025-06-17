import React from 'react';
import { BASE_URL } from '../../api/axios';
const ProjectGallery = ({ pictures, projectTitle, lightboxOpen, setLightboxOpen, photoIndex, setPhotoIndex }) => (
  <div className="card mb-5 border-0 shadow-sm">
    <div className="card-body">
      <h2 className="card-title mb-4">Project Gallery</h2>
      {pictures.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {pictures.map((pic, index) => (
            <div key={pic.id} className="col">
              <div
                className="card h-100 border-0 shadow-sm transition-transform hover-scale"
                role="button"
                onClick={() => {
                  setPhotoIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={`${BASE_URL}${pic.pic}`}
                  alt={`${projectTitle} picture ${index + 1}`}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="card-footer text-center py-2">
                  <small>Click to enlarge</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No additional pictures available</div>
      )}
    </div>
  </div>
);

export default ProjectGallery;