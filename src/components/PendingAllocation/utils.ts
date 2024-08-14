import { EmissionAllocationStatus } from 'types/globalTypes';
import { AllocationStatus } from './constants';

export const getAllocationStatus = (
  allocationStatus: EmissionAllocationStatus,
  isMissingEmissions: boolean
) => {
  if (isMissingEmissions) {
    return AllocationStatus.MissingEmissions;
  }

  switch (allocationStatus) {
    case EmissionAllocationStatus.REQUESTED:
      return AllocationStatus.IncomingRequest;
    default:
      return AllocationStatus.IncomingAllocation;
  }
};
