import useTranslation from 'next-translate/useTranslation';
import { trackEvent } from 'utils/analytics';
import { HOME_VISIT_example_BUTTON } from 'utils/analyticsEvents';
import Icon from 'components/Icon';
import Trans from 'next-translate/Trans';

import * as selectors from 'containers/Home/selectors';
import * as StyledComponents from './styledComponents';

export const BannerSection = () => {
  const { t } = useTranslation();
  return (
    <StyledComponents.SectionWrapper data-testid={selectors.homeBannerSection}>
      <StyledComponents.BannerContainer>
        <StyledComponents.ContentOverlay>
          <StyledComponents.SubTextTopContainer>
            <StyledComponents.Subtext>
              {t('publicHome:banner-subtext-top')}
            </StyledComponents.Subtext>
          </StyledComponents.SubTextTopContainer>
          <StyledComponents.TitleContainer>
            <StyledComponents.Title>
              {t('publicHome:banner-title')}
            </StyledComponents.Title>
          </StyledComponents.TitleContainer>
          <StyledComponents.SubtitleContainer>
            <StyledComponents.Subtitle>
              {t('publicHome:banner-subtitle')}
            </StyledComponents.Subtitle>
          </StyledComponents.SubtitleContainer>
          <StyledComponents.SubTextBottomContainer>
            <StyledComponents.Subtext>
              {t('publicHome:banner-subtext-bottom')}
            </StyledComponents.Subtext>
            <StyledComponents.DisclaimerContainer>
              <StyledComponents.DisclaimerText>
                <Trans
                  i18nKey="publicHome:legal-disclaimer-link"
                  components={[
                    <StyledComponents.DisclaimerLink
                      href="/legal-disclaimer"
                      target="_blank"
                    >
                      Legal Disclaimer
                    </StyledComponents.DisclaimerLink>,
                  ]}
                />
              </StyledComponents.DisclaimerText>
            </StyledComponents.DisclaimerContainer>
          </StyledComponents.SubTextBottomContainer>
          <StyledComponents.CtaContainer>
            <StyledComponents.CtaButton
              as="a"
              href={t('publicHome:example-climate-url')}
              data-testid={selectors.exampleSiteBtn}
              color="primary"
              onClick={() => trackEvent(HOME_VISIT_example_BUTTON)}
              target="_blank"
            >
              <StyledComponents.IconContainer>
                <Icon alt="New Tab" src="/new-tab.svg" size={16} />
              </StyledComponents.IconContainer>
              {t(`publicHome:${selectors.exampleSiteBtn}`)}
            </StyledComponents.CtaButton>
          </StyledComponents.CtaContainer>
        </StyledComponents.ContentOverlay>
      </StyledComponents.BannerContainer>
    </StyledComponents.SectionWrapper>
  );
};
