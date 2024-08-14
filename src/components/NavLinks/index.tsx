import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { trackEvent } from 'utils/analytics';
import { HEADER_NAVIGATION_EVENT } from 'utils/analyticsEvents';
import { toSentenceCase } from 'utils/toSentenceCase';
import { getNavData } from './data';
import * as StyledComponents from './styledComponents';

interface IProps {
  direction: string;
  isBurger: boolean;
  dark?: boolean;
  footer?: boolean;
}
export const NavLinks = ({
  direction,
  isBurger,
  dark,
  footer = false,
}: IProps) => {
  const { t } = useTranslation();
  const { locale, pathname } = useRouter();

  return (
    <StyledComponents.Nav direction={direction} data-testid="desktop-nav-bar">
      <StyledComponents.NavList $isBurger={isBurger} $direction={direction}>
        {getNavData({ footer }).map((button) => {
          const isActive =
            button.path === '/'
              ? pathname === button.path
              : pathname.startsWith(button.path);

          return (
            <StyledComponents.NavItem
              key={button.id}
              $isBurger={isBurger}
              $footer={footer}
            >
              <Link locale={locale} href={button.path} passHref>
                <StyledComponents.NavLink
                  as="a"
                  color="text-button"
                  $dark={dark}
                  $footer={footer}
                  data-testid={`${button.id}-btn`}
                  $isActive={isActive}
                  onClick={() => {
                    trackEvent(HEADER_NAVIGATION_EVENT, {
                      btnId: toSentenceCase(button.id),
                    });
                  }}
                >
                  {t(`publicNavigation:${button.id}`)}
                </StyledComponents.NavLink>
              </Link>
            </StyledComponents.NavItem>
          );
        })}
      </StyledComponents.NavList>
    </StyledComponents.Nav>
  );
};
