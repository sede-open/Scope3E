import { INVITE_AND_CONNECT_MUTATION } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm/mutations';
import {
  CREATE_COMPANY_RELATIONSHIP_MUTATION,
  UPDATE_COMPANY_RELATIONSHIP_MUTATION,
} from 'containers/AccountSettings/CompanyRelationships/mutations';
import { UPDATE_COMPANY_RELATIONSHIP_RECOMMENDATION_STATUS_MUTATION } from 'containers/QuickConnect/mutations';
import { GraphQLError } from 'graphql';
import {
  ALL_COMPANY_RELATIONSHIPS_QUERY,
  COMPANY_RELATIONSHIPS_QUERY,
} from 'queries/companyRelationships';
import {
  AllCompanyRelationshipsQuery_customer,
  AllCompanyRelationshipsQuery_supplier,
} from 'types/AllCompanyRelationshipsQuery';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipWithSharedDataQuery_companyRelationships } from 'types/CompanyRelationshipWithSharedDataQuery';
import { CreateCompanyRelationshipMutation } from 'types/CreateCompanyRelationshipMutation';
import {
  AmbitionPrivacyStatus,
  CompanyRelationshipRecommendationStatus,
  CompanyRelationshipType,
  CompanySectorType,
  CompanyStatus,
  CreateCompanyRelationshipInput,
  InviteAndConnectToCompanyInput,
  InviteStatus,
  UpdateCompanyRelationshipInput,
} from 'types/globalTypes';
import { InviteAndConnectMutation_inviteAndConnectToCompany as InviteAndConnectResult } from 'types/InviteAndConnectMutation';
import { NetworkPendingInvitesQuery_networkSummary_pendingInvitations } from 'types/NetworkPendingInvitesQuery';
import { USER_COMPANY_ID } from './constants';

export const userCompany = {
  id: USER_COMPANY_ID,
  name: 'User Company',
  companySectors: [
    {
      sectorType: CompanySectorType.PRIMARY,
      sector: { name: 'Carbon trading' },
    },
  ],
  location: 'UK',
  status: CompanyStatus.ACTIVE,
};
export const externalCompany = {
  id: 'customer-company-id-1',
  name: 'Customer name 1',
  companySectors: [
    {
      sectorType: CompanySectorType.PRIMARY,
      sector: { name: 'Construction' },
    },
  ],
  location: 'RU',
  status: CompanyStatus.ACTIVE,
};

export const existingRelationship = {
  id: 'some-relationship-id',
  inviteType: CompanyRelationshipType.CUSTOMER,
  status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
  customer: externalCompany,
  supplier: userCompany,
  note: 'Some note value',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const getEmptyCompanyRelationshipsMock = (
  relationshipType: CompanyRelationshipType
) => ({
  request: {
    query: COMPANY_RELATIONSHIPS_QUERY,
    variables: {
      companyId: userCompany.id,
      relationshipType,
    },
  },
  result: {
    data: {
      companyRelationships: [],
    },
  },
});

export const getCompanyRelationshipsMock = (
  relationshipType: CompanyRelationshipType,
  relationships: Partial<CompanyRelationshipsQuery_companyRelationships>[]
) => ({
  request: {
    query: COMPANY_RELATIONSHIPS_QUERY,
    variables: {
      companyId: userCompany.id,
      relationshipType,
    },
  },
  result: {
    data: {
      companyRelationships: relationships,
    },
  },
});

export const updateCompanyRelationshipSupplierMock = {
  request: {
    query: UPDATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input: {
        id: existingRelationship.id,
        note: 'New note value',
        status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
      },
    },
  },
  result: {
    data: {
      companyRelationship: {
        id: existingRelationship.id,
      },
    },
  },
};

