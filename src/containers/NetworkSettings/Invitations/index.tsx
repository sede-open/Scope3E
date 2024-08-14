import Button from 'components/Button';
import { CardHeader } from 'components/CardHeader';
import CogSpinner from 'components/CogSpinner';
import { Text } from 'components/Text';
import { useUpdateCompanyRelationshipMutation } from 'containers/AccountSettings/CompanyRelationships/mutations';
import {
  RelationshipsCard,
  ShowOverflowButtonContainer,
  TextContainer,
  Title,
} from 'containers/AccountSettings/CompanyRelationships/styledComponents';
import { NetworkInvite } from 'containers/NetworkSettings/NetworkInvite';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Scorpion } from 'styles/colours';
import { InviteStatus } from 'types/globalTypes';
import {
  displayErrorMessage,
  displaySuccessMessage,
  ToastType,
} from 'utils/toast';
import { useNetworkPendingInvitesQuery } from './queries';
import { getInviteSelector, pendingInvitesCardSelector } from './selectors';

export const Invitations = () => {
  const { company, canEditCompanyRelationships } = useAuthenticatedUser();

  const { t } = useTranslation();
  const companyId = company?.id;
  const { data, loading: isLoadingInvites } = useNetworkPendingInvitesQuery();

  const [
    successToastPayload,
    setSuccessToastPayload,
  ] = useState<ToastType | null>(null);
  const clearSuccessToastPayload = () => setSuccessToastPayload(null);

  const [
    displayOverflowingRelationships,
    setDisplayOverflowingRelationships,
  ] = useState(false);

  const mutationOptions = {
    onError: (error: any) => {
      displayErrorMessage({
        title: t('companyRelationships:incoming-relationship-title-error'),
        subtitle: t(
          'companyRelationships:incoming-relationship-subtitle-error'
        ),
        options: {
          onClose: clearSuccessToastPayload,
        },
      });
      console.error({ error });
    },
    onCompleted: () => {
      if (successToastPayload) {
        displaySuccessMessage(successToastPayload);
      }
    },
  };

  const [
    updateCompanyRelationship,
    { loading: isSubmitting },
  ] = useUpdateCompanyRelationshipMutation(mutationOptions);

  if (!companyId || isLoadingInvites) {
    return <CogSpinner />;
  }

  const relationships = data?.networkSummary.pendingInvitations ?? [];
  const onAccept = async (id: string, companyName: string) => {
    setSuccessToastPayload({
      title: t('companyRelationships:incoming-relationship-accept-success', {
        companyName,
      }),
      options: {
        onClose: clearSuccessToastPayload,
      },
    });

    await updateCompanyRelationship({
      variables: {
        input: {
          id,
          status: InviteStatus.APPROVED,
        },
      },
    });
  };
  const onReject = async (
    id: string,
    companyName: string,
    isInviteFromSupplier: boolean
  ) => {
    setSuccessToastPayload({
      title: t(
        'companyRelationships:incoming-relationship-reject-success-title'
      ),
      subtitle: t(
        'companyRelationships:incoming-relationship-reject-success-subtitle',
        { companyName }
      ),
      options: {
        onClose: clearSuccessToastPayload,
      },
    });

    const status = isInviteFromSupplier
      ? InviteStatus.REJECTED_BY_CUSTOMER
      : InviteStatus.REJECTED_BY_SUPPLIER;

    await updateCompanyRelationship({
      variables: {
        input: {
          id,
          status,
        },
      },
    });
  };

  const filteredRequestCount = relationships.length;
  const hasPendingRelationships = filteredRequestCount > 0;
  const hasOverflowingRelationships = filteredRequestCount > 3;
  const invites = displayOverflowingRelationships
    ? relationships
    : relationships.slice(0, 3);

  return (
    <RelationshipsCard
      data-testid={pendingInvitesCardSelector}
      withContent={hasPendingRelationships}
    >
      <CardHeader>
        <TextContainer>
          <Title>
            {t('companyRelationships:incoming-relationships-title', {
              requestCount: filteredRequestCount,
            })}
          </Title>
          <Text color={Scorpion}>
            {t('companyRelationships:incoming-relationships-subtitle-network')}
          </Text>
        </TextContainer>
      </CardHeader>

      {hasPendingRelationships && (
        <>
          {invites.map((relationship) => (
            <NetworkInvite
              dataTestId={getInviteSelector(relationship.id)}
              invite={relationship}
              isDisabled={isSubmitting}
              key={relationship.id}
              onAccept={onAccept}
              onReject={onReject}
              shouldDisplayControls={canEditCompanyRelationships}
            />
          ))}
          {hasOverflowingRelationships && !displayOverflowingRelationships && (
            <ShowOverflowButtonContainer>
              <Button
                color="text-button"
                onClick={() => setDisplayOverflowingRelationships(true)}
              >
                {t(
                  'companyRelationships:incoming-relationships-show-all-button'
                )}
              </Button>
            </ShowOverflowButtonContainer>
          )}
        </>
      )}
    </RelationshipsCard>
  );
};
