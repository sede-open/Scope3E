import { createPage } from 'components/CreatePage';
import { FooterRedesign } from 'components/FooterRedesign';
import { Link } from 'components/Link';
import { PageHead } from 'components/PageHead';
import { Paragraph } from 'components/Paragraph';
import { PublicHeader } from 'components/PublicHeader';
import { Text } from 'components/Text';
import { UnorderedList } from 'components/UnorderedList';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import { FunGreen, LightGray } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { TransText } from 'utils/TransText';
import { mailTo } from '../../constants';

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

const Section = styled.section`
  margin-bottom: 4rem;

  > *:last-child {
    margin-bottom: 0;
  }

  &:last-of-type {
    margin-bottom: 6rem;
  }
`;

const SectionTitle = styled.p`
  margin: 0 0 16px 0;
  font-size: 1.625rem;
  font-family: ${exampleBold};
  color: ${FunGreen};
`;

const AcceptableUse = () => {
  const { t } = useTranslation();

  return (
    <ModalProvider>
      <PageHead />
      <PageWrapper>
        <PublicHeader dark />

        <LandingBackground>
          <PageTitle> {t('acceptableUsePolicy:page-title')}</PageTitle>
        </LandingBackground>
        <Container>
          <Section>
            {t(
              'acceptableUsePolicy:introduction',
              {},
              { returnObjects: true }
            ).map((paragraph: string) => (
              <Paragraph key={paragraph}>
                <TransText
                  text={paragraph}
                  components={{
                    strong: <strong />,
                    link: <Link href="/terms-of-use" target="_blank" />,
                  }}
                />
              </Paragraph>
            ))}
          </Section>

          <Section>
            <SectionTitle>
              <b>{t('acceptableUsePolicy:do-heading')}</b>
            </SectionTitle>

            <UnorderedList
              items={t('acceptableUsePolicy:do', {}, { returnObjects: true })}
            />
          </Section>

          <Section>
            <SectionTitle>
              <b>{t('acceptableUsePolicy:do-not-heading')}</b>
            </SectionTitle>

            <UnorderedList
              items={t(
                'acceptableUsePolicy:do-not',
                {},
                { returnObjects: true }
              )}
            />
          </Section>

          <Section>
            <Paragraph>{t('acceptableUsePolicy:liability')}</Paragraph>
          </Section>

          <Section>
            <SectionTitle>
              {' '}
              {t('acceptableUsePolicy:contact-us-heading')}
            </SectionTitle>

            <Paragraph>
              <Trans
                i18nKey="acceptableUsePolicy:contact-us"
                components={{
                  link: <Link href={mailTo} />,
                }}
              />
            </Paragraph>

            <Paragraph>{t('acceptableUsePolicy:last-updated')}</Paragraph>
          </Section>
        </Container>
      </PageWrapper>
      <PageWrapper>
        <FooterRedesign />
      </PageWrapper>
    </ModalProvider>
  );
};

export default createPage(AcceptableUse, { publicPage: true });
