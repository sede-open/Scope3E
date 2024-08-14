import styled from 'styled-components';

import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Card } from 'components/Card';

export const OnboardingHeader = styled.header`
  margin: 0 auto;
  max-width: 615px;
  padding: 2rem 0;
`;

export const OnboardingPrimaryHeading = styled.h1`
  color: ${Tundora};
  font-family: ${exampleBold}, arial, sans-serif;
  font-size: 2rem;
  line-height: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const OnboardingIntro = styled.p`
  color: ${Scorpion};
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
`;

export const UserOnboardingCard = styled(Card)`
  padding-left: 423px;
  position: relative;
`;
