import styled from 'styled-components';
import CampaignCard from '../../components/CampaignCard';

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

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: var(--color-card);
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.h3.fontSize};
  color: var(--color-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body1.fontSize};
`;

function HomePage() {
  // Temporary mock data
  const featuredCampaigns = [
    {
      id: 1,
      title: 'مساعدة أسرة محتاجة',
      description: 'توفير احتياجات أساسية لأسرة تعاني من ظروف صعبة',
      image: 'https://via.placeholder.com/300x200',
      category: 'مساعدة إنسانية',
      progress: 75,
      raised: 7500,
      goal: 10000,
      timeLeft: '5 أيام'
    },
    {
      id: 2,
      title: 'علاج طفل مريض',
      description: 'توفير تكاليف العلاج لطفل يعاني من مرض مزمن',
      image: 'https://via.placeholder.com/300x200',
      category: 'صحة',
      progress: 45,
      raised: 45000,
      goal: 100000,
      timeLeft: '10 أيام'
    },
    {
      id: 3,
      title: 'تعليم أيتام',
      description: 'توفير مصاريف التعليم لأطفال الأيتام',
      image: 'https://via.placeholder.com/300x200',
      category: 'تعليم',
      progress: 60,
      raised: 30000,
      goal: 50000,
      timeLeft: '15 يوم'
    }
  ];

  const stats = [
    {
      number: '1000+',
      label: 'حالة تم مساعدتها'
    },
    {
      number: '500+',
      label: 'متبرع نشط'
    },
    {
      number: '50+',
      label: 'حملة ناجحة'
    },
    {
      number: '100%',
      label: 'شفافية'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>ساهم في صنع التغيير</HeroTitle>
        <HeroDescription>
          انضم إلينا في رحلة العطاء وساعد في إسعاد المحتاجين. كل تبرع، مهما كان صغيراً، يمكن أن يحدث فرقاً كبيراً في حياة شخص ما.
        </HeroDescription>
        <HeroButton>ابدأ التبرع الآن</HeroButton>
      </HeroSection>

      <section>
        <SectionTitle>الحملات المميزة</SectionTitle>
        <CampaignsGrid>
          {featuredCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </CampaignsGrid>
      </section>

      <StatsSection>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsSection>
    </PageContainer>
  );
}

export default HomePage; 