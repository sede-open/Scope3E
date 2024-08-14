import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  EmissionAllocationDirection,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import CogSpinner from 'components/CogSpinner';
import Button from 'components/Button';

import { OptionType } from 'components/SingleSelect';
import { getYearSelectOptions, getEmissionYears } from 'utils/emissions';
import { useEmissionAllocationsQuery } from '../queries';
import { YearSelect } from '../YearSelect';
import * as StyledComponents from '../styledComponents';
import { FormType, ModalState } from '../types';
import { EmptyView } from './EmptyView';
import { SuppliersTable } from './SuppliersTable';
import * as selectors from '../selectors';

export interface IProps {
  setModalState: (state: ModalState) => void;
  yearOptionsWithEmissionsData: number[];
}

export const Suppliers = ({
  setModalState,
  yearOptionsWithEmissionsData,
}: IProps) => {
  const { t } = useTranslation();
  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const yearSelectOptions = getYearSelectOptions(getEmissionYears());

  const defaultYearOption: OptionType = {
    value: yearOptionsWithEmissionsData[0] ?? yearSelectOptions[0].value,
    label: yearOptionsWithEmissionsData[0] ?? yearSelectOptions[0].label,
  };

  const [selectedYear, setSelectedYear] = useState<OptionType>(
    defaultYearOption
  );

  const {
    data: emissionAllocationData,
    loading: isEmissionAllocationDataLoading,
  } = useEmissionAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
    statuses: [
      EmissionAllocationStatus.APPROVED,
      EmissionAllocationStatus.REQUESTED,
      EmissionAllocationStatus.REQUEST_DISMISSED,
    ],
    year: selectedYear.value as number,
  });

  const onAllocateEmissions = () => {
    setModalState({
      isOpen: true,
      formType: FormType.REQUEST_ALLOCATION,
      requestAllocationFormProps: {
        isEditing: false,
        selectedYear: selectedYear.value as number,
      },
    });
  };

  const emissionAllocations = emissionAllocationData?.emissionAllocations || [];
  const shouldDisplayAllocationsTable =
    !isEmissionAllocationDataLoading && emissionAllocations.length > 0;
  const shouldDisplayEmptyView =
    !isEmissionAllocationDataLoading && emissionAllocations.length === 0;

  return (
    <>
      <StyledComponents.ControlsContainer>
        {canEditSupplyDashboard && (
          <Button
            color="primary"
            data-testid={selectors.requestEmissionsButton}
            onClick={onAllocateEmissions}
            type="button"
          >
            {t('valueChain:suppliers-request-button')}
          </Button>
        )}
        <YearSelect
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          yearOptions={yearSelectOptions}
        />
      </StyledComponents.ControlsContainer>

      {isEmissionAllocationDataLoading && <CogSpinner />}

      {shouldDisplayAllocationsTable && (
        <SuppliersTable
          emissionAllocations={emissionAllocations}
          setModalState={setModalState}
        />
      )}

      {shouldDisplayEmptyView && (
        <EmptyView year={selectedYear.value as number} />
      )}
    </>
  );
};
