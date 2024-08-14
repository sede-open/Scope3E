import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { SimpleDropdown } from 'components/SimpleDropdown';
import { CompanyRelationshipType } from 'types/globalTypes';
import Modal from 'components/Modal';
import { InviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import gql from 'graphql-tag';
import * as StyledComponents from './styledComponents';
import { useDataShareRequestMutation } from '../queries';
import { EmptyView } from '.';
import { emptyViewInvite } from '../selectors';

type Props = {
  companyId: string;
  companyName: string;
  companyDuns: string | null;
  hasRequestedToShareData: boolean;
  disabled: boolean;
};
export const EmptyViewInvite = ({
  companyId,
  companyName,
  companyDuns,
  hasRequestedToShareData,
  disabled,
}: Props) => {
  const { t } = useTranslation('companyOverview');
  const [
    selectedRelationship,
    setSelectedRelationship,
  ] = useState<CompanyRelationshipType | null>(null);
  const [hasSentInvite, setHasSentInvite] = useState<boolean>(false);
  const user = useAuthenticatedUser();

  const [sendDataShareRequest, { loading }] = useDataShareRequestMutation({
    variables: {
      targetCompanyId: companyId,
    },
    update(cache) {
      cache.writeFragment({
        id: cache.identify({ __typename: 'CompanyProfile', id: companyId }),
        fragment: gql`
          fragment CompanyProfileUpdated on CompanyProfile {
            dataShareRequestSent
            invitationPending
          }
        `,
        data: {
          dataShareRequestSent: true,
          invitationPending: true,
        },
      });
    },
  });

  const handleSelect = (value: CompanyRelationshipType) => {
    setSelectedRelationship(value);
  };

  const options = [
    {
      label: t('inviteCustomer'),
      value: CompanyRelationshipType.CUSTOMER,
    },
    {
      label: t('inviteSupplier'),
      value: CompanyRelationshipType.SUPPLIER,
    },
  ];

  const onClose = () => {
    setSelectedRelationship(null);
  };

  const onCompleted = () => {
    setHasSentInvite(true);
    if (!hasRequestedToShareData) {
      sendDataShareRequest();
    }
  };

  return (
    <EmptyView dataTestId={emptyViewInvite} description={t('empty.inviteDesc')}>
      <SimpleDropdown onSelect={handleSelect} options={options}>
        <StyledComponents.ActionButton
          disabled={disabled || hasSentInvite || loading}
        >
          {disabled || hasSentInvite
            ? t('empty.inviteSent')
            : t('empty.invite')}
        </StyledComponents.ActionButton>
      </SimpleDropdown>
      <Modal isOpen={Boolean(selectedRelationship)} onClose={onClose}>
        <InviteCompanyForm
          companyId={user.company!.id}
          relationshipType={selectedRelationship as CompanyRelationshipType}
          onClose={onClose}
          onCompleted={onCompleted}
          initialCompany={{
            name: companyName,
            duns: companyDuns || '',
          }}
        />
      </Modal>
    </EmptyView>
  );
};
