import moment from 'moment';
import NextLink from 'next/link';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { EmissionAllocationStatus } from 'types/globalTypes';
import { Status } from 'components/Status';
import { Row, SortableHeader } from 'components/SortableTable/types';

import { formatOneDecimalPlace } from 'utils/number';
import { Link } from 'components/Link';
import { GetTableRows } from '../types';
import { TableColumnNames } from './types';
import { sortByStatusFunction } from '../utils';

export const getSuppliersTableRows = ({
  emissionAllocations,
  RowActions,
  hasEditPermission,
  t,
  isCompanyOverviewEnabled,
}: GetTableRows): Row<TableColumnNames>[] =>
  emissionAllocations.map((allocation) => {
    const { category, emissions, status, createdAt } = allocation;

    const { name: supplierName, id } = allocation.supplier || {};

    const conditionalRowActions = hasEditPermission
      ? [
          {
            columnName: TableColumnNames.ACTIONS,
            cell: <RowActions allocation={allocation} />,
          },
        ]
      : [];

    const statusSuffix =
      status === EmissionAllocationStatus.REQUESTED
        ? moment(createdAt).format('D MMM YYYY')
        : undefined;

    const emissionsDisplay =
      typeof emissions === 'number'
        ? `${formatOneDecimalPlace(emissions)} ${t('common:unit-mt-co2')}`
        : t('valueChain:null-cell');

    const companyNameCell = isCompanyOverviewEnabled ? (
      <NextLink href={`/company/${id}`}>
        <Link href={`/company/${id}`}>{supplierName}</Link>
      </NextLink>
    ) : (
      supplierName
    );

    return {
      rowName: allocation.id,
      columns: [
        {
          columnName: TableColumnNames.SUPPLIER_NAME,
          cell: companyNameCell ?? t('valueChain:null-cell'),
        },
        {
          columnName: TableColumnNames.EMISSIONS,
          cell: emissionsDisplay,
          sortValue: emissions,
        },
        {
          columnName: TableColumnNames.CATEGORY,
          cell: category?.name ?? t('valueChain:null-cell'),
          sortValue: category?.order,
        },
        {
          columnName: TableColumnNames.STATUS,
          cell: (
            <Status
              status={status}
              statusSuffix={statusSuffix}
              translationNamespace="valueChain"
              statusControls={null}
            />
          ),
          sortValue: status,
        },
        ...conditionalRowActions,
      ],
    };
  });

export const compareSuppliersAllocations = (
  allocation1: EmissionAllocationsQuery_emissionAllocations,
  allocation2: EmissionAllocationsQuery_emissionAllocations
) => {
  if (allocation1.supplier!.name < allocation2.supplier!.name) {
    return -1;
  }

  if (allocation1.supplier!.name > allocation2.supplier!.name) {
    return 1;
  }

  return 0;
};

export const getSuppliersTableHeaders = (
  hasEditPermission: boolean
): SortableHeader<TableColumnNames>[] => [
  {
    columnName: TableColumnNames.SUPPLIER_NAME,
    cell: 'valueChain:table-header-supplier-name',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.EMISSIONS,
    cell: 'valueChain:table-header-emissions',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.CATEGORY,
    cell: 'valueChain:table-header-category',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.STATUS,
    cell: 'valueChain:table-header-status',
    isSortable: true,
    sortFunction: sortByStatusFunction,
  },
  ...(hasEditPermission
    ? [
        {
          columnName: TableColumnNames.ACTIONS,
          cell: 'valueChain:table-header-actions',
        },
      ]
    : []),
];

export const getTotalAllocatedEmissions = (
  allocations: EmissionAllocationsQuery_emissionAllocations[]
) => allocations.reduce((acc, { emissions }) => acc + Number(emissions), 0);
