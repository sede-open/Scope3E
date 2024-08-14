import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import { CompanySectorType, EmissionAllocationStatus } from 'types/globalTypes';
import { comparePendingAllocations, getEmissionForYear } from './utils';

const companySectors = [
  {
    sector: { name: 'business-section' },
    sectorType: CompanySectorType.PRIMARY,
  },
];

describe('comparePendingAllocations', () => {
  it('should sort the emission allocations by createdAt date', () => {
    const emissionAllocations = [
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-4',
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
        customer: {
          id: 'some-id',
          name: 'customer-name-4',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-4',
          companySectors,
        },
        year: 1999,
        createdAt: '2021-02-26 09:41:06.104',
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-5',
        status: EmissionAllocationStatus.REJECTED,
        customer: {
          id: 'some-id',
          name: 'customer-name-5',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-5',
          companySectors,
        },
        year: 2000,
        createdAt: '2021-02-26 09:41:06.105',
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-1',
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
        customer: {
          id: 'some-id',
          name: 'customer-name-1',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-1',
          companySectors,
        },
        year: 2001,
        createdAt: '2021-02-26 09:41:06.100',
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-2',
        status: EmissionAllocationStatus.APPROVED,
        customer: {
          id: 'some-id',
          name: 'customer-name-2',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-2',
          companySectors,
        },
        year: 2002,
        createdAt: '2021-02-26 09:41:06.101',
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-3',
        status: EmissionAllocationStatus.REQUESTED,
        customer: {
          id: 'some-id',
          name: 'customer-name-3',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-3',
          companySectors,
        },
        year: 2003,
        createdAt: '2021-02-26 09:41:06.103',
      },
    ];

    const expected = [
      emissionAllocations[1],
      emissionAllocations[0],
      emissionAllocations[4],
      emissionAllocations[3],
      emissionAllocations[2],
    ];

    expect(emissionAllocations.slice().sort(comparePendingAllocations)).toEqual(
      expected
    );
  });
});

const getEmission = (
  year: number
): CorporateEmissionsQuery_corporateEmissions => ({
  id: `some-id-${year}`,
  year,
  scope1: 123234,
  scope2: 3423,
  scope3: null,
  offset: null,
});

describe('getEmissionForYear', () => {
  describe('when there are no emissions for a given year', () => {
    const emissions = [
      getEmission(1999),
      getEmission(2000),
      getEmission(2002),
      getEmission(2003),
    ];

    [2001, 2004, 2005].forEach((year) => {
      it('should return undefined', () => {
        expect(getEmissionForYear({ year, emissions })).toBe(undefined);
      });
    });
  });

  describe('when there are emissions for a given year', () => {
    const emissions = [
      getEmission(1999),
      getEmission(2000),
      getEmission(2000),
      getEmission(2002),
      getEmission(2003),
    ];

    [1999, 2000, 2002, 2003].forEach((year) => {
      it('should return the matching emission', () => {
        expect(getEmissionForYear({ year, emissions })).toEqual(
          getEmission(year)
        );
      });
    });
  });
});
