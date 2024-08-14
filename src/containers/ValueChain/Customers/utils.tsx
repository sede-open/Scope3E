import NextLink from 'next/link';
import { EmissionAllocationStatus } from 'types/globalTypes';
import { Row, SortableHeader } from 'components/SortableTable/types';
import { Status } from 'components/Status';
import { formatOneDecimalPlace } from 'utils/number';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';

import { Link } from 'components/Link';
import { GetTableRows } from '../types';
import { TableColumnNames } from './types';
import { sortByStatusFunction } from '../utils';

export const getCustomerTableRows = ({
  emissionAllocations,
  RowActions,
  hasEditPermission,
  t,
  isCompanyOverviewEnabled,
}: GetTableRows): Row<TableColumnNames>[] =>
  emissionAllocations.map((allocation) => {
    const { allocationMethod, emissions, status } = allocation;

    const { name: customerName, id } = allocation.customer || {};

    const conditionalRowActions =
      hasEditPermission && status !== EmissionAllocationStatus.REQUESTED
        ? [
            {
              columnName: TableColumnNames.ACTIONS,
              cell: <RowActions allocation={allocation} />,
            },
          ]
        : [];

    const companyNameCell = isCompanyOverviewEnabled ? (
      <NextLink href={`/company/${id}`}>
        <Link href={`/company/${id}`}>{customerName}</Link>
      </NextLink>
    ) : (
      customerName
    );

    return {
      rowName: allocation.id,
      columns: [
        {
          columnName: TableColumnNames.CUSTOMER_NAME,
          cell: companyNameCell,
        },
        {
          columnName: TableColumnNames.EMISSIONS,
          cell: `${formatOneDecimalPlace(emissions || 0)} ${t(
            'common:unit-mt-co2'
          )}`,
          sortValue: emissions,
        },
        {
          columnName: TableColumnNames.ALLOCATION_METHOD,
          cell: allocationMethod
            ? t(`valueChain:allocation-method-${allocationMethod}`)
            : t('valueChain:null-cell'),
        },
        {
          columnName: TableColumnNames.STATUS,
          cell: (
            <Status
              status={status}
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

export const sortAllocationsByCustomerName = (
  allocation1: EmissionAllocationsQuery_emissionAllocations,
  allocation2: EmissionAllocationsQuery_emissionAllocations
) => {
  if (allocation1.customer.name < allocation2.customer.name) {
    return -1;
  }

  if (allocation1.customer.name > allocation2.customer.name) {
    return 1;
  }

  return 0;
};

export const getCustomerTableHeaders = (
  hasEditPermission: boolean
): SortableHeader<TableColumnNames>[] => [
  {
    columnName: TableColumnNames.CUSTOMER_NAME,
    cell: 'valueChain:table-header-customer-name',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.EMISSIONS,
    cell: 'valueChain:table-header-emissions',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.ALLOCATION_METHOD,
    cell: 'valueChain:table-header-allocation-method',
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
