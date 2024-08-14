import styled from 'styled-components';

import { SilverChalice, White, Tundora, Scorpion } from 'styles/colours';

export const Button = styled.button`
  padding: 12px;
  background-color: ${White};
  color: ${Tundora};
  border: 1px solid ${SilverChalice};
  cursor: pointer;
  height: 52px;

  :hover {
    border: 1px solid ${Scorpion};
  }
`;
