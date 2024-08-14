import { Overlay } from 'components/Overlay';
import { DestinationType } from 'components/CookiesConsentManager/types';
import { CookiesPolicyOverlayContent } from './CookiesPolicyOverlayContent';

interface IProps {
  isOverlayOpen: boolean;
  saveConsent: (state?: boolean) => void;
  setPreferences: (param: { [key: string]: boolean }) => void;
  destinations: DestinationType[];
  toggleCookiesPolicyOverlay: () => void;
}

export const CookiesPolicyOverlay = ({
  isOverlayOpen = false,
  setPreferences,
  saveConsent,
  destinations,
  toggleCookiesPolicyOverlay,
}: IProps) => (
  <div data-testid="cookies-policy-overlay">
    {isOverlayOpen ? (
      <Overlay open={isOverlayOpen}>
        <CookiesPolicyOverlayContent
          setPreferences={setPreferences}
          saveConsent={saveConsent}
          destinations={destinations}
          toggleCookiesPolicyOverlay={toggleCookiesPolicyOverlay}
        />
      </Overlay>
    ) : (
      <Overlay open={isOverlayOpen} />
    )}
  </div>
);
