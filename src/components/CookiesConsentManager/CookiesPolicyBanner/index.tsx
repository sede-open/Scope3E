import { useEffect } from 'react';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { DestinationType } from 'components/CookiesConsentManager/types';
import * as StyledComponents from './styledComponents';
import { example_COOKIES_POLICY_LINK } from '../../../constants';

interface IProps {
  saveConsent: (state?: boolean) => void;
  setPreferences: (param: { [key: string]: boolean }) => void;
  destinations: DestinationType[];
  toggleCookiesPolicyBanner: () => void;
  toggleCookiesPolicyOverlay: () => void;
}

const DESTINATION_PREFERENCES_STATE = true;

export const CookiesPolicyBanner = ({
  setPreferences,
  saveConsent,
  destinations,
  toggleCookiesPolicyBanner,
  toggleCookiesPolicyOverlay,
}: IProps) => {
  useEffect(() => {
    destinations.forEach((destination) => {
      setPreferences({ [destination.id]: DESTINATION_PREFERENCES_STATE });
    });
  }, []);

  const handleSubmitPreferences = () => {
    saveConsent();
    toggleCookiesPolicyBanner();
  };

  const handleEditPreferences = () => {
    toggleCookiesPolicyBanner();
    toggleCookiesPolicyOverlay();
  };

  return (
    <StyledComponents.Wrapper data-testid="cookies-policy-banner">
      <StyledComponents.Title
        color={Tundora}
        family={exampleBold}
        size="32px"
        as="h1"
      >
        About Cookies on this site
      </StyledComponents.Title>
      <StyledComponents.Subtitle as="p" color={Tundora} size="16px">
        We use cookies to personalize and enhance your experience on our site
        and improve the delivery of ads to you.
      </StyledComponents.Subtitle>
      <StyledComponents.TextContainer>
        <Text as="p" color={Tundora} size="16px">
          Visit our
        </Text>
        <StyledComponents.PolicyButton
          data-testid="policy-btn"
          as="a"
          href={example_COOKIES_POLICY_LINK}
          target="_blank"
          color="text-button"
        >
          Cookie Policy
        </StyledComponents.PolicyButton>
        <Text as="p" color={Tundora} size="16px">
          to learn more.
        </Text>
      </StyledComponents.TextContainer>
      <StyledComponents.TextContainer>
        <Text as="p" color={Tundora} size="16px">
          By clicking
        </Text>
        <StyledComponents.BoldText as="p" color={Tundora} size="16px">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "Accept",
        </StyledComponents.BoldText>
        <Text as="p" color={Tundora} size="16px">
          you agree to our use of cookies
        </Text>
      </StyledComponents.TextContainer>
      <StyledComponents.ButtonContainer>
        <StyledComponents.AcceptButton
          data-testid="accept-btn"
          color="primary"
          onClick={handleSubmitPreferences}
        >
          Accept
        </StyledComponents.AcceptButton>
        <StyledComponents.VerticalSpacer />
        <StyledComponents.CustomiseButton
          data-testid="customise-btn"
          color="text-button"
          onClick={handleEditPreferences}
        >
          Customise
        </StyledComponents.CustomiseButton>
      </StyledComponents.ButtonContainer>
    </StyledComponents.Wrapper>
  );
};
