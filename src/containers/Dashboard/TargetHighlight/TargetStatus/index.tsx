import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import { Text } from 'components/Text';
import { FunGreen, Scorpion } from 'styles/colours';

import * as selectors from '../selectors';

const StyledText = styled(Text)`
  font-weight: bold;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTargetStatus = styled.div`
  margin-right: 4px;
`;

export interface IProps {
  targetAmbition: number;
  mostRecentEmissionValue: number;
}

const TARGET_REACHED = 0;

export const TargetStatus = ({
  targetAmbition,
  mostRecentEmissionValue,
}: IProps) => {
  const { t } = useTranslation();

  const percentage = Math.round(
    100 - 100 / (mostRecentEmissionValue / targetAmbition)
  );

  if (!mostRecentEmissionValue) {
    return null;
  }

  return (
    <StyledWrapper data-testid={selectors.highlightTargetStatus}>
      <StyledTargetStatus>
        {percentage > TARGET_REACHED ? (
          <StyledText
            data-testid={selectors.highlightTargetNotReachedStatus}
            color={Scorpion}
          >
            {percentage}
            {t('dashboard:highlight-target-percentage')}
          </StyledText>
        ) : (
          <StyledText
            data-testid={selectors.highlightTargetReachedStatus}
            color={FunGreen}
          >
            {t('dashboard:highlight-target-reached')}
          </StyledText>
        )}
      </StyledTargetStatus>
      <Text color={Scorpion}>
        {t('dashboard:highlight-target-your-ambition')}
      </Text>
    </StyledWrapper>
  );
};
