import { EmissionAllocationStatus } from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { ModalState } from '../types';
import { RequestedAllocationActions } from './RequestedAllocationActions';
import { RequestDismissedAllocationActions } from './RequestDismissedAllocationActions';
import { AcceptedAllocationActions } from './AcceptedAllocationActions';

export const getRowActions = ({
  setModalState,
}: {
  setModalState: (state: ModalState) => void;
}) => ({
  allocation,
}: {
  allocation: EmissionAllocationsQuery_emissionAllocations;
}) => {
  switch (allocation.status) {
    case EmissionAllocationStatus.REQUEST_DISMISSED:
      return (
        <RequestDismissedAllocationActions
          allocation={allocation}
          setModalState={setModalState}
        />
      );
    case EmissionAllocationStatus.REQUESTED:
      return <RequestedAllocationActions />;
    default:
      return (
        <AcceptedAllocationActions
          allocation={allocation}
          setModalState={setModalState}
        />
      );
  }
};
