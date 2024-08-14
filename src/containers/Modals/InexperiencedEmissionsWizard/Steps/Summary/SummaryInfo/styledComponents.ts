import styled from 'styled-components';

import { Text } from 'components/Text';
import { CongressBlue, Scorpion } from 'styles/colours';

export const SummaryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`;

export const SummaryInfoTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const SummaryInfoTitle = styled(Text).attrs({
  size: '14px',
  color: CongressBlue,
})`
  line-height: 20px;
  font-weight: bold;
  margin-left: 8px;
`;

export const SummaryInfo = styled(Text).attrs({
  size: '14px',
  color: Scorpion,
})`
  line-height: 20px;
`;
