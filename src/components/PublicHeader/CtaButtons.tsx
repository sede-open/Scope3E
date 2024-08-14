import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { REGISTER_EVENT, SUPPLIER_LOGIN_EVENT } from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { REDIRECT_SESSION_KEY } from '../../constants';

export const CtaButtons = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const handleClickLogin = () => {
    // make sure we don't have a redundant value to redirect after the login
    sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    trackEvent(SUPPLIER_LOGIN_EVENT);
  };

  return (
    <>
      <Link locale={locale} href="/join-us" passHref>
        <StyledComponents.CtaButton
          data-testid={selectors.registerBtn}
          color="redesign-primary"
          type="button"
          onClick={() => trackEvent(REGISTER_EVENT)}
        >
          {t('publicNavigation:register-btn')}
        </StyledComponents.CtaButton>
      </Link>
      <StyledComponents.CtaButton
        as="a"
        href="/auth/akamai"
        data-testid={selectors.userLoginBtn}
        color="redesign-secondary"
        type="button"
        onClick={handleClickLogin}
      >
        {t('publicNavigation:user-login-btn')}
      </StyledComponents.CtaButton>
    </>
  );
};
