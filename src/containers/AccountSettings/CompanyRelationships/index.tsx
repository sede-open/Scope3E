import CogSpinner from 'components/CogSpinner';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import partition from 'lodash/fp/partition';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import {
  useCompanyRelationshipsQuery,
  useCompanyRelationshipsWithSharedDataQuery,
} from '../../../queries/companyRelationships';
import { IncomingRelationships } from './IncomingRelationships';
import { OutgoingRelationships } from './OutgoingRelationships';

interface IProps {
  relationshipType: CompanyRelationshipType;
  invitationOnly?: boolean;
}

export const CompanyRelationships = ({
  relationshipType,
  invitationOnly = false,
}: IProps) => {
  const { company: userCompany } = useAuthenticatedUser();
  const { isNetworkPageEnabled } = useFlags();
  const companyId = userCompany?.id;

  if (!companyId) {
    return null;
  }

  const { data, loading } = isNetworkPageEnabled
    ? useCompanyRelationshipsWithSharedDataQuery({
        companyId,
        relationshipType,
      })
    : useCompanyRelationshipsQuery({
        companyId,
        relationshipType,
      });

  const [
    outgoingRelationships,
    incomingRelationships,
  ] = data?.companyRelationships
    ? partition(
        (relationship) =>
          relationship.inviteType === relationshipType ||
          relationship.status === InviteStatus.APPROVED,
        data?.companyRelationships
      )
    : [[], []];

  return loading ? (
    <CogSpinner />
  ) : (
    <>
      {!isNetworkPageEnabled && (
        <>
          <IncomingRelationships
            relationships={incomingRelationships}
            relationshipType={relationshipType}
          />

          <OutgoingRelationships
            relationships={outgoingRelationships}
            relationshipType={relationshipType}
          />
        </>
      )}
      {isNetworkPageEnabled && invitationOnly && (
        <IncomingRelationships
          relationships={incomingRelationships}
          relationshipType={relationshipType}
        />
      )}
      {isNetworkPageEnabled && !invitationOnly && (
        <OutgoingRelationships
          relationships={outgoingRelationships}
          relationshipType={relationshipType}
        />
      )}
    </>
  );
};
