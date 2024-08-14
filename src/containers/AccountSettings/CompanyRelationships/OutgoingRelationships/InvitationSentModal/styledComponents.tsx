import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 384px;
  p:nth-child(n + 2):nth-child(-n + 3) {
    margin-top: 8px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
  > button {
    float: right;
    margin-bottom: 2.5rem;
    min-width: 0;
  }
`;
