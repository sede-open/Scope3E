import useTranslation from 'next-translate/useTranslation';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import Button from 'components/Button';
import { FormType, ModalState } from '../types';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

export const AcceptedAllocationActions = ({
  setModalState,
  allocation,
}: {
  setModalState: (state: ModalState) => void;
  allocation: EmissionAllocationsQuery_emissionAllocations;
}) => {
  const { t } = useTranslation();

  const onEditEmissionAllocation = async () => {
    setModalState({
      isOpen: true,
      formType: FormType.ACCEPT_ALLOCATION,
      acceptAllocationFormProps: {
        allocation,
        isEditing: true,
      },
    });
  };

  return (
    <StyledComponents.RowActionsContainer>
      <Button
        color="text-button"
        data-testid={selectors.editEmissionAllocationButton}
        onClick={onEditEmissionAllocation}
      >
        {t('valueChain:table-action-edit')}
      </Button>
    </StyledComponents.RowActionsContainer>
  );
};
