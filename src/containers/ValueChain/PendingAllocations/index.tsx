import useTranslation from 'next-translate/useTranslation';

import { EmissionAllocationStatus } from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import CogSpinner from 'components/CogSpinner';
import { PendingAllocation } from 'components/PendingAllocation';
import { ModalContentType } from 'containers/types';

import {
  useCorporateEmissionsQuery,
  usePendingAllocationsQuery,
} from '../queries';
import { EmptyView } from './EmptyView';
import { comparePendingAllocations, getEmissionForYear } from './utils';
import { ModalState, FormType } from '../types';
import * as selectors from '../selectors';
import { useUpdateEmissionAllocationMutation } from '../mutations';

interface IProps {
  setModalState: (state: ModalState) => void;
}

export const PendingAllocations = ({ setModalState }: IProps) => {
  const { openModal } = useModal();

  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const { t } = useTranslation();

  const {
    data: emissionAllocationsData,
    loading: isEmissionAllocationsDataLoading,
  } = usePendingAllocationsQuery({
    companyId,
    year: null,
  });

  const {
    data: corporateEmissionsData,
    loading: isCorporateEmissionsDataLoading,
  } = useCorporateEmissionsQuery({ companyId });

  const isLoading =
    isEmissionAllocationsDataLoading || isCorporateEmissionsDataLoading;
  const corporateEmissions = corporateEmissionsData?.corporateEmissions || [];
  const emissionAllocations = [
    ...(emissionAllocationsData?.awaitingApproval ?? []),
    ...(emissionAllocationsData?.requested ?? []),
  ];
  const shouldDisplayPendingAllocations =
    !isLoading && emissionAllocations.length > 0;
  const shouldDisplayEmptyView = !isLoading && emissionAllocations.length === 0;

  const onNewBaselineSuccess = () => {
    displaySuccessMessage({
      title: t('common:save-toast-success'),
    });
  };

  const onAddEmissions = (year: number) => {
    openModal({
      modalType: ModalType.CORPORATE_EMISSION_FORM,
      contentProps: {
        formType: ModalContentType.NEW_ACTUAL,
        selectedEmissionYear: year,
        onNewBaselineSuccess,
      },
    });
  };

  const onAcceptAllocation = (
    allocation: EmissionAllocationsQuery_emissionAllocations
  ) => {
    setModalState({
      isOpen: true,
      formType: FormType.ACCEPT_ALLOCATION,
      acceptAllocationFormProps: {
        allocation,
        isEditing: false,
      },
    });
  };

  const onAcceptAllocationRequest = (
    allocation: EmissionAllocationsQuery_emissionAllocations
  ) => {
    setModalState({
      isOpen: true,
      formType: FormType.ALLOCATE_EMISSIONS,
      allocateEmissionsFormProps: {
        allocation,
        isEditing: false,
        selectedYear: allocation.year,
      },
    });
  };

  const rejectMutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:form-toast-subtitle-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('valueChain:pending-allocations-toast-reject-title-success'),
        subtitle: t(
          'valueChain:pending-allocations-toast-reject-subtitle-success'
        ),
      });
    },
  };

  const dismissMutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:pending-request-toast-dismiss-subtitle-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('valueChain:pending-request-toast-dismiss-title-success'),
      });
    },
  };

  const [
    rejectEmissionAllocation,
    { loading: isRejectEmissionAllocationLoading },
  ] = useUpdateEmissionAllocationMutation(rejectMutationOptions);

  const [
    dismissAllocationRequest,
    { loading: isDismissAllocationRequestLoading },
  ] = useUpdateEmissionAllocationMutation(dismissMutationOptions);

  const onRejectAllocation = async ({
    allocation,
    status,
  }: {
    allocation: EmissionAllocationsQuery_emissionAllocations;
    status:
      | EmissionAllocationStatus.REJECTED
      | EmissionAllocationStatus.REQUEST_DISMISSED;
  }) => {
    if (status === EmissionAllocationStatus.REQUEST_DISMISSED) {
      await dismissAllocationRequest({
        variables: {
          input: {
            id: allocation.id,
            status,
          },
        },
      });
    } else {
      await rejectEmissionAllocation({
        variables: {
          input: {
            id: allocation.id,
            status,
          },
        },
      });
    }
  };

  const sortedEmissionAllocations = emissionAllocations
    .slice()
    .sort(comparePendingAllocations);

  const areActionsDisabled =
    isDismissAllocationRequestLoading || isRejectEmissionAllocationLoading;

  return (
    <>
      {isLoading && <CogSpinner />}

      {shouldDisplayPendingAllocations &&
        sortedEmissionAllocations.map((allocation) => {
          const emissionForYear = getEmissionForYear({
            year: allocation.year,
            emissions: corporateEmissions,
          });

          const onAcceptAction =
            allocation.status === EmissionAllocationStatus.AWAITING_APPROVAL
              ? onAcceptAllocation
              : onAcceptAllocationRequest;

          return (
            <PendingAllocation
              allocation={allocation}
              dataTestId={selectors.pendingAllocation}
              isDisabled={areActionsDisabled}
              isMissingEmissions={!emissionForYear}
              key={allocation.id}
              onAccept={onAcceptAction}
              onAddEmissions={onAddEmissions}
              onReject={onRejectAllocation}
              hasEditPermission={canEditSupplyDashboard}
            />
          );
        })}

      {shouldDisplayEmptyView && <EmptyView />}
    </>
  );
};
