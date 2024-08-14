import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import {
  FOOTER_CONTACT_US_EVENT,
  FOOTER_TERMS_EVENT,
  FOOTER_LEGAL_DISCLAIMER_EVENT,
  FOOTER_DATA_PRIVACY_EVENT,
  FOOTER_SETH_MAIL_TO_EVENT,
  FOOTER_ACCEPTABLE_USE_EVENT,
  FOOTER_HELP_CENTRE_EVENT,
} from 'utils/analyticsEvents';
import { OpenInNewTabButton } from 'components/OpenInNewTabButton';
import { trackEvent } from 'utils/analytics';
import { Locale, abcdLocaleToZendeskLocale } from 'utils/i18n';
import { exampleLogo } from 'components/Glyphs/exampleLogo';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { FooterNavLinks } from './FooterNavLinks';
import {
  mailTo,
  DATA_PRIVACY_NOTICE_LINK,
  ZENDESK_SUPPLYCHAINS_HELPCENTRE_LINK,
} from '../../constants';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  isPublicRoute?: boolean;
}
interface HelpLinkProps {
  t: any;
  isPublicRoute: boolean | undefined;
  locale?: Locale;
}
const HelpLink = ({ t, isPublicRoute, locale }: HelpLinkProps) => {
  const zendeskLocaleSuffix = locale
    ? abcdLocaleToZendeskLocale[locale]
    : abcdLocaleToZendeskLocale.en;
  const path = `${ZENDESK_SUPPLYCHAINS_HELPCENTRE_LINK}/${zendeskLocaleSuffix}`;
  return isPublicRoute ? (
    <Link locale={locale} href={path} passHref>
      <StyledComponents.FooterButton
        as="a"
        isPublicRoute={isPublicRoute}
        data-testid={selectors.helpCentreBtn}
        onClick={() => trackEvent(FOOTER_HELP_CENTRE_EVENT)}
      >
        {t('common:footer-help-centre')}
      </StyledComponents.FooterButton>
    </Link>
  ) : (
    <OpenInNewTabButton
      href={path}
      dataTestId={selectors.helpCentreBtn}
      onClick={() => trackEvent(FOOTER_HELP_CENTRE_EVENT)}
      text={t('common:footer-help-centre')}
    />
  );
};
HelpLink.defaultProps = {
  locale: undefined,
};
export const Footer = ({ isPublicRoute }: IProps) => {
  const { t } = useTranslation();
  const { company } = useAuthenticatedUser();
  const { locale } = useRouter();

  return (
    <StyledComponents.Footer data-testid={selectors.footerContainer}>
      <StyledComponents.ResponsiveContainer>
        {isPublicRoute && (
          <StyledComponents.NavigationContainer>
            <StyledComponents.Title>
              {t('common:footer-explore')}
            </StyledComponents.Title>
            <FooterNavLinks />
          </StyledComponents.NavigationContainer>
        )}
        <StyledComponents.ContactContainer isNavigationVisible={isPublicRoute}>
          {isPublicRoute ? (
            <Link locale={locale} href="/contact-us">
              <StyledComponents.FooterButton
                isPublicRoute={isPublicRoute}
                as="a"
                href="/contact-us"
                data-testid={selectors.contactBtn}
                onClick={() => trackEvent(FOOTER_CONTACT_US_EVENT)}
              >
                {t('common:footer-contact-btn')}
              </StyledComponents.FooterButton>
            </Link>
          ) : (
            <StyledComponents.FooterContactUsContainer>
              <Text as="span" color={Tundora}>
                {t('common:footer-contact-us')}
              </Text>
              <StyledComponents.FooterContactUsButton
                as="a"
                href={mailTo}
                data-testid={selectors.mailToBtn}
                onClick={() =>
                  trackEvent(FOOTER_SETH_MAIL_TO_EVENT, {
                    companyName: company?.name,
                  })
                }
              >
                {t('common:support-email')}
              </StyledComponents.FooterContactUsButton>
            </StyledComponents.FooterContactUsContainer>
          )}
        </StyledComponents.ContactContainer>
      </StyledComponents.ResponsiveContainer>
      <StyledComponents.InfoContainer>
        <StyledComponents.LogoContainer>
          <exampleLogo title={t('common:footer-logo-alt')} />
        </StyledComponents.LogoContainer>
        <StyledComponents.InfoText>
          {t('common:footer-seth-description')}
        </StyledComponents.InfoText>
        <StyledComponents.MainContainer>
          <OpenInNewTabButton
            onClick={() =>
              trackEvent(FOOTER_TERMS_EVENT, {
                companyName: company?.name,
              })
            }
            href="/terms-of-use"
            dataTestId={selectors.termsBtn}
            text={t('common:terms-conditions')}
          />
          <StyledComponents.ColumnSpacer />

          <OpenInNewTabButton
            onClick={() =>
              trackEvent(FOOTER_LEGAL_DISCLAIMER_EVENT, {
                companyName: company?.name,
              })
            }
            href="/legal-disclaimer"
            dataTestId={selectors.legalDisclaimerBtn}
            text={t('common:legal-disclaimer')}
          />
          <StyledComponents.ColumnSpacer />
          <OpenInNewTabButton
            dataTestId={selectors.dataPrivacyBtn}
            href={DATA_PRIVACY_NOTICE_LINK}
            onClick={() =>
              trackEvent(FOOTER_DATA_PRIVACY_EVENT, {
                companyName: company?.name,
              })
            }
            text={t('common:data-privacy-notice')}
          />
          <StyledComponents.ColumnSpacer />
          <OpenInNewTabButton
            dataTestId={selectors.acceptableUseBtn}
            href="/acceptable-use"
            onClick={() =>
              trackEvent(FOOTER_ACCEPTABLE_USE_EVENT, {
                companyName: company?.name,
              })
            }
            text={t('common:acceptable-use')}
          />
        </StyledComponents.MainContainer>
      </StyledComponents.InfoContainer>
    </StyledComponents.Footer>
  );
};
Footer.defaultProps = {
  isPublicRoute: false,
};
