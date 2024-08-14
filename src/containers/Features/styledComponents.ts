import styled from 'styled-components';
import { Text } from 'components/Text';
import { device } from 'styles/variables';
import { exampleBold } from 'styles/fonts';
import { Tundora, Supernova } from 'styles/colours';

export const Wrapper = styled.div`
  margin-bottom: 24px;
  max-width: 343px;
  position: relative;
  @media ${device.tabletS} {
    margin-bottom: 72px;
    padding: 24px 86px 0 0;
    max-width: 715px;
  }

  @media ${device.laptopS} {
    margin: 0 auto;
    max-width: 100%;
    padding: 20px 120px 137px 0;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
  text-align: left;
  letter-spacing: -0.8px;
  font-weight: normal;
  margin-bottom: 16px;

  @media ${device.tabletS} {
    font-size: 36px;
    line-height: 43.2px;
    letter-spacing: -1.3px;
    width: 90%;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    letter-spacing: -2px;
    line-height: 58px;
    margin-bottom: 24px;
    width: 100%;
  }
`;

export const SubTitle = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 21px;
  text-align: left;
  font-weight: normal;

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const TitleContainer = styled.div`
  margin: 30px 0px 48px 0px;

  @media ${device.tabletS} {
    margin: 0px 0px 72px 57px;
  }

  @media ${device.laptopS} {
    margin: 60px 0px 70px 127px;
    max-width: 648px;
  }

  @media ${device.laptopL} {
    margin: 0px 0px 70px 127px;
  }
`;

export const HeaderContainer = styled.div`
  @media ${device.tabletS} {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const SingleSquareGraphic = styled.div`
  display: none;
  @media ${device.tabletS} {
    display: block;
    height: 35px;
  }
`;

export const SquaresGraphicContainer = styled.div`
  @media ${device.tabletS} {
    position: absolute;
    left: 83%;
    top: 0%;
  }

  @media ${device.laptopS} {
    left: 83%;
    top: 15%;
  }

  @media ${device.laptopL} {
    top: 0%;
  }
`;

export const SquaresGraphic = styled.div`
  display: none;

  @media ${device.tabletS} {
    display: block;
    height: 107px;
  }
`;

export const SingleSquareGraphicContainer = styled.div`
  @media ${device.tabletS} {
    margin: -140px 0 40px 0px;
  }

  @media ${device.laptopS} {
    margin: -160px 0 49px 40px;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  margin-bottom: 96px;

  @media ${device.tabletS} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptopS} {
    margin: 48px 0px 192px 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
    margin: 0px 6px 53px 0px;
    padding: 0;
  }

  @media ${device.laptopS} {
    margin: 0px 24px 48px 0px;
  }
`;

export const Icon = styled.div`
  width: 106px;

  @media ${device.laptopS} {
    width: 168px;
  }
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
    width: 240px;
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

export const FeatureBreaker = styled.div`
  border: 3px solid ${Supernova};
  width: 44px;
  height: 4px;
  margin-bottom: 32px;
`;

export const FeatureTitle = styled(Text).attrs({
  as: 'h2',
  size: '20px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 24px;
  text-align: left;
  letter-spacing: -0.4px;
  font-weight: normal;
  margin-bottom: 16px;

  @media ${device.tabletS} {
    font-size: 24px;
    line-height: 31px;
    letter-spacing: -1.5px;
  }

  @media ${device.laptopS} {
    font-size: 34px;
    letter-spacing: -1.5px;
    line-height: 44px;
    margin-bottom: 24px;
  }
`;

export const FeatureSubTitle = styled(Text).attrs({
  as: 'h3',
  color: Tundora,
})`
  line-height: 21px;
  text-align: left;
  font-weight: normal;

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const FeatureTitleContainer = styled.div`
  margin-left: 0px;
  align-items: left;
  text-align: left;
  justify-content: left;
  margin-bottom: 32px;

  @media ${device.tabletS} {
    max-width: 291px;
  }

  @media ${device.laptopS} {
    margin-right: 450px;
    max-width: 456px;
    margin-bottom: 48px;
  }

  @media ${device.laptopM} {
    margin-right: 650px;
  }
`;
