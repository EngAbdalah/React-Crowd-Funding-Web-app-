import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: var(--color-card);
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.md};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-background);
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CategoryTag = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.fontSize};
  background-color: var(--color-primary);
  color: var(--color-text-primary);
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: var(--color-text-primary);
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.h6.fontSize};
`;

const CardDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.md};
  flex: 1;
`;

const ProgressContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-background);
  border-radius: ${props => props.theme.borderRadius.sm};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Progress = styled.div`
  height: 100%;
  background-color: var(--color-primary);
  width: ${props => props.progress}%;
  transition: width ${props => props.theme.transitions.fast};
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const CardButton = styled(Link)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border-radius: ${props => props.theme.borderRadius.sm};
  text-decoration: none;
  font-size: ${props => props.theme.typography.body2.fontSize};
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const TimeLeft = styled.div`
  color: var(--color-text-secondary);
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

function CampaignCard({ campaign }) {
  const {
    id,
    title,
    description,
    image,
    category,
    progress,
    raised,
    goal,
    timeLeft,
    link
  } = campaign;

  return (
    <Card>
      <CardImage image={image}>
        <CategoryTag>{category}</CategoryTag>
      </CardImage>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <ProgressContainer>
          <ProgressBar>
            <Progress progress={progress} />
          </ProgressBar>
          <ProgressInfo>
            <span>تم جمع {raised} جنيه</span>
            <span>الهدف {goal} جنيه</span>
          </ProgressInfo>
        </ProgressContainer>
        <CardFooter>
          <CardButton to={link || `/campaigns/${id}`}>
            تبرع الآن
          </CardButton>
          <TimeLeft>متبقي {timeLeft}</TimeLeft>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default CampaignCard; 