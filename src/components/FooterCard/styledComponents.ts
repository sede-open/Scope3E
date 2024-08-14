import styled from 'styled-components';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { Gray, Tundora, Supernova, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import Button from 'components/Button';

export const FooterCardContainer = styled.div<{ invertColor?: boolean }>`
  margin-top: 43px;
  width: 100%;
  background: ${(props) => (props.invertColor ? Supernova : White)};
  @media ${device.tabletS} {
    margin-top: 68px;
  }
  @media ${device.laptopS} {
    margin-top: 0;
  }
`;

export const ContentContainer = styled.div`
  padding: 48px 0;
  @media ${device.tabletS} {
    padding: 64px 0;
  }
  @media ${device.tabletS} {
    padding: 110px 0;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  padding: 0px 5px;
  @media ${device.laptopS} {
    margin-bottom: 24px;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 30px;
  font-weight: normal;
  letter-spacing: -0.8px;
  @media ${device.tabletS} {
    font-size: 28px;
    line-height: 33px;
  }
  @media ${device.laptopS} {
    font-size: 34px;
    line-height: 44px;
    letter-spacing: -2px;
  }
`;

export const CtaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const CtaButton = styled(Button)<{ invertColor?: boolean }>`
  max-width: 90%;
  max-height: 66px;
  line-height: 16px;
  font-size: 14px;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  background: ${(props) => (props.invertColor ? Tundora : '')};
  color: ${(props) => (props.invertColor ? White : Tundora)};
  :hover {
    background: ${(props) => (props.invertColor ? Gray : '')};
  }
  @media ${device.mobileM} {
    max-width: 100%;
    max-height: 48px;
    white-space: nowrap;
    line-height: 20px;
  }
`;
