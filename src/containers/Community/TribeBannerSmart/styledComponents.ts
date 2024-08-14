import styled from 'styled-components';

import { White, Tundora, Alto } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const IntroModuleContainer = styled.section`
  background: ${White}
    url('/images/CommunityImages/community-hero-banner-image.png') no-repeat
    100% 100%;
  background-size: 564px 250px;
  margin-bottom: 3.75rem;
  padding: 2.5rem;
  height: 250px;
  border: 1px solid ${Alto};
`;

export const TextContainer = styled.div`
  max-width: 490px;
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  color: Tundora,
})`
  font-family: ${exampleBold};
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 1.375rem;
`;

export const SubTitle = styled(Text).attrs({
  as: 'h4',
  color: Tundora,
})`
  line-height: 20px;
`;

export const TribeUsageStatsInfoText = styled(Text).attrs({
  as: 'h3',
  color: Tundora,
})`
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
`;

export const Spacer = styled.div<{ marginLeft: string }>`
  margin-left: ${({ marginLeft }) => marginLeft};
`;
