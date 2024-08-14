import { ACCOUNT_SETTINGS_DATA_QUERY } from 'containers/AccountSettings/queries';
import {
  CREATE_COMPANY_USER_MUTATION,
  EDIT_COMPANY_USER_MUTATION,
} from 'containers/AccountSettings/YourOrganisation/CompanyTeamMembers/mutations';
import { AccountSettingsDataQuery } from 'types/AccountSettingsDataQuery';
import { CreateCompanyUser } from 'types/CreateCompanyUser';
import {
  UserStatus,
  CompanyStatus,
  ExpertiseDomain,
  RoleName,
  AuthProvider,
} from 'types/globalTypes';
import { viewerRole } from './adminDashboard';

export const externalCompanyUser1Mock = {
  id: 'NEW_USER_ID_1',
  firstName: 'Test',
  lastName: 'McTest',
  email: 'test.mctest@test.com',
  expertiseDomain: ExpertiseDomain.BUSINESS_DEVELOPMENT,
  role: viewerRole,
  roles: [viewerRole],
  company: {
    id: 'COMPANY_ID',
    name: 'COMPANY_NAME',
    status: CompanyStatus.ACTIVE,
  },
  status: UserStatus.ACTIVE,
};

export const externalCompanyUser2Mock = {
  id: 'NEW_USER_ID_2',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe.com',
  expertiseDomain: ExpertiseDomain.BUSINESS_DEVELOPMENT,
  /* Was support before maybe incorrect */
  role: viewerRole,
  roles: [viewerRole],
  company: {
    id: 'COMPANY_ID',
    name: 'COMPANY_NAME',
    status: CompanyStatus.ACTIVE,
  },
  status: UserStatus.ACTIVE,
};

export const editedExternalCompanyUser2Mock = {
  id: 'NEW_USER_ID_2',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe.com',
  expertiseDomain: ExpertiseDomain.BUSINESS_DEVELOPMENT,
  authProvider: 'AKAMAI',
  role: viewerRole,
  roles: [viewerRole],
  company: {
    id: 'COMPANY_ID',
    name: 'COMPANY_NAME',
    status: CompanyStatus.ACTIVE,
  },
  status: UserStatus.ACTIVE,
};

export const companyUserRoleMock1 = {
  id: 'CA69D3F7-AF4F-4882-87C7-17E6DE4A4747',
  name: RoleName.SUPPLIER_EDITOR,
};

export const companyUserRoleMock2 = {
  id: 'D5D8C860-91F3-453F-BE1C-C2AC68E6FD4C',
  name: RoleName.SUPPLIER_VIEWER,
};

export const createAccountSettingsCompanyUsersMock = (
  data: Partial<AccountSettingsDataQuery>
) => ({
  request: {
    query: ACCOUNT_SETTINGS_DATA_QUERY,
  },
  result: {
    data: {
      companyUsers: [],
      companyUserRoles: [],
      ...data,
    },
  },
});

export const createCompanyUserMutationMock = (
  data: Partial<CreateCompanyUser>
) => ({
  request: {
    query: CREATE_COMPANY_USER_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        expertiseDomain: 'BUSINESS_DEVELOPMENT',
        roleId: '5',
        companyId: '67',
        authProvider: AuthProvider.AKAMAI,
        ...data,
      },
    },
  },
  result: {
    data: {
      createCompanyUser: {
        id: '5',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'Test',
        expertiseDomain: 'BUSINESS_DEVELOPMENT',
        role: {
          id: '5',
          name: RoleName.SUPPLIER_EDITOR,
        },
        company: {
          id: '5',
          name: 'Random company',
        },
        ...data,
      },
    },
  },
});

export const editCompanyUserMock = {
  request: {
    query: EDIT_COMPANY_USER_MUTATION,
    variables: {
      input: {
        firstName: editedExternalCompanyUser2Mock.firstName,
        lastName: editedExternalCompanyUser2Mock.lastName,
        email: editedExternalCompanyUser2Mock.email,
        roleId: editedExternalCompanyUser2Mock.role.id,
        companyId: editedExternalCompanyUser2Mock.company.id,
        expoertiseDomain: editedExternalCompanyUser2Mock.expertiseDomain,
      },
    },
  },
  result: {
    data: {
      editCompanyUser: editedExternalCompanyUser2Mock,
    },
  },
};
