import { getTaskCompletion } from 'components/TaskList/utils';
import { useTaskListQuery } from 'containers/TaskListContainer/queries';
import { useMemo, useState } from 'react';
import { useAuthenticatedUser } from './useAuthenticatedUser';

export const usePendingTasks = () => {
  const { company } = useAuthenticatedUser();
  const companyId = company?.id;
  const { data, loading } = useTaskListQuery({ companyId });
  const [hasLoaded, setHasLoaded] = useState(false);

  const hasPendingTask = useMemo(() => {
    if (loading && !hasLoaded) return false;
    setHasLoaded(true);
    const taskCompletion = getTaskCompletion({
      isLoading: loading,
      taskListData: data,
    });
    const taskValues = Object.values(taskCompletion);
    const hasPending = taskValues.some((value) => value === false);
    return hasPending;
  }, [loading, hasLoaded]);
  return { hasPendingTask, loading };
};
