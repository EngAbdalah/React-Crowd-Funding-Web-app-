    // path("api/projects/create/", views.project_create, name="project-create"),
    // path("api/projects/<int:pk>/", views.project_detail, name="project-detail"),
    // path("api/projects/<int:pk>/update/", views.project_update, name="project-update"),
// path("api/projects/<int:pk>/delete/", views.project_delete, name="project-delete"),

// import { useParams } from "react-router-dom"

    
    
    // path(
    //     "api/project-tags/create/", views.project_tag_create, name="project-tag-create"
    // ),
    // path(
    //     "api/project-tags/<int:pk>/",
    //     views.project_tag_detail,
    //     name="project-tag-detail",
    // ),
    // path(
    //     "api/project-tags/<int:pk>/update/",
    //     views.project_tag_update,
    //     name="project-tag-update",
    // ),
    // path(
    //     "api/project-tags/<int:pk>/delete/",
    //     views.project_tag_delete,
    //     name="project-tag-delete",
// ),
    // path("api/project-pics/", views.project_pic_list, name="project-pic-list"),
    // path(
    //     "api/project-pics/create/", views.project_pic_create, name="project-pic-create"
    // ),
    // path(
    //     "api/project-pics/<int:pk>/",
    //     views.project_pic_detail,
    //     name="project-pic-detail",
    // ),
    // path(
    //     "api/project-pics/<int:pk>/update/",
    //     views.project_pic_update,
    //     name="project-pic-update",
    // ),
    // path(
    //     "api/project-pics/<int:pk>/delete/",
    //     views.project_pic_delete,
    //     name="project-pic-delete",
// ),
    //===================================================
// in button component use <donate />
// in button component use <engagment />
// in button component use <report />



// export const ProjectDetailsPage = () => {
   
    
    
    
//     return (
//     <>

//     </>
//     )
// }
// ---------------------------------------------------------
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {API} from '../../api/axios';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProjectTitle = styled.h1`
  color: var(--color-primary);
  font-size: ${props => props.theme.typography.h3.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: var(--color-text-secondary);
`;

const Loading = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.h5.fontSize};
  color: var(--color-text-secondary);
  margin: ${props => props.theme.spacing.xl} 0;
`;

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/api/projects/${id}/`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return (
    <PageContainer>
      {loading ? (
        <Loading>جاري التحميل...</Loading>
      ) : project ? (
        <>
          <ProjectImage 
            src={project.image || 'https://via.placeholder.com/800x400?text=Project'}
            alt={project.name}
          />
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
        </>
      ) : (
        <Loading>المشروع غير موجود</Loading>
      )}
    </PageContainer>
  );
}

export default ProjectPage;
