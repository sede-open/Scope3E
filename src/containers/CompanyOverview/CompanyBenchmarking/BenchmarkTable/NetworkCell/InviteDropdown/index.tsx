import { useState } from 'react';
import { SimpleDropdown } from 'components/SimpleDropdown';
import { TextAction } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipType } from 'types/globalTypes';
import Modal from 'components/Modal';
import { InviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as selectors from '../../../selectors';

type Props = {
  companyName: string;
  companyDuns: string;
};

export const InviteDropdown = ({ companyName, companyDuns }: Props) => {
  const { t } = useTranslation('companyOverview');
  const { company } = useAuthenticatedUser();
  const [
    selectedRelationship,
    setSelectedRelationship,
  ] = useState<CompanyRelationshipType | null>(null);

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

  return (
    <>
      <SimpleDropdown onSelect={handleSelect} options={options}>
        <TextAction data-testid={selectors.inviteBtn}>{t('invite')}</TextAction>
      </SimpleDropdown>
      <Modal
        isOpen={Boolean(selectedRelationship)}
        onClose={() => setSelectedRelationship(null)}
      >
        <InviteCompanyForm
          companyId={company?.id as string}
          relationshipType={selectedRelationship as CompanyRelationshipType}
          onClose={() => setSelectedRelationship(null)}
          initialCompany={{
            name: companyName,
            duns: companyDuns,
          }}
        />
      </Modal>
    </>
  );
};
