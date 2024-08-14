import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2.5rem 0rem 3rem 0rem;
`;
export const Column = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}%` : 'auto')};
`;

export const ColumnSpacer = styled.div`
  margin-right: 2.25rem;
`;
export const TabContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;
