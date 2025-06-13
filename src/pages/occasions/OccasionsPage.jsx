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

const OccasionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
`;

const OccasionCard = styled.div`
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

const OccasionImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-background);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const OccasionContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const OccasionTitle = styled.h3`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const OccasionDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const OccasionDetails = styled.div`
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

const OccasionType = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.fontSize};
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const RegistrationStatus = styled.div`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.fontSize};
  background-color: ${props => 
    props.status === 'open' ? 'var(--color-success)' :
    props.status === 'closed' ? 'var(--color-error)' :
    'var(--color-warning)'
  };
  color: var(--color-text-primary);
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

function OccasionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('upcoming');
  const [activeFilter, setActiveFilter] = useState('all');

  // Temporary mock data
  const occasions = [
    {
      id: 1,
      title: 'عيد الأضحى المبارك',
      description: 'توزيع لحوم الأضاحي على الأسر المحتاجة',
      image: 'https://via.placeholder.com/300x200',
      type: 'عيد',
      date: '2024-06-17',
      location: 'القاهرة',
      capacity: '100 أسرة',
      registrationStatus: 'open',
      registrationDeadline: '2024-06-10'
    },
    {
      id: 2,
      title: 'رمضان الخير',
      description: 'توزيع وجبات إفطار يومية خلال شهر رمضان',
      image: 'https://via.placeholder.com/300x200',
      type: 'شهر رمضان',
      date: '2024-03-10',
      location: 'الإسكندرية',
      capacity: '200 وجبة يومياً',
      registrationStatus: 'closed',
      registrationDeadline: '2024-03-01'
    },
    {
      id: 3,
      title: 'عيد الفطر المبارك',
      description: 'توزيع ملابس العيد للأطفال المحتاجين',
      image: 'https://via.placeholder.com/300x200',
      type: 'عيد',
      date: '2024-04-10',
      location: 'الجيزة',
      capacity: '150 طفل',
      registrationStatus: 'coming',
      registrationDeadline: '2024-04-01'
    }
  ];

  const filteredAndSortedOccasions = useMemo(() => {
    return occasions
      .filter(occasion => {
        const matchesSearch = occasion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            occasion.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || occasion.type === activeFilter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'upcoming':
            return new Date(a.date) - new Date(b.date);
          case 'registration':
            return new Date(a.registrationDeadline) - new Date(b.registrationDeadline);
          case 'capacity':
            return parseInt(b.capacity) - parseInt(a.capacity);
          default:
            return 0;
        }
      });
  }, [occasions, searchQuery, sortBy, activeFilter]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>المناسبات</PageTitle>
        <PageDescription>
          اكتشف المناسبات القادمة وساهم في إسعاد المحتاجين
        </PageDescription>
      </PageHeader>

      <FiltersContainer>
        <SearchInput
          type="text"
          placeholder="ابحث عن مناسبة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="upcoming">الأقرب موعداً</option>
          <option value="registration">قرب انتهاء التسجيل</option>
          <option value="capacity">السعة الأكبر</option>
        </Select>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          الكل
        </FilterButton>
        <FilterButton
          active={activeFilter === 'عيد'}
          onClick={() => setActiveFilter('عيد')}
        >
          أعياد
        </FilterButton>
        <FilterButton
          active={activeFilter === 'شهر رمضان'}
          onClick={() => setActiveFilter('شهر رمضان')}
        >
          رمضان
        </FilterButton>
      </FiltersContainer>

      {filteredAndSortedOccasions.length > 0 ? (
        <OccasionsGrid>
          {filteredAndSortedOccasions.map(occasion => (
            <OccasionCard key={occasion.id}>
              <OccasionImage image={occasion.image} />
              <OccasionContent>
                <OccasionType>{occasion.type}</OccasionType>
                <OccasionTitle>{occasion.title}</OccasionTitle>
                <OccasionDescription>{occasion.description}</OccasionDescription>
                <OccasionDetails>
                  <DetailItem>
                    <span>التاريخ:</span>
                    <span>{occasion.date}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>الموقع:</span>
                    <span>{occasion.location}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>السعة:</span>
                    <span>{occasion.capacity}</span>
                  </DetailItem>
                  <DetailItem>
                    <span>آخر موعد للتسجيل:</span>
                    <span>{occasion.registrationDeadline}</span>
                  </DetailItem>
                </OccasionDetails>
                <RegistrationStatus status={occasion.registrationStatus}>
                  {occasion.registrationStatus === 'open' ? 'التسجيل مفتوح' :
                   occasion.registrationStatus === 'closed' ? 'التسجيل مغلق' :
                   'قريباً'}
                </RegistrationStatus>
              </OccasionContent>
            </OccasionCard>
          ))}
        </OccasionsGrid>
      ) : (
        <NoResults>
          لم يتم العثور على مناسبات تطابق معايير البحث
        </NoResults>
      )}
    </PageContainer>
  );
}

export default OccasionsPage; 