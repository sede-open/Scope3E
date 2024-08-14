import useTranslation from 'next-translate/useTranslation';

import { SolutionsTopThree } from 'components/SolutionsTopThree';
import * as selectors from 'containers/Home/selectors';

import * as StyledComponents from './styledComponents';

export const SolutionsSection = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.SolutionsSection
      data-testid={selectors.homeSolutionsSection}
    >
      <StyledComponents.TextContainer>
        <StyledComponents.TitleContainer>
          <StyledComponents.Title>
            {t('publicHome:solutions-section-title')}
          </StyledComponents.Title>
        </StyledComponents.TitleContainer>
        <StyledComponents.SubTextContainer>
          <StyledComponents.Subtext>
            {t('publicHome:solutions-section-subtext')}
          </StyledComponents.Subtext>
        </StyledComponents.SubTextContainer>
      </StyledComponents.TextContainer>
      <SolutionsTopThree />
    </StyledComponents.SolutionsSection>
  );
};
