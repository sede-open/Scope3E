import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { Alto, Scorpion, Tundora, abcdGray } from 'styles/colours';

import { Text } from 'components/Text';

export const ScopeSummaryContainer = styled.div<{ isBaselineTotal?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 25px 13px 9px;
  border: 1px solid ${Alto};
  margin-bottom: 15px;
  background: ${ifProp({ isBaselineTotal: true }, abcdGray, 'transparent')};
`;

export const ScopeSummaryRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ScopeSummaryTitle = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  display: flex;
  line-height: 20px;
  font-weight: bold;
`;

export const ScopeSummaryInfo = styled(Text).attrs({
  size: '12px',
  color: Scorpion,
})`
  display: flex;
  line-height: 14px;
`;
