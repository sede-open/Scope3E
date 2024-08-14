import useTranslation from 'next-translate/useTranslation';

import { Card } from 'components/Card';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';

export const EmptyView = () => {
  const { t } = useTranslation();

  return (
    <Card data-testid={selectors.pendingAllocationsEmptyView}>
      <StyledComponents.EmptyViewTextContainer>
        <StyledComponents.EmptyViewHeading>
          {t('valueChain:pending-allocations-empty-heading')}
        </StyledComponents.EmptyViewHeading>
        <StyledComponents.EmptyViewText>
          {t('valueChain:pending-allocations-empty-text')}
        </StyledComponents.EmptyViewText>
      </StyledComponents.EmptyViewTextContainer>
    </Card>
  );
};
