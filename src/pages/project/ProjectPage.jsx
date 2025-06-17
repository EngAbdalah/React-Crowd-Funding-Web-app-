import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {API} from '../../api/axios';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: ${props => props.theme.typography.h4.fontSize};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProjectCard = styled.div`
  background-color: var(--color-card);
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Loading = styled.div`
  text-align: center;
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.h5.fontSize};
`;

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get('/api/projects/');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('هل أنت متأكد أنك تريد حذف المشروع؟')) return;
    try {
      await API.delete(`/api/projects/${id}/delete/`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <PageContainer>
      <Header>
        <SectionTitle>قائمة المشاريع</SectionTitle>
        <Button onClick={() => navigate('/projects/create')}>إضافة مشروع</Button>
      </Header>
      {loading ? (
        <Loading>جاري التحميل...</Loading>
      ) : (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Button onClick={() => navigate(`/projects/${project.id}/update`)}>تعديل</Button>
              <Button onClick={() => deleteProject(project.id)}>حذف</Button>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </PageContainer>
  );
}

export default ProjectsPage;
