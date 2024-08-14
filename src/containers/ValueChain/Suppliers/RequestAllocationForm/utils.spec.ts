import {
  CompanyRelationshipType,
  CompanySectorType,
  CompanyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { getCompanyOptions } from './utils';

const getRelationship = (id: number) => ({
  id: String(id),
  inviteType: CompanyRelationshipType.CUSTOMER,
  status: InviteStatus.APPROVED,
  customer: {
    id: `customer-id-${id}`,
    name: `customer-name-${id}`,
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'Logistics' },
      },
    ],
    location: 'UK',
    status: CompanyStatus.ACTIVE,
  },
  supplier: {
    id: 'supplier-id',
    name: 'supplier-name',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'Hospitality' },
      },
    ],
    location: 'NL',
    status: CompanyStatus.ACTIVE,
  },
  note: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const getOption = (relationship: any) => ({
  label: relationship.supplier.name,
  value: relationship.supplier.id,
});

describe('getSupplierProps', () => {
  it('should return an array of suppliers company options, sorted by customer name', () => {
    const companyRelationships = [
      getRelationship(5),
      getRelationship(3),
      getRelationship(7),
      getRelationship(1),
      getRelationship(4),
      getRelationship(2),
      getRelationship(6),
    ];

    const expected = [
      getOption(getRelationship(1)),
      getOption(getRelationship(2)),
      getOption(getRelationship(3)),
      getOption(getRelationship(4)),
      getOption(getRelationship(5)),
      getOption(getRelationship(6)),
      getOption(getRelationship(7)),
    ];

    expect(getCompanyOptions(companyRelationships)).toEqual(expected);
  });
});
