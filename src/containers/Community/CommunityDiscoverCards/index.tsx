import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from '../styledComponents';
import { ICommunityCard } from '../types';
import { CommunityCard } from './CommunityCard';
import * as selectors from './selectors';

export const CommunityDiscoverCards = () => {
  const { t } = useTranslation();

  const communityCards: ICommunityCard[] = t(
    'community:discover-the-community-cards',
    {},
    { returnObjects: true }
  );

  return (
    <div data-testid={selectors.communityDiscoverCards}>
      <StyledComponents.ModuleTitle>
        {t('community:discover-the-community-title')}{' '}
      </StyledComponents.ModuleTitle>
      <div>
        {communityCards.map((card) => (
          <CommunityCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
