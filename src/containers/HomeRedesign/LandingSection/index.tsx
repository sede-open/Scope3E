import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { trackEvent } from 'utils/analytics';
import { HOME_PAGE_GET_IN_TOUCH_EVENT_START } from 'utils/analyticsEvents';
import Image from 'next/image';
import * as StyledComponents from './styledComponents';
import LaptopDashboardEmissionsSrc from '../../../../public/images/PublicSite/laptop-dashboard-emissions.png';

export const LandingSection = () => {
  const { t } = useTranslation('publicHome');
  return (
    <>
      <StyledComponents.LandingBackground>
        <StyledComponents.LandingTitle>
          {t('decarboniseWithConfidence')}
        </StyledComponents.LandingTitle>
        <StyledComponents.LandingSubtitle>
          {t('partneringToLowerEmissions')}
        </StyledComponents.LandingSubtitle>
      </StyledComponents.LandingBackground>
      <StyledComponents.WhatWeDoSection>
        <StyledComponents.WhatWeDoContent>
          <StyledComponents.WhatWeDoTitle>
            {t('whatDoWeDo')}
          </StyledComponents.WhatWeDoTitle>
          <StyledComponents.WhatWeDoDescription>
            {t('provideAccess')}
          </StyledComponents.WhatWeDoDescription>
          <Link href="/demo" passHref>
            <StyledComponents.RequestDemoButton
              onClick={() => trackEvent(HOME_PAGE_GET_IN_TOUCH_EVENT_START)}
            >
              {t('requestDemo')}
            </StyledComponents.RequestDemoButton>
          </Link>
        </StyledComponents.WhatWeDoContent>
        <StyledComponents.LaptopContainer>
          <Image
            src={LaptopDashboardEmissionsSrc}
            layout="responsive"
            objectFit="contain"
            alt="emissions"
            placeholder="blur"
            width={1767}
            height={942}
          />
        </StyledComponents.LaptopContainer>
      </StyledComponents.WhatWeDoSection>
    </>
  );
};
