import Button from 'components/Button';
import { Text } from 'components/Text';
import styled from 'styled-components';
import { Tundora, White } from 'styles/colours';
import { exampleBold, exampleBook } from 'styles/fonts';

export const CommunityBannerContent = styled.div`
  background: ${White};
  width: 60%;
  padding: 3rem 2.5rem 3rem 3rem;
`;

export const CommunityBannerTitle = styled(Text).attrs({
  size: '1.25',
  color: Tundora,
  as: 'h2',
  family: exampleBold,
})`
  line-height: 1.625rem;
  font-weight: 700;
`;

export const CommunityBannerSubTitle = styled(Text).attrs({
  size: '1rem',
  color: Tundora,
  family: exampleBook,
})`
  line-height: 1.625rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const CommunityBannerCTA = styled(Button)`
  min-width: 25%;
`;

export const CommunityBannerImageContainer = styled.div`
  background: ${White}
    url('/images/CommunityImages/example-digital-team-employees-working.png')
    no-repeat 100% 100%;
  width: 40%;
`;

export const CommunityBannerImage = styled.img``;
