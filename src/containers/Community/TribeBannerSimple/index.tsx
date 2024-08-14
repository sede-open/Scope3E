import useTranslation from 'next-translate/useTranslation';
import * as StyledComponents from './styledComponents';
import * as selectors from '../selectors';

export const TribeBannerSimple = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.IntroModuleContainer
      data-testid={selectors.tribeBannerSimple}
    >
      <StyledComponents.TextContainer>
        <StyledComponents.Title>
          {t('community:intro-title')}
        </StyledComponents.Title>
        <StyledComponents.SubTitle>
          {t('community:intro-text')}
        </StyledComponents.SubTitle>
      </StyledComponents.TextContainer>
    </StyledComponents.IntroModuleContainer>
  );
};
