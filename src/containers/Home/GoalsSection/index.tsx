import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackEvent } from 'utils/analytics';
import { HOME_PAGE_EXPLORE_FEATURE_SECTION } from 'utils/analyticsEvents';
import { FreeOfCharge } from 'components/Glyphs/FreeOfCharge';
import { OneStopShop } from 'components/Glyphs/OneStopShop';
import { LowCarbonSolutions } from 'components/Glyphs/LowCarbonSolutions';
import { GoalCard } from './GoalCard';
import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

export const GoalsSection = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <StyledComponents.SectionWrapper data-testid={selectors.homeGoalsSection}>
      <StyledComponents.TitleContainer>
        <StyledComponents.Title>
          {t('publicHome:goal-section-title')}
        </StyledComponents.Title>
      </StyledComponents.TitleContainer>
      <StyledComponents.ResponsiveWrapper>
        <StyledComponents.IconsWrapper>
          <GoalCard
            label={t('publicHome:free-of-charge-icon-label')}
            text={t('publicHome:free-of-charge-icon-label-text')}
          >
            <FreeOfCharge title={t('publicHome:free-of-charge-icon')} />
          </GoalCard>
          <GoalCard
            label={t('publicHome:one-stop-shop-icon-label')}
            text={t('publicHome:one-stop-shop-icon-label-text')}
          >
            <OneStopShop title={t('publicHome:one-stop-shop-icon')} />
          </GoalCard>
          <GoalCard
            label={t('publicHome:low-carbon-solutions-icon-label')}
            text={t('publicHome:low-carbon-solutions-icon-label-text')}
          >
            <LowCarbonSolutions
              title={t('publicHome:low-carbon-solutions-icon')}
            />
          </GoalCard>
        </StyledComponents.IconsWrapper>
      </StyledComponents.ResponsiveWrapper>
      <StyledComponents.CtaContainer>
        <Link locale={locale} href="/features" passHref>
          <StyledComponents.CtaButton
            as="a"
            data-testid={selectors.featureSection}
            color="secondary"
            onClick={() => trackEvent(HOME_PAGE_EXPLORE_FEATURE_SECTION)}
          >
            {t(`publicHome:${selectors.featureSection}`)}
          </StyledComponents.CtaButton>
        </Link>
      </StyledComponents.CtaContainer>
    </StyledComponents.SectionWrapper>
  );
};
