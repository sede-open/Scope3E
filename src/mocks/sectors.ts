import { SECTORS_QUERY } from 'queries/sectors';

export const getSectorId = (systemName: string) => `${systemName}-id`;

const DEFAULT_SECTORS = [
  'Coating, engraving and allied services',
  'Telephone communication',
  'Arrangement of passenger transportation',
  'Petroleum and petroleum products, nec',
];

export const sectorsMock = (
  pageSize: number = 50,
  pageNumber: number = 1,
  searchTerm: string | null = null,
  results: string[] = DEFAULT_SECTORS
) => ({
  request: {
    query: SECTORS_QUERY,
    variables: {
      pageSize,
      pageNumber,
      searchTerm,
    },
  },
  result: {
    data: {
      sectors: results.map((name: string) => ({
        id: getSectorId(name),
        name,
      })),
    },
  },
});
