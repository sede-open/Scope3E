import { Row } from 'components/SortableTable/types';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import {
  CompanyRelationshipType,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { getEmissionYears } from 'utils/emissions';

export const getYearOptionsWithEmissionsData = (
  emissionsData: CorporateEmissionsQuery_corporateEmissions[]
) => {
  const emissionYearOptions = getEmissionYears();
  const yearsWithEmissionsData = emissionsData.map(({ year }) => year);

  return emissionYearOptions.filter((year) =>
    yearsWithEmissionsData.includes(year)
  );
};

export const getTotalAvailableEmissions = (
  emission: CorporateEmissionsQuery_corporateEmissions | undefined
) =>
  emission === undefined
    ? 0
    : (emission.scope1 || 0) +
      (emission.scope2 || 0) +
      (emission.scope3 || 0) -
      (emission.offset || 0);

export const getTotalAllocatedEmissions = (
  allocations: EmissionAllocationsQuery_emissionAllocations[]
) =>
  allocations.reduce(
    (acc, { emissions, status }) =>
      status !== EmissionAllocationStatus.REJECTED
        ? acc + Number(emissions)
        : acc,
    0
  );

const STATUS_ORDER = [
  EmissionAllocationStatus.AWAITING_APPROVAL,
  EmissionAllocationStatus.REQUESTED,
  EmissionAllocationStatus.REJECTED,
  EmissionAllocationStatus.REQUEST_DISMISSED,
  EmissionAllocationStatus.APPROVED,
];

export const sortByAllocationStatusAscending = (
  a?: string | number | null,
  b?: string | number | null
) => {
  const aValue = a as EmissionAllocationStatus;
  const bValue = b as EmissionAllocationStatus;

  if (STATUS_ORDER.indexOf(aValue) < STATUS_ORDER.indexOf(bValue)) {
    return -1;
  }

  if (STATUS_ORDER.indexOf(aValue) > STATUS_ORDER.indexOf(bValue)) {
    return 1;
  }

  return 0;
};

export const sortByAllocationStatusDescending = (
  a?: string | number | null,
  b?: string | number | null
) => {
  const aValue = a as EmissionAllocationStatus;
  const bValue = b as EmissionAllocationStatus;

  if (STATUS_ORDER.indexOf(aValue) < STATUS_ORDER.indexOf(bValue)) {
    return 1;
  }

  if (STATUS_ORDER.indexOf(aValue) > STATUS_ORDER.indexOf(bValue)) {
    return -1;
  }

  return 0;
};

export const sortByStatusFunction: <ColumnName extends string>(p: {
  unsortedRows: Row<ColumnName>[];
  sortByColumn: ColumnName;
  isSortedAscending: boolean;
}) => Row<ColumnName>[] = ({ unsortedRows, sortByColumn, isSortedAscending }) =>
  unsortedRows.sort((a, b) => {
    const aColumn = a.columns.find(
      (column) => column.columnName === sortByColumn
    );
    const bColumn = b.columns.find(
      (column) => column.columnName === sortByColumn
    );

    const aColumnValue = aColumn?.sortValue;
    const bColumnValue = bColumn?.sortValue;

    return isSortedAscending
      ? sortByAllocationStatusAscending(aColumnValue, bColumnValue)
      : sortByAllocationStatusDescending(aColumnValue, bColumnValue);
  });

export const getAllocatingCompanyTypeSuffix = (
  companyRelationshipType: CompanyRelationshipType,
  t: any
) => {
  switch (companyRelationshipType) {
    case CompanyRelationshipType.CUSTOMER:
      return t('valueChain:customer-allocating-company');
    case CompanyRelationshipType.SUPPLIER:
      return t('valueChain:supplier-allocating-company');
    default:
      return t('valueChain:default-allocating-company');
  }
};
