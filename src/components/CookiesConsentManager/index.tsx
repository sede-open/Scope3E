import { useCallback, useState } from 'react';
import { parseCookies } from 'nookies';
import getConfig from 'next/config';

import Modal from 'components/Modal';
import { ConsentManagerBuilder } from '@segment/consent-manager';
import { CookiesPolicyOverlay } from './CookiesPolicyOverlay';
import { CookiesPolicyBanner } from './CookiesPolicyBanner';
import { TrackingPreferencesCookie } from './types';

export const CookiesConsentManager = () => {
  const { publicRuntimeConfig } = getConfig();

  const cookies = parseCookies();
  const hasConsentedTracking = () => {
    const trackingPreferences = cookies['tracking-preferences'];
    if (!trackingPreferences) return false;

    try {
      const { destinations }: TrackingPreferencesCookie = JSON.parse(
        trackingPreferences
      );

      // It's undefined when the Segment source doesn't have HubSpot as a destination
      // This will trigger the old cookies to be updated
      return destinations.HubSpot !== undefined;
    } catch (error) {
      return false;
    }
  };

  const [isCookiesPolicyBanner, setCookiesPolicyBanner] = useState(
    !hasConsentedTracking()
  );
  const [isCookiesPolicyOverlay, setCookiesPolicyOverlay] = useState(false);

  const toggleCookiesPolicyBanner = useCallback(() => {
    setCookiesPolicyBanner(!isCookiesPolicyBanner);
  }, [isCookiesPolicyBanner]);

  const toggleCookiesPolicyOverlay = useCallback(() => {
    setCookiesPolicyOverlay(!isCookiesPolicyOverlay);
  }, [isCookiesPolicyOverlay]);

  return (
    <div>
      <ConsentManagerBuilder
        writeKey={publicRuntimeConfig.NEXT_PUBLIC_SEGMENT_KEY ?? ''}
      >
        {({ destinations, setPreferences, saveConsent }) => (
          <div>
            {!isCookiesPolicyOverlay && destinations.length !== 0 && (
              <Modal
                isOpen={isCookiesPolicyBanner}
                onClose={toggleCookiesPolicyBanner}
                displayCrossIcon={false}
              >
                <CookiesPolicyBanner
                  setPreferences={setPreferences}
                  saveConsent={saveConsent}
                  destinations={destinations}
                  toggleCookiesPolicyBanner={toggleCookiesPolicyBanner}
                  toggleCookiesPolicyOverlay={toggleCookiesPolicyOverlay}
                />
              </Modal>
            )}
            <CookiesPolicyOverlay
              isOverlayOpen={isCookiesPolicyOverlay}
              setPreferences={setPreferences}
              saveConsent={saveConsent}
              destinations={destinations}
              toggleCookiesPolicyOverlay={toggleCookiesPolicyOverlay}
            />
          </div>
        )}
      </ConsentManagerBuilder>
    </div>
  );
};
