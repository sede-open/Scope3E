import { TaskList } from 'components/TaskList';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useTaskListQuery } from './queries';

export const TaskListContainer = () => {
  const { company: userCompany } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const { data, loading } = useTaskListQuery({ companyId });

  if (loading) {
    return null;
  }
  return <TaskList isLoading={loading} taskListData={data} />;
};
