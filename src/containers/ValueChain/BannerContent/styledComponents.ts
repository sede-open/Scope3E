import styled from 'styled-components';

import { Tundora } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const TextContainer = styled.div<{ marginBottom?: string }>`
  width: 66%;
  margin-bottom: 1.375rem;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  color: Tundora,
})`
  font-family: ${exampleBold};
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

export const CtaContainer = styled.div`
  width: 40%;
`;
