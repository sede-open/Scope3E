import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackEvent } from 'utils/analytics';

import {
  HOME_PAGE_FIND_OUT_MORE_EVENT,
  HOME_PAGE_GET_IN_TOUCH_EVENT_START,
} from 'utils/analyticsEvents';
import * as selectors from 'containers/Home/selectors';
import * as StyledComponents from './styledComponents';

export const LandingSection = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <StyledComponents.ResponsiveWrapper
        data-testid={selectors.homeLandingSection}
      >
        <StyledComponents.Container>
          <StyledComponents.TitleContainer>
            <StyledComponents.Title>
              {t('publicHome:page-title')}
            </StyledComponents.Title>
          </StyledComponents.TitleContainer>

          <StyledComponents.SubTextContainer>
            <StyledComponents.Subtext>
              {t('publicHome:page-subtitle')}
            </StyledComponents.Subtext>
          </StyledComponents.SubTextContainer>

          <StyledComponents.SubtitleS>
            {t('publicHome:interested-in-joining')}
          </StyledComponents.SubtitleS>

          <StyledComponents.CtaContainer>
            <Link locale={locale} href="/join-us" passHref>
              <StyledComponents.CtaButton
                as="a"
                data-testid={selectors.getInTouchBtn}
                color="primary"
                onClick={() => trackEvent(HOME_PAGE_GET_IN_TOUCH_EVENT_START)}
              >
                {t(`publicHome:${selectors.getInTouchBtn}`)}
              </StyledComponents.CtaButton>
            </Link>
            <Link locale={locale} href="/features" passHref>
              <StyledComponents.CtaButtonLearnMore
                as="a"
                data-testid={selectors.findOutMoreBtn}
                color="text-button"
                onClick={() => trackEvent(HOME_PAGE_FIND_OUT_MORE_EVENT)}
              >
                {t(`publicHome:${selectors.findOutMoreBtn}`)}
              </StyledComponents.CtaButtonLearnMore>
            </Link>
          </StyledComponents.CtaContainer>
        </StyledComponents.Container>
        <StyledComponents.GraphicContainer>
          <StyledComponents.SquaresGraphic
            data-testid={selectors.squaresGraphic}
            alt={t(`publicHome:${selectors.squaresGraphic}`)}
            title={t(`publicHome:${selectors.squaresGraphic}`)}
          />
          <StyledComponents.TurbineGraphic
            data-testid={selectors.turbineGraphic}
            alt={t(`publicHome:${selectors.turbineGraphic}`)}
            title={t(`publicHome:${selectors.turbineGraphic}`)}
          />
        </StyledComponents.GraphicContainer>
      </StyledComponents.ResponsiveWrapper>
    </>
  );
};
