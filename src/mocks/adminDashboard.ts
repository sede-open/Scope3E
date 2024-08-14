import { GraphQLError } from 'graphql';
import {
  RoleName,
  UserStatus,
  CompanyStatus,
  ResendUserInviteToJoinEmailInput,
} from 'types/globalTypes';
import {
  USERS_QUERY,
  ADMIN_COMPANIES_QUERY,
} from 'containers/AdminDashboard/queries';
import {
  APPROVE_COMPANY_MUTATION,
  CREATE_USER_MUTATION,
  EDIT_USER_MUTATION,
  RESEND_USER_INVITE_MUTATION,
  UPDATE_COMPANY_STATUS_MUTATION,
  VETO_COMPANY_MUTATION,
} from 'containers/AdminDashboard/mutations';
import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';
import { DELETE_USER_MUTATION } from 'mutations/user';

export const adminRole = {
  id: 'ADMIN_ROLE_ID',
  name: RoleName.ADMIN,
};

export const editorRole = {
  id: 'SUPPLIER_EDITOR_ROLE_ID',
  name: RoleName.SUPPLIER_EDITOR,
};

export const viewerRole = {
  id: 'SUPPLIER_VIEWER_ROLE_ID',
  name: RoleName.SUPPLIER_VIEWER,
};

export const roles = [adminRole, editorRole, viewerRole];

export const userStatuses = [
  {
    id: 'ACTIVE',
    name: UserStatus.ACTIVE,
  },
  {
    id: 'PENDING',
    name: UserStatus.PENDING,
  },
];

export const companyStatuses = [
  {
    id: 'ACTIVE',
    name: CompanyStatus.ACTIVE,
  },
  {
    id: 'VETTING_IN_PROGRESS',
    name: CompanyStatus.VETTING_IN_PROGRESS,
  },
  {
    id: 'INVITATION_DECLINED',
    name: CompanyStatus.INVITATION_DECLINED,
  },
  {
    id: 'PENDING_USER_ACTIVATION',
    name: CompanyStatus.PENDING_USER_ACTIVATION,
  },
  {
    id: 'PENDING_USER_CONFIRMATION',
    name: CompanyStatus.PENDING_USER_CONFIRMATION,
  },
  {
    id: 'VETOED',
    name: CompanyStatus.VETOED,
  },
];

export const companies = [
  {
    id: 'COMPANY_ID',
    name: 'Testing Corp',
    location: 'UK',
    status: companyStatuses[1].name,
    dnbCountry: 'United Kingdom',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    reviewedAt: new Date().toString(),
    users: [],
    createdByUser: {
      id: 'D4C73EED-5D42-464F-A61D-597FC8B25CF4',
      firstName: 'Camila',
      lastName: 'Mendas',
      email: 'camilamendes@geonor.com.br',
      roles: null,
    },
  },
  {
    id: 'COMPANY_EDIT_ID',
    name: 'companyName',
    location: 'UK',
    status: companyStatuses[0].name,
    dnbCountry: 'United Kingdom',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    reviewedAt: new Date().toString(),
    users: [],
    createdByUser: {
      id: 'D4C73EED-5D42-464F-A61D-597FC8B25CF4',
      firstName: 'Camila',
      lastName: 'Mendas',
      email: 'camilamendes@geonor.com.br',
      roles: null,
    },
  },
];

export const adminQueryMock = {
  request: {
    query: USERS_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      users: {
        data: [],
        count: 0,
      },
    },
  },
};

export const internalUserToCreate = {
  firstName: 'Test',
  lastName: 'McTest',
  email: 'test.mctest@example.com',
  authProvider: 'PORT',
  roleId: roles[0].id,
};

export const createdInternalAdminUser = {
  id: 'NEW_USER_ID',
  firstName: 'Test',
  lastName: 'McTest',
  email: 'test.mctest@example.com',
  authProvider: 'PORT',
  role: roles[0],
  roles: [adminRole, editorRole, viewerRole],
  company: null,
  status: userStatuses[0],
};

export const editedInternalAdminUser = {
  id: 'NEW_USER_ID',
  firstName: 'EditedFN',
  lastName: 'EditedLN',
  email: 'test.mctest@example.com',
  authProvider: 'PORT',
  role: roles[0],
  roles: [adminRole, editorRole, viewerRole],
  company: null,
  status: userStatuses[0],
};

