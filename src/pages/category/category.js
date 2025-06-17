import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API ,BASE_URL } from '../../api/axios';
import authService from '../../api/users';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.h4.fontSize};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

const ProjectName = styled.h3`
  color: ${props => props.theme.colors.primary.main};
  font-size: ${props => props.theme.typography.h4.fontSize};
`;

const Loading = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.h4.fontSize};
  color: ${props => props.theme.colors.text.secondary};
  margin: ${props => props.theme.spacing.xl} 0;
`;

function CategoryPage() {
  const { idm } = useParams();
  const [category, setCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category details
        const categoryRes = await API.get(`/api/categories/${idm}/`);
        setCategory(categoryRes.data);

        // Fetch all projects
        const projectsRes = await API.get(`/api/projects/`);
        // Filter projects by category ID
        const filteredProjects = projectsRes.data.filter(project => project.category === parseInt(idm));
        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idm]);

  if (loading) {
    return (
      <PageContainer>
        <Loading>جاري التحميل...</Loading>
      </PageContainer>
    );
  }

  if (!category) {
    return (
      <PageContainer>
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          الفئة غير موجودة. حاول مرة أخرى لاحقًا.
        </div>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/projects')}>
          <i className="bi bi-arrow-left me-2"></i>العودة إلى المشاريع
        </button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>{category.name || 'المشاريع المتاحة'}</SectionTitle>
      {authService.isLoggedIn() && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate(`/projects/create`)}
        >
          إضافة مشروع جديد
        </button>
      )}
      {projects.length > 0 ? (
        <ProjectsGrid>
          {projects.map(project => (
            <ProjectCard key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
              <ProjectImage
                src={project.pictures.length > 0 ? `${BASE_URL}${project.pictures[0].pic}` : 'https://via.placeholder.com/300x150?text=Project'}
                alt={project.title}
              />
              <ProjectContent>
                <ProjectName>{project.title}</ProjectName>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      ) : (
        <div className="alert alert-info" role="alert">
          لا يوجد مشاريع في هذه الفئة
        </div>
      )}
    </PageContainer>
  );
}

export default CategoryPage;