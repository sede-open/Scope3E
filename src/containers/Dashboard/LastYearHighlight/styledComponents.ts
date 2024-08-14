import styled from 'styled-components';

import { Card } from 'components/Card';
import { Text } from 'components/Text';

export const Container = styled(Card)`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 1.5rem 1.125rem 1.25rem 1.125rem;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 1rem;
`;

export const Units = styled(Text)`
  margin-left: 0.5rem;
`;

export const EmissionValue = styled(Text)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const StyledText = styled(Text)`
  font-weight: bold;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PercentageChangeStatus = styled.div`
  margin-right: 4px;
`;