export const updateCompanyRelationshipSupplierMockError = {
  request: {
    query: UPDATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input: {
        id: existingRelationship.id,
        note: existingRelationship.note,
        status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
      },
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
};

export const createCompanyRelationshipMock = (
  variableOverrides: Partial<CreateCompanyRelationshipInput> = {},
  resultOverrides: Partial<CreateCompanyRelationshipMutation> = {}
) => ({
  request: {
    query: CREATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input: {
        inviteType: CompanyRelationshipType.SUPPLIER,
        note: 'New note value',
        supplierId: 'some-id-01',
        customerId: userCompany.id,
        ...variableOverrides,
      },
    },
  },
  result: {
    data: {
      companyRelationship: {
        id: 'some-id3',
        ...resultOverrides,
      },
    },
  },
});

export const createCompanyRelationshipMockError = (
  variableOverrides: Partial<CreateCompanyRelationshipInput> = {},
  errorMessage?: string
) => ({
  request: {
    query: CREATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input: {
        inviteType: CompanyRelationshipType.SUPPLIER,
        note: 'New note value',
        supplierId: 'some-id-01',
        customerId: userCompany.id,
        ...variableOverrides,
      },
    },
  },
  result: {
    data: null,
    errors: [new GraphQLError(errorMessage ?? 'error')],
  },
});

export const getUpdateCompanyRelationshipMock = (
  input: UpdateCompanyRelationshipInput
) => ({
  request: {
    query: UPDATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input,
    },
  },
  result: {
    data: {
      companyRelationship: {
        id: input.id,
      },
    },
  },
});

export const getAllCompanyRelationshipsQueryMock = (
  customerRelationships: AllCompanyRelationshipsQuery_customer[],
  supplierRelationships: AllCompanyRelationshipsQuery_supplier[]
) => ({
  request: {
    query: ALL_COMPANY_RELATIONSHIPS_QUERY,
    variables: {
      companyId: userCompany.id,
    },
  },
  result: {
    data: {
      customer: customerRelationships,
      supplier: supplierRelationships,
    },
  },
});

export const getInviteAndConnectSuccessMock = (
  inputOverrides: Partial<InviteAndConnectToCompanyInput> = {},
  resultOverrides: Partial<InviteAndConnectResult> = {}
) => ({
  request: {
    query: INVITE_AND_CONNECT_MUTATION,
    variables: {
      input: {
        inviteType: CompanyRelationshipType.CUSTOMER,
        companyDuns: '1233232',
        note: 'Hello there',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'McTest',
        ...inputOverrides,
      } as InviteAndConnectToCompanyInput,
    },
  },
  result: {
    data: {
      inviteAndConnectToCompany: {
        id: '93f4c9b8-5f29-4567-96e4-b0cdad19ed76',
        status: 'AWAITING_SUPPLIER_APPROVAL',
        note: 'Hello there',
        ...resultOverrides,
      } as InviteAndConnectResult,
    },
  },
});

export const getInviteAndConnectErrorMock = (
  inputOverrides: Partial<InviteAndConnectToCompanyInput> = {},
  resultOverrides: GraphQLError[] = []
) => ({
  request: {
    query: INVITE_AND_CONNECT_MUTATION,
    variables: {
      input: {
        inviteType: CompanyRelationshipType.CUSTOMER,
        companyDuns: '1233232',
        note: 'Hello there',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'McTest',
        ...inputOverrides,
      } as InviteAndConnectToCompanyInput,
    },
  },
  result: {
    data: null,
    errors:
      resultOverrides.length > 0
        ? resultOverrides
        : [new GraphQLError('oopsy')],
  },
});

