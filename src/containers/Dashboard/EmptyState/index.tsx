import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { EditorEmptyState } from './EditorEmptyState';
import { ViewerEmptyState } from './ViewerEmptyState';

export const EmptyState = () => {
  const { canEditSupplyDashboard } = useAuthenticatedUser();

  return (
    <>{canEditSupplyDashboard ? <EditorEmptyState /> : <ViewerEmptyState />}</>
  );
};
