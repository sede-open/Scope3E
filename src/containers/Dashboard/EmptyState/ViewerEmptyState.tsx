import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';

import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import { Card } from 'components/Card';
import { Tundora, abcdGray, Scorpion } from 'styles/colours';

const Outer = styled(Card)`
  padding: 3rem;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  height: 520px;
  background: ${abcdGray};
  max-width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export const ViewerEmptyState = () => {
  const { t } = useTranslation();
  return (
    <Outer data-testid="dashboard-empty-state-viewer">
      <Inner>
        <ContentWrapper>
          <Text as="h1" color={Tundora} family={exampleBold} size="32px">
            {t('dashboard:empty-state-viewer-title')}
          </Text>
          <Text color={Scorpion} size="16px">
            {t('dashboard:empty-state-viewer-subtitle')}
          </Text>
        </ContentWrapper>
      </Inner>
    </Outer>
  );
};
