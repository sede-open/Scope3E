import { useQuery } from '@apollo/client';
import CogSpinner from 'components/CogSpinner';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { GetMe } from 'types/GetMe';
import { trackUser } from 'utils/analytics';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import { AuthenticatedUserContext } from './AuthenticatedUserContext';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      expertiseDomain
      company {
        id
        name
        location
        status
        dnbRegion
        dnbCountry
        dnbCountryIso
        dnbPostalCode
        dnbAddressLineOne
        dnbAddressLineTwo
        companySectors {
          sectorType
          sector {
            name
            id
          }
        }
      }
      roles {
        id
        name
      }
      status
      canViewUsersAdminDashboard
      canViewCompaniesAdminDashboard
      canViewSupplyDashboard
      canEditSupplyDashboard
      canViewCompanyRelationships
      canEditCompanyRelationships
      canViewEmissionAllocations
      canEditEmissionAllocations
      canEditCompanySectors
      canInviteNewCompanyMembers
      canEditCompanyMembers
      canRemoveCompanyMembers
      canSubmitDataPrivacyInfo
      preferences {
        suppressTaskListPrompt
      }
      launchDarklyHash
    }
  }
`;

interface IProps {
  children: ReactNode;
}

export const AuthenticatedUserProvider = ({ children }: IProps) => {
  const { data, loading, error } = useQuery<GetMe>(GET_ME);
  const router = useRouter();

  // identify current user with Segment
  useEffect(() => {
    if (data?.me) {
      trackUser(data.me.id, {
        primarySector:
          companySectorsPrimarySectorName(data.me.company?.companySectors) ??
          '',
        location: data.me.company?.location ?? undefined,
        companyName: data.me.company?.name,
        url: router.pathname,
        email: data.me.email,
        emailAddress: data.me.email, // 'email' prop can be removed not to trigger a change in HubSpot
      });
    }
  }, [data]);
  if (loading) {
    return <CogSpinner />;
  }
  if (error || !data) {
    return null;
  }

  return (
    <AuthenticatedUserContext.Provider
      value={{
        ...data.me,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
