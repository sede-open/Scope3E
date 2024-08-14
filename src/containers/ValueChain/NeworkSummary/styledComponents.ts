import styled from 'styled-components';

import { abcdGray, Tundora } from 'styles/colours';
import { Text } from 'components/Text';

export const Title = styled(Text).attrs({
  as: 'h4',
  color: Tundora,
})`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const SummaryRows = styled.div`
  div:last-child {
    margin-bottom: 0;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const SummaryRowIcon = styled.div`
  background-color: ${abcdGray};
  padding: 0.875rem;
  width: 3rem;
  height: 3rem;
  margin-right: 0.875rem;
`;

export const SummaryRowContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SummaryRowContentHeader = styled.p`
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
`;
