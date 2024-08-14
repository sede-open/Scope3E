import styled from 'styled-components';

import {
  Scorpion,
  SilverChalice,
  Supernova,
  Tundora,
  White,
} from 'styles/colours';
import { visuallyHidden } from 'styles/variables';

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TagInput = styled.input.attrs({
  type: 'checkbox',
})`
  ${visuallyHidden}
`;

export const TagLabel = styled.label<{
  isChecked: boolean;
}>`
  align-items: center;
  background-color: ${White};
  border: 1px solid ${SilverChalice};
  color: ${Tundora};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin: 0 1rem 1rem 0;
  padding: 0.4rem 1rem 0.4rem 0.5rem;
  transition: background-color border-color 0.2s linear;

  &:hover {
    border-color: ${Scorpion};
  }

  &::before {
    background: transparent url(/plus.svg) no-repeat 6px 6px;
    background-size: 12px 12px;
    content: '';
    display: block;
    height: 24px;
    margin-right: 0.4rem;
    width: 24px;
  }

  ${({ isChecked }) =>
    isChecked &&
    `
    background: ${Supernova};
    border-color: ${Supernova};

    &:hover {
      border-color: ${Supernova};
    }

    &::before {
      background: transparent url(/checkbox-tick.svg) no-repeat 0 0;
      background-size: 24px 24px;
    }
  `}
`;
