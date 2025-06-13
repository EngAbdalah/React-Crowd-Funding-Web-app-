import { useState, useMemo } from 'react';
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

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const CampaignCard = styled.div`
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

const CampaignImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-background);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const CampaignContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const CampaignTitle = styled.h3`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CampaignDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CampaignProgress = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-background);
  border-radius: ${props => props.theme.borderRadius.round};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: var(--color-primary);
  transition: width ${props => props.theme.transitions.default};
`;

const CampaignStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid var(--color-border-main);
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: var(--color-paper);
  color: var(--color-text-primary);
  font-size: ${props => props.theme.typography.body1.fontSize};

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid var(--color-border-main);
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: var(--color-paper);
  color: var(--color-text-primary);
  font-size: ${props => props.theme.typography.body1.fontSize};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid var(--color-border-main);
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-paper)'};
  color: ${props => props.active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-dark)' : 'var(--color-background)'};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body1.fontSize};
`;

function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activeFilter, setActiveFilter] = useState('all');

  // Temporary mock data
  const campaigns = [
    {
      id: 1,
      title: 'مساعدة طفل مريض',
      description: 'حملة لمساعدة طفل يعاني من مرض نادر ويحتاج إلى علاج فوري',
      image: 'https://via.placeholder.com/300x200',
      progress: 75,
      raised: 75000,
      goal: 100000,
      category: 'medical',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'توفير مأوى للعائلات',
      description: 'مساعدة العائلات المحتاجة في توفير مأوى مناسب',
      image: 'https://via.placeholder.com/300x200',
      progress: 45,
      raised: 45000,
      goal: 100000,
      category: 'housing',
      date: '2024-03-10'
    },
    {
      id: 3,
      title: 'مساعدة طالب محتاج',
      description: 'توفير المصاريف الدراسية لطالب محتاج',
      image: 'https://via.placeholder.com/300x200',
      progress: 90,
      raised: 90000,
      goal: 100000,
      category: 'education',
      date: '2024-03-05'
    }
  ];

  const filteredAndSortedCampaigns = useMemo(() => {
    return campaigns
      .filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || campaign.category === activeFilter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.date) - new Date(a.date);
          case 'oldest':
            return new Date(a.date) - new Date(b.date);
          case 'progress':
            return b.progress - a.progress;
          case 'raised':
            return b.raised - a.raised;
          default:
            return 0;
        }
      });
  }, [campaigns, searchQuery, sortBy, activeFilter]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>الحملات</PageTitle>
        <PageDescription>
          اكتشف الحملات الإنسانية المختلفة وساهم في دعم المحتاجين
        </PageDescription>
      </PageHeader>

      <FiltersContainer>
        <SearchInput
          type="text"
          placeholder="ابحث عن حملة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="progress">الأعلى تقدم</option>
          <option value="raised">الأعلى تبرع</option>
        </Select>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          الكل
        </FilterButton>
        <FilterButton
          active={activeFilter === 'medical'}
          onClick={() => setActiveFilter('medical')}
        >
          طبية
        </FilterButton>
        <FilterButton
          active={activeFilter === 'housing'}
          onClick={() => setActiveFilter('housing')}
        >
          سكنية
        </FilterButton>
        <FilterButton
          active={activeFilter === 'education'}
          onClick={() => setActiveFilter('education')}
        >
          تعليمية
        </FilterButton>
      </FiltersContainer>

      {filteredAndSortedCampaigns.length > 0 ? (
        <CampaignsGrid>
          {filteredAndSortedCampaigns.map(campaign => (
            <CampaignCard key={campaign.id}>
              <CampaignImage image={campaign.image} />
              <CampaignContent>
                <CampaignTitle>{campaign.title}</CampaignTitle>
                <CampaignDescription>{campaign.description}</CampaignDescription>
                <CampaignProgress>
                  <ProgressBar progress={campaign.progress} />
                </CampaignProgress>
                <CampaignStats>
                  <span>تم جمع: {campaign.raised} ريال</span>
                  <span>الهدف: {campaign.goal} ريال</span>
                </CampaignStats>
              </CampaignContent>
            </CampaignCard>
          ))}
        </CampaignsGrid>
      ) : (
        <NoResults>
          لم يتم العثور على حملات تطابق معايير البحث
        </NoResults>
      )}
    </PageContainer>
  );
}

export default CampaignsPage; 