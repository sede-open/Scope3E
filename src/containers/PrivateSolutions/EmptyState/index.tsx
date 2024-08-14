import Icon from 'components/Icon';
import useTranslation from 'next-translate/useTranslation';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <div data-testid={selectors.emptyState}>
      <StyledComponents.ContentWrapper>
        <Icon src="/data-missing.svg" alt="Data missing" size={106} />
        <StyledComponents.Title>
          {t('privateSolutions:empty-state-title')}
        </StyledComponents.Title>
        <StyledComponents.Subtext>
          {t('privateSolutions:empty-state-subtext')}
        </StyledComponents.Subtext>
      </StyledComponents.ContentWrapper>
    </div>
  );
};
