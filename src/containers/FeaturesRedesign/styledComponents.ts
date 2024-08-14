import Button from 'components/Button';
import { Text } from 'components/Text';
import Image from 'next/image';
import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { FunGreen, abcdGray, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const BackgroundCover = styled.div`
  background-image: url('/images/PublicSite/green-facade.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 200px;
  padding-top: 112px;
  padding-left: 144px;

  @media ${device.tabletM} {
    padding: 122px 144px 0 144px;
    min-height: 426px;
  }
`;

export const LandingHeader = styled(Text).attrs({
  as: 'h1',
  color: White,
  family: exampleBold,
  size: '3rem',
})`
  max-width: 540px;
  display: none;

  @media ${device.tabletM} {
    display: unset;
  }
`;

export const DemoSection = styled.div`
  width: 100%;
  min-height: 328px;
  padding: 24px 16px 24px 24px;
  background: ${FunGreen};
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 24px;

  @media ${device.tabletM} {
    padding: 0 104px 0 128px;
    flex-direction: row;
    justify-content: space-between;
    background: linear-gradient(${FunGreen} 85%, ${White} 15%);
  }

  @media ${device.laptopS} {
    padding: 0 126px 0 144px;
  }
`;

export const DemoTextSection = styled.div`
  padding-bottom: 4%;
  margin-top: auto;
  margin-bottom: auto;
`;

export const DemoImageSection = styled.div`
  width: min(492px, 60%);
  padding: 8px 0;

  @media ${device.tabletM} {
    padding: 0;
  }
`;

export const DemoTitle = styled(Text).attrs({
  as: 'h3',
  color: White,
  family: exampleBold,
  size: '1.625rem',
})`
  max-width: 492px;
  margin-bottom: 40px;
`;

export const LandingHeaderSmall = styled(Text).attrs({
  as: 'h1',
  color: White,
  family: exampleBold,
  size: '1.625rem',
})`
  @media ${device.tabletM} {
    display: none;
  }
`;

export const RequestDemoButton = styled(Button).attrs({
  as: 'a',
  color: 'redesign-secondary-borderless',
})`
  max-width: 214px;
  color: ${Tundora};
  margin-left: auto;
  margin-right: auto;

  @media ${device.tabletM} {
    margin-left: unset;
    margin-right: unset;
  }
`;

export const FeaturesTitleContainer = styled.div`
  width: 100%;
  padding: 40px 24px;
  @media ${device.tabletM} {
    padding: 60px 132px;
  }
`;

export const FeaturesTitle = styled(Text).attrs({
  as: 'h3',
  family: exampleBold,
  color: FunGreen,
  size: '1.625rem',
})``;

export const Feature = styled.section`
  width: 100%;
  margin-bottom: 48px;
`;

export const FeatureBackground = styled.div<{ $reverse: boolean }>`
  background: linear-gradient(${White} 0% 7%, ${abcdGray} 7% 100%);
  display: flex;
  flex-direction: ${ifProp('$reverse', 'column', 'column-reverse')};
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media ${device.tabletM} {
    flex-direction: row;
    background: linear-gradient(
      ${White} 0% 15%,
      ${abcdGray} 15% 85%,
      ${White} 85% 100%
    );
    gap: 0;
    padding: 0 88px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 10%;
  width: min(492px, 60%);

  @media ${device.tabletM} {
    margin-left: 0;
  }
`;

export const ImageContainerRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
  margin-right: 10%;
  width: min(492px, 60%);

  @media ${device.tabletM} {
    margin-right: 0;
  }
`;

export const ImageBlock = styled.div`
  z-index: 2;
  width: 80%;
`;

export const LaptopImg = styled(Image).attrs({
  layout: 'responsive',
  objectFit: 'contain',
  width: 1767,
  height: 942,
  placeholder: 'blur',
})``;

export const LaptopIconRight = styled.div`
  margin-left: -12%;
  max-width: 100%;
  z-index: 1;
  width: 20%;

  > img {
    width: 100%;
  }
`;

export const LaptopIconLeft = styled.div`
  max-width: 100%;
  z-index: 1;
  margin-right: -12%;
  width: 20%;

  > img {
    margin-left: auto;
    width: 100%;
  }
`;

export const FeatureTextContainer = styled.div<{ $maxWidth: number }>`
  max-width: 100%;
  padding: 0 24px 24px 24px;

  @media ${device.tabletM} {
    padding: 64px 0;
    max-width: min(${prop('$maxWidth')}px, 40%);
  }
`;

export const FeatureTitle = styled(Text).attrs({
  as: 'h3',
  color: Tundora,
  size: '1.1875rem',
  family: exampleBold,
})`
  margin-bottom: 16px;
`;

export const FeatureDesc = styled(Text).attrs({
  color: Tundora,
  size: '1.0625rem',
})``;

export const JoinUsButton = styled(Button).attrs({
  as: 'a',
  color: 'redesign-primary',
})`
  margin-top: 24px;
  max-width: 128px;
  margin-left: auto;
  margin-right: auto;

  @media ${device.tabletM} {
    margin-left: unset;
    margin-right: unset;
  }
`;

export const FooterBackground = styled.div`
  width: 100%;
  @media ${device.tabletM} {
    position: relative;
    padding: 0 52px;
  }
`;

export const MonitorContainer = styled.div`
  max-width: 100%;
  @media ${device.tabletM} {
    max-width: 808px;
  }
`;

export const GreenBackground = styled.div`
  padding: 24px;
  background-color: ${FunGreen};
  width: 100%;

  @media ${device.tabletM} {
    position: absolute;
    top: 50%;
    right: 52px;
    max-width: 40%;
    padding: 36px 54px;
    transform: translateY(-50%);
  }
`;

export const WhiteTitle = styled(Text).attrs({
  as: 'h3',
  color: White,
  family: exampleBold,
  size: '1.625rem',
})`
  max-width: 494px;
  margin-bottom: 24px;
`;

export const WhiteParagraph = styled(Text).attrs({
  color: White,
  size: '1.0625rem',
})`
  margin-bottom: 20px;
`;

export const BottomDemoRequestButton = styled(Button).attrs({
  color: 'redesign-secondary-borderless',
})`
  color: ${Tundora};
  margin-bottom: 20px;
  max-width: 214px;
  margin-left: auto;
  margin-right: auto;

  @media ${device.tabletM} {
    margin-left: unset;
    margin-right: unset;
  }
`;

export const SeeStoriesButton = styled(Button).attrs({
  color: 'redesign-secondary-borderless',
})`
  color: ${Tundora};
  max-width: 260px;
  margin-left: auto;
  margin-right: auto;

  @media ${device.tabletM} {
    margin-left: unset;
    margin-right: unset;
  }
`;
