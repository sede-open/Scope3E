import styled from 'styled-components';
import {
  Gray,
  Tundora,
  Supernova,
  Scorpion,
  AlmostBlack,
} from 'styles/colours';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const TextWrapper = styled.div`
  padding: 16px;
`;

export const Container = styled.div`
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
  }
`;

export const SmallImage = styled.img`
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

export const DateContainer = styled.div`
  margin: 0px 10px -30px -16px;

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 0px 0px 0px -16px;
  }
`;

export const DateText = styled(Text).attrs({
  size: '12px',
  color: Scorpion,
})`
  line-height: 20px;

  @media ${device.laptopS} {
    font-size: 14px;
  }
`;

export const ReadMoreText = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  text-decoration: underline;
  line-height: 24px;
  margin-top: -5px;

  :hover {
    color: ${Gray};
  }

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 27px;
  }
`;

export const ReadMoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px 0px -16px;

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 16px 0px 0px -16px;
  }
`;

export const TitleContainer = styled.div`
  margin: 34px 0px 0px -16px;

  @media ${device.laptopS} {
    margin: 8px 0px 0px -16px;
  }
`;
export const TitleText = styled(Text).attrs({
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

export const SmallHoverContainer = styled.div`
  position: relative;
  height: 160px;

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

export const NewTabIcon = styled.img`
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
    ${SmallImage} {
      opacity: 0.6;
    }

    ${SmallHoverContainer} {
      background: ${AlmostBlack};
    }

    ${OpenInNewTab} {
      display: block;
    }
  }
`;
