import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackEvent } from 'utils/analytics';
import { toSentenceCase } from 'utils/toSentenceCase';
import { FOOTER_NAVIGATION_EVENT } from 'utils/analyticsEvents';
import * as selectors from 'components/Footer/selectors';
import { REDIRECT_SESSION_KEY } from '../../../constants';
import { footerNavData } from './data';
import * as StyledComponents from './styledComponents';

export const FooterNavLinks = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const handleClickLogin = () => {
    // make sure we don't have a redundant value to redirect after the login
    sessionStorage.removeItem(REDIRECT_SESSION_KEY);
    trackEvent(FOOTER_NAVIGATION_EVENT, {
      btnId: toSentenceCase(selectors.exampleLoginBtn),
    });
  };

  return (
    <StyledComponents.Nav data-testid={selectors.footerNavList}>
      <StyledComponents.NavList>
        {footerNavData.map((item) => (
          <li key={item.id}>
            <Link locale={locale} href={item.path} passHref>
              <StyledComponents.NavButton
                as="a"
                data-testid={`${item.id}-footer-btn`}
                onClick={() => {
                  trackEvent(FOOTER_NAVIGATION_EVENT, {
                    btnId: toSentenceCase(item.id),
                  });
                }}
              >
                {t(`common:footer-${item.id}`)}
              </StyledComponents.NavButton>
            </Link>
          </li>
        ))}
      </StyledComponents.NavList>
    </StyledComponents.Nav>
  );
};