export const editedInternalSupportUser = {
  id: 'NEW_USER_ID',
  firstName: 'editedFirstName',
  lastName: 'editedSecondName',
  email: 'test.mctest@example.com',
  authProvider: 'PORT',
  role: editorRole,
  company: null,
  status: userStatuses[0],
};

export const createInternalUserMock = {
  request: {
    query: CREATE_USER_MUTATION,
    variables: {
      input: internalUserToCreate,
    },
  },
  result: {
    data: { createUser: createdInternalAdminUser },
  },
};

export const editInternalSupportUserMock = {
  request: {
    query: EDIT_USER_MUTATION,
    variables: {
      input: {
        firstName: editedInternalSupportUser.firstName,
        lastName: editedInternalSupportUser.lastName,
        email: editedInternalSupportUser.email,
        roleId: editedInternalSupportUser.role.id,
      },
    },
  },
  result: {
    data: {
      editUser: editedInternalSupportUser,
    },
  },
};

export const editInternalAdminUserMock = {
  request: {
    query: EDIT_USER_MUTATION,
    variables: {
      input: {
        firstName: editedInternalAdminUser.firstName,
        lastName: editedInternalAdminUser.lastName,
        email: editedInternalAdminUser.email,
        roleId: editedInternalAdminUser.role.id,
      },
    },
  },
  result: {
    data: {
      editUser: editedInternalAdminUser,
    },
  },
};

export const externalUserToCreate = {
  firstName: 'ExTest',
  lastName: 'ExMcTest',
  email: 'test.mctest@external.com',
  authProvider: 'AKAMAI',
  roleName: editorRole.name,
  companyId: companies[1].id,
};

export const createdExternalUser = {
  id: 'NEW_EXTERNAL_USER_ID',
  firstName: 'ExTest',
  lastName: 'ExMcTest',
  email: 'test.mctest@external.com',
  authProvider: 'AKAMAI',
  role: editorRole,
  roles: [editorRole, viewerRole],
  company: companies[1],
  status: userStatuses[0].name,
};

export const createdViewerUser = {
  id: 'VIEWER_ID',
  firstName: 'Viewers',
  lastName: 'McViewer',
  email: 'viewer.mcviewer@external.com',
  authProvider: 'AKAMAI',
  role: roles[2],
  roles: [viewerRole],
  company: companies[1],
  status: userStatuses[0].name,
};

export const editedExternalUser = {
  id: 'NEW_EXTERNAL_USER_ID',
  firstName: 'editedFirstName',
  lastName: 'editedSecondName',
  email: 'test.mctest@external.com',
  authProvider: 'AKAMAI',
  role: viewerRole,
  roles: [viewerRole],
  company: companies[1],
  status: userStatuses[0],
};

export const editedAdminQueryMock = {
  request: {
    query: USERS_QUERY,
  },
  result: {
    data: {
      users: {
        data: [editedExternalUser],
      },
      roles,
      companies,
    },
  },
};

export const createExternalUserMock = {
  request: {
    query: CREATE_USER_MUTATION,
    variables: {
      input: externalUserToCreate,
    },
  },
  result: {
    data: { createUser: createdExternalUser },
  },
};

export const editExternalUserMock = {
  request: {
    query: EDIT_USER_MUTATION,
    variables: {
      input: {
        firstName: editedExternalUser.firstName,
        lastName: editedExternalUser.lastName,
        email: editedExternalUser.email,
        roleId: editedExternalUser.role.id,
        companyId: editedExternalUser.company.id,
      },
    },
  },
  result: {
    data: {
      editUser: editedExternalUser,
    },
  },
};

export const adminQueryMockWithUsers = {
  request: {
    query: USERS_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      users: {
        data: [createdInternalAdminUser, createdExternalUser],
        count: 2,
      },
    },
  },
};

export const adminQueryMockWithAdminUser = {
  request: {
    query: USERS_QUERY,
  },
  result: {
    data: {
      users: {
        data: [createdInternalAdminUser],
      },
      roles,
      companies,
      userStatuses,
    },
  },
};

