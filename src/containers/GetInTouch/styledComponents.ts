import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media ${device.tabletS} {
    margin-bottom: 0;
  }
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media ${device.tabletS} {
    padding: 36px;
  }

  @media ${device.laptopS} {
    padding: 50px 36px 0 36px;
  }
`;

export const GraphicContainer = styled.div`
  @media ${device.tabletS} {
    margin-right: 24px;
  }
  @media ${device.laptopS} {
    margin-right: 48px;
  }
`;

export const Graphic = styled.img.attrs({
  src: '/get-in-touch-squares.svg',
})`
  display: none;

  @media ${device.tabletS} {
    display: block;
    height: 87px;
  }

  @media ${device.laptopS} {
    height: 107px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 100%;

  @media ${device.mobileL} {
    margin: 0 auto;
  }

  @media ${device.tabletS} {
    margin: 0;
  }
`;

export const SubTextContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 52px auto;
  margin-bottom: 32px;
  text-align: center;

  @media ${device.tabletS} {
    margin: 0 auto 52px auto;
  }
  @media ${device.laptopS} {
    max-width: 874px;
    margin-bottom: 24px;
  }
`;

export const Subtext = styled(Text).attrs({
  as: 'h3',
  size: '20px',
  color: Tundora,
  family: exampleBold,
})`
  line-height: 24px;
  letter-spacing: -0.4px;

  @media ${device.tabletS} {
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.6px;
  }

  @media ${device.laptopS} {
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -1px;
  }
`;

export const LocationsCardContainer = styled.div`
  @media ${device.tabletS} {
  }

  @media ${device.laptopS} {
    margin-bottom: 110px;
  }
`;
