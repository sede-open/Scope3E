import useTranslation from 'next-translate/useTranslation';
import { DemoRequestForm } from './DemoRequestForm';
import * as StyledComponents from '../ContactUs/styledComponents';

export const DemoRequest = () => {
  const { t } = useTranslation('publicGetInTouch');
  return (
    <>
      <StyledComponents.LandingBackground>
        <StyledComponents.LandingHeader>
          {t('request-demo')}
        </StyledComponents.LandingHeader>
      </StyledComponents.LandingBackground>
      <StyledComponents.GreenBackground>
        <StyledComponents.MobileHeader>
          {t('request-demo')}
        </StyledComponents.MobileHeader>
        <StyledComponents.Description>
          {t('fill-out-form')}
        </StyledComponents.Description>
      </StyledComponents.GreenBackground>
      <StyledComponents.FormContainer>
        <DemoRequestForm />
      </StyledComponents.FormContainer>
    </>
  );
};
