import styled from 'styled-components';
import {
  Gray,
  Tundora,
  Scorpion,
  Supernova,
  AlmostBlack,
} from 'styles/colours';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { exampleBold, exampleBook } from 'styles/fonts';

export const TextWrapperHorizontal = styled.div`
  padding-left: 1rem;
  position: relative;
`;

export const TextWrapper = styled.div`
  padding: 1rem;
`;

export const SmallContainer = styled.div`
  float: left;

  @media ${device.mobileM} {
    width: 50%;
    padding: 5px;
  }

  @media ${device.tabletS} {
    padding: 8px;
    width: 33.33%;
    margin-bottom: -10px;
  }

  @media ${device.laptopS} {
    padding: 10px;
    max-width: 360px;
  }
`;

export const SmallHoverContainer = styled.div`
  position: relative;
  height: 160px;

  @media ${device.mobileM} {
    max-width: 163px;
    height: 100px;
    margin-bottom: 0;
  }

  @media ${device.tabletS} {
    max-width: 230px;
    height: 151px;
  }

  @media ${device.laptopS} {
    max-width: 360px;
    height: 200px;
  }
`;

export const SmallDateContainer = styled.div`
  margin: -15px 0px 0px -16px;

  @media ${device.mobileM} {
    margin: -4px 0px 0px -16px;
  }

  @media ${device.tabletS} {
    margin: 0px 10px -30px -16px;
  }

  @media ${device.laptopS} {
    max-width: 360px;
    margin: 0px 0px 0px -16px;
  }
`;

export const SmallDateText = styled(Text).attrs({
  size: '10px',
  color: Scorpion,
})`
  line-height: 17px;

  @media ${device.tabletS} {
    font-size: 14px;
  }

  @media ${device.laptopS} {
    font-size: 14px;
  }
`;

export const SmallReadMoreText = styled(Text).attrs({
  size: '12px',
  color: Tundora,
})`
  margin-top: -5px;

  text-decoration: underline;
  line-height: 20px;
  :hover {
    color: ${Gray};
  }

  @media ${device.tabletS} {
    font-size: 14px;
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 27px;
  }
`;

export const SmallReadMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px 0px -16px;

  @media ${device.tabletS} {
    margin: 8px 0px 0px -16px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 16px 0px 0px -16px;
  }
`;

export const SmallTitleContainer = styled.div`
  margin: 4px 0px 0px -16px;
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media ${device.mobileM} {
    width: 110%;
    min-height: 65px;
  }

  @media ${device.tabletS} {
    margin: 34px 0px 0px -16px;
    max-width: 110%;
    min-height: 65px;
  }

  @media ${device.laptopS} {
    margin: 8px 0px 0px -16px;
    -webkit-line-clamp: 2;
    min-height: 50px;
  }
`;

export const SmallTitleText = styled(Text).attrs({
  as: 'h4',
  family: exampleBold,
  color: Tundora,
  size: '16px',
})`
  font-weight: normal;
  letter-spacing: -0.3px;
  line-height: 21px;

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 25px;
    letter-spacing: -0.4px;
  }
`;

export const MainContainer = styled.div`
  @media ${device.mobileM} {
    margin: 0 0 15px 4px;
  }

  @media ${device.tabletS} {
    margin: 0px 10px 0px 8px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: -10px 0px 0px 10px;
  }
`;

export const MainDateContainer = styled.div`
  margin: 5px 0 0 -16px;

  @media ${device.mobileM} {
    margin: 0px 0 0 -16px;
  }
  @media ${device.tabletS} {
    margin: -180px 16px -36px 290px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: -227px 0px 10px 370px;
  }
