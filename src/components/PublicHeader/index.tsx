import { BurgerMenu } from 'components/BurgerMenu';
import { NavLinks } from 'components/NavLinks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { SethLogoWhite } from 'components/Glyphs/SethLogoWhite';
import { SethLogo } from 'components/Glyphs';
import { useResponsive } from 'effects/useResponsive';
import { screenSize } from 'styles/variables';
import { CtaButtons } from './CtaButtons';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

type Props = {
  dark?: boolean;
};
export const PublicHeader = ({ dark }: Props) => {
  const { t } = useTranslation();
  const [isBurgerMenu, setBurgerMenu] = useState(false);
  const { locale } = useRouter();
  const screenWidth = useResponsive();

  const toggleBurgerMenu = useCallback(() => {
    setBurgerMenu(!isBurgerMenu);
  }, [isBurgerMenu]);

  const isDark = dark || screenWidth < screenSize.tabletM;

  return (
    <StyledComponents.Header data-testid={selectors.publicHeader}>
      <StyledComponents.ResponsiveContainer>
        <Link locale={locale} href="/" passHref>
          <StyledComponents.LogoContainer>
            {isDark ? (
              <SethLogo title={t('publicNavigation:logo-alt')} />
            ) : (
              <SethLogoWhite title={t('publicNavigation:logo-alt')} />
            )}
          </StyledComponents.LogoContainer>
        </Link>
        <StyledComponents.MenuIconContainer>
          <StyledComponents.MenuIcon
            open={isBurgerMenu}
            onClick={toggleBurgerMenu}
            tabIndex={0}
          />
        </StyledComponents.MenuIconContainer>
        <StyledComponents.CtaContainerForTablet>
          <CtaButtons />
        </StyledComponents.CtaContainerForTablet>
      </StyledComponents.ResponsiveContainer>
      {isBurgerMenu && (
        <StyledComponents.BurgerMenuContainer>
          <BurgerMenu dark={isDark} isOpen={isBurgerMenu} />
        </StyledComponents.BurgerMenuContainer>
      )}
      <StyledComponents.NavBarContainer>
        <NavLinks isBurger={isBurgerMenu} direction="row" dark={isDark} />
        <StyledComponents.CtaContainer>
          <CtaButtons />
        </StyledComponents.CtaContainer>
      </StyledComponents.NavBarContainer>
    </StyledComponents.Header>
  );
};
