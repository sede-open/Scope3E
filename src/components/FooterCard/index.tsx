import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trackEvent } from 'utils/analytics';
import { FOOTER_CARD_BTN_EVENT } from 'utils/analyticsEvents';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  invertColor?: boolean;
}

export const FooterCard = ({ invertColor }: IProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <StyledComponents.FooterCardContainer
      data-testid={selectors.footerCard}
      invertColor={invertColor}
    >
      <StyledComponents.ContentContainer>
        <StyledComponents.TitleContainer>
          <StyledComponents.Title>
            {t('common:footer-card-title')}
          </StyledComponents.Title>
        </StyledComponents.TitleContainer>
        <StyledComponents.CtaContainer>
          <Link locale={locale} href="/join-us" passHref>
            <StyledComponents.CtaButton
              as="a"
              data-testid={selectors.getInTouch}
              color="primary"
              onClick={() => trackEvent(FOOTER_CARD_BTN_EVENT)}
              invertColor={invertColor}
            >
              {t(`common:${selectors.getInTouch}`)}
            </StyledComponents.CtaButton>
          </Link>
        </StyledComponents.CtaContainer>
      </StyledComponents.ContentContainer>
    </StyledComponents.FooterCardContainer>
  );
};

FooterCard.defaultProps = {
  invertColor: false,
};
