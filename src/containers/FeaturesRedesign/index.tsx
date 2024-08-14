import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import { Feature } from './Feature';
import * as StyledComponents from './styledComponents';
import LaptopValueChainSrc from '../../../public/images/PublicSite/laptop-value-chain.png';
import LaptopDashboardIntensitySrc from '../../../public/images/PublicSite/laptop-dashboard-intensity.png';
import LaptopNetworkSrc from '../../../public/images/PublicSite/laptop-network.png';
import LaptopSolutionsSrc from '../../../public/images/PublicSite/laptop-solutions.png';
import LaptopCommunitySrc from '../../../public/images/PublicSite/laptop-community.png';
import MonitorSrc from '../../../public/images/PublicSite/monitor.png';

export const FeaturesRedesign = () => {
  const { t } = useTranslation('publicFeatures');

  return (
    <>
      <StyledComponents.BackgroundCover>
        <StyledComponents.LandingHeader>
          {t('functionalFeatures')}
        </StyledComponents.LandingHeader>
      </StyledComponents.BackgroundCover>
      <StyledComponents.DemoSection>
        <StyledComponents.DemoTextSection>
          <StyledComponents.DemoTitle>
            {t('toolsToDecarbonise')}
          </StyledComponents.DemoTitle>
          <Link href="/demo" passHref>
            <StyledComponents.RequestDemoButton>
              {t('requestDemo')}
            </StyledComponents.RequestDemoButton>
          </Link>
        </StyledComponents.DemoTextSection>
        <StyledComponents.DemoImageSection>
          <StyledComponents.LaptopImg
            src={LaptopValueChainSrc}
            alt="value-chain"
          />
        </StyledComponents.DemoImageSection>
        <StyledComponents.LandingHeaderSmall>
          {t('functionalFeatures')}
        </StyledComponents.LandingHeaderSmall>
      </StyledComponents.DemoSection>
      <StyledComponents.FeaturesTitleContainer>
        <StyledComponents.FeaturesTitle>
          {t('discoverMore')}
        </StyledComponents.FeaturesTitle>
      </StyledComponents.FeaturesTitleContainer>
      <Feature
        reverse
        iconUrl="/goals-emissions.svg"
        title={t('gainEmissionInsights')}
        desc={t('getDataDrivenEstimates')}
        laptopImgSource={LaptopDashboardIntensitySrc}
      />
      <Feature
        iconUrl="/goals-supply-chain.svg"
        title={t('inviteShareCollaborate')}
        desc={t('collaborateWithYourCustomers')}
        laptopImgSource={LaptopNetworkSrc}
      />
      <Feature
        reverse
        iconUrl="/goals-solutions.svg"
        title={t('lowCarbonAlternatives')}
        desc={t('exploreSolutions')}
        laptopImgSource={LaptopSolutionsSrc}
      />
      <Feature
        community
        title={t('discoverCommunity')}
        desc={t('collaborateWithOthers')}
        laptopImgSource={LaptopCommunitySrc}
      />

      <StyledComponents.FooterBackground>
        <StyledComponents.MonitorContainer>
          <Image
            src={MonitorSrc}
            alt="monitor"
            layout="intrinsic"
            width={2427}
            height={1365}
          />
        </StyledComponents.MonitorContainer>
        <StyledComponents.GreenBackground>
          <StyledComponents.WhiteTitle>
            {t('howDoesThisWork')}
          </StyledComponents.WhiteTitle>
          <StyledComponents.WhiteParagraph>
            {t('collaborateWithOthers')}
          </StyledComponents.WhiteParagraph>
          <Link href="/demo" passHref>
            <StyledComponents.BottomDemoRequestButton>
              {t('requestDemo')}
            </StyledComponents.BottomDemoRequestButton>
          </Link>
          <Link href="/stories" passHref>
            <StyledComponents.SeeStoriesButton>
              {t('readSuccessStories')}
            </StyledComponents.SeeStoriesButton>
          </Link>
        </StyledComponents.GreenBackground>
      </StyledComponents.FooterBackground>
    </>
  );
};
