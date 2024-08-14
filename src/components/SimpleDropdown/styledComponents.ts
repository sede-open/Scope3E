import styled from 'styled-components';
import { DropdownItem, DropdownMenu } from 'styled-dropdown-component';

export const StyledDropdownMenu = styled(DropdownMenu)`
  z-index: 2;
  margin-top: 4px;
  min-width: 220px;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  font-size: 14px;
  padding: 1rem;

  &:hover {
    background: transparent;
    font-weight: bold;
    cursor: pointer;
  }
`;
