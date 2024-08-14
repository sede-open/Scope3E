import { RESEND_INVITE_MUTATION } from 'containers/AccountSettings/YourOrganisation/CompanyTeamMembers/mutations';
import { GraphQLError } from 'graphql';
import { DELETE_USER_MUTATION } from 'mutations/user';
import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';
import {
  ExpertiseDomain,
  UserStatus,
  RoleName,
  CompanyStatus,
  DeleteUserInput,
  ResentAkamaiInviteInput,
} from 'types/globalTypes';

export const userMock: User = {
  id: 'G22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'McTest',
  expertiseDomain: ExpertiseDomain.SUSTAINABILITY,
  status: UserStatus.ACTIVE,
  roles: [
    {
      id: 'E22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
      name: RoleName.SUPPLIER_EDITOR,
    },
    {
      id: 'F34C0F60-FBD0-4A77-A6D0-BC3AD0FBCBE4',
      name: RoleName.SUPPLIER_VIEWER,
    },
  ],
  company: {
    id: 'company-id',
    name: 'Company Ltd',
    status: CompanyStatus.ACTIVE,
  },
};

export const deleteUserMutationMock = (
  inputOverrides: Partial<DeleteUserInput> = {},
  resultOverrides?: string,
  errors?: GraphQLError[]
) => ({
  request: {
    query: DELETE_USER_MUTATION,
    variables: {
      input: {
        id: userMock.id,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: {
      deleteUser: errors ? undefined : resultOverrides ?? userMock.id,
    },
    errors,
  },
});

export const resendUserInviteMutationMock = (
  inputOverrides: Partial<ResentAkamaiInviteInput> = {},
  resultOverrides?: string,
  errors?: GraphQLError[]
) => ({
  request: {
    query: RESEND_INVITE_MUTATION,
    variables: {
      input: {
        userId: userMock.id,
        ...inputOverrides,
      },
    },
  },
  result: {
    data: {
      resendAkamaiInvite: errors
        ? undefined
        : resultOverrides ?? 'Invite has been resent',
    },
    errors,
  },
});
