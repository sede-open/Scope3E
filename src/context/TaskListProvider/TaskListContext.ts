import { createContext, Dispatch, SetStateAction } from 'react';

interface ITaskList {
  isTaskListOpen: boolean;
  setIsTaskListOpen: Dispatch<SetStateAction<boolean>>;
  toggleIsTaskListOpen: () => void;
}

export const TaskListContext = createContext<ITaskList>({
  isTaskListOpen: false,
  setIsTaskListOpen: () => {},
  toggleIsTaskListOpen: () => {},
});