export const deleteUserMock = {
  request: {
    query: DELETE_USER_MUTATION,
    variables: {
      input: {
        id: createdExternalUser.id,
      },
    },
  },
  result: {
    data: {
      deleteUser: createdExternalUser.id,
    },
  },
};

export const ERROR_MESSAGE = 'Oopsy daisy';
export const deleteUserErrorMock = {
  request: {
    query: DELETE_USER_MUTATION,
    variables: {
      input: {
        id: createdExternalUser.id,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
};

export const adminQueryMockAfterDelete = {
  request: {
    query: USERS_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      users: {
        data: [createdInternalAdminUser],
        count: 1,
      },
    },
  },
};

export const companiesAdminQueryMock = {
  request: {
    query: ADMIN_COMPANIES_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      companies: {
        data: companies,
        total: companies.length,
      },
    },
  },
};

export const companiesAdminQueryMockWithCompanies = {
  request: {
    query: ADMIN_COMPANIES_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      companies: {
        data: companies,
        total: companies.length,
      },
    },
  },
};

export const getCompaniesAdminQueryMock = (
  companiesOverride: AdminCompaniesQuery_companies_data[]
) => ({
  request: {
    query: ADMIN_COMPANIES_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      companies: { data: companiesOverride, total: companiesOverride.length },
    },
  },
});

export const companyWithPendingCompanyStatus = {
  request: {
    query: ADMIN_COMPANIES_QUERY,
  },
  result: {
    data: {
      companies: [
        {
          id: 'COMPANY_EDIT_ID',
          name: 'companyName',
          status: companyStatuses[3].id,
          dnbCountry: 'United Kingdom',
          users: [],
        },
      ],
    },
  },
};

export const companyWithVettingCompanyStatus = {
  request: {
    query: ADMIN_COMPANIES_QUERY,
    variables: {
      offset: 0,
      limit: 1000,
    },
  },
  result: {
    data: {
      companies: {
        data: [
          {
            id: 'UNIQUE_STAMP',
            name: 'Sparta',
            location: 'Springfield',
            status: companyStatuses[1].id,
            dnbCountry: 'United Neverland',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            reviewedAt: new Date().toDateString(),
            users: [],
          },
        ],
        total: 1,
      },
    },
  },
};

export const usersQueryMock = {
  request: {
    query: USERS_QUERY,
  },
  result: {
    data: {
      users: [],
      total: 0,
    },
  },
};

export const approveCompanyMock = {
  request: {
    query: APPROVE_COMPANY_MUTATION,
    variables: {
      input: {
        companyId: companies[0].id,
      },
    },
  },
  result: {
    data: {
      updateCompanyStatus: companies[0].id,
      status: CompanyStatus.PENDING_USER_ACTIVATION,
    },
  },
};

export const vetoCompanyMock = {
  request: {
    query: VETO_COMPANY_MUTATION,
    variables: {
      input: {
        companyId: companies[0].id,
      },
    },
  },
  result: {
    data: {
      vetoCompany: {
        id: companies[0].id,
        status: CompanyStatus.VETOED,
      },
    },
  },
};

export const approveCompanyErrorMock = {
  request: {
    query: APPROVE_COMPANY_MUTATION,
    variables: {
      input: {
        companyId: companies[0].id,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
};

export const vetoCompanyErrorMock = {
  request: {
    query: VETO_COMPANY_MUTATION,
    variables: {
      input: {
        companyId: companies[0].id,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
};

export const getResendInviteSuccessMock = ({
  inputOverrides = {},
}: {
  inputOverrides?: Partial<ResendUserInviteToJoinEmailInput>;
}) => ({
  request: {
    query: RESEND_USER_INVITE_MUTATION,
    variables: {
      input: {
        userId: createdExternalUser.id,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: 'Invite has been sent',
  },
});

export const getResendInviteFailMock = ({
  inputOverrides = {},
}: {
  inputOverrides?: Partial<ResendUserInviteToJoinEmailInput>;
}) => ({
  request: {
    query: UPDATE_COMPANY_STATUS_MUTATION,
    variables: {
      input: {
        id: createdExternalUser.id,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: undefined,
    errors: [new GraphQLError(ERROR_MESSAGE)],
  },
});
