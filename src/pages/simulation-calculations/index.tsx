import { ExternalLink } from 'components/ExternalLink';
import { Footer } from 'components/Footer';
import { DataCentre } from 'components/Glyphs/DataCentre';
import { Electricity } from 'components/Glyphs/Electricity';
import { Mobility } from 'components/Glyphs/Mobility';
import { Shipping } from 'components/Glyphs/Shipping';
import { Travel } from 'components/Glyphs/Travel';
import { Truck } from 'components/Glyphs/Truck';
import { Header } from 'components/Header';
import { Link, linkStyles } from 'components/Link';
import { PageHead } from 'components/PageHead';
import { Text } from 'components/Text';
import { PageContent } from 'layouts/PageContent';
import { PageWrapper } from 'layouts/PageWrapper';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import {
  Alto,
  CannonPink,
  CongressBlue,
  MidBlue,
  TahitiGold,
  Tundora,
} from 'styles/colours';
import { exampleBold, exampleMedium } from 'styles/fonts';
import { TransText } from 'utils/TransText';

const PageTitle = styled(Text)`
  margin-top: 6rem;
  margin-bottom: 4rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 1.5rem;
`;

const SectionIcon = styled.div<{ background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background: ${({ background }) => background};
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SectionDescription = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 264px;
  max-width: 100%;
`;

const SectionTitle = styled(Text).attrs({ as: 'h2' })`
  margin-left: 16px;
  font-family: ${exampleBold};
  color: ${Tundora};
  font-size: 24px;
  line-height: 28px;
`;

const SubSection = styled.div`
  margin-bottom: 8px;
`;

const ParagraphTitle = styled(Text)`
  line-height: 20px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: ${Tundora};
  font-weight: bold;
  margin-bottom: 4px;
`;

const Paragraph = styled.p`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 8px;
  line-height: 20px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: ${Tundora};
`;

const Separator = styled(Paragraph)`
  width: 100%;
  height: 1px;
  background: ${Alto};
  margin-top: 96px;
  margin-bottom: 48px;
`;

const DisclaimerTitle = styled(Text).attrs({ as: 'h3' })`
  margin-bottom: 29px;
`;

const StyledExternalLink = styled(ExternalLink)`
  ${linkStyles}
`;

const SimulationCalculations = () => {
  const { t } = useTranslation();

  const b = <b />;

  const greenhouseReportingLink = (
    <StyledExternalLink
      link={t('ambitionSimulationInfo:green-house-reporting-link')}
    />
  );

  const defraLink = (
    <StyledExternalLink link={t('ambitionSimulationInfo:defra-link')} />
  );

  const glecFrameworkLink = (
    <StyledExternalLink
      link={t('ambitionSimulationInfo:glec-framework-link')}
    />
  );

  const greenhouseIntensityLink = (
    <StyledExternalLink
      link={t('ambitionSimulationInfo:green-house-intensity-report-link')}
    />
  );

  return (
    <>
      <PageHead />
      <PageWrapper>
        <Header />
        <PageContent withBottomPadding>
          <PageTitle as="h1" size="32px" family={exampleBold} color={Tundora}>
            {t('ambitionSimulationInfo:title')}
          </PageTitle>

          <Section>
            <SectionDescription>
              <SectionIcon background={CongressBlue}>
                <Mobility />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:mobility-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:mobility-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:mobility-source-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        greenhouseReportingLink,
                        defraLink,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:mobility-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        greenhouseReportingLink,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>

          <Section>
            <SectionDescription>
              <SectionIcon background={CongressBlue}>
                <Truck />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:road-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:road-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:road-source-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        greenhouseIntensityLink,
                        greenhouseReportingLink,
                        defraLink,
                        glecFrameworkLink,
                        nvgaLink: (
                          <StyledExternalLink
                            link={t('ambitionSimulationInfo:nvga-link')}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:road-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        glecFrameworkLink,
                        greenhouseReportingLink,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>

          <Section>
            <SectionDescription>
              <SectionIcon background={CongressBlue}>
                <Shipping />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:shipping-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>

                <Paragraph>
                  {t('ambitionSimulationInfo:shipping-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:shipping-source-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        glecFrameworkLink,
                        greenhouseReportingLink,
                        defraLink,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:shipping-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        glecFrameworkLink,
                        greenhouseReportingLink,
                        defraLink,
                        exampleCutCarbonLink: (
                          <StyledExternalLink
                            link={t(
                              'ambitionSimulationInfo:example-cut-carbon-link'
                            )}
                          />
                        ),
                        jawsAgreementLink: (
                          <StyledExternalLink
                            link={t(
                              'ambitionSimulationInfo:jaws-agreement-link'
                            )}
                          />
                        ),
                        corvusEnergyLink: (
                          <StyledExternalLink
                            link={t('ambitionSimulationInfo:corvusenergy-link')}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>

          <Section>
            <SectionDescription>
              <SectionIcon background={TahitiGold}>
                <Electricity />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:electrity-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:electrity-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:electrity-source-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        greetLink: (
                          <StyledExternalLink
                            link={t('ambitionSimulationInfo:greet-link')}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:electrity-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>
          <Section>
            <SectionDescription>
              <SectionIcon background={MidBlue}>
                <Travel />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:travel-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:travel-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:travel-source-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        greenhouseReportingLink,
                        defraLink,
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:travel-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        greenhouseReportingLink,
                        defraLink,
                        aviationFuelsLink: (
                          <StyledExternalLink
                            link={t(
                              'ambitionSimulationInfo:aviation-fuels-link'
                            )}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>
          <Section>
            <SectionDescription>
              <SectionIcon background={CannonPink}>
                <DataCentre />
              </SectionIcon>
              <SectionTitle>
                {t('ambitionSimulationInfo:data-title')}
              </SectionTitle>
            </SectionDescription>

            <SectionContent>
              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:description-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:data-description-paragraph')}
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:source-section-title')}
                </ParagraphTitle>
                <Paragraph>
                  {t('ambitionSimulationInfo:data-source-paragraph')}
                </Paragraph>
                <Paragraph>
                  <StyledExternalLink
                    link={t('ambitionSimulationInfo:asperitas-link')}
                  >
                    {t('ambitionSimulationInfo:asperitas-link')}
                  </StyledExternalLink>
                </Paragraph>
              </SubSection>

              <SubSection>
                <ParagraphTitle as="h3">
                  {t('ambitionSimulationInfo:assumptions-section-title')}
                </ParagraphTitle>

                {t(
                  'ambitionSimulationInfo:data-assumptions-paragraphs',
                  {},
                  { returnObjects: true }
                ).map((paragraph: string) => (
                  <Paragraph key={paragraph}>
                    <TransText
                      text={paragraph}
                      components={{
                        b,
                        datacenterLink: (
                          <StyledExternalLink
                            link={t(
                              'ambitionSimulationInfo:datacenter-pues-link'
                            )}
                          />
                        ),
                        asperitasLink: (
                          <StyledExternalLink
                            link={t('ambitionSimulationInfo:asperitas-link')}
                          />
                        ),
                      }}
                    />
                  </Paragraph>
                ))}
              </SubSection>
            </SectionContent>
          </Section>

          <Separator />

          <DisclaimerTitle family={exampleMedium} size="20px" color={Tundora}>
            {t('ambitionSimulationInfo:disclaimer-title')}
          </DisclaimerTitle>

          {t(
            'ambitionSimulationInfo:disclaimer-paragraphs',
            {},
            { returnObjects: true }
          ).map((paragraph: string) => (
            <Paragraph key={paragraph}>
              <TransText
                text={paragraph}
                components={{
                  b,
                  exampleLink: (
                    <Link
                      as="a"
                      href={t('ambitionSimulationInfo:example-link')}
                      target="_blank"
                    />
                  ),
                }}
              />
            </Paragraph>
          ))}
        </PageContent>
      </PageWrapper>
      <PageWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
};

export default SimulationCalculations;
