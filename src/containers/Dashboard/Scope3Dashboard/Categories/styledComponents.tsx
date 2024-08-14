import styled from 'styled-components';
import { Gray, Tundora } from 'styles/colours';
import { Text } from 'components/Text';

export const CategoryDataWrapper = styled.div`
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

export const TextInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CategoryOrder = styled(Text).attrs({ color: Gray })`
  line-height: 20px;
  margin-right: 4px;
`;

export const CategoryName = styled(Text).attrs({ color: Tundora })`
  line-height: 20px;
`;

export const TotalEmissions = styled(Text).attrs({ color: Tundora })`
  line-height: 20px;
`;
