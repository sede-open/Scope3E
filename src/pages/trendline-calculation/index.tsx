import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Page } from 'components/Page';
import { Text } from 'components/Text';

const PageTitle = styled(Text)`
  margin-top: 6rem;
  margin-bottom: 4rem;
`;

const Paragraph = styled.p`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 2rem;
  line-height: 20px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: ${Tundora};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export default function TrendlineCalculation() {
  const { t } = useTranslation();

  return (
    <Page hasSubheaderNavigation={false} isArticlePage>
      <ContentWrapper>
        <PageTitle as="h1" size="32px" family={exampleBold} color={Tundora}>
          {t('trendlineCalculation:header')}
        </PageTitle>

        <Paragraph>
          <Trans
            i18nKey="trendlineCalculation:paragraphs[0]"
            components={[<strong />]}
          />
        </Paragraph>
        <Paragraph>{t('trendlineCalculation:paragraphs[1]')}</Paragraph>
        <Paragraph>{t('trendlineCalculation:paragraphs[2]')}</Paragraph>
      </ContentWrapper>
    </Page>
  );
}
