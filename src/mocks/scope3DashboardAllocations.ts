import {
  CategoriesSystemName,
  CompanySectorType,
  EmissionAllocationStatus,
} from 'types/globalTypes';

import { USER_COMPANY_ID } from './constants';

export const userCompany = {
  id: USER_COMPANY_ID,
};
export const companyId = 'companyId';
export const mockYear = 2020;

export const scope3DashboardEmissionsAllocationMockSingle = [
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
    emissions: 8937,
    status: EmissionAllocationStatus.APPROVED,
    note: 'Hello there',
    customer: {
      id: 'some-id',
      companySectors: [
        { sectorType: CompanySectorType.PRIMARY, sector: { name: 'hardware' } },
      ],
      name: 'The Waterfall Hub Corp',
    },
    supplier: {
      id: 'some-id',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 1' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
      systemName: CategoriesSystemName.CAPITAL_GOODS,
      order: 13,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
];

export const scope3DashboardEmissionsAllocationMockMultiple = [
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
    emissions: 8937,
    status: EmissionAllocationStatus.APPROVED,
    note: 'Hello there',
    customer: {
      id: 'some-id-1',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Waterfall Hub Corp',
    },
    supplier: {
      id: 'some-id-1',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 2' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
      systemName: CategoriesSystemName.BUSINESS_TRAVEL,
      order: 13,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CDE35',
    emissions: 1000,
    status: EmissionAllocationStatus.APPROVED,
    note: null,
    customer: {
      id: 'some-id-2',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Waterfall Hub Corp',
    },
    supplier: {
      id: 'some-id-2',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 3' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F84D2',
      systemName: CategoriesSystemName.END_OF_LIFE_TREATMENT_OF_SOLD_PRODUCTS,
      order: 1,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB4',
    emissions: 2304,
    status: EmissionAllocationStatus.APPROVED,
    note: null,
    customer: {
      id: 'some-id-3',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Hello Hub Corp',
    },
    supplier: {
      id: 'some-id-3',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 4' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C49',
      systemName: CategoriesSystemName.USE_OF_SOLD_PRODUCTS,
      order: 2,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCP1',
    emissions: 4959,
    status: EmissionAllocationStatus.APPROVED,
    note: 'Hello testing',
    customer: {
      id: 'some-id-4',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'software' },
        },
      ],
      name: 'The Dog Hub Corp',
    },
    supplier: {
      id: 'some-id-4',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 5' },
        },
      ],
      name: 'DHP',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C03',
      systemName: CategoriesSystemName.FRANCHISES,
      order: 8,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
];

export const scope3DashboardEmissionsAllocationMockMultipleSimilarSector = [
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
    emissions: 8937,
    status: EmissionAllocationStatus.APPROVED,
    note: 'Hello there',
    customer: {
      id: 'some-id-1',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Waterfall Hub Corp',
    },
    supplier: {
      id: 'some-id-1',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 2' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
      systemName: CategoriesSystemName.BUSINESS_TRAVEL,
      order: 13,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CDE35',
    emissions: 1000,
    status: EmissionAllocationStatus.APPROVED,
    note: null,
    customer: {
      id: 'some-id-2',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Waterfall Hub Corp',
    },
    supplier: {
      id: 'some-id-2',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 2' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F84D2',
      systemName: CategoriesSystemName.END_OF_LIFE_TREATMENT_OF_SOLD_PRODUCTS,
      order: 1,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB4',
    emissions: 2304,
    status: EmissionAllocationStatus.APPROVED,
    note: null,
    customer: {
      id: 'some-id-3',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'hardware' },
        },
      ],
      name: 'The Hello Hub Corp',
    },
    supplier: {
      id: 'some-id-3',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 3' },
        },
      ],
      name: 'DHL',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C49',
      systemName: CategoriesSystemName.USE_OF_SOLD_PRODUCTS,
      order: 2,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
  {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCP1',
    emissions: 4959,
    status: EmissionAllocationStatus.APPROVED,
    note: 'Hello testing',
    customer: {
      id: 'some-id-4',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'software' },
        },
      ],
      name: 'The Dog Hub Corp',
    },
    supplier: {
      id: 'some-id-4',
      companySectors: [
        {
          sectorType: CompanySectorType.PRIMARY,
          sector: { name: 'Sector Name Test 3' },
        },
      ],
      name: 'DHP',
    },
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C03',
      systemName: CategoriesSystemName.FRANCHISES,
      order: 8,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
  },
];
