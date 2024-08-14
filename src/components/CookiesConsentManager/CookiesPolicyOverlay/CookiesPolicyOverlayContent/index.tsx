import { CheckBoxSlider } from 'components/CheckBoxSlider';
import { Tundora, SeaGreen } from 'styles/colours';
import { exampleMedium } from 'styles/fonts';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { ButtonSpacer } from 'components/ButtonSpacer';
import { DestinationType } from 'components/CookiesConsentManager/types';
import { CookiesPolicyPreferences } from './CookiePolicyPreferences';
import { example_COOKIES_POLICY_LINK } from '../../../../constants';

import * as StyledComponents from './styledComponents';

interface IProps {
  saveConsent: (state?: boolean) => void;
  setPreferences: (param: { [key: string]: boolean }) => void;
  destinations: DestinationType[];
  toggleCookiesPolicyOverlay: () => void;
}

export const CookiesPolicyOverlayContent = ({
  saveConsent,
  setPreferences,
  destinations,
  toggleCookiesPolicyOverlay,
}: IProps) => {
  const handleSubmitPreferences = () => {
    saveConsent();
    toggleCookiesPolicyOverlay();
  };

  const handleDismissPreferences = () => {
    saveConsent(false);
    toggleCookiesPolicyOverlay();
  };

  return (
    <>
      <StyledComponents.Wrapper>
        <StyledComponents.LogoContainer>
          <img src="/cookie-overlay-logo.svg" alt="Seth Logo" />
        </StyledComponents.LogoContainer>

        <StyledComponents.Container>
          <StyledComponents.InformationContainer>
            <CheckBoxSlider
              name="functionalCookies"
              dataTestId="functional-cookies-slider"
              disabled
              isChecked
              title="Preferences Slider"
            />
            <StyledComponents.TextContainer>
              <StyledComponents.Title
                as="h3"
                size="20px"
                color={Tundora}
                family={exampleMedium}
              >
                Functional Cookies
              </StyledComponents.Title>
              <StyledComponents.RequiredText as="h5" color={SeaGreen}>
                * Mandatory
              </StyledComponents.RequiredText>
              <StyledComponents.InformationParagraph color={Tundora}>
                These cookies are required for optimal operation of our website,
                and cannot be configured. They allow us to offer you the key
                functions of the website (language used, display resolution,
                account access etc.), provide you with online advice and secure
                our website against any attempted fraud.
              </StyledComponents.InformationParagraph>
              <StyledComponents.TextSpacer />
              <Text color={Tundora}>Vendors:</Text>
              <StyledComponents.VendorList>
                <StyledComponents.ListItem>
                  <StyledComponents.VendorTitle color={Tundora}>
                    Janrain:
                  </StyledComponents.VendorTitle>
                  <Button
                    data-testid="akamai-anchor"
                    as="a"
                    target="blank"
                    href="https://www.akamai.com"
                    color="text-button"
                    title="Akamai URL"
                  >
                    https://www.akamai.com
                  </Button>
                </StyledComponents.ListItem>
              </StyledComponents.VendorList>
            </StyledComponents.TextContainer>
          </StyledComponents.InformationContainer>

          <CookiesPolicyPreferences
            destinations={destinations}
            setPreferences={setPreferences}
          />

          <StyledComponents.LineBreak />
          <StyledComponents.PolicyLinkContainer>
            <StyledComponents.Popout title="Cookie Policy" />
            <StyledComponents.PolicyLink
              data-testid="policy-link"
              as="a"
              href={example_COOKIES_POLICY_LINK}
              target="_blank"
              color="text-button"
              title="Cookie Policy"
            >
              Read the full cookie policy
            </StyledComponents.PolicyLink>
          </StyledComponents.PolicyLinkContainer>

          <StyledComponents.ButtonContainer>
            <StyledComponents.StyledButton
              data-testid="accept-btn"
              onClick={handleSubmitPreferences}
            >
              Accept
            </StyledComponents.StyledButton>
            <ButtonSpacer />
            <StyledComponents.StyledButton
              data-testid="decline-btn"
              color="secondary"
              onClick={handleDismissPreferences}
            >
              Decline
            </StyledComponents.StyledButton>
          </StyledComponents.ButtonContainer>
        </StyledComponents.Container>
      </StyledComponents.Wrapper>
    </>
  );
};
