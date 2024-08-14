import styled from 'styled-components';

import { Text } from 'components/Text';
import { Tundora, abcdGray, Alto } from 'styles/colours';

export const MultipleUserButton = styled.button`
  text-align: left;
  cursor: pointer;
`;

export const MultipleUserText = styled(Text).attrs({
  color: Tundora,
  size: '14px',
})`
  line-height: 20px;
  text-decoration: underline;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 17px;
  background: ${abcdGray};
  border: 1px solid ${Alto};
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const UserCardLeft = styled.div`
  flex-grow: 1;
`;

export const UserName = styled(Text).attrs({
  color: Tundora,
  size: '14px',
})`
  width: 320px;
  line-height: 20px;
  font-weight: bold;
`;

export const UserEmail = styled(Text).attrs({
  color: Tundora,
  size: '14px',
})`
  width: 320px;
  line-height: 20px;
`;

export const UserRole = styled(Text).attrs({
  color: Tundora,
  size: '12px',
})`
  line-height: 20px;
  font-weight: bold;
`;
