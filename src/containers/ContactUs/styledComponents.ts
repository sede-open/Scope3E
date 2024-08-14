import { Text } from 'components/Text';
import styled from 'styled-components';
import { FunGreen, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { device } from 'styles/variables';

export const LandingBackground = styled.div`
  background-image: url('/images/PublicSite/mountains.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 250px;

  @media ${device.tabletM} {
    min-height: 426px;
    padding: 124px 132px 52px 132px;
  }
`;

export const LandingHeader = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
  color: Tundora,
  size: '3rem',
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

export const Description = styled(Text).attrs({
  family: exampleBold,
  color: White,
  size: '1.625rem',
})``;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 52px 24px;
  gap: 132px;
`;

export const LocationsContainer = styled.div`
  max-width: 392px;
`;

export const LocationsTitle = styled(Text).attrs({
  as: 'h3',
  color: FunGreen,
  size: '1.625rem',
  family: exampleBold,
})`
  margin-bottom: 24px;
`;
