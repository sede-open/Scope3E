import styled from 'styled-components';

import { Text } from 'components/Text';
import { device } from 'styles/variables';
import { Gray, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;

  @media ${device.laptopS} {
    margin-bottom: 96px;
  }
`;

export const Form = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 26rem;
  max-width: 100%;
`;

export const TitleContainer = styled.div`
  margin-bottom: 18px;
  max-width: 305px;

  @media ${device.tabletS} {
    margin-bottom: 28px;
  }

  @media ${device.tabletS} {
    max-width: 415px;
  }

  @media ${device.laptopS} {
    max-width: 445px;
  }
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '26px',
  family: exampleBold,
  color: Tundora,
})`
  letter-spacing: -0.8px;
  font-weight: normal;
  line-height: 34px;

  @media ${device.tabletS} {
    font-size: 36px;
    letter-spacing: -1.3px;
    line-height: 43px;
  }

  @media ${device.laptopS} {
    font-size: 48px;
    letter-spacing: -2px;
    line-height: 58px;
  }
`;

export const SubtitleContainer = styled.div`
  margin-bottom: 30px;
  max-width: 470px;

  @media ${device.tabletS} {
    max-width: 555px;
  }

  @media ${device.laptopS} {
    margin-bottom: 48px;
    max-width: 620px;
  }
`;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Tundora,
})`
  line-height: 27px;

  @media ${device.tabletS} {
    line-height: 24px;
  }

  @media ${device.laptopS} {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const MandatoryText = styled(Text)`
  color: ${Gray};
  line-height: 17px;
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
`;

export const CtaContainer = styled.div``;

export const PrivacyPolicyMessage = styled(Text)`
  color: ${Tundora};
  margin: -0.5rem 0 2rem;
  padding-left: 2rem;
`;
