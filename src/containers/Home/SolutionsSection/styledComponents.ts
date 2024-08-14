import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const SolutionsSection = styled.div`
  margin-top: 64px;

  @media ${device.tabletS} {
    margin-top: 96px;
  }

  @media ${device.laptopS} {
    margin-top: 192px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  @media ${device.tabletS} {
    margin-bottom: 24px;
  }
  @media ${device.laptopS} {
    margin-bottom: 44px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  max-width: 320px;
  text-align: center;
  @media ${device.mobileM} {
    max-width: 100%;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  family: exampleBold,
  color: Tundora,
})`
  line-height: 28px;
  font-weight: normal;
  letter-spacing: -0.8px;
  @media ${device.tabletS} {
    font-size: 28px;
    line-height: 33px;
  }
  @media ${device.laptopS} {
    font-size: 34px;
    line-height: 44x;
    letter-spacing: -2px;
  }
`;

export const SubTextContainer = styled.div`
  width: 100%;
  max-width: 343px;
  text-align: center;
  @media ${device.mobileM} {
    max-width: 595px;
  }
  @media ${device.mobileM} {
    max-width: 652px;
  }
`;

export const Subtext = styled(Text).attrs({
  size: '16px',
})`
  color: ${Tundora};
  line-height: 27px;
  @media ${device.tabletS} {
    font-size: 14px;
    line-height: 23px;
  }
  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 30px;
  }
`;
