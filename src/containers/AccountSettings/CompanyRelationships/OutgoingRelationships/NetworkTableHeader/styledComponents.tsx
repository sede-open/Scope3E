import styled from 'styled-components';

export const NetworkCardContainer = styled.div`
  padding: 48px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardBody = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

export const RelationContainer = styled.div<{ $marginRight?: string }>`
  ${({ $marginRight }) =>
    $marginRight ? `margin-right: ${$marginRight};` : ''}
  display: flex;
`;

export const RelationTextContainer = styled.div`
  margin-left: 16px;
  p:last-child {
    margin-top: 8px;
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 8px;
`;

export const SelectContainer = styled.div`
  width: 433px;
`;

export const IconContainer = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  height: 48px;
  width: 48px;
`;
