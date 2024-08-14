import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';
import { Alto, Gray, Scorpion, Supernova, Tundora } from 'styles/colours';
import { ITabProps, TabListProps, TabsAlignment, TabSize } from './types';

export const TabList = styled.div<TabListProps>`
  align-items: center;
  border-bottom: 1px solid ${Alto};
  display: flex;
  justify-content: ${ifProp(
    { align: TabsAlignment.CENTER },
    'center',
    'flex-start'
  )};
  overflow: visible;
  width: 100%;
  ${ifProp(
    'marginBottom',
    css`
      margin-bottom: ${prop('marginBottom')};
    `
  )}
`;

export const Tab = styled.button<ITabProps>`
  position: relative;
  background: transparent;
  border: none;
  box-shadow: 0 4px 0 0
    ${ifProp({ isSelected: true }, Supernova, 'transparent')};
  color: ${ifProp({ isSelected: true }, Tundora, Scorpion)};
  cursor: ${ifProp({ isSelected: true }, 'default', 'pointer')};
  flex-grow: ${ifProp({ align: TabsAlignment.FLEX_GROW }, '1', '0')};
  font-size: ${ifProp({ size: TabSize.SMALL }, '14px', '16px')};
  font-weight: ${ifProp(
    { size: TabSize.SMALL, isSelected: false },
    'normal',
    'bold'
  )};
  margin-bottom: -1px;
  outline: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;

  &:disabled {
    cursor: default;
  }

  &:hover {
    color: ${ifProp({ isSelected: true }, Tundora, Gray)};
  }
`;
