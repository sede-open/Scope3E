import styled from 'styled-components';
import { Alto, Scorpion, Tundora } from 'styles/colours';
import { headerHeight } from 'styles/variables';

export const StyledList = styled.ul`
  display: flex;
  margin: 0 0 0 auto;
  flex-direction: row;
  height: 100%;
`;

const activeLinkStyle = `
  border-color: ${Scorpion};
  z-index: 2;
`;

const linkStyles = `
  align-items: center;
  background: white;
  border: 1px solid ${Alto};
  cursor: pointer;
  display: flex;
  height: ${headerHeight + 1}px;
  justify-content: center;
  margin-left: -1px;
  position: relative;
  transition: border-color .2s linear;
  width: ${headerHeight + 1}px;

  &:hover,
  &:focus {
    ${activeLinkStyle}
  }
`;

export const NotificationContainer = styled.span`
  position: absolute;
  top: 6px;
  right: 12px;
  z-index: 1;
`;

export const StyledAnchor = styled.a`
  ${linkStyles}
  display: flex;
  flex-direction: column;
  text-decoration: none;
  > p {
    margin-top: 4px;
  }
`;

export const StyledButton = styled.button<{ isActive?: boolean }>`
  ${linkStyles}
  display: flex;
  flex-direction: column;
  ${({ isActive }) => isActive && activeLinkStyle}

  > p {
    margin-top: 1px;
  }
`;

export const StyledItem = styled.li`
  flex-shrink: 0;
  height: 100%;

  &:last-of-type {
    border-left: none;

    ${StyledAnchor}:not(:hover) {
      border-color: transparent;
      border-bottom-color: ${Alto};
    }
  }
`;

export const Greeting = styled.p`
  justify-items: center;
  color: ${Tundora};
  display: flex;
  height: 100%;
  flex-direction: column;
  font-size: 14px;
  line-height: 20px;
  padding: 0 23px;
  width: 160px;
`;

export const Salutation = styled.span`
  color: inherit;
  font-weight: 700;
  margin: auto 0 0;
`;

export const UserName = styled.span`
  color: inherit;
  margin: 0 0 auto;
`;

export const TaskListContainer = styled.div`
  position: absolute;
  margin-top: 9px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;

  border: none;
  > * {
    margin-right: 10px;
  }
`;

export const DropdownContainer = styled.div`
  padding: 8px 0;
`;
