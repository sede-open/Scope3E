import { useContext } from 'react';

import { TaskListContext } from 'context/TaskListProvider/TaskListContext';

export const useTaskList = () => useContext(TaskListContext);
