import styled from 'styled-components';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
  color: Tundora,
})`
  letter-spacing: -0.8px;
  font-weight: normal;
  line-height: 34px;

  @media ${device.tabletS} {
    font-size: 36px;
    letter-spacing: -1.3px;
    line-height: 43px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    letter-spacing: -2px;
    line-height: 58px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin: 30px 0;
  max-width: 340px;
  text-align: left;

  @media ${device.mobileM} {
    text-align: unset;
  }

  @media ${device.tabletS} {
    max-width: 350px;
    margin: 0px 0 48px 0;
  }

  @media ${device.laptopS} {
    max-width: 530px;
    margin: 0px 0 48px -3px;
  }
`;
export const Wrapper = styled.div`
  max-width: 343px;
  margin: 0 auto;

  @media ${device.tabletS} {
    max-width: 715px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin-bottom: 120px;
  }
`;
