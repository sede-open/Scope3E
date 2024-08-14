import styled from 'styled-components';
import { Text } from 'components/Text';
import { FunGreen, abcdGray, Tundora, White } from 'styles/colours';
import { exampleBold, exampleBook } from 'styles/fonts';
import Button from 'components/Button';
import { device } from 'styles/variables';

export const LandingBackground = styled.section`
  background-image: url('/images/PublicSite/rainforest.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 600px;
  padding-top: 104px;
  padding-left: 24px;

  @media ${device.tabletM} {
    padding-left: 134px;
    height: 1100px;
  }
`;

export const LandingTitle = styled(Text).attrs({
  as: 'h1',
  color: White,
  family: exampleBold,
  size: '2rem',
})`
  margin-bottom: 1.5rem;

  @media ${device.tabletM} {
    font-size: 3rem;
  }
`;

export const LandingSubtitle = styled(Text).attrs({
  as: 'h2',
  color: White,
  family: exampleBook,
  size: '1rem',
})`
  @media ${device.tabletM} {
    font-size: 1.5rem;
  }
`;

export const WhatWeDoSection = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: ${abcdGray};
  padding: 52px 24px;
  min-height: 328px;
  width: 100%;
  margin-bottom: 54px;
  align-items: center;
  gap: 40px;

  @media ${device.tabletM} {
    display: flex;
    padding: 64px;
    gap: 0;
    margin-top: -279px;
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
  }
`;

export const WhatWeDoContent = styled.div`
  @media ${device.tabletM} {
    max-width: 400px;
  }
`;

export const WhatWeDoTitle = styled(Text).attrs({
  as: 'h3',
  color: FunGreen,
  family: exampleBold,
  size: '1.625rem',
})`
  margin-bottom: 8px;
`;

export const WhatWeDoDescription = styled(Text).attrs({
  color: Tundora,
  size: '1.1875rem',
})`
  margin-bottom: 32px;
`;

export const RequestDemoButton = styled(Button).attrs({
  color: 'redesign-primary',
  height: '56px',
  width: '212px',
})`
  margin-left: auto;
  margin-right: auto;
  @media ${device.tabletM} {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const LaptopContainer = styled.div`
  width: min(426px, 70%);
`;

export const ResponsiveWrapper = styled.div`
  max-width: 1680px;
  text-align: left;

  @media ${device.mobileM} {
    text-align: unset;
  }

  @media ${device.tabletS} {
    display: flex;
  }
  @media ${device.laptopS} {
    flex-direction: row;
    margin-top: -28px;
  }

  @media ${device.laptopL} {
    margin-top: -72px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  max-width: 430px;

  @media ${device.tabletS} {
    max-width: 590px;
  }

  @media ${device.laptopS} {
    max-width: 596px;
  }
`;

export const SubTextContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  max-width: 410px;

  @media ${device.tabletS} {
    max-width: 540px;
    margin-bottom: 24px;
  }

  @media ${device.laptopS} {
    max-width: 596px;
    margin-bottom: 48px;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
})`
  color: ${Tundora};
  margin-bottom: 16px;
  letter-spacing: -0.8px;
  font-weight: normal;

  @media ${device.tabletS} {
    font-size: 36px;
    letter-spacing: -1.3px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    letter-spacing: -2px;
  }
`;

export const Subtext = styled(Text).attrs({
  size: '16px',
})`
  color: ${Tundora};
  line-height: 26px;

  @media ${device.tabletS} {
    font-size: 18px;
    line-height: 30px;
  }

  @media ${device.laptopS} {
    font-size: 21px;
    line-height: 35px;
  }
`;

export const Container = styled.div`
  @media ${device.laptopS} {
    display: flex;
    flex-direction: column;
    margin: 80px 78px 0 0;
  }
  @media ${device.laptopM} {
    display: flex;
    flex-direction: column;
  }
`;

export const GraphicContainer = styled.div`
  @media ${device.laptopS} {
    position: relative;
  }
`;

export const SquaresGraphic = styled.img.attrs({
  src: '/turbine-squares.svg',
})`
  display: none;

  @media ${device.tabletS} {
    display: block;
    position: absolute;
    right: 0px;
    top: 375px;
    height: 160px;
    z-index: 1;
  }

  @media ${device.laptopS} {
    top: 200px;
    height: 350px;
  }

  @media ${device.laptopL} {
    top: 210px;
    height: 410px;
  }
`;

export const TurbineGraphic = styled.img.attrs({
  src: '/images/PublicSite/turbine-image.png',
})`
  display: none;

  @media ${device.tabletS} {
    display: block;
    position: absolute;
    right: 0;
    top: 285px;
    height: 300px;
  }

  @media ${device.laptopS} {
    height: 650px;
    position: unset;
    top: 285px;
  }

  @media ${device.laptopL} {
    height: 700px;
  }
`;

export const SubtitleS = styled(Text).attrs({
  as: 'h4',
  size: '18px',
  family: exampleBold,
})`
  color: ${Tundora};
  margin-bottom: 14px;
  line-height: 25px;
  font-weight: normal;
  letter-spacing: -0.4px;
`;

export const CtaContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;

  > * {
    margin-right: 24px;
    width: 180px;
    justify-content: center;

    &:last-child {
      width: 172px;
      justify-content: unset;
      text-decoration: underline;
    }
  }
`;

export const CtaButton = styled(Button)`
  max-height: 66px;
  line-height: 16px;
  width: auto;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media ${device.mobileM} {
    white-space: nowrap;
    line-height: 26px;
  }
`;

export const CtaButtonLearnMore = styled(Button)`
  max-height: 56px;
  white-space: nowrap;
  line-height: 26px;
  width: auto;
  z-index: 3;
  margin-bottom: 16px;
`;
