import { SUPPRESS_TASK_LIST_PROMPT_MUTATION } from 'containers/Modals/TaskListPrompt/mutations';
import { TASK_LIST_QUERY } from 'containers/TaskListContainer/queries';
import { TaskListQuery } from 'types/TaskListQuery';
import { USER_COMPANY_ID } from './constants';

export const getTaskListQueryMock = ({
  baseline = null,
  target = null,
  latestCorporateEmission = null,
  customerRelationships = [],
  emissionAllocations = [],
  supplierRelationships = [],
  companyPrivacy = {
    allPlatform: false,
    supplierNetwork: false,
    customerNetwork: false,
  },
}: Partial<TaskListQuery>) => ({
  request: {
    query: TASK_LIST_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      baseline,
      target,
      latestCorporateEmission,
      customerRelationships,
      emissionAllocations,
      supplierRelationships,
      companyPrivacy,
    },
  },
});

export const suppressTaskListMutationMock = {
  request: {
    query: SUPPRESS_TASK_LIST_PROMPT_MUTATION,
  },
  result: {
    data: {
      editPreferences: {
        id: 'some-preferences-id',
      },
    },
  },
};

export const suppressTaskListMutationSpyMock = (newData: any) => ({
  request: {
    query: SUPPRESS_TASK_LIST_PROMPT_MUTATION,
  },
  newData,
});
