import { Text } from 'components/Text';
import styled from 'styled-components';
import { FunGreen, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const LandingBackground = styled.div`
  width: 100%;
  background-image: url('/images/PublicSite/skyscrapers.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 250px;

  @media ${device.tabletM} {
    min-height: 426px;
    padding: 124px 132px 52px 132px;
  }
`;

export const LandingTitle = styled(Text).attrs({
  as: 'h1',
  color: Tundora,
  size: '3rem',
  family: exampleBold,
})`
  display: none;
  @media ${device.tabletM} {
    display: unset;
  }
`;

export const GreenBackground = styled.div`
  width: 100%;
  background-color: ${FunGreen};
  padding: 48px 24px;
  @media ${device.tabletM} {
    padding: 62px 132px;
  }
`;

export const MobileHeader = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
  color: White,
  size: '2rem',
})`
  margin-bottom: 24px;
  @media ${device.tabletM} {
    display: none;
  }
`;

export const GreenSectionText = styled(Text).attrs({
  color: White,
  size: '1.625rem',
  family: exampleBold,
})``;

export const FormSection = styled.div`
  padding: 52px 24px;
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.div`
  max-width: 392px;
`;
