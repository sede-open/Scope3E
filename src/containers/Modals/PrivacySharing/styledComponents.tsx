import styled from 'styled-components';

export const HeaderIcon = styled.div`
  display: inline-block;
  background-image: url(/success-icon.svg);
  background-repeat: no-repeat;
  background-size: 40px;
  height: 40px;
  width: 40px;
`;

export const HeaderText = styled.h1`
  display: inline-block;
  position: absolute;
  margin-left: 16px;
`;

export const BodyContent = styled.p`
  margin-left: 48px;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  > button {
    margin-left: 16px;
  }
`;
