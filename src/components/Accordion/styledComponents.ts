import styled from 'styled-components';

import { Text } from 'components/Text';
import { Tundora, abcdGray } from 'styles/colours';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0rem;
`;

export const ContentWrapper = styled.div<{ open: boolean }>`
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.open ? 'auto' : '0')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  padding: 0rem 5rem 0rem 0rem;
  transition: all 0.5s ease-out;
`;

export const AccordionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  :hover {
    background-color: ${abcdGray};
  }
`;

export const StyledTitle = styled(Text)<{ open: boolean }>`
  color: ${Tundora};
  font-size: 16px;
  font-weight: ${(props) => (props.open ? 'bold' : 'normal')};
`;
