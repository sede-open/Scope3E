import styled from 'styled-components';

import { Tundora } from 'styles/colours';
import { Card } from 'components/Card';
import { Text } from 'components/Text';

export const RelationshipsCard = styled(Card)<{ withContent: boolean }>`
  margin-bottom: 1.5rem;
  &:first-of-type {
    margin-top: 3rem;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  ${({ withContent }) =>
    withContent &&
    `
    flex: 1;
  `}
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
})`
  color: ${Tundora};
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.3rem;
`;

export const ShowOverflowButtonContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0;
`;
