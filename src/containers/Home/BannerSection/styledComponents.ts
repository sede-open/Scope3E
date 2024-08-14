import styled from 'styled-components';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import { Alto, White } from 'styles/colours';
import { exampleBook, exampleBold } from 'styles/fonts';
import Button from 'components/Button';

export const SectionWrapper = styled.div`
  width: 100%;
  margin-top: 44px;

  @media ${device.tabletS} {
    margin-top: 64px;
  }

  @media ${device.laptopS} {
    margin-top: 74px;
  }
`;

export const BannerContainer = styled.div`
  background: url('/images/PublicSite/example-banner-img.png');
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
  background-repeat: no-repeat;
  width: 100%;
`;

export const ContentOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw 0 8vw 0;
`;

export const SubTextTopContainer = styled.div`
  text-align: center;
  margin: 48px 0 24px 0;
  width: 60%;

  @media ${device.laptopS} {
    margin-bottom: 48px;
  }
`;

export const SubTextBottomContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  padding: 0 4px;

  @media ${device.tabletS} {
    margin-bottom: 28px;
    max-width: 480px;
  }

  @media ${device.laptopS} {
    max-width: 100%;
    margin-bottom: 34px;
  }
`;

export const Subtext = styled(Text).attrs({ color: White })`
  line-height: 21px;

  @media ${device.tabletS} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 21px;
    line-height: 32px;
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const Title = styled(Text).attrs({
  size: '32px',
  color: White,
  family: exampleBook,
})`
  line-height: 38px;
  letter-spacing: -1px;

  @media ${device.tabletS} {
    font-size: 40px;
    line-height: 48px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    line-height: 58px;
  }
`;

export const SubtitleContainer = styled.div`
  text-align: center;
  margin: 0 4px 16px 4px;

  @media ${device.tabletS} {
    max-width: 720px;
  }

  @media ${device.laptopS} {
    max-width: 850px;
  }
`;

export const Subtitle = styled(Text).attrs({
  as: 'h3',
  size: '24px',
  family: exampleBold,
  color: White,
})`
  line-height: 29px;
  letter-spacing: -0.6px;
  z-index: 1;

  @media ${device.laptopS} {
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -1px;
  }
`;

export const DisclaimerContainer = styled.div`
  margin-top: 8px;
`;

export const DisclaimerText = styled(Text).attrs({
  color: White,
  size: '12px',
})`
  line-height: 21px;

  @media ${device.tabletS} {
    font-size: 14px;
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 32px;
  }
`;

export const DisclaimerLink = styled.a`
  color: ${White};

  :hover {
    color: ${Alto};
  }
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const CtaContainer = styled.div`
  padding: 0 10px 8px 10px;
`;

export const CtaButton = styled(Button)`
  max-height: 56px;
  width: auto;
  text-align: left;
  line-height: 19px;
  font-size: 16px;
  text-decoration: none;
`;
