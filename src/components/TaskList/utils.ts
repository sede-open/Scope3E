import { companyPrivacy_companyPrivacy } from 'types/companyPrivacy';
import { EmissionAllocationStatus, InviteStatus } from 'types/globalTypes';
import {
  TaskListQuery,
  TaskListQuery_customerRelationships,
  TaskListQuery_emissionAllocations,
  TaskListQuery_latestCorporateEmission,
} from 'types/TaskListQuery';
import { getCurrentYear } from 'utils/date';
import { Tasks } from './types';

export const isLastYearEmissionsDataComplete = (
  latestCorporateEmission: TaskListQuery_latestCorporateEmission | null
) => latestCorporateEmission?.year === getCurrentYear() - 1;

export const isCustomerRelationshipsDataComplete = (
  customerRelationships: TaskListQuery_customerRelationships[]
) =>
  customerRelationships.length > 0 &&
  customerRelationships.some(({ status }) => status === InviteStatus.APPROVED);

export const isSupplierRelationshipsDataComplete = (
  customerRelationships: TaskListQuery_customerRelationships[]
) =>
  customerRelationships.length > 0 &&
  customerRelationships.some(({ status }) => status === InviteStatus.APPROVED);

export const isCustomerEmissionAllocationsDataComplete = (
  emissionAllocations: TaskListQuery_emissionAllocations[]
) =>
  emissionAllocations.length > 0 &&
  emissionAllocations.some(
    ({ status }) => status === EmissionAllocationStatus.APPROVED
  );

const isPrivacySharingComplete = (
  companyPrivacy: companyPrivacy_companyPrivacy
): boolean => {
  return !(
    !companyPrivacy.allPlatform &&
    !companyPrivacy.customerNetwork &&
    !companyPrivacy.supplierNetwork
  );
};

export const getIconTitle = ({
  t,
  isComplete,
  isDisabled,
  isLoading,
}: {
  t: any;
  isComplete: boolean;
  isDisabled: boolean;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return t('taskList:item-check-icon-loading');
  }

  if (isDisabled) {
    return t('taskList:item-check-icon-disabled');
  }

  if (isComplete) {
    return t('taskList:item-check-icon-completed');
  }

  return t('taskList:item-check-icon-incomplete');
};

export const getTaskCompletion = ({
  isLoading,
  taskListData,
}: {
  isLoading: boolean;
  taskListData: TaskListQuery | undefined;
}) => ({
  [Tasks.AREAS_OF_INTEREST]: !isLoading,
  [Tasks.BASELINE]: Boolean(taskListData?.baseline),
  [Tasks.AMBITION]: Boolean(taskListData?.target),
  [Tasks.LAST_YEAR_EMISSIONS]: isLastYearEmissionsDataComplete(
    taskListData?.latestCorporateEmission ?? null
  ),
  [Tasks.CUSTOMER_RELATIONSHIPS]: isCustomerRelationshipsDataComplete(
    taskListData?.customerRelationships ?? []
  ),
  [Tasks.CUSTOMER_ALLOCATIONS]: isCustomerEmissionAllocationsDataComplete(
    taskListData?.emissionAllocations ?? []
  ),
  [Tasks.SUPPLIER_RELATIONSHIPS]: isSupplierRelationshipsDataComplete(
    taskListData?.supplierRelationships ?? []
  ),
  [Tasks.PRIVACY_SHARING]: taskListData?.companyPrivacy
    ? isPrivacySharingComplete(taskListData.companyPrivacy)
    : false,
});
