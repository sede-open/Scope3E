import styled from 'styled-components';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const Wrapper = styled.div`
  padding: 22px 16px;

  @media ${device.tabletS} {
    padding: 48px 16px;
    max-width: 100%;
    margin: 0 auto;
  }

  @media ${device.laptopS} {
    padding: 56px 16px;
  }
`;

export const LogoContainer = styled.a`
  line-height: 26px;

  @media ${device.laptopS} {
    margin-bottom: 90px;
  }
`;

export const Logo = styled.div`
  width: 270px;
  @media ${device.tabletS} {
    width: 327px;
  }
`;

export const TitleContainer = styled.div`
  margin: 24px 0 8px 0;

  @media ${device.tabletS} {
    margin: 48px 0 12px 0;
  }

  @media ${device.laptopS} {
    margin: 85px 0 16px 0;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
  color: Tundora,
})`
  font-weight: normal;
  line-height: 34px;
  letter-spacing: -0.8px;

  @media ${device.tabletS} {
    font-size: 36px;
    line-height: 43px;
    letter-spacing: -1.3px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -2px;
  }
`;

export const SubTextContainer = styled.div`
  margin-bottom: 16px;

  @media ${device.tabletS} {
    margin-bottom: 32px;
  }

  @media ${device.laptopS} {
    margin-bottom: 48px;
  }
`;

export const Subtext = styled(Text).attrs({
  color: Tundora,
})`
  line-height: 21px;

  @media ${device.tabletS} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 21px;
    line-height: 31px;
  }
`;

export const CtaContainer = styled.div`
  display: inline-block;
`;

export const RedirectBtn = styled(Button).attrs({
  as: 'a',
  href: '/',
  color: 'text-button',
})`
  font-size: 12px;
  line-height: 20px;

  @media ${device.tabletS} {
    font-size: 14px;
    line-height: 17px;
  }

  @media ${device.laptopS} {
    font-size: 16px;
    line-height: 24px;
  }
`;
