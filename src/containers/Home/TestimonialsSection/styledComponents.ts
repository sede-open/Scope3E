import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const TestimonialTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  @media ${device.tabletS} {
    margin-bottom: 24px;
  }

  @media ${device.laptopS} {
    margin-bottom: 48px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  line-height: 29px;
  font-weight: normal;
  letter-spacing: -0.8px;

  @media ${device.tabletS} {
    font-size: 28px;
    line-height: 34px;
  }

  @media ${device.laptopS} {
    font-size: 34px;
    line-height: 44x;
    letter-spacing: -1.5px;
  }
`;

export const SubTextContainer = styled.div`
  width: 100%;
  max-width: 270px;
  text-align: center;

  @media ${device.mobileM} {
    max-width: 500px;
  }
`;

export const Subtext = styled(Text).attrs({
  size: '16px',
  as: 'h4',
})`
  color: ${Tundora};
  line-height: 27px;

  @media ${device.tabletS} {
    font-size: 18px;
    line-height: 31px;
  }
`;

export const MainContainer = styled.div`
  align-items: center;
  margin: 0 auto;

  @media ${device.tabletS} {
    margin: 0px 10px 0px 0px;
  }

  @media ${device.laptopS} {
    max-width: 1024px;
    margin: 0 auto;
  }
`;
