import { createPage } from 'components/CreatePage';
import { ExternalLink } from 'components/ExternalLink';
import { FooterRedesign } from 'components/FooterRedesign';
import { linkStyles } from 'components/Link';
import { PageHead } from 'components/PageHead';
import { Paragraph } from 'components/Paragraph';
import { PublicHeader } from 'components/PublicHeader';
import { Text } from 'components/Text';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import { PageWrapper } from 'layouts/PageWrapper';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import { FunGreen, LightGray } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { TransText } from 'utils/TransText';

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

const SubSection = styled.section`
  margin-top: 0.5rem;
`;

const StyledExternalLink = styled(ExternalLink)`
  ${linkStyles}
`;

const LegalDisclaimer = () => {
  const { t } = useTranslation();
  const listItems = t(
    'legalDisclaimer:list-items',
    {},
    { returnObjects: true }
  );

  return (
    <ModalProvider>
      <PageHead />
      <PageWrapper>
        <PublicHeader dark />
        <LandingBackground>
          <PageTitle>{t('legalDisclaimer:page-title')}</PageTitle>
        </LandingBackground>
        <Container>
          {listItems.map(({ title, description }: any) => (
            <Section key={title}>
              <SectionTitle>{title}</SectionTitle>
              <Paragraph>
                <TransText
                  text={description}
                  components={{
                    investorsLink: (
                      <StyledExternalLink
                        link={t('legalDisclaimer:example-investors-link')}
                      />
                    ),
                    secLink: (
                      <StyledExternalLink
                        link={t('legalDisclaimer:sec-gov-link')}
                      />
                    ),
                    subSection: <SubSection />,
                  }}
                />
              </Paragraph>
            </Section>
          ))}
        </Container>
      </PageWrapper>
      <PageWrapper>
        <FooterRedesign />
      </PageWrapper>
    </ModalProvider>
  );
};

export default createPage(LegalDisclaimer, { publicPage: true });
