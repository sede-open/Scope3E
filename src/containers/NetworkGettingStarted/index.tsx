import Button from 'components/Button';
import { ContactUs } from 'components/ContactUs';
import { Link } from 'components/Link';
import Modal from 'components/Modal';
import { BackButton } from 'components/BackButton';
import { TextNormal } from 'components/Text';
import { PageWrapper } from 'layouts/PageWrapper';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { abcdGray, Supernova, White } from 'styles/colours';
import {
  BannerIcon,
  BannerIcon2,
  CenterContainer,
  FlexContainer,
  Gif,
  GifContainer,
  GifText,
  Header,
  IconContainer,
  Section,
  Section1Container,
  Section1Title,
  SectionContentContainer,
  SectionSubHeading,
  SectionTitle,
  Spacing,
  SubTitle,
  TopSection,
  UnorderedList,
} from './styledComponents';

export const NetworkGettingStartedContainer = () => {
  const { t } = useTranslation();

  const gifSteps = Array.from(Array(4).keys()).map((value) => ({
    title: t(`networkGettingStarted:step-${value + 1}-title`),
    text: t(`networkGettingStarted:step-${value + 1}-text`),
  }));

  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <PageWrapper background={abcdGray}>
        <TopSection>
          <BackButton
            backNavigationText={t('networkGettingStarted:back-btn')}
            href="/value-chain"
          />
          <Section1Container>
            <Header>
              <img
                src="/create-network-yellow-strip.svg"
                alt={t('networkGettingStarted:strip-alt')}
              />
              <Section1Title>
                {t('networkGettingStarted:section-2-title')}
              </Section1Title>
              <SubTitle>
                {t('networkGettingStarted:section-2-subtitle')}
              </SubTitle>
            </Header>
            <IconContainer>
              <BannerIcon
                src="/create-network-banner-icon.svg"
                alt={t('networkGettingStarted:banner-icon-alt')}
              />
            </IconContainer>
          </Section1Container>
        </TopSection>
      </PageWrapper>

      <PageWrapper background={White}>
        <Section>
          <SectionContentContainer>
            <SectionTitle>
              {t('networkGettingStarted:section-3-heading')}
            </SectionTitle>
            <Spacing pixels={24} />
            <TextNormal>
              {t('networkGettingStarted:section-3-info-1')}
            </TextNormal>
            <Spacing pixels={16} />
            <SectionSubHeading fontSize="0.875">
              {t('networkGettingStarted:section-3-subheading-1')}
            </SectionSubHeading>
            <UnorderedList>
              <li>{t('networkGettingStarted:section-3-list-item-1')}</li>
              <li>{t('networkGettingStarted:section-3-list-item-2')}</li>
              <li>{t('networkGettingStarted:section-3-list-item-3')}</li>
              <li>{t('networkGettingStarted:section-3-list-item-4')}</li>
            </UnorderedList>
            <SectionSubHeading fontSize="1rem">
              {t('networkGettingStarted:section-3-subheading-2')}
            </SectionSubHeading>
          </SectionContentContainer>
        </Section>
      </PageWrapper>
      <PageWrapper background={abcdGray}>
        <Section>
          <SectionContentContainer>
            <SectionTitle>
              {t('networkGettingStarted:section-4-heading')}
            </SectionTitle>
            <Spacing pixels={48} />
            <GifContainer>
              {gifSteps.map((step, index) => {
                return (
                  <div key={step.text}>
                    <SectionSubHeading fontSize="1rem">
                      {step.title}
                    </SectionSubHeading>
                    <GifText>{step.text}</GifText>
                    <Gif src={`/gifs/network-getting-started_${index}.gif`} />
                  </div>
                );
              })}
            </GifContainer>
          </SectionContentContainer>
        </Section>
      </PageWrapper>
      <PageWrapper background={White}>
        <Section>
          <FlexContainer>
            <SectionContentContainer>
              <img
                src="/create-network-yellow-strip.svg"
                alt={t('networkGettingStarted:banner-icon-alt')}
              />
              <Spacing pixels={16} />
              <SectionTitle>
                {t('networkGettingStarted:section-5-heading')}
              </SectionTitle>
              <Spacing pixels={24} />
              <SectionSubHeading fontSize="1rem">
                {t('networkGettingStarted:section-5-subheading')}
              </SectionSubHeading>

              <Spacing pixels={16} />
              <TextNormal>
                {t('networkGettingStarted:section-5-text-1')}
              </TextNormal>
              <Spacing pixels={16} />

              <TextNormal>
                <Trans
                  components={[
                    <Link href="/account-settings/your-organisation" />,
                  ]}
                  i18nKey="networkGettingStarted:section-5-text-2"
                />
              </TextNormal>
              <Spacing pixels={16} />

              <TextNormal>
                {t('networkGettingStarted:section-5-text-3')}
              </TextNormal>
            </SectionContentContainer>
            <CenterContainer>
              <BannerIcon2
                src="/create-network-banner-icon-2.svg"
                alt={t('networkGettingStarted:section-5-icon-alt')}
              />
            </CenterContainer>
          </FlexContainer>
        </Section>
      </PageWrapper>
      <PageWrapper background={Supernova}>
        <Section>
          <CenterContainer>
            <div>
              <Section1Title>
                {t('networkGettingStarted:section-6-heading')}
              </Section1Title>
              <Spacing pixels={48} />
              <CenterContainer>
                <Button color="dark" onClick={() => setContactModalOpen(true)}>
                  {t('networkGettingStarted:section-6-button-text')}
                </Button>
              </CenterContainer>
            </div>
          </CenterContainer>
        </Section>
      </PageWrapper>
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      >
        <ContactUs onClose={() => setContactModalOpen(false)} />
      </Modal>
    </>
  );
};
