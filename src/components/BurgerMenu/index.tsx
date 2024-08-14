import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackEvent } from 'utils/analytics';
import { SUPPLIER_LOGIN_EVENT, REGISTER_EVENT } from 'utils/analyticsEvents';
import { NavLinks } from 'components/NavLinks';
import { REDIRECT_SESSION_KEY } from '../../constants';
import * as selectors from './selectors';

import * as StyledComponents from './styledComponents';

interface IProps {
  isOpen: boolean;
  dark: boolean;
}

export const BurgerMenu = ({ isOpen, dark }: IProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const handleClickLogin = () => {
    // make sure we don't have a redundant value to redirect after the login
    sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    trackEvent(SUPPLIER_LOGIN_EVENT);
  };

  return (
    <StyledComponents.Wrapper data-testid={selectors.burgerMenu}>
      <NavLinks isBurger={isOpen} dark={dark} direction="column" />
      <StyledComponents.CtaContainer>
        <Link locale={locale} href="/join-us">
          <StyledComponents.CtaButton
            as="a"
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
      </StyledComponents.CtaContainer>
    </StyledComponents.Wrapper>
  );
};
