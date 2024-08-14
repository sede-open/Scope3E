import styled from 'styled-components';
import { Tundora } from 'styles/colours';

export const List = styled.ul`
  color: ${Tundora};
  font-family: Arial, sans-serif;
  line-height: 20px;
  list-style: none;
  margin-bottom: 0.5rem;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
  padding-left: 1rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const ULListItem = styled(ListItem)`
  &::before {
    content: '•';
    display: block;
    left: 4px;
    top: 1px;
    position: absolute;
  }
`;
