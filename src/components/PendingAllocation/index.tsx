import { EmissionAllocationStatus } from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';

import { AwaitingApprovalAllocation } from './AwaitingApprovalAllocation';
import { RequestedAllocation } from './RequestedAllocation';
import { getAllocationStatus } from './utils';

interface IProps {
  allocation: EmissionAllocationsQuery_emissionAllocations;
  dataTestId?: string;
  hasEditPermission: boolean;
  isDisabled: boolean;
  isMissingEmissions: boolean;
  onAccept: (allocation: EmissionAllocationsQuery_emissionAllocations) => void;
  onAddEmissions: (year: number) => void;
  onReject: ({
    allocation,
    status,
  }: {
    allocation: EmissionAllocationsQuery_emissionAllocations;
    status:
      | EmissionAllocationStatus.REJECTED
      | EmissionAllocationStatus.REQUEST_DISMISSED;
  }) => void;
}

export const PendingAllocation = ({
  allocation,
  dataTestId,
  hasEditPermission,
  isDisabled,
  isMissingEmissions,
  onAccept,
  onAddEmissions,
  onReject,
}: IProps) => {
  const allocationStatus = getAllocationStatus(
    allocation.status,
    isMissingEmissions
  );

  const shouldDisplayControls = hasEditPermission && !isMissingEmissions;
  const shouldDisableControls = isDisabled || isMissingEmissions;

  switch (allocation.status) {
    case EmissionAllocationStatus.AWAITING_APPROVAL:
      return (
        <AwaitingApprovalAllocation
          allocation={allocation}
          allocationStatus={allocationStatus}
          shouldDisplayControls={shouldDisplayControls}
          shouldDisableControls={shouldDisableControls}
          dataTestId={dataTestId}
          onAccept={onAccept}
          onAddEmissions={onAddEmissions}
          onReject={onReject}
          isMissingEmissions={isMissingEmissions}
        />
      );
    default:
      return (
        <RequestedAllocation
          allocation={allocation}
          allocationStatus={allocationStatus}
          shouldDisplayControls={shouldDisplayControls}
          shouldDisableControls={shouldDisableControls}
          dataTestId={dataTestId}
          onAccept={onAccept}
          onAddEmissions={onAddEmissions}
          onReject={onReject}
          isMissingEmissions={isMissingEmissions}
        />
      );
  }
};

PendingAllocation.defaultProps = {
  dataTestId: undefined,
};
