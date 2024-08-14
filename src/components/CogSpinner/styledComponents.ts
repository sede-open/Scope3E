import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LargeCog = styled.div`
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('/large-cog.svg');
  animation: cog 5s infinite;
  animation-timing-function: linear;
  @keyframes cog {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SmallCog = styled.div`
  width: 100px;
  height: 80px;
  margin: 5.3rem 0rem 0rem -3.8rem;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('/small-cog.svg');
  animation: anti-cog 5s infinite;
  animation-timing-function: linear;
  @keyframes anti-cog {
    100% {
      transform: rotate(-360deg);
    }
  }
`;
