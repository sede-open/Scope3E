import { ExternalLink } from 'components/ExternalLink';
import Icon from 'components/Icon';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { trackEvent } from 'utils/analytics';
import { COMMUNITY_SHOW_MORE_SPACES_BUTTON } from 'utils/analyticsEvents';
import { randomSort } from 'utils/randomSort';
import { ICommunityCard } from '../types';
import { PopularSpaceCard } from './PopularSpaceCard';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const CommunityPopularSpaces = () => {
  const { t } = useTranslation();

  const spaceCards: ICommunityCard[] = t(
    'community:most-popular-spaces-cards',
    {},
    { returnObjects: true }
  );

  const threeSpaceCardsToDisplay = useMemo(() => {
    const randomCardSelection = spaceCards.sort(randomSort);

    return randomCardSelection.slice(0, 3);
  }, []);

  return (
    <div data-testid={selectors.communitySpaceCards}>
      <StyledComponents.ModuleTitle>
        {t('community:most-popular-spaces-title')}{' '}
      </StyledComponents.ModuleTitle>
      <div data-testid={selectors.communitySpaceCard}>
        {threeSpaceCardsToDisplay.map((card) => (
          <PopularSpaceCard key={card.id} card={card} />
        ))}
      </div>

      <StyledComponents.CtaContainer>
        <ExternalLink link="https://sustainabilityplatform.tribeplatform.com/spaces">
          <StyledComponents.CtaButton
            data-testid={selectors.showMoreSpacesButton}
            color="primary"
            onClick={() => trackEvent(COMMUNITY_SHOW_MORE_SPACES_BUTTON)}
          >
            <StyledComponents.IconContainer>
              <Icon alt="New Tab" src="/new-tab.svg" size={16} />
            </StyledComponents.IconContainer>
            {t(`community:show-more-spaces`)}
          </StyledComponents.CtaButton>
        </ExternalLink>
      </StyledComponents.CtaContainer>
    </div>
  );
};
