import styled from 'styled-components';
import { Gray, White, Tundora } from 'styles/colours';
import { Text } from 'components/Text';
import { device } from 'styles/variables';
import { exampleBold } from 'styles/fonts';

export const TextWrapper = styled.div`
  text-align: left;
  background-color: ${White};

  @media ${device.tabletS} {
    padding-left: 16rem;
  }

  @media ${device.laptopS} {
    padding-left: 23rem;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  position: relative;

  @media ${device.tabletS} {
    max-width: 550px;
  }

  @media ${device.laptopS} {
    max-width: 750px;
  }

  @media ${device.laptopL} {
    max-width: 830px;
  }
`;

export const TextContainer = styled.div`
  @media ${device.tabletS} {
    width: 90%;
  }
`;

export const ContentText = styled(Text).attrs({
  as: 'h2',
  size: '14px',
})`
  color: ${Tundora};
  line-height: 17px;
  letter-spacing: -0.3px;
  font-weight: normal;
  margin-bottom: 16px;
  max-width: 150px;

  @media ${device.mobileM} {
    letter-spacing: -0.8px;
    font-size: 14px;
    max-width: 195px;
  }

  @media ${device.mobileL} {
    max-width: 300px;
  }

  @media ${device.tabletS} {
    max-width: 352px;
  }

  @media ${device.laptopS} {
    margin-top: -7px;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: -1px;
    max-width: 400px;
  }

  @media ${device.laptopM} {
    max-width: 450px;
  }

  @media ${device.laptopL} {
    min-width: 450px;
  }
`;

export const MainImage = styled.img`
  margin-bottom: -5px;
  position: absolute;
  width: 100%;
  transition: opacity 0.1s linear;
  display: none;
  top: 0;
  left: 0;

  @media ${device.tabletS} {
    display: block;
    height: 163px;
    margin-bottom: 0px;
    width: 240px;
  }

  @media ${device.laptopS} {
    width: 347px;
    height: 201px;
  }
`;

export const ChangelogSquareContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 180px;
  display: none;

  @media ${device.tabletS} {
    display: block;
    height: 30px;
    width: 30px;
    left: -15px;
    top: 150px;
  }

  @media ${device.laptopS} {
    width: 70px;
    height: 70px;
    left: -35px;
    top: 170px;
  }

  @media ${device.laptopL} {
    top: 180px;
  }
`;

export const LogoImage = styled.img`
  height: 31px;
  margin-bottom: 30px;

  @media ${device.laptopS} {
    height: 40px;
  }
`;

export const SpeakerText = styled(Text).attrs({
  as: 'h2',
  size: '12px',
  family: exampleBold,
})`
  color: ${Tundora};
  line-height: 14px;
  margin-bottom: 8px;

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 27px;
  }
`;

export const SpeakerDesignationText = styled(Text).attrs({
  as: 'h2',
  size: '12px',
})`
  color: ${Gray};
  line-height: 14px;
  margin-bottom: 8px;
  max-width: 150px;

  @media ${device.tabletS} {
    max-width: 293px;
  }

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 21px;
    max-width: 390px;
  }
`;
