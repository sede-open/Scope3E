import { CORPORATE_EMISSION_FORM_QUERY } from 'containers/Modals/CorporateEmissionForm/queries';
import {
  CorporateEmissionFormQuery_corporateEmissions,
  CorporateEmissionFormQuery_emissionAllocations,
} from 'types/CorporateEmissionFormQuery';
import {
  CompanySectorType,
  CorporateEmissionType,
  EmissionAllocationDirection,
  EmissionAllocationStatus,
  Scope2Type,
} from 'types/globalTypes';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';

import { USER_COMPANY_ID } from './constants';
import { getCorporateEmissionAccessMock } from './emissionAccess';

const { externalCompany, userCompany } = companyRelationshipsMocks;

export const getCorporateEmissionFormQueryMock = ({
  corporateEmissions = [],
  emissionAllocations = [],
  emissionAllocation = EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
}: {
  corporateEmissions?: CorporateEmissionFormQuery_corporateEmissions[];
  emissionAllocations?: CorporateEmissionFormQuery_emissionAllocations[];
  emissionAllocation?: EmissionAllocationDirection;
}) => ({
  request: {
    query: CORPORATE_EMISSION_FORM_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
      emissionAllocation,
      statuses: [EmissionAllocationStatus.APPROVED],
      year: null,
    },
  },
  result: {
    data: {
      corporateEmissions,
      emissionAllocations,
    },
  },
});

const corporateEmissionAccess = getCorporateEmissionAccessMock();

export const corporateEmission: CorporateEmissionFormQuery_corporateEmissions = {
  year: new Date().getFullYear() - 1,
  id: '1223344',
  scope1: 1111,
  scope2: 2222,
  scope3: 3333,
  scope2Type: Scope2Type.MARKET,
  offset: 4444,
  examplePercentage: 100,
  headCount: 10,
  type: CorporateEmissionType.BASELINE,
  verificationFile: null,
  carbonIntensities: [],
  corporateEmissionAccess,
};

export const corporateEmissionZeroNetTotal: CorporateEmissionFormQuery_corporateEmissions = {
  year: new Date().getFullYear() - 1,
  id: '4433221',
  scope1: 1000,
  scope2: 1000,
  scope3: 1000,
  scope2Type: Scope2Type.MARKET,
  offset: 3000,
  examplePercentage: 100,
  headCount: 10,
  type: CorporateEmissionType.BASELINE,
  verificationFile: null,
  carbonIntensities: [],
  corporateEmissionAccess,
};

export const emissionAllocation: CorporateEmissionFormQuery_emissionAllocations = {
  addedToCustomerScopeTotal: false,
  allocationMethod: null,
  id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
  emissions: 8937,
  status: EmissionAllocationStatus.APPROVED,
  note: 'Hello there',
  customer: {
    id: externalCompany.id,
    companySectors: [
      {
        sector: { name: 'Construction' },
        sectorType: CompanySectorType.PRIMARY,
      },
    ],
    name: externalCompany.name,
  },
  supplier: {
    id: userCompany.id,
    name: userCompany.name,
    companySectors: [
      {
        sector: { name: 'Carbon trading' },
        sectorType: CompanySectorType.PRIMARY,
      },
    ],
  },
  category: {
    id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
    name: 'Cat. 13 - Some category',
    order: 13,
  },
  createdAt: '2021-02-26 09:41:06.937',
  year: 2020,
};
