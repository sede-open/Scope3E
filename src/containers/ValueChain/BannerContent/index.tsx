import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { TransText } from 'utils/TransText';
import { trackEvent } from 'utils/analytics';
import { BUILD_YOUR_SUPPLY_CHAIN_BUTTON_CLICKED } from 'utils/analyticsEvents';
import { Text } from 'components/Text';
import Button from 'components/Button';
import * as StyledComponents from './styledComponents';
import * as selectors from '../selectors';

export const EstimateYourFootprint = () => {
  const { t } = useTranslation();

  return (
    <StyledComponents.TextContainer>
      <StyledComponents.Title>
        {t('valueChain:estimate-your-footprint-title')}
      </StyledComponents.Title>
      <Text>{t('valueChain:estimate-your-footprint-text')}</Text>
    </StyledComponents.TextContainer>
  );
};

export const BuildYourSupplyChain = () => {
  const { t } = useTranslation();
  const b = <b />;

  return (
    <>
      <StyledComponents.TextContainer marginBottom="1.375rem">
        <StyledComponents.Title>
          {t('valueChain:build-your-supply-chain-title')}
        </StyledComponents.Title>
        <TransText
          text={t('valueChain:build-your-supply-chain-text')}
          components={{ b }}
        />
      </StyledComponents.TextContainer>
      <StyledComponents.CtaContainer>
        <Link href="/network/getting-started" passHref>
          <Button
            as="a"
            color="primary"
            data-testid={selectors.startNetworkButton}
            onClick={() => trackEvent(BUILD_YOUR_SUPPLY_CHAIN_BUTTON_CLICKED)}
          >
            {t('valueChain:build-your-supply-chain-cta')}
          </Button>
        </Link>
      </StyledComponents.CtaContainer>
    </>
  );
};
