import React from 'react';
import { BASE_URL } from '../../api/axios';

const ProjectCarousel = ({ pictures, projectTitle }) => (
  <>
    {pictures.length > 0 ? (
      <div id="projectCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {pictures.map((pic, index) => (
            <button
              key={pic.id}
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {pictures.map((pic, index) => (
            <div key={pic.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={`${BASE_URL}${pic.pic}`}
                className="d-block w-100 rounded-top"
                alt={`${projectTitle} image ${index + 1}`}
                style={{ height: "400px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className="carousel-caption d-none d-md-block">
                <p className="bg-dark bg-opacity-50 p-2 rounded">{pic.caption || "Project Image"}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    ) : (
      <div
        className="bg-secondary d-flex align-items-center justify-content-center rounded-top"
        style={{ height: "400px" }}
      >
        <span className="text-white">No Images Available</span>
      </div>
    )}
  </>
);

export default ProjectCarousel;