import useTranslation from 'next-translate/useTranslation';
import { JoinUsForm } from './JoinUsForm';
import * as StyledComponents from './styledComponents';

export const JoinUs = () => {
  const { t } = useTranslation('publicGetInTouch');
  return (
    <>
      <StyledComponents.LandingBackground>
        <StyledComponents.LandingTitle>
          {t('join-us')}
        </StyledComponents.LandingTitle>
      </StyledComponents.LandingBackground>
      <StyledComponents.GreenBackground>
        <StyledComponents.MobileHeader>
          {t('join-us')}
        </StyledComponents.MobileHeader>
        <StyledComponents.GreenSectionText>
          {t('we-are-glad')}
        </StyledComponents.GreenSectionText>
      </StyledComponents.GreenBackground>
      <StyledComponents.FormSection>
        <StyledComponents.FormContainer>
          <JoinUsForm />
        </StyledComponents.FormContainer>
      </StyledComponents.FormSection>
    </>
  );
};
