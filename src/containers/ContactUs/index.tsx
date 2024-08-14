import { LocationsCards } from 'components/LocationsCards';
import { locationsData } from 'containers/GetInTouch/locationsData';
import useTranslation from 'next-translate/useTranslation';
import { ContactUsForm } from './ContactUsForm';
import * as StyledComponents from './styledComponents';

export const ContactUs = () => {
  const { t } = useTranslation('publicGetInTouch');
  return (
    <>
      <StyledComponents.LandingBackground>
        <StyledComponents.LandingHeader>
          {t('get-in-touch')}
        </StyledComponents.LandingHeader>
      </StyledComponents.LandingBackground>
      <StyledComponents.GreenBackground>
        <StyledComponents.MobileHeader>
          {t('get-in-touch')}
        </StyledComponents.MobileHeader>
        <StyledComponents.Description>
          {t('if-any-questions')}
        </StyledComponents.Description>
      </StyledComponents.GreenBackground>
      <StyledComponents.FormContainer>
        <ContactUsForm />
        <StyledComponents.LocationsContainer>
          <StyledComponents.LocationsTitle>
            {t('locations-title')}
          </StyledComponents.LocationsTitle>
          <LocationsCards direction="column" locationsData={locationsData} />
        </StyledComponents.LocationsContainer>
      </StyledComponents.FormContainer>
    </>
  );
};
