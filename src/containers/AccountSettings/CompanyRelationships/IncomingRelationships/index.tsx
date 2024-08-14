import { Button } from 'components/Button';
import { CardHeader } from 'components/CardHeader';
import { Invite } from 'components/Invite';
import { Text } from 'components/Text';
import { CloseModalType, ModalType } from 'context/ModalProvider/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Scorpion } from 'styles/colours';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useUpdateCompanyRelationshipMutation } from '../mutations';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  relationships: CompanyRelationshipsQuery_companyRelationships[];
  relationshipType: CompanyRelationshipType;
}

interface SuccessToastPayload {
  title: string;
  subtitle?: string;
  options: {
    onClose: () => void;
  };
}
/**
 * @deprecated
 * Can be removed once network epic is released and stable
 */
export const IncomingRelationships = ({
  relationships,
  relationshipType,
}: IProps) => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [showModal, setShowModal] = useState(true);
  const [actionType, setActionType] = useState<'Accept' | 'Reject'>();
  const { canEditCompanyRelationships } = useAuthenticatedUser();
  const [
    displayOverflowingRelationships,
    setDisplayOverflowingRelationships,
  ] = useState(false);

  const filteredRelationships = relationships.filter(
    (relationship) =>
      relationship.status !== InviteStatus.REJECTED_BY_SUPPLIER &&
      relationship.status !== InviteStatus.REJECTED_BY_CUSTOMER
  );
  const filteredRequestCount = filteredRelationships.length;
  const hasPendingRelationships = filteredRequestCount > 0;
  const hasOverflowingRelationships = filteredRequestCount > 2;
  const initialRelationships = filteredRelationships.slice(0, 2);
  const overflowingRelationships = filteredRelationships.slice(2);

  const isInviteFromSupplier =
    relationshipType === CompanyRelationshipType.CUSTOMER;
  const [
    successToastPayload,
    setSuccessToastPayload,
  ] = useState<SuccessToastPayload | null>(null);
  const clearSuccessToastPayload = () => setSuccessToastPayload(null);

  const [
    shouldDisableInviteControls,
    setShouldDisabledInviteControls,
  ] = useState(false);

  const mutationOptions = {
    onError: () => {
      setShouldDisabledInviteControls(false);
      displayErrorMessage({
        title: t('companyRelationships:incoming-relationship-title-error'),
        subtitle: t(
          'companyRelationships:incoming-relationship-subtitle-error'
        ),
        options: {
          onClose: clearSuccessToastPayload,
        },
      });
    },
    onCompleted: () => {
      setShouldDisabledInviteControls(false);
      if (successToastPayload) {
        displaySuccessMessage(successToastPayload);
      }
      if (actionType === 'Accept' && showModal) {
        openModal({
          modalType: ModalType.NEW_CONNECTION,
          onClose: (type) => {
            if (type === CloseModalType.LATER) {
              setShowModal(false);
            }
          },
        });
      }
    },
  };

  const [updateCompanyRelationship] = useUpdateCompanyRelationshipMutation(
    mutationOptions
  );

  const onAccept = async (id: string, companyName: string) => {
    setShouldDisabledInviteControls(true);
    setSuccessToastPayload({
      title: t('companyRelationships:incoming-relationship-accept-success', {
        companyName,
      }),
      options: {
        onClose: clearSuccessToastPayload,
      },
    });
    setActionType('Accept');
    await updateCompanyRelationship({
      variables: {
        input: {
          id,
          status: InviteStatus.APPROVED,
        },
      },
    });
  };
  const onReject = async (id: string, companyName: string) => {
    setShouldDisabledInviteControls(true);
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
      ? InviteStatus.REJECTED_BY_SUPPLIER
      : InviteStatus.REJECTED_BY_CUSTOMER;
    setActionType('Reject');
    await updateCompanyRelationship({
      variables: {
        input: {
          id,
          status,
        },
      },
    });
  };

  const subtitleNoun = isInviteFromSupplier
    ? t('companyRelationships:incoming-relationships-subtitle-noun-customers')
    : t('companyRelationships:incoming-relationships-subtitle-noun-suppliers');

  return (
    <StyledComponents.RelationshipsCard
      data-testid={selectors.pendingInvitesCard}
      withContent={hasPendingRelationships}
    >
      <CardHeader>
        <StyledComponents.TextContainer>
          <StyledComponents.Title>
            {t('companyRelationships:incoming-relationships-title', {
              requestCount: filteredRequestCount,
            })}
          </StyledComponents.Title>
          <Text color={Scorpion}>
            {t('companyRelationships:incoming-relationships-subtitle', {
              noun: subtitleNoun,
            })}
          </Text>
        </StyledComponents.TextContainer>
      </CardHeader>

      {hasPendingRelationships && (
        <>
          {initialRelationships.map((relationship) => (
            <Invite
              dataTestId={selectors.getInviteSelector(relationship.id)}
              invite={relationship}
              isDisabled={shouldDisableInviteControls}
              key={relationship.id}
              onAccept={onAccept}
              onReject={onReject}
              shouldDisplayControls={canEditCompanyRelationships}
            />
          ))}
          {hasOverflowingRelationships && !displayOverflowingRelationships && (
            <StyledComponents.ShowOverflowButtonContainer>
              <Button
                color="text-button"
                data-testid={selectors.showAllButton}
                onClick={() => setDisplayOverflowingRelationships(true)}
              >
                {t(
                  'companyRelationships:incoming-relationships-show-all-button'
                )}
              </Button>
            </StyledComponents.ShowOverflowButtonContainer>
          )}
          {displayOverflowingRelationships &&
            overflowingRelationships.map((relationship) => (
              <Invite
                dataTestId={selectors.getInviteSelector(relationship.id)}
                invite={relationship}
                isDisabled={shouldDisableInviteControls}
                key={relationship.id}
                onAccept={onAccept}
                onReject={onReject}
                shouldDisplayControls={canEditCompanyRelationships}
              />
            ))}
        </>
      )}
    </StyledComponents.RelationshipsCard>
  );
};
