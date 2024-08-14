import styled from 'styled-components';

import { Text } from 'components/Text';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const Wrapper = styled.div<{
  isXl: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ isXl }) => (isXl ? '780px' : '503px')};
`;

export const Form = styled.form`
  width: 100%;
`;

export const TitleContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  family: exampleBold,
})`
  align-self: flex-start;
  color: ${Tundora};
  font-size: 32px;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: Scorpion,
})`
  line-height: 24px;
`;
