import styled from 'styled-components';

import { Scorpion, Supernova, White } from 'styles/colours';

export const ProgressBar = styled.p<{ percentageValue: number }>`
  color: ${Scorpion};
  display: block;
  position: relative;
  width: 100%;
  z-index: 1;

  &::before,
  &::after {
    border-top: 6px solid ${White};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 0.3s ease-in-out;
    width: 0;
    z-index: -1;
  }

  &::before {
    border-color: ${Supernova};
    width: 100%;
  }

  &::after {
    border-color: ${Scorpion};
    width: ${({ percentageValue }) => percentageValue}%;
  }
`;

export const ValueContainer = styled.span<{ percentageValue: number }>`
  border-left: 1px solid ${Scorpion};
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  left: ${({ percentageValue }) => percentageValue}%;
  padding: 6px 0 0 8px;
  position: absolute;
  transition: left 0.3s ease-in-out;
  white-space: nowrap;
`;
