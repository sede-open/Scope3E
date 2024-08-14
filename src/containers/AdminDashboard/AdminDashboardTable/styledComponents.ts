import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora, Gray } from 'styles/colours';
import { Card } from 'components/Card';

export const TableContainer = styled(Card)`
  border-top: none;
  margin-bottom: 96px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled(Text).attrs({ color: Tundora })`
  font-weight: 700;
`;

export const NameContainer = styled.div`
  max-width: 100px;
`;

export const TableButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  color: ${Tundora};
  :disabled {
    color: ${Gray};
    cursor: default;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
