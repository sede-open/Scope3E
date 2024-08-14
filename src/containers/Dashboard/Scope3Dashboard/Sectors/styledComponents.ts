import styled from 'styled-components';
import { Tundora } from 'styles/colours';
import { Text } from 'components/Text';

export const SectorDataWrapper = styled.div`
  padding: 32px 48px 0 48px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 430px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const TextOuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

export const SectorName = styled(Text).attrs({ color: Tundora })`
  line-height: 20px;
`;

export const TotalEmissions = styled(Text).attrs({ color: Tundora })`
  line-height: 20px;
`;
