import { ReactNode, useCallback, useState } from 'react';

import { TaskListContext } from './TaskListContext';

interface IProps {
  children: ReactNode;
}

export const TaskListProvider = ({ children }: IProps) => {
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);

  const toggleIsTaskListOpen = useCallback(() => {
    setIsTaskListOpen(!isTaskListOpen);
  }, [isTaskListOpen]);

  return (
    <TaskListContext.Provider
      value={{ isTaskListOpen, setIsTaskListOpen, toggleIsTaskListOpen }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
