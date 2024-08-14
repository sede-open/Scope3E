import useTranslation from 'next-translate/useTranslation';

import Icon from 'components/Icon';

import * as StyledComponents from './styledComponents';

export const SummaryInfo = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.SummaryInfoContainer>
      <StyledComponents.SummaryInfoTitleContainer>
        <Icon alt="Information icon" src="/info-blue-outline.svg" size="24px" />
        <StyledComponents.SummaryInfoTitle>
          {t('inexperiencedFlow:data-verification')}
        </StyledComponents.SummaryInfoTitle>
      </StyledComponents.SummaryInfoTitleContainer>

      <StyledComponents.SummaryInfo>
        {t('inexperiencedFlow:data-verification-info')}
      </StyledComponents.SummaryInfo>
    </StyledComponents.SummaryInfoContainer>
  );
};
