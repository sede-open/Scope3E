import styled from 'styled-components';

import { Scorpion, Tundora } from 'styles/colours';
import { Link } from 'components/Link';
import { Text } from 'components/Text';

export const IntroText = styled(Text)`
  color: ${Scorpion};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  color: ${Tundora};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 10px;
`;

export const MailtoLink = styled(Link)`
  white-space: nowrap;
`;

export const Columns = styled.div`
  display: flex;
  justify-items: space-between;
  margin-bottom: 1rem;
  width: 100%;
`;

export const FieldColumn = styled.div`
  flex: 1;

  &:first-of-type {
    margin-right: 2rem;
  }
`;
