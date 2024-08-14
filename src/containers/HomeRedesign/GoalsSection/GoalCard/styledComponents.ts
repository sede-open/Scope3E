import styled from 'styled-components';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { Text } from 'components/Text';

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2px;
  margin-bottom: 32px;

  @media ${device.mobileL} {
    padding: 16px 24px;
  }

  @media ${device.tabletS} {
    margin: 0 6px;
    padding: 0;
  }

  @media ${device.laptopS} {
    margin: 0 0px 0 24px;
  }
`;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  height: 180px;
`;

export const IconLabel = styled(Text).attrs({
  as: 'h4',
  color: Tundora,
  family: exampleBold,
  size: '16px',
})`
  text-align: left;
  line-height: 21px;
  max-width: 343px;
  padding: 12px 0;

  @media ${device.mobileM} {
    padding: 16px 0 12px 0;
  }

  @media ${device.tabletS} {
    width: 229px;
    padding-top: 30px;
  }

  @media ${device.laptopS} {
    width: 270px;
    padding-top: 32px;
    font-size: 18px;
    line-height: 25px;
  }

  @media ${device.laptopM} {
    width: 360px;
  }
`;

export const IconLabelText = styled(Text).attrs({
  color: Tundora,
})`
  text-align: left;
  line-height: 21px;
  width: 290px;

  @media ${device.mobileM} {
    width: 343px;
  }
  @media ${device.tabletS} {
    width: 229px;
  }

  @media ${device.laptopS} {
    width: 300px;
    font-size: 16px;
    line-height: 24px;
  }

  @media ${device.laptopM} {
    width: 360px;
  }
`;
