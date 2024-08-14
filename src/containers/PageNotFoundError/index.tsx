import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { trackEvent } from 'utils/analytics';
import { PAGE_NOT_FOUND_BTN } from 'utils/analyticsEvents';

import { SethLogo } from 'components/Glyphs/SethLogo';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export const PageNotFoundError = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.Wrapper>
      <Link href="/" passHref>
        <StyledComponents.LogoContainer>
          <StyledComponents.Logo>
            <SethLogo title={t('common:seth-logo-title')} />
          </StyledComponents.Logo>
        </StyledComponents.LogoContainer>
      </Link>
      <StyledComponents.TitleContainer>
        <StyledComponents.Title>
          {t('errorPage:page-title')}
        </StyledComponents.Title>
      </StyledComponents.TitleContainer>
      <StyledComponents.SubTextContainer>
        <StyledComponents.Subtext>
          {t('errorPage:page-subtext')}
        </StyledComponents.Subtext>
      </StyledComponents.SubTextContainer>
      <StyledComponents.CtaContainer>
        <StyledComponents.RedirectBtn
          data-testid={selectors.redirectBtn}
          onClick={() => trackEvent(PAGE_NOT_FOUND_BTN)}
        >
          {t('errorPage:page-cta-btn')}
        </StyledComponents.RedirectBtn>
      </StyledComponents.CtaContainer>
    </StyledComponents.Wrapper>
  );
};
