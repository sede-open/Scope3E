import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Tundora, Gray, Scorpion, SilverChalice } from 'styles/colours';
import { device } from 'styles/variables';

export const GridHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 38px;
`;

export const GridBody = styled.div`
  position: relative;
  gap: 24px;
  margin: 24px 0 96px 165px;
  justify-content: center;
  align-items: center;
  @media ${device.laptopS} {
    margin: 24px 0 96px 105px;
  }
  @media ${device.laptopM} {
    margin: 0px 0 86px 0px;
  }
`;

export const GridContainer = styled.div`
  width: 530px;

  @media ${device.laptopS} {
    width: 930px;
  }
  @media ${device.laptopM} {
    width: 1130px;
  }
`;

export const GridTitle = styled(Text).attrs({
  family: exampleBold,
  size: '32px',
  color: Tundora,
  as: 'h1',
})`
  line-height: 40px;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  height: 48px;
  width: 48px;
  cursor: pointer;
  position: absolute;
  top: 45%;
  border: 1px solid ${SilverChalice};
  padding-top: 8px;

  :hover {
    border: 1px solid ${Gray};
  }
  :focus {
    border: 1px solid ${Scorpion};
  }
`;

export const CustomisedRightButton = styled(Button)`
  right: -65px;

  @media ${device.laptopS} {
    right: -15px;
  }

  @media ${device.laptopM} {
    right: -50px;
  }
`;

export const CustomisedLeftButton = styled(Button)`
  left: -70px;
`;
