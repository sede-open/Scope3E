import styled from 'styled-components';

export const Dl = styled.dl`
  display: block;
  font-size: 0.875rem;
  margin: 0;
  width: 100%;
`;

export const PairWrapper = styled.div<{ isVertical: boolean | undefined }>`
  display: flex;
  flex-direction: ${({ isVertical }) => (isVertical ? 'column' : 'row')};
  justify-content: flex-start;
  margin-bottom: ${({ isVertical }) => (isVertical ? '1rem' : '.5rem')};
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Dt = styled.dt<{ isVertical: boolean | undefined }>`
  font-weight: 700;
  margin-right: ${({ isVertical }) => (isVertical ? 0 : '.5rem')};
`;

export const Dd = styled.dd`
  font-weight: 400;
  margin: 0;
`;
