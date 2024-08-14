import styled from 'styled-components';
import { Gray, Scorpion, SilverChalice } from 'styles/colours';
import { device } from 'styles/variables';

export const Button = styled.button`
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
  top: 30%;
  border: 1px solid ${SilverChalice};
  padding-top: 8px;

  :hover {
    border: 1px solid ${Gray};
  }
  :focus {
    border: 1px solid ${Scorpion};
  }
  @media ${device.tabletS} {
    height: 48px;
    width: 48px;
  }
`;

export const CustomisedRightButton = styled(Button)`
  right: 0px;

  @media ${device.laptopS} {
    right: 32px;
  }
`;

export const CustomisedLeftButton = styled(Button)`
  left: 0px;

  @media ${device.laptopS} {
    left: 32px;
  }

  @media ${device.laptopL} {
    left: 0px;
  }
`;

export const CustomisedDots = styled.button`
  cursor: pointer;
`;
