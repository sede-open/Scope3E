import styled from 'styled-components';

import { White, Tundora, Alto } from 'styles/colours';
import { Text } from 'components/Text';
import { exampleBold } from 'styles/fonts';

export const IntroModuleContainer = styled.section`
  background: ${White} url('/value-chain-world.svg') no-repeat 100% 100%;
  background-size: 382px 250px;
  margin-bottom: 3.75rem;
  padding: 3.75rem 2.5rem;
  height: 250px;
  border: 1px solid ${Alto};
`;

export const TextContainer = styled.div`
  max-width: 510px;
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
