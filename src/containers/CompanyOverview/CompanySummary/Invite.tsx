import Button from 'components/Button';
import Modal from 'components/Modal';
import { SimpleDropdown } from 'components/SimpleDropdown';
import { InviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as selectors from './selectors';

type Props = {
  companyName: string;
  companyDuns: string | null;
};
export const Invite = ({ companyName, companyDuns }: Props) => {
  const { t } = useTranslation('companyOverview');
  const user = useAuthenticatedUser();
  const [
    selectedRelationship,
    setSelectedRelationship,
  ] = useState<CompanyRelationshipType | null>(null);
  const [isInviteSent, setIsInviteSent] = useState(false);

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

  const handleSelect = (value: CompanyRelationshipType) => {
    setSelectedRelationship(value);
  };

  const onClose = () => {
    setSelectedRelationship(null);
  };

  const onCompleted = () => {
    setIsInviteSent(true);
  };

  return (
    <div>
      <SimpleDropdown onSelect={handleSelect} options={options}>
        <Button
          disabled={isInviteSent}
          data-testid={selectors.inviteCompanyBtn}
        >
          {isInviteSent ? t('empty.inviteSent') : t('invite')}
        </Button>
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
    </div>
  );
};
