import useTranslation from 'next-translate/useTranslation';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CompanyRelationshipType } from 'types/globalTypes';

import CogSpinner from 'components/CogSpinner';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ModalState } from '../types';
import { AllocationsTable } from '../AllocationsTable';
import { TotalRow } from '../TotalRow';
import {
  sortAllocationsByCustomerName,
  getCustomerTableRows,
  getCustomerTableHeaders,
} from './utils';
import {
  getTotalAllocatedEmissions,
  getTotalAvailableEmissions,
} from '../utils';
import { getRowActions } from './getRowActions';
import { useCorporateEmissionsQuery } from '../queries';
import { TableColumnNames } from './types';

interface IProps {
  emissionAllocations: EmissionAllocationsQuery_emissionAllocations[];
  setModalState: (state: ModalState) => void;
  year: number;
}

export const CustomersTable = ({
  emissionAllocations,
  setModalState,
  year,
}: IProps) => {
  const { t } = useTranslation();
  const {
    canEditSupplyDashboard,
    company: userCompany,
  } = useAuthenticatedUser();
  const { isCompanyOverviewEnabled } = useFlags();

  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const RowActions = getRowActions({ setModalState });

  const sortedFilteredEmissionAllocations = emissionAllocations
    .slice()
    .sort(sortAllocationsByCustomerName);

  const tableHeaders = getCustomerTableHeaders(canEditSupplyDashboard);
  const totalEmissions = getTotalAllocatedEmissions(
    sortedFilteredEmissionAllocations
  );

  const {
    data: corporateEmissionsData,
    loading: isCorporateEmissionsDataLoading,
  } = useCorporateEmissionsQuery({ companyId });

  const corporateEmissionsForYear = corporateEmissionsData?.corporateEmissions.find(
    ({ year: emissionsYear }) => emissionsYear === year
  );

  const availableCorporateEmissionsForYear = getTotalAvailableEmissions(
    corporateEmissionsForYear
  );

  const tableRows = [
    ...getCustomerTableRows({
      emissionAllocations: sortedFilteredEmissionAllocations,
      RowActions,
      hasEditPermission: canEditSupplyDashboard,
      t,
      isCompanyOverviewEnabled,
    }),
  ];

  return isCorporateEmissionsDataLoading ? (
    <CogSpinner />
  ) : (
    <AllocationsTable
      headers={tableHeaders}
      rows={tableRows}
      defaultSortColumn={TableColumnNames.STATUS}
      summaryRow={
        <TotalRow
          colCount={tableHeaders.length}
          totalAllocated={totalEmissions}
          totalAvailable={availableCorporateEmissionsForYear}
          allocatingCompaniesCount={sortedFilteredEmissionAllocations.length}
          allocatingCompanyType={CompanyRelationshipType.CUSTOMER}
        />
      }
    />
  );
};
