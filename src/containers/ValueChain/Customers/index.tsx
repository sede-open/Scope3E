import Button from 'components/Button';
import CogSpinner from 'components/CogSpinner';
import { OptionType } from 'components/SingleSelect';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import {
  EmissionAllocationDirection,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { getYearSelectOptions } from 'utils/emissions';
import { useEmissionAllocationsQuery } from '../queries';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';
import { FormType, ModalState } from '../types';
import { YearSelect } from '../YearSelect';
import { CustomersTable } from './CustomersTable';
import { EmptyView } from './EmptyView';

interface IProps {
  setModalState: (state: ModalState) => void;
  yearOptions: number[];
}

export const Customers = ({ setModalState, yearOptions }: IProps) => {
  const { t } = useTranslation();
  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const yearSelectOptions = getYearSelectOptions(yearOptions);
  const [selectedYear, setSelectedYear] = useState<OptionType>(
    yearSelectOptions[0]
  );

  const onAllocateEmissions = () => {
    setModalState({
      isOpen: true,
      formType: FormType.ALLOCATE_EMISSIONS,
      allocateEmissionsFormProps: {
        isEditing: false,
        selectedYear: selectedYear.value as number,
      },
    });
  };

  const {
    data: emissionAllocationsData,
    loading: isEmissionAllocationsDataLoading,
  } = useEmissionAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
    statuses: [
      EmissionAllocationStatus.REJECTED,
      EmissionAllocationStatus.APPROVED,
      EmissionAllocationStatus.AWAITING_APPROVAL,
    ],
    year: selectedYear.value as number,
  });

  const emissionAllocations =
    emissionAllocationsData?.emissionAllocations || [];

  const shouldDisplayAllocationsTable =
    !isEmissionAllocationsDataLoading && emissionAllocations.length > 0;
  const shouldDisplayEmptyView =
    !isEmissionAllocationsDataLoading && emissionAllocations.length === 0;

  return (
    <>
      <StyledComponents.ControlsContainer>
        {canEditSupplyDashboard && (
          <Button
            color="primary"
            data-testid={selectors.allocateEmissionsButton}
            onClick={onAllocateEmissions}
            type="button"
          >
            {t('valueChain:customers-allocate-button')}
          </Button>
        )}

        <YearSelect
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          yearOptions={yearSelectOptions}
        />
      </StyledComponents.ControlsContainer>

      {isEmissionAllocationsDataLoading && <CogSpinner />}

      {shouldDisplayAllocationsTable && (
        <CustomersTable
          emissionAllocations={emissionAllocations}
          setModalState={setModalState}
          year={selectedYear.value as number}
        />
      )}

      {shouldDisplayEmptyView && (
        <EmptyView year={selectedYear.value as number} />
      )}
    </>
  );
};
