import useTranslation from 'next-translate/useTranslation';
import Icon from 'components/Icon';
import Link from 'next/link';
import * as StyledComponents from './styledComponents';

export const GoalsSection = () => {
  const { t } = useTranslation('publicHome');
  return (
    <StyledComponents.Goals>
      <StyledComponents.GoalsHeading>
        <StyledComponents.GoalsTitle>
          {t('towardsDecarbonisation')}
        </StyledComponents.GoalsTitle>
        <StyledComponents.GoalsSubtitle>
          {t('howWeSupport')}
        </StyledComponents.GoalsSubtitle>
      </StyledComponents.GoalsHeading>
      <StyledComponents.GoalsContainer>
        <StyledComponents.Goal>
          <StyledComponents.GoalIcon>
            <Icon src="/goals-emissions.svg" alt="emissions" size={114} />
          </StyledComponents.GoalIcon>
          <StyledComponents.GoalTitle>
            {t('gainEmissionInsights')}
          </StyledComponents.GoalTitle>
          <StyledComponents.GoalDescription>
            {t('estimateCompareForecast')}
          </StyledComponents.GoalDescription>
        </StyledComponents.Goal>
        <StyledComponents.Goal>
          <StyledComponents.GoalIcon>
            <Icon src="/goals-supply-chain.svg" alt="supply chain" size={114} />
          </StyledComponents.GoalIcon>
          <StyledComponents.GoalTitle>
            {t('decarboniseSupplyChain')}
          </StyledComponents.GoalTitle>
          <StyledComponents.GoalDescription>
            {t('extendAmbition')}
          </StyledComponents.GoalDescription>
        </StyledComponents.Goal>
        <StyledComponents.Goal>
          <StyledComponents.GoalIcon>
            <Icon src="/goals-solutions.svg" alt="solutions" size={114} />
          </StyledComponents.GoalIcon>
          <StyledComponents.GoalTitle>
            {t('exploreSolutions')}
          </StyledComponents.GoalTitle>
          <StyledComponents.GoalDescription>
            {t('overcomeChallenges')}
          </StyledComponents.GoalDescription>
        </StyledComponents.Goal>
      </StyledComponents.GoalsContainer>
      <Link href="/features" passHref>
        <StyledComponents.GoalsButton>
          {t('exploreFeatures')}
        </StyledComponents.GoalsButton>
      </Link>
      <StyledComponents.Features>
        <StyledComponents.Feature>
          <StyledComponents.FeatureIcon>
            <Icon
              src="/feature-carbon-footprint.svg"
              alt="carbon footprint"
              size={73}
            />
          </StyledComponents.FeatureIcon>
          <StyledComponents.FeatureTitle>
            {t('estimateFootprint')}
          </StyledComponents.FeatureTitle>
        </StyledComponents.Feature>
        <StyledComponents.Feature>
          <StyledComponents.FeatureIcon>
            <Icon src="/feature-comparison.svg" alt="comparison" size={86} />
          </StyledComponents.FeatureIcon>
          <StyledComponents.FeatureTitle>
            {t('industryComparison')}
          </StyledComponents.FeatureTitle>
        </StyledComponents.Feature>
        <StyledComponents.Feature>
          <StyledComponents.FeatureIcon>
            <Icon src="/feature-performance.svg" alt="performance" size={82} />
          </StyledComponents.FeatureIcon>
          <StyledComponents.FeatureTitle>
            {t('forecastPerformance')}
          </StyledComponents.FeatureTitle>
        </StyledComponents.Feature>
        <StyledComponents.Feature>
          <StyledComponents.FeatureIcon>
            <Icon src="/feature-ambition.svg" alt="ambition" size={86} />
          </StyledComponents.FeatureIcon>
          <StyledComponents.FeatureTitle>
            {t('ghgAmbition')}
          </StyledComponents.FeatureTitle>
        </StyledComponents.Feature>
        <StyledComponents.Feature>
          <StyledComponents.FeatureIcon>
            <Icon src="/feature-progress.svg" alt="progress" size={72} />
          </StyledComponents.FeatureIcon>
          <StyledComponents.FeatureTitle>
            {t('trackProgress')}
          </StyledComponents.FeatureTitle>
        </StyledComponents.Feature>
      </StyledComponents.Features>
    </StyledComponents.Goals>
  );
};