export const createCompanyRelationship = ({
  overrides = {},
  companyStatus = CompanyStatus.ACTIVE,
}: {
  overrides: Partial<
    | CompanyRelationshipsQuery_companyRelationships
    | CompanyRelationshipWithSharedDataQuery_companyRelationships
  >;
  companyStatus?: CompanyStatus;
}) => ({
  id: 'one',
  inviteType: CompanyRelationshipType.CUSTOMER,
  status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
  customer: {
    id: 'test',
    name: 'test-name',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: null! },
      },
    ],
    location: null,
    status: companyStatus,
  },
  supplier: {
    id: 'test2',
    name: 'test-name2',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: null! },
      },
    ],
    location: null,
    status: CompanyStatus.PENDING_USER_ACTIVATION,
  },
  note: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const getSupplierRelationships = () => [
  createCompanyRelationship({
    overrides: {
      id: '0',
      inviteType: CompanyRelationshipType.SUPPLIER,
      status: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
      customer: userCompany,
      supplier: {
        ...externalCompany,
        name: 'Zed ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Agriculture' },
          },
        ],
        location: 'UK',
      },
    },
  }),
  createCompanyRelationship({
    overrides: {
      id: '1',
      inviteType: CompanyRelationshipType.SUPPLIER,
      status: InviteStatus.APPROVED,
      ambitionPrivacyStatus: AmbitionPrivacyStatus.SHARED,
      customer: userCompany,
      supplier: {
        ...externalCompany,
        name: 'Aed ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Zoology' },
          },
        ],
        location: 'AUS',
      },
    },
  }),
  createCompanyRelationship({
    overrides: {
      id: '2',
      inviteType: CompanyRelationshipType.SUPPLIER,
      status: InviteStatus.REJECTED_BY_SUPPLIER,
      customer: userCompany,
      supplier: {
        ...externalCompany,
        name: 'Led ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Brokerage' },
          },
        ],
        location: 'USA',
      },
    },
  }),
];

export const getCustomerRelationships = () => [
  createCompanyRelationship({
    overrides: {
      id: '34',
      inviteType: CompanyRelationshipType.CUSTOMER,
      status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
      supplier: userCompany,
      customer: {
        ...externalCompany,
        name: 'Zed ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Agriculture' },
          },
        ],
        location: 'UK',
      },
    },
  }),
  createCompanyRelationship({
    overrides: {
      id: '35',
      inviteType: CompanyRelationshipType.CUSTOMER,
      status: InviteStatus.APPROVED,
      supplier: userCompany,
      customer: {
        ...externalCompany,
        name: 'Aed ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Zoology' },
          },
        ],
        location: 'AUS',
      },
    },
  }),
  createCompanyRelationship({
    overrides: {
      id: '36',
      inviteType: CompanyRelationshipType.CUSTOMER,
      status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
      supplier: userCompany,
      customer: {
        ...externalCompany,
        name: 'Zzed ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Zzz' },
          },
        ],
        location: 'Zealand',
        status: CompanyStatus.VETOED,
      },
    },
  }),
  createCompanyRelationship({
    overrides: {
      id: '47',
      inviteType: CompanyRelationshipType.CUSTOMER,
      status: InviteStatus.REJECTED_BY_CUSTOMER,
      supplier: userCompany,
      customer: {
        ...externalCompany,
        name: 'Led ltd',
        companySectors: [
          {
            sectorType: CompanySectorType.PRIMARY,
            sector: { name: 'Brokerage' },
          },
        ],
        location: 'USA',
      },
    },
  }),
];

export const getCustomerNetworkInvites = (): NetworkPendingInvitesQuery_networkSummary_pendingInvitations[] => {
  return getCustomerRelationships().map((relationship) => {
    const invite: NetworkPendingInvitesQuery_networkSummary_pendingInvitations = {
      ...relationship,
      supplierName: relationship.supplier.name,
      customerName: relationship.customer.name,
    };
    return invite;
  });
};

export const getSupplierNetworkInvites = (): NetworkPendingInvitesQuery_networkSummary_pendingInvitations[] => {
  return getSupplierRelationships().map((relationship) => {
    const invite: NetworkPendingInvitesQuery_networkSummary_pendingInvitations = {
      ...relationship,
      supplierName: relationship.supplier.name,
      customerName: relationship.customer.name,
    };
    return invite;
  });
};

export const updateCompanyRelationshipRecommendationMock = ({
  id,
  status,
}: {
  id: string;
  status: CompanyRelationshipRecommendationStatus;
}) => ({
  request: {
    query: UPDATE_COMPANY_RELATIONSHIP_RECOMMENDATION_STATUS_MUTATION,
    variables: {
      id,
      status,
    },
  },
  result: id,
});
