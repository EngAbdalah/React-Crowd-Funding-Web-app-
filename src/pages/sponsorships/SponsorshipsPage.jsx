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

const SponsorshipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const SponsorshipCard = styled.div`
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

const SponsorshipImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-background);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const SponsorshipContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const SponsorshipTitle = styled.h3`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SponsorshipDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SponsorshipDetails = styled.div`
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

const SponsorshipStatus = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.fontSize};
  background-color: ${props => 
    props.status === 'active' ? 'var(--color-primary)' :
    props.status === 'completed' ? 'var(--color-secondary)' :
    'var(--color-background)'
  };
  color: var(--color-text-primary);
`;

function SponsorshipsPage() {
  // Temporary mock data
  const sponsorships = [
    {
      id: 1,
      title: 'كفالة طالب علم',
      description: 'مساعدة طالب في إكمال دراسته الجامعية',
      image: 'https://via.placeholder.com/300x200',
      monthlyAmount: 500,
      duration: '12 شهر',
      status: 'active',
      beneficiary: 'طالب جامعي',
      location: 'القاهرة'
    },
    {
      id: 2,
      title: 'كفالة أسرة',
      description: 'دعم شهري لأسرة محتاجة',
      image: 'https://via.placeholder.com/300x200',
      monthlyAmount: 1000,
      duration: '6 أشهر',
      status: 'completed',
      beneficiary: 'أسرة مكونة من 5 أفراد',
      location: 'الإسكندرية'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>الكفالات</PageTitle>
        <PageDescription>
          ساهم في كفالة المحتاجين وكن سبباً في تغيير حياتهم للأفضل
        </PageDescription>
      </PageHeader>

      <SponsorshipsGrid>
        {sponsorships.map(sponsorship => (
          <SponsorshipCard key={sponsorship.id}>
            <SponsorshipImage image={sponsorship.image} />
            <SponsorshipContent>
              <SponsorshipTitle>{sponsorship.title}</SponsorshipTitle>
              <SponsorshipDescription>{sponsorship.description}</SponsorshipDescription>
              <SponsorshipDetails>
                <DetailItem>
                  <span>المبلغ الشهري:</span>
                  <span>{sponsorship.monthlyAmount} ريال</span>
                </DetailItem>
                <DetailItem>
                  <span>المدة:</span>
                  <span>{sponsorship.duration}</span>
                </DetailItem>
                <DetailItem>
                  <span>المستفيد:</span>
                  <span>{sponsorship.beneficiary}</span>
                </DetailItem>
                <DetailItem>
                  <span>الموقع:</span>
                  <span>{sponsorship.location}</span>
                </DetailItem>
              </SponsorshipDetails>
              <SponsorshipStatus status={sponsorship.status}>
                {sponsorship.status === 'active' ? 'نشط' : 'مكتمل'}
              </SponsorshipStatus>
            </SponsorshipContent>
          </SponsorshipCard>
        ))}
      </SponsorshipsGrid>
    </PageContainer>
  );
}

export default SponsorshipsPage; 