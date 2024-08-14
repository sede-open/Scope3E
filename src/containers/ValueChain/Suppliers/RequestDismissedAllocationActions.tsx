import useTranslation from 'next-translate/useTranslation';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';

import { Button } from 'components/Button';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';

import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';
import { useDeleteEmissionAllocationMutation } from '../mutations';
import { FormType, ModalState } from '../types';

export const RequestDismissedAllocationActions = ({
  allocation,
  setModalState,
}: {
  allocation: EmissionAllocationsQuery_emissionAllocations;
  setModalState: (state: ModalState) => void;
}) => {
  const { t } = useTranslation();

  const deleteMutationOptions = {
    onError: () => {
      displayErrorMessage({
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:delete-request-form-toast-subtitle-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('valueChain:delete-request-form-toast-title-success'),
      });
    },
  };

  const [
    deleteEmissionAllocation,
    { loading: isDeleteEmissionAllocationLoading },
  ] = useDeleteEmissionAllocationMutation(deleteMutationOptions);

  const onDeleteEmissionAllocation = async () => {
    await deleteEmissionAllocation({
      variables: {
        input: {
          id: allocation.id,
        },
      },
    });
  };

  const onRerequestAllocation = async () => {
    setModalState({
      isOpen: true,
      formType: FormType.REQUEST_ALLOCATION,
      requestAllocationFormProps: {
        allocation,
        isEditing: true,
        selectedYear: allocation.year,
      },
    });
  };

  return (
    <StyledComponents.RowActionsContainer>
      <Button
        color="text-button"
        data-testid={selectors.rerequestEmissionAllocationButton}
        onClick={onRerequestAllocation}
        disabled={isDeleteEmissionAllocationLoading}
      >
        {t('valueChain:table-action-resend')}
      </Button>
      <StyledComponents.RowActionsSeparator>
        /
      </StyledComponents.RowActionsSeparator>
      <Button
        color="text-button"
        data-testid={selectors.deleteEmissionAllocationButton}
        onClick={onDeleteEmissionAllocation}
        disabled={isDeleteEmissionAllocationLoading}
      >
        {t('valueChain:table-action-delete')}
      </Button>
    </StyledComponents.RowActionsContainer>
  );
};
