import styled from 'styled-components';

import { Text } from 'components/Text';
import { abcdGray, Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const StepWithInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 840px;
`;

export const StepWithInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 584px;
  padding: 52px 24px 48px 48px;
`;

export const StepWithInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 256px;
  padding-top: 163px;
  background-color: ${abcdGray};
`;

export const TitleContainer = styled.div`
  margin-bottom: 48px;
  width: 100%;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
})`
  color: ${Tundora};
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Scorpion,
})`
  line-height: 24px;
`;
