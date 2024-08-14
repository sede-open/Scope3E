import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from '../styledComponents';
import { ICommunityCard } from '../types';
import { NeedHelpCard } from './NeedHelpCard';
import * as selectors from './selectors';

export const CommunityNeedMoreHelp = () => {
  const { t } = useTranslation();

  const needHelpCards: ICommunityCard[] = t(
    'community:need-more-help-cards',
    {},
    { returnObjects: true }
  );

  return (
    <div data-testid={selectors.communityNeedHelpCards}>
      <StyledComponents.ModuleTitle>
        {t('community:need-more-help-title')}{' '}
      </StyledComponents.ModuleTitle>
      {needHelpCards.map((card) => (
        <NeedHelpCard key={card.id} card={card} />
      ))}
    </div>
  );
};
