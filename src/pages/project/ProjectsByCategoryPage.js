import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, BASE_URL } from '../../api/axios';
import authService from '../../api/users';

const ProjectsByCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, projRes, picsRes] = await Promise.all([
          API.get('/api/categories/'),
          API.get('/api/projects/'),
          API.get('/api/project-pics/'),
        ]);
        // Ensure data is an array, fallback to empty array if undefined or invalid
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setProjects(Array.isArray(projRes.data) ? projRes.data : []);
        // Map project images by project ID
        const imagesByProject = (picsRes.data || []).reduce((acc, pic) => {
          if (!acc[pic.project]) acc[pic.project] = [];
          acc[pic.project].push(pic);
          return acc;
        }, {});
        setProjectImages(imagesByProject);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('فشل في تحميل البيانات. حاول مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

    return () => {
      // Cleanup tooltips
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltip = window.bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltip) tooltip.dispose();
      });
    };
  }, []);

  const getProjectsForCategory = (categoryId) =>
    projects.filter((p) => p.category === categoryId);

  const getProjectImage = (projectId) => {
    const projectPics = projectImages[projectId];
    return projectPics && projectPics.length > 0
      ? `${BASE_URL}${projectPics[0].pic}`
      : 'https://via.placeholder.com/300x150?text=Project';
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" aria-label="جاري التحميل">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <p className="mt-3 text-muted">جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-2"></i>إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <style>{`
        .project-card {
          transition: transform 0.2s ease;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
      `}</style>

      <h2 className="h3 fw-bold mb-4">المشاريع حسب الفئات</h2>

      {authService.isLoggedIn() && (
        <button
          className="btn btn-primary mb-4"
          onClick={() => navigate(`/projects/create`)}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="إنشاء مشروع جديد"
        >
          <i className="bi bi-plus-circle me-2"></i>إضافة مشروع جديد
        </button>
      )}

      {categories.length > 0 ? (
        categories.map((category) => {
          const categoryProjects = getProjectsForCategory(category.id);
          return (
            <div key={category.id} className="mb-5">
              <h3 className="h4 fw-bold mb-3">{category.name}</h3>
              {categoryProjects.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {categoryProjects.map((project) => (
                    <div key={project.id} className="col">
                      <div
                        className="card h-100 border-0 shadow-sm project-card"
                        role="button"
                        onClick={() => navigate(`/projects/${project.id}`)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`عرض تفاصيل ${project.name}`}
                      >
                        <img
                          src={getProjectImage(project.id)}
                          className="card-img-top"
                          alt={`${project.name} صورة المشروع`}
                          style={{ height: '150px', objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title text-primary mb-0">{project.name}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  لا يوجد مشاريع في هذه الفئة
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-info-circle me-2"></i>لا توجد فئات متاحة حاليًا.
        </div>
      )}
    </div>
  );
};

export default ProjectsByCategoryPage;