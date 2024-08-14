import styled from 'styled-components';

export const CTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;
