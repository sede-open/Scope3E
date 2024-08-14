import useTranslation from 'next-translate/useTranslation';

import { EmissionAllocationStatus } from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import Button from 'components/Button';
import { FormType, ModalState } from '../types';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

export const getRowActions = ({
  setModalState,
}: {
  setModalState: (state: ModalState) => void;
}) => ({
  allocation,
}: {
  allocation: EmissionAllocationsQuery_emissionAllocations;
}) => {
  const { t } = useTranslation();

  const onDeleteEmissionAllocation = async () => {
    setModalState({
      isOpen: true,
      formType: FormType.DELETE_ALLOCATION,
      deleteAllocationFormProps: {
        id: allocation.id,
      },
    });
  };

  const onEditEmissionAllocation = async () => {
    setModalState({
      isOpen: true,
      formType: FormType.ALLOCATE_EMISSIONS,
      allocateEmissionsFormProps: {
        allocation,
        isEditing: true,
        selectedYear: allocation.year,
      },
    });
  };

  const editString =
    allocation.status === EmissionAllocationStatus.REJECTED
      ? t('valueChain:table-action-resend')
      : t('valueChain:table-action-edit');

  return (
    <StyledComponents.RowActionsContainer>
      <Button
        color="text-button"
        data-testid={selectors.editEmissionAllocationButton}
        onClick={onEditEmissionAllocation}
      >
        {editString}
      </Button>
      <StyledComponents.RowActionsSeparator>
        /
      </StyledComponents.RowActionsSeparator>
      <Button
        color="text-button"
        data-testid={selectors.deleteEmissionAllocationButton}
        onClick={onDeleteEmissionAllocation}
      >
        {t('valueChain:table-action-delete')}
      </Button>
    </StyledComponents.RowActionsContainer>
  );
};
