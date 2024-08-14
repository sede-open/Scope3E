import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';
import { Alto, Tundora, White, abcdGray } from 'styles/colours';
import Button from 'components/Button';

export const Wrapper = styled.div`
  margin-top: 48px;
`;

export const Banner = styled.div`
  background-image: url('/sitting-guy-laptop.svg');
  background-repeat: no-repeat;
  background-position: bottom 0 right 12%;
  background-color: ${White};
  padding: 60px 0 40px 40px;
  margin-bottom: 48px;
  border: 1px solid ${Alto};
`;

export const BannerTitle = styled(Text).attrs({
  family: exampleBold,
  size: '1.5rem',
  color: Tundora,
  as: 'h2',
})`
  line-height: 28px;
  max-width: 360px;
  margin-bottom: 22px;
`;

export const BannerSubtext = styled(Text).attrs({
  size: '0.875rem',
  color: Tundora,
})`
  line-height: 20px;
  max-width: 511px;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Anchor = styled.a`
  all: unset;
`;

export const CtaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CtaButton = styled(Button)`
  max-height: 56px;
  white-space: nowrap;
  line-height: 26px;
  margin: -72px 0px 96px 0px;
  :focus {
    background-color: ${abcdGray};
  }
`;
