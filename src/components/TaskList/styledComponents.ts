import styled, { css, keyframes } from 'styled-components';

import {
  abcdGray,
  Gray,
  Scorpion,
  SilverChalice,
  Tundora,
  White,
} from 'styles/colours';
import { headerHeight } from 'styles/variables';
import { TaskListIllustration } from 'components/Glyphs/TaskListIllustration';
import { TaskListCheck } from 'components/Glyphs/TaskListCheck';

export const Container = styled.div`
  background: ${White};
  border: 1px solid ${SilverChalice};
  box-shadow: 0px 7px 16px rgba(0, 0, 0, 0.08);
  max-height: calc(100vh - ${headerHeight}px - 20px);
  overflow-y: auto;
  padding-bottom: 1rem;
  width: 318px;
`;

export const Header = styled.header`
  background: ${abcdGray};
  display: flex;
  padding: 24px 16px;
`;

export const HeaderIllustration = styled(TaskListIllustration)`
  flex-shrink: 0;
  margin-right: 8px;
`;

export const Heading = styled.h4`
  color: ${Tundora};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 4px;
`;

export const Intro = styled.p`
  color: ${Tundora};
  font-size: 14px;
  line-height: 20px;
`;

export const TaskList = styled.ul`
  padding: 1rem 26px;
`;

export const TaskListItem = styled.li`
  align-items: flex-start;
  display: flex;
  padding: 0.5rem 0;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

const throb = keyframes`
  0% {
    box-shadow: 0 0 0 1px ${Gray};
  }

  50% {
    box-shadow: 0 0 0 3px ${Gray};
  }

  100% {
    box-shadow: 0 0 0 1px ${Gray};
  }
`;

export const IconContainer = styled.div<{
  isDisabled: boolean;
  isLoading: boolean;
}>`
  border-radius: 10px;
  box-shadow: 0 0 0 1px
    ${({ isDisabled }) => (isDisabled ? Gray : 'transparent')};
  flex-shrink: 0;
  height: 20px;
  margin-right: 14px;
  transition: box-shadow 0.3s linear;
  width: 20px;

  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${throb} 1.5s ease-in-out infinite;
      opacity: 0.6;
    `}
`;

export const CheckIcon = styled(TaskListCheck)<{ isHidden: boolean }>`
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
`;

export const TaskHeading = styled.h5`
  color: ${Tundora};
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
`;

export const TaskDescription = styled.p`
  color: ${Scorpion};
  font-size: 12px;
  line-height: 14px;
`;

export const TaskButton = styled.button.attrs({
  type: 'button',
})`
  cursor: pointer;
  text-decoration: underline;

  &:hover,
  &:active {
    text-decoration: none;
  }
`;
