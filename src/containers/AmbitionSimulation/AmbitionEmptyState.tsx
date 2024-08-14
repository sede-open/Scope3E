import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import Button from 'components/Button';

import { Scorpion } from 'styles/colours';

const CTAButton = styled(Button)`
  margin-top: 16px;
`;

interface IProps {
  openAmbitionModal: () => void;
}

export const AmbitionEmptyState = ({ openAmbitionModal }: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Text color={Scorpion} size="16px">
        {t('ambitionSimulation:empty-ambition-message')}
      </Text>
      <CTAButton onClick={openAmbitionModal}>
        {t('ambitionSimulation:share-ambition-btn')}
      </CTAButton>
    </>
  );
};
