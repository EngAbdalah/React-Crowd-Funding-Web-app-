import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PageTitle = styled.h1`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PageDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body1.fontSize};
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const EducationCard = styled.div`
  background-color: var(--color-card);
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const EducationImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-background);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const EducationContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const EducationTitle = styled.h3`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const EducationDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const EducationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

const EducationType = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.fontSize};
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

function EducationPage() {
  // Temporary mock data
  const educationInitiatives = [
    {
      id: 1,
      title: 'مشروع محو الأمية',
      description: 'برنامج لتعليم الكبار القراءة والكتابة',
      image: 'https://via.placeholder.com/300x200',
      type: 'محو أمية',
      duration: '6 أشهر',
      location: 'القاهرة',
      beneficiaries: '50 شخص',
      status: 'نشط'
    },
    {
      id: 2,
      title: 'دعم الطلاب المتفوقين',
      description: 'منح دراسية للطلاب المتفوقين في المدارس الحكومية',
      image: 'https://via.placeholder.com/300x200',
      type: 'منح دراسية',
      duration: 'سنة دراسية',
      location: 'الإسكندرية',
      beneficiaries: '100 طالب',
      status: 'نشط'
    },
    {
      id: 3,
      title: 'تطوير المهارات الحرفية',
      description: 'دورات تدريبية في المهارات الحرفية للشباب',
      image: 'https://via.placeholder.com/300x200',
      type: 'تدريب مهني',
      duration: '3 أشهر',
      location: 'الجيزة',
      beneficiaries: '30 شاب',
      status: 'قريباً'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>التعليم</PageTitle>
        <PageDescription>
          نساهم في تطوير المجتمع من خلال دعم المبادرات التعليمية المختلفة
        </PageDescription>
      </PageHeader>

      <EducationGrid>
        {educationInitiatives.map(initiative => (
          <EducationCard key={initiative.id}>
            <EducationImage image={initiative.image} />
            <EducationContent>
              <EducationType>{initiative.type}</EducationType>
              <EducationTitle>{initiative.title}</EducationTitle>
              <EducationDescription>{initiative.description}</EducationDescription>
              <EducationDetails>
                <DetailItem>
                  <span>المدة:</span>
                  <span>{initiative.duration}</span>
                </DetailItem>
                <DetailItem>
                  <span>الموقع:</span>
                  <span>{initiative.location}</span>
                </DetailItem>
                <DetailItem>
                  <span>المستفيدون:</span>
                  <span>{initiative.beneficiaries}</span>
                </DetailItem>
                <DetailItem>
                  <span>الحالة:</span>
                  <span>{initiative.status}</span>
                </DetailItem>
              </EducationDetails>
            </EducationContent>
          </EducationCard>
        ))}
      </EducationGrid>
    </PageContainer>
  );
}

export default EducationPage; 