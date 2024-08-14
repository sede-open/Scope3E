import styled from 'styled-components';

export const PlayButton = styled.button`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 90px;
  width: 90px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;
