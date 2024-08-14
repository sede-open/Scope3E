import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import { CompanySectorType, EmissionAllocationStatus } from 'types/globalTypes';
import { compareSuppliersAllocations } from './utils';

const companySectors = [
  {
    sector: { name: 'business-section' },
    sectorType: CompanySectorType.PRIMARY,
  },
];

describe('compareSuppliersAllocations', () => {
  it('should sort the emission allocations by customer name', () => {
    const emissionAllocations = [
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-4',
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
        customer: {
          id: 'some-id',
          companySectors,
          name: 'customer-name-5',
        },
        supplier: {
          id: 'some-id',
          companySectors,
          name: 'supplier-name-4',
        },
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-5',
        status: EmissionAllocationStatus.REJECTED,
        customer: {
          id: 'some-id',
          name: 'customer-name-1',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-5',
          companySectors,
        },
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-1',
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
        customer: {
          id: 'some-id',
          name: 'customer-name-4',
          companySectors,
        },
        supplier: {
          id: 'some-id',
          name: 'supplier-name-1',
          companySectors,
        },
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-2',
        status: EmissionAllocationStatus.APPROVED,
        customer: {
          id: 'some-id',
          companySectors: [
            {
              sectorType: CompanySectorType.PRIMARY,
              sector: {
                name: 'business-section',
              },
            },
          ],
          name: 'customer-name-3',
        },
        supplier: {
          id: 'some-id',
          companySectors: [
            {
              sectorType: CompanySectorType.PRIMARY,
              sector: {
                name: 'business-section',
              },
            },
          ],
          name: 'supplier-name-2',
        },
      },
      {
        ...emissionAllocationsMocks.approvedEmissionAllocation,
        id: 'some-id-3',
        status: EmissionAllocationStatus.REQUESTED,
        customer: {
          id: 'some-id',
          companySectors: [
            {
              sectorType: CompanySectorType.PRIMARY,
              sector: {
                name: 'business-section',
              },
            },
          ],
          name: 'customer-name-2',
        },
        supplier: {
          id: 'some-id',
          companySectors: [
            {
              sectorType: CompanySectorType.PRIMARY,
              sector: {
                name: 'business-section',
              },
            },
          ],
          name: 'supplier-name-3',
        },
      },
    ];

    const expected = [
      emissionAllocations[2],
      emissionAllocations[3],
      emissionAllocations[4],
      emissionAllocations[0],
      emissionAllocations[1],
    ];

    expect(
      emissionAllocations.slice().sort(compareSuppliersAllocations)
    ).toEqual(expected);
  });
});
