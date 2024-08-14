import styled from 'styled-components';
import {
  abcdGray,
  Scorpion,
  SilverChalice,
  Supernova,
  Tundora,
} from 'styles/colours';

interface IPaginationButtonProps {
  $arrow?: 'right' | 'left';
  $active?: boolean;
  $ellipsis?: boolean;
}

export const PaginationButton = styled.button<IPaginationButtonProps>`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${Tundora};
  border: 1px ${SilverChalice} solid;
  border-right-width: 0.5px;
  border-left-width: 0.5px;
  height: 3.429em;
  width: 3.429em;
  cursor: pointer;

  ${({ $ellipsis }) =>
    $ellipsis
      ? `
  cursor: default;
  `
      : `
      cursor: pointer;
      &:hover:not([disabled]) {
        border: 1px ${Scorpion} solid;
      }
  `}

  &[disabled] {
    background-color: ${abcdGray};
    cursor: not-allowed;
  }

  ${({ $active }) => ($active ? `background-color: ${Supernova};` : '')}

  svg {
    margin-top: 4px;
  }

  ${({ $arrow }) => ($arrow === 'left' ? `border-left-width: 1px;` : '')}

  ${({ $arrow }) => ($arrow === 'right' ? `border-right-width: 1px;` : '')}
`;

export const PaginationContainer = styled.div`
  display: flex;
`;
