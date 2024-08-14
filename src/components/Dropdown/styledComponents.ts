import styled from 'styled-components';
import { Alto, Scorpion } from 'styles/colours';

export const DropdownContainer = styled.div`
  display: flex;
  width: 90%;
`;

export const Dropdown = styled.div<{ dropdownWidth?: string }>`
  position: relative;
  border: 1px solid ${Alto};
  box-sizing: border-box;
  width: ${({ dropdownWidth = '90%' }) => dropdownWidth};
`;

export const DropdownInput = styled.input`
  width: 100%;
  border: 0;
  padding: 0;
  height: 48px;
  text-indent: 10px;

  &:focus {
    outline: none;
    border: 1px solid ${Scorpion};
  }
`;

export const SearchActionsContainer = styled.div`
  width: 50px;
  margin-left: -50px;
  z-index: 1;
  box-sizing: border-box;
  border-left: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingSpinnerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 16px;
`;
