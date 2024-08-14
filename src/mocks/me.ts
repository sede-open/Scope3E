import { UPDATE_ME_MUTATION } from 'containers/AccountSettings/PersonalPreferences/UserDetailsModalForm/mutations';
import { GET_ME } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { GraphQLError } from 'graphql';
import { GetMe_me } from 'types/GetMe';
import {
  CompanySectorType,
  CompanyStatus,
  RoleName,
  UserStatus,
} from 'types/globalTypes';
import { UpdateMe_updateMe } from 'types/UpdateMe';
import { USER_COMPANY_ID, USER_COMPANY_NAME } from './constants';

export const baseMe: GetMe_me = {
  id: '3',
  email: 'john.smith@example.com',
  firstName: 'Test',
  lastName: 'McTest',
  expertiseDomain: null,
  company: {
    id: USER_COMPANY_ID,
    name: USER_COMPANY_NAME,
    location: 'Place Town',
    status: CompanyStatus.ACTIVE,
    dnbRegion: 'Place region',
    dnbCountry: 'Place country',
    dnbCountryIso: 'PI',
    dnbAddressLineOne: 'Place street address line one',
    dnbAddressLineTwo: 'Place street address line two',
    dnbPostalCode: 'ABCD EFG',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: {
          name: 'Construction',
          id: 'b3123621-5881-4158-a423-3438cb8fdabf',
        },
      },
    ],
  },
  roles: [
    {
      id: '5',
      name: RoleName.ADMIN,
    },
    {
      id: '6',
      name: RoleName.SUPPLIER_EDITOR,
    },
    {
      id: '7',
      name: RoleName.SUPPLIER_VIEWER,
    },
  ],
  status: UserStatus.ACTIVE,
  canEditSupplyDashboard: true,
  canViewUsersAdminDashboard: true,
  canViewCompaniesAdminDashboard: true,
  canViewSupplyDashboard: false,
  canViewCompanyRelationships: true,
  canEditCompanyRelationships: true,
  canViewEmissionAllocations: true,
  canEditEmissionAllocations: true,
  canEditCompanySectors: true,
  canInviteNewCompanyMembers: true,
  canEditCompanyMembers: true,
  canRemoveCompanyMembers: true,
  canSubmitDataPrivacyInfo: true,
  preferences: {
    suppressTaskListPrompt: false,
  },
  launchDarklyHash: '',
};

export const getGetMeMock = (overrides: Partial<GetMe_me> = {}) => ({
  request: {
    query: GET_ME,
  },
  result: {
    data: {
      me: {
        ...baseMe,
        ...overrides,
      } as GetMe_me,
    },
  },
});

export const updateMeMock = (
  args: Partial<UpdateMe_updateMe>,
  result?: UpdateMe_updateMe,
  errors?: GraphQLError[] | null
) => ({
  request: {
    query: UPDATE_ME_MUTATION,
    variables: {
      input: {
        ...args,
      },
    },
  },
  result: {
    data: result
      ? {
          updateMe: {
            ...args,
          },
        }
      : null,
    errors,
  },
});
