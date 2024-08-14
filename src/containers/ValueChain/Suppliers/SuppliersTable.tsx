import useTranslation from 'next-translate/useTranslation';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CompanyRelationshipType } from 'types/globalTypes';

import { useFlags } from 'launchdarkly-react-client-sdk';
import { ModalState } from '../types';
import { TotalRow } from '../TotalRow';
import {
  compareSuppliersAllocations,
  getSuppliersTableRows,
  getSuppliersTableHeaders,
  getTotalAllocatedEmissions,
} from './utils';
import { getRowActions } from './getRowActions';
import { AllocationsTable } from '../AllocationsTable';
import { TableColumnNames } from './types';

interface IProps {
  emissionAllocations: EmissionAllocationsQuery_emissionAllocations[];
  setModalState: (state: ModalState) => void;
}

export const SuppliersTable = ({
  emissionAllocations,
  setModalState,
}: IProps) => {
  const { t } = useTranslation();
  const { canEditSupplyDashboard } = useAuthenticatedUser();
  const { isCompanyOverviewEnabled } = useFlags();

  const RowActions = getRowActions({ setModalState });

  const sortedFilteredEmissionAllocations = emissionAllocations
    .slice()
    .sort(compareSuppliersAllocations);

  const tableHeaders = getSuppliersTableHeaders(canEditSupplyDashboard);
  const totalEmissions = getTotalAllocatedEmissions(emissionAllocations);

  const tableRows = getSuppliersTableRows({
    emissionAllocations: sortedFilteredEmissionAllocations,
    RowActions,
    hasEditPermission: canEditSupplyDashboard,
    t,
    isCompanyOverviewEnabled,
  });

  return (
    <AllocationsTable
      headers={tableHeaders}
      rows={tableRows}
      defaultSortColumn={TableColumnNames.STATUS}
      summaryRow={
        <TotalRow
          colCount={tableHeaders.length}
          allocatingCompaniesCount={sortedFilteredEmissionAllocations.length}
          allocatingCompanyType={CompanyRelationshipType.SUPPLIER}
          totalAllocated={totalEmissions}
        />
      }
    />
  );
};
