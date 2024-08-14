import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { Link } from 'components/Link';
import { PageHead } from 'components/PageHead';
import { PublicHeader } from 'components/PublicHeader';
import { Text } from 'components/Text';
import { UnorderedList } from 'components/UnorderedList';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import { FunGreen, LightGray, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { mailTo, mailToContactUs, mailToReport } from '../../constants';

const Container = styled.div`
  padding: 32px 24px;

  @media ${device.tabletM} {
    padding: 32px 132px;
  }
`;

const LandingBackground = styled.div`
  background-color: ${LightGray};
  min-height: 262px;
  width: 100%;
`;

const PageTitle = styled(Text).attrs({
  as: 'h1',
  size: '3rem',
  family: exampleBold,
  color: FunGreen,
})`
  padding: 102px 24px 24px 24px;

  @media ${device.tabletM} {
    padding: 126px 132px 40px 132px;
  }
`;

const TargetSection = styled.div`
  position: relative;
  margin-bottom: 16px;
  scroll-margin-top: 100px;
`;

const ParagraphContainer = styled.div`
  padding-left: 10px;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 1.625rem;
  font-family: ${exampleBold};
  color: ${FunGreen};

  a {
    color: ${FunGreen};
  }
`;

const Paragraph = styled(Text).attrs({
  size: '14px',
})`
  margin-bottom: 24px;
  line-height: 20px;
  font-family: Arial, sans-serif;
  color: ${Tundora};
`;

const ACCEPTABLE_USE_POLICY_LINK = '/acceptable-use';
const PRIVACY_NOTICE_LINK = 'https://www.example.com/privacy/b2b-notice.html';
const NETHERLANDS_PRIVACY_NOTICE_LINK = 'https://www.example.nl/privacy.html';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <ModalProvider>
      <PageHead />
      <PageWrapper>
        <PublicHeader dark />
        <LandingBackground>
          <PageTitle>{t('termsOfUse:page-title')}</PageTitle>
        </LandingBackground>
        <Container>
          <Section>
            <Paragraph>
              1.{' '}
              <Link href="#introduction">
                {t('termsOfUse:content-overview[0]')}
              </Link>
            </Paragraph>
            <Paragraph>
              2.{' '}
              <Link href="#groundRules">
                {t('termsOfUse:content-overview[1]')}
              </Link>
            </Paragraph>
            <Paragraph>
              3.{' '}
              <Link href="#accessAndAccountSecurity">
                {t('termsOfUse:content-overview[2]')}
              </Link>
            </Paragraph>
            <Paragraph>
              4.{' '}
              <Link href="#externalLinksAndApplications">
                {t('termsOfUse:content-overview[3]')}
              </Link>
            </Paragraph>
            <Paragraph>
              5.{' '}
              <Link href="#ownershipAndProprietaryRights">
                {t('termsOfUse:content-overview[4]')}
              </Link>
            </Paragraph>
            <Paragraph>
              6.{' '}
              <Link href="#warranties">
                {t('termsOfUse:content-overview[5]')}
              </Link>
            </Paragraph>
            <Paragraph>
              7.{' '}
              <Link href="#limitationOfLiability">
                {t('termsOfUse:content-overview[6]')}
              </Link>
            </Paragraph>
            <Paragraph>
              8.{' '}
              <Link href="#indemnification">
                {t('termsOfUse:content-overview[7]')}
              </Link>
            </Paragraph>
            <Paragraph>
              9.{' '}
              <Link href="#tradeContols">
                {t('termsOfUse:content-overview[8]')}
              </Link>
            </Paragraph>
            <Section />
            <Paragraph>{t('termsOfUse:page-introduction[0]')}</Paragraph>
            <ParagraphContainer>
              <Paragraph id="leftPadding">
                <UnorderedList
                  items={t(
                    'termsOfUse:page-introduction-points',
                    {},
                    { returnObjects: true }
                  )}
                />
              </Paragraph>
            </ParagraphContainer>
            <Paragraph>
              <Trans
                i18nKey="termsOfUse:page-introduction[1]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                  privacyNoticeLink: (
                    <Link href={PRIVACY_NOTICE_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="introduction">
              <SectionTitle>
                {' '}
                1.{' '}
                <u>
                  <Link href="#introduction">
                    {t('termsOfUse:content-overview[0]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:introduction[0]"
                components={[<strong />]}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:introduction[1]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                  privacyNoticeLink: (
                    <Link href={PRIVACY_NOTICE_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:introduction[2]"
                components={[<strong />]}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:introduction[3]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="groundRules">
              <SectionTitle>
                2.{' '}
                <u>
                  <Link href="#groundRules">
                    {t('termsOfUse:content-overview[1]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[0]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[1]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                  contactUsToTerminateMail: <Link href={mailToContactUs} />,
                }}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[2]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                  sethReportMail: <Link href={mailToReport} />,
                }}
              />
            </Paragraph>

            <Paragraph>{t('termsOfUse:ground-rules[3]')}</Paragraph>

            <Paragraph>{t('termsOfUse:ground-rules[4]')}</Paragraph>

            <Paragraph>{t('termsOfUse:ground-rules[5]')}</Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[6]"
                components={{
                  strong: <strong />,
                  privacyNoticeLink: (
                    <Link href={PRIVACY_NOTICE_LINK} target="_blank" />
                  ),
                  netherlandsPrivacyNote: (
                    <Link
                      href={NETHERLANDS_PRIVACY_NOTICE_LINK}
                      target="_blank"
                    />
                  ),
                }}
              />
            </Paragraph>

            <Paragraph>{t('termsOfUse:ground-rules[7]')}</Paragraph>

            <Paragraph>
              <UnorderedList
                items={t(
                  'termsOfUse:ground-rules[7]-actions',
                  {},
                  { returnObjects: true }
                )}
              />
            </Paragraph>

            <Paragraph>{t('termsOfUse:ground-rules[8]')}</Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[9]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>

            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ground-rules[10]"
                components={{
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:ground-rules[11]')}{' '}
              <Link href={mailTo}>{t('termsOfUse:support-mail')}</Link>.
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="accessAndAccountSecurity">
              <SectionTitle>
                3.{' '}
                <u>
                  {' '}
                  <Link href="#accessAndAccountSecurity">
                    {t('termsOfUse:content-overview[2]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>
              {t('termsOfUse:access-and-account-security[0]')}
            </Paragraph>
            <Paragraph>
              {t('termsOfUse:access-and-account-security[1]')}
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="externalLinksAndApplications">
              <SectionTitle>
                4.{' '}
                <u>
                  <Link href="#externalLinksAndApplications">
                    {t('termsOfUse:content-overview[3]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[0]')}
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[1]')}
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[2]')}
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[3]')}
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[4]')}
            </Paragraph>

            <Paragraph>
              {t('termsOfUse:external-websites-or-application[5]')}
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="ownershipAndProprietaryRights">
              <SectionTitle>
                5.{' '}
                <u>
                  <Link href="#ownershipAndProprietaryRights">
                    {t('termsOfUse:content-overview[4]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>
            <Paragraph>{t('termsOfUse:ownership[0]')}</Paragraph>
            <Paragraph>{t('termsOfUse:ownership[1a]')}</Paragraph>
            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ownership[1b]"
                components={{
                  privacyNoticeLink: (
                    <Link href={PRIVACY_NOTICE_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>
            <Paragraph>{t('termsOfUse:ownership[1c]')}</Paragraph>
            <Paragraph>{t('termsOfUse:ownership[1d]')}</Paragraph>
            <Paragraph>{t('termsOfUse:ownership[2a]')}</Paragraph>
            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ownership[3]"
                components={{
                  privacyNoticeLink: (
                    <Link href={PRIVACY_NOTICE_LINK} target="_blank" />
                  ),
                  acceptableUseLink: (
                    <Link href={ACCEPTABLE_USE_POLICY_LINK} target="_blank" />
                  ),
                }}
              />
            </Paragraph>
            <Paragraph>{t('termsOfUse:ownership[4]')}</Paragraph>
            <Paragraph>{t('termsOfUse:ownership[5]')}</Paragraph>
            <Paragraph>
              <Trans
                i18nKey="termsOfUse:ownership[6]"
                components={[<strong />]}
              />
            </Paragraph>{' '}
          </Section>

          <Section>
            <TargetSection id="warranties">
              <SectionTitle>
                6.{' '}
                <u>
                  <Link href="#warranties">
                    {t('termsOfUse:content-overview[5]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>{t('termsOfUse:warranties[0]')}</Paragraph>

            <Paragraph>{t('termsOfUse:warranties[1]')}</Paragraph>

            <Paragraph>{t('termsOfUse:warranties[2]')}</Paragraph>
          </Section>

          <Section>
            <TargetSection id="limitationOfLiability">
              <SectionTitle>
                7.{' '}
                <u>
                  <Link href="#limitationOfLiability">
                    {t('termsOfUse:content-overview[6]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>{t('termsOfUse:limitation-of-liability')}</Paragraph>

            <Paragraph>
              <UnorderedList
                items={t(
                  'termsOfUse:limitation-of-liability-points',
                  {},
                  { returnObjects: true }
                )}
              />
            </Paragraph>
          </Section>

          <Section>
            <TargetSection id="indemnification">
              <SectionTitle>
                8.{' '}
                <u>
                  <Link href="#indemnification">
                    {t('termsOfUse:content-overview[7]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>{t('termsOfUse:indemnification')}</Paragraph>
          </Section>

          <Section>
            <TargetSection id="tradeContols">
              <SectionTitle>
                9.{' '}
                <u>
                  <Link href="#tradeContols">
                    {t('termsOfUse:content-overview[8]')}
                  </Link>
                </u>
              </SectionTitle>
            </TargetSection>

            <Paragraph>{t('termsOfUse:trade-controls')}</Paragraph>
          </Section>

          <Section>
            <Paragraph>{t('termsOfUse:last-updated')}</Paragraph>
          </Section>
        </Container>
      </PageWrapper>
      <PageWrapper>
        <FooterRedesign />
      </PageWrapper>
    </ModalProvider>
  );
};

export default createPage(TermsOfUse, { publicPage: true });
