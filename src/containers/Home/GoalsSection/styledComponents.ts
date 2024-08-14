import styled from 'styled-components';
import { Tundora, abcdGray } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1680px;
  margin-top: 26px;
  z-index: 1;
  width: 100%;
  padding: 70px 0;

  @media ${device.tabletS} {
    margin-top: 100px;
    padding: 90px 0;
  }

  @media ${device.laptopS} {
    margin-top: 0px;
    padding: 130px 0;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 32px 0;

  @media ${device.tabletS} {
    max-width: 636px;
    margin-bottom: 52px;
  }

  @media ${device.laptopS} {
    max-width: 874px;
    margin-bottom: 32px;
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
  text-align: center;
  letter-spacing: -0.8px;

  @media ${device.tabletS} {
    font-size: 28px;
    line-height: 33px;
  }

  @media ${device.laptopS} {
    font-size: 34px;
    line-height: 44px;
    letter-spacing: -1.5px;
  }
`;

export const ResponsiveWrapper = styled.div`
  margin-bottom: 32px;

  @media ${device.tabletS} {
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
  }

  @media ${device.laptopS} {
    margin-bottom: 72px;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileM} {
    margin-bottom: 24px;
  }

  @media ${device.tabletS} {
    flex-direction: row;
  }

  @media ${device.laptopS} {
    margin: 48px 0px 0px 40px;
  }
`;

export const CtaContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${device.mobileL} {
    flex-wrap: nowrap;
  }
`;

export const CtaButton = styled(Button)`
  max-height: 56px;
  white-space: nowrap;
  line-height: 26px;

  margin-bottom: 16px;
  :focus {
    background-color: ${abcdGray};
  }
`;
