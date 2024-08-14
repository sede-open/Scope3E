import styled from 'styled-components';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { Text } from 'components/Text';

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

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;

  @media ${device.tabletS} {
    margin-bottom: 100px;
  }

  @media ${device.laptopS} {
    margin-bottom: 130px;
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: 10px;

  @media ${device.tabletS} {
    margin-bottom: 18px;
  }

  @media ${device.laptopS} {
    margin-bottom: 24px;
  }
`;

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

export const SubtitleContainer = styled.div`
  margin-bottom: 24px;
  max-width: 380px;

  @media ${device.tabletS} {
    max-width: 425px;
  }

  @media ${device.laptopS} {
    max-width: 510px;
  }
`;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  display: block;
  line-height: 19px;
  white-space: pre-wrap;

  @media ${device.tabletS} {
    font-size: 18px;
    line-height: 27px;

    a {
      font-size: 18px;
      line-height: 27px;
    }
  }

  @media ${device.laptopS} {
    font-size: 21px;
    line-height: 31px;

    a {
      font-size: 21px;
      line-height: 31px;
    }
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

export const SubTextContainer = styled.div`
  margin: 0 0 24px 0;

  @media ${device.tabletS} {
    margin: 0 0 24px 8px;
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

export const SolutionsContainer = styled.div`
  @media ${device.laptopS} {
    margin-bottom: 84px;
  }
`;