`;

export const MainDateText = styled(Text).attrs({
  color: Scorpion,
  size: '10px',
})`
  line-height: 17px;

  @media ${device.mobileM} {
    font-size: 12px;
    line-height: 14px;
  }

  @media ${device.laptopS} {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const MainHorizontalTitleContainer = styled.div`
  margin-top: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const MainTitleContainer = styled.div`
  margin: 8px -10px 0px -16px;

  @media ${device.tabletS} {
    margin: 40px 10px 0px 290px;
    width: 60%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  @media ${device.laptopS} {
    margin: 8px 0px 10px 370px;
    width: 60%;
  }

  @media ${device.laptopM} {
    width: 60%;
  }
`;

export const MainTitleHorizontalText = styled(Text).attrs({
  as: 'h3',
  family: exampleBook,
  size: '20px',
})`
  font-weight: 600;
  line-height: 26px;

  color: ${Tundora};
`;

export const MainTitleText = styled(Text).attrs({
  as: 'h3',
  family: exampleBold,
  size: '16px',
})`
  color: ${Tundora};
  line-height: 21px;
  letter-spacing: -0.3px;
  font-weight: normal;

  @media ${device.mobileM} {
    letter-spacing: -0.8px;
    line-height: 29px;
    font-size: 24px;
  }

  @media ${device.tabletS} {
    font-size: 28px;
    line-height: 34px;
  }

  @media ${device.laptopS} {
    font-size: 28px;
    line-height: 37px;
    letter-spacing: -1px;
    max-width: 648px;
  }
`;

const OpenInNewTab = styled.div`
  display: none;
  border-top: 60px solid transparent;
  border-bottom: 175px solid transparent;
  border-left: 0px solid transparent;
  line-height: 27px;
  color: ${Supernova};
  font-size: 16px;
  text-align: center;
  position: absolute;
  width: 100%;
  top: 30px;
  bottom: 0px;
  background-image: url('/yellow-read-more.svg');
  background-size: 41px;
  background-position: bottom;
  background-repeat: no-repeat;
  z-index: 5;
`;

export const SmallOpenInNewTab = styled(OpenInNewTab)`
  font-size: 14px;
  background-size: 31px;

  @media ${device.mobileM} {
    top: 0px;
  }

  @media ${device.tabletS} {
    border-top: 40px solid transparent;
    top: 50px;
    font-size: 16px;
    background-size: 41px;
  }

  @media ${device.laptopS} {
    border-top: 60px solid transparent;
  }
`;

export const MainOpenInNewTabHorizontal = styled(OpenInNewTab)`
  font-size: 16px;
  background-size: 41px;
`;

export const MainOpenInNewTab = styled(OpenInNewTab)`
  font-size: 16px;
  background-size: 41px;

  @media ${device.mobileM} {
    top: 50px;
  }
  @media ${device.tabletS} {
    border-top: 40px solid transparent;
  }

  @media ${device.laptopS} {
    border-top: 60px solid transparent;
  }
`;

export const SmallImage = styled.img`
  object-fit: cover;
  height: 160px;
  margin-bottom: 8px;
  width: 100%;
  opacity: 1;
  transition: opacity 0.1s linear;
  display: inline-block;

  @media ${device.mobileM} {
    max-width: 163px;
    height: 100px;
    margin-bottom: 0;
  }

  @media ${device.tabletS} {
    max-width: 300px;
    height: 151px;
  }

  @media ${device.laptopS} {
    max-width: 360px;
    height: 200px;
  }
`;

export const MainImageHorizontal = styled.img`
  background-position: unset;
  height: 154px;
  margin-bottom: -5px;
  position: relative;
  width: 264px;
  opacity: 1;
  transition: opacity 0.1s linear;
`;

export const MainImage = styled.img`
  background-position: unset;
  height: 193px;
  margin-bottom: -5px;
  position: relative;
  width: 100%;
  opacity: 1;
  transition: opacity 0.1s linear;

  @media ${device.mobileM} {
    width: 343px;
    height: 193px;
    margin-bottom: 8px;
  }

  @media ${device.tabletS} {
    width: 290px;
    height: 163px;
    margin-bottom: 0px;
  }

  @media ${device.laptopS} {
    width: 371px;
    height: 209px;
  }
`;

export const MainHoverContainerHorizontal = styled.div`
  position: relative;
  height: 154px;
  width: 264px;
`;

export const MainHoverContainer = styled.div`
  position: relative;

  @media ${device.mobileM} {
    width: 343px;
    height: 193px;
  }

  @media ${device.tabletS} {
    width: 291px;
    height: 163px;
  }

  @media ${device.laptopS} {
    width: 371px;
    height: 209px;
  }
`;

export const MainReadMoreTextHorizontal = styled(Text).attrs({
  color: Tundora,
  size: '16px',
})`
  text-decoration: underline;
  margin-top: -1px;

  :hover {
    color: ${Gray};
  }
`;
export const MainReadMoreText = styled(Text).attrs({
  color: Tundora,
  size: '12px',
})`
  text-decoration: underline;
  margin-top: -1px;

  :hover {
    color: ${Gray};
  }

  @media ${device.mobileM} {
    font-size: 14px;
    line-height: 17px;
  }

  @media ${device.tabletS} {
    margin-top: -3px;
    font-size: 16px;
    line-height: 19px;
  }

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 22px;
  }
`;

export const MainReadMoreHorizontalContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
`;

export const MainReadMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px 0px -16px;

  @media ${device.tabletS} {
    margin: 14px 10px 5px 290px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 24px 0px 12px 370px;
  }
`;

export const SmallContainerWrap = styled.div`
  @media ${device.mobileM} {
    margin: 0px -12px 0px -6px;
  }

  @media ${device.tabletS} {
    margin: 14px -10px 0px -5px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 20px -10px 0px -10px;
  }

  @media ${device.laptopM} {
    max-width: 1290px;
    margin: 20px -40px 0px -10px;
  }
`;

export const SmallNewTabIcon = styled.img`
  display: block;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  object-fit: contain;

  @media ${device.tabletS} {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }

  @media ${device.laptopS} {
    display: block;
    width: 19px;
    height: 19px;
    margin-right: 6px;
  }
`;

export const MainReadMoreImage = styled.img`
  display: block;
  width: 19px;
  height: 19px;
  margin-right: 8px;
  object-fit: contain;
`;

export const Link = styled.a`
  background: transparent;
  border: none;
  display: block;
  padding: 0;
  outline: none;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:active {
    ${SmallImage}, ${MainImage}, ${MainImageHorizontal} {
      opacity: 0.6;
    }

    ${MainHoverContainer}, ${SmallHoverContainer}, ${MainHoverContainerHorizontal} {
      background: ${AlmostBlack};
    }

    ${OpenInNewTab} {
      display: block;
    }
  }
`;

export const MainHorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 154px;
`;
