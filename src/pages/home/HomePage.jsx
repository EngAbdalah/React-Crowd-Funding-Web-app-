import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, BASE_URL } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const HeroSection = styled.section`
  background-color: var(--color-primary);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: var(--color-text-primary);
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: ${props => props.theme.typography.h3.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HeroDescription = styled.p`
  font-size: ${props => props.theme.typography.body1.fontSize};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: var(--color-text-primary);
  color: var(--color-primary);
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.fontSize};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: var(--color-background);
  }
`;

const SectionTitle = styled.h2`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.h4.fontSize};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const CategoryCard = styled.div`
  background-color: var(--color-card);
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CategoryContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

const CategoryName = styled.h3`
  color: var(--color-primary);
  font-size: ${props => props.theme.typography.h4.fontSize};
`;

const Loading = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.h4.fontSize};
  color: var(--color-text-secondary);
  margin: ${props => props.theme.spacing.xl} 0;
`;

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await API.get('/api/categories/');
        setCategories(catRes.data);

        const projRes = await API.get('/api/projects/');
        setProjects(projRes.data);

        const picsRes = await API.get('/api/project-pics/');
        setPictures(picsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProjectImage = (projectId) => {
    const pic = pictures.find(p => p.project === projectId);
    return pic ? `${BASE_URL}${pic.pic}` : 'https://via.placeholder.com/300x150?text=Project';
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>ساهم في صنع التغيير</HeroTitle>
        <HeroDescription>
          انضم إلينا في رحلة العطاء وساعد في إسعاد المحتاجين. كل تبرع، مهما كان صغيراً، يمكن أن يحدث فرقاً كبيراً في حياة شخص ما.
        </HeroDescription>
        <HeroButton onClick={() => navigate('/projects')}>ابدأ التبرع الآن</HeroButton>
      </HeroSection>

      <section>
        <SectionTitle>المشاريع المميزة</SectionTitle>

        {loading ? (
          <Loading>جاري التحميل...</Loading>
        ) : (
          <CategoriesGrid>
            {projects.map(project => (
              <CategoryCard
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <CategoryImage
                  src={getProjectImage(project.id)}
                  alt={project.title}
                />
                <CategoryContent>
                  <CategoryName>{project.title}</CategoryName>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        )}
      </section>
    </PageContainer>
  );
}

export default HomePage;
