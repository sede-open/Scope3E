import { NavLinks } from 'components/NavLinks';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useResponsive } from 'effects/useResponsive';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { screenSize } from 'styles/variables';
import { trackEvent } from 'utils/analytics';
import {
  FOOTER_ACCEPTABLE_USE_EVENT,
  FOOTER_DATA_PRIVACY_EVENT,
  FOOTER_LEGAL_DISCLAIMER_EVENT,
  FOOTER_NAVIGATION_EVENT,
  FOOTER_TERMS_EVENT,
  REGISTER_EVENT,
  SUPPLIER_LOGIN_EVENT,
} from 'utils/analyticsEvents';
import {
  DATA_PRIVACY_NOTICE_LINK,
  REDIRECT_SESSION_KEY,
} from '../../constants';
import * as StyledComponents from './styledComponents';

export const FooterRedesign = () => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();
  const screen = useResponsive();
  const isSmallerThanTabletM = screen <= screenSize.tabletM;

  const handleClickexampleLogin = () => {
    // make sure we don't have a redundant value to redirect after the login
    sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    trackEvent(FOOTER_NAVIGATION_EVENT, {
      btnId: 'example Login Footer Btn',
    });
  };
  const handleClickLogin = () => {
    // make sure we don't have a redundant value to redirect after the login
    sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    trackEvent(SUPPLIER_LOGIN_EVENT);
  };
  const anchors = (
    <div>
      <Link href="/terms-of-use" passHref>
        <StyledComponents.NavButton
          onClick={() =>
            trackEvent(FOOTER_TERMS_EVENT, {
              companyName: company?.name,
            })
          }
        >
          {t('common:terms-conditions')}
        </StyledComponents.NavButton>
      </Link>
      <Link href="/legal-disclaimer" passHref>
        <StyledComponents.NavButton
          onClick={() =>
            trackEvent(FOOTER_LEGAL_DISCLAIMER_EVENT, {
              companyName: company?.name,
            })
          }
        >
          {t('common:legal-disclaimer')}
        </StyledComponents.NavButton>
      </Link>
      <StyledComponents.NavButton
        as="a"
        href={DATA_PRIVACY_NOTICE_LINK}
        onClick={() =>
          trackEvent(FOOTER_DATA_PRIVACY_EVENT, {
            companyName: company?.name,
          })
        }
      >
        {t('common:data-privacy-notice')}
      </StyledComponents.NavButton>
      <Link href="/acceptable-use" passHref>
        <StyledComponents.NavButton
          onClick={() =>
            trackEvent(FOOTER_ACCEPTABLE_USE_EVENT, {
              companyName: company?.name,
            })
          }
        >
          {t('common:acceptable-use')}
        </StyledComponents.NavButton>
      </Link>
    </div>
  );

  return (
    <StyledComponents.FooterContainer>
      <StyledComponents.SpaceBetween>
        <div>
          <NavLinks
            direction={isSmallerThanTabletM ? 'column' : 'row'}
            isBurger={false}
            dark
            footer
          />
        </div>
      </StyledComponents.SpaceBetween>
      <StyledComponents.SpaceBetween>
        <div>
          <Link href="/contact-us" passHref>
            <StyledComponents.SecondaryBorderlessButton
              as="a"
              onClick={() => trackEvent(REGISTER_EVENT)}
            >
              {t('publicNavigation:register-btn')}
            </StyledComponents.SecondaryBorderlessButton>
          </Link>
          <StyledComponents.SecondaryBorderlessButton
            as="a"
            href="/auth/akamai"
            onClick={handleClickLogin}
          >
            {t('publicNavigation:user-log-in')}
          </StyledComponents.SecondaryBorderlessButton>
        </div>
      </StyledComponents.SpaceBetween>
    </StyledComponents.FooterContainer>
  );
};
