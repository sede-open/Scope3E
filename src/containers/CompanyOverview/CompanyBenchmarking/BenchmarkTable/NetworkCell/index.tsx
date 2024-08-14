import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { DarkBlue } from 'styles/colours';
import { LinkButton } from 'components/Link';
import * as StyledComponents from './styles';
import { InviteSentModal } from './InviteSentModal';
import { InviteReceivedModal } from './InviteReceivedModal';
import { InviteDropdown } from './InviteDropdown';

export type Props = {
  companyName: string;
  companyDuns: string;
  relationshipType: CompanyRelationshipType | null;
  relationshipStatus: InviteStatus | null;
};

export const NetworkCell = ({
  companyName,
  companyDuns,
  relationshipType,
  relationshipStatus,
}: Props) => {
  const { t } = useTranslation('companyOverview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (
    relationshipType === CompanyRelationshipType.CUSTOMER &&
    relationshipStatus === InviteStatus.APPROVED
  ) {
    return (
      <StyledComponents.ApprovedContainer>
        <StyledComponents.CustomerSquare />
        <div>{t('yourCustomer')}</div>
      </StyledComponents.ApprovedContainer>
    );
  }

  if (
    relationshipType === CompanyRelationshipType.SUPPLIER &&
    relationshipStatus === InviteStatus.APPROVED
  ) {
    return (
      <StyledComponents.ApprovedContainer>
        <StyledComponents.SupplierSquare />
        <div>{t('yourSupplier')}</div>
      </StyledComponents.ApprovedContainer>
    );
  }

  if (
    (relationshipType === CompanyRelationshipType.CUSTOMER &&
      relationshipStatus === InviteStatus.AWAITING_CUSTOMER_APPROVAL) ||
    (relationshipType === CompanyRelationshipType.SUPPLIER &&
      relationshipStatus === InviteStatus.AWAITING_SUPPLIER_APPROVAL)
  ) {
    return (
      <>
        <LinkButton color={DarkBlue} onClick={() => setIsModalOpen(true)}>
          {t('invitationSent')}
        </LinkButton>
        <InviteSentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (
    (relationshipType === CompanyRelationshipType.CUSTOMER &&
      relationshipStatus === InviteStatus.AWAITING_SUPPLIER_APPROVAL) ||
    (relationshipType === CompanyRelationshipType.SUPPLIER &&
      relationshipStatus === InviteStatus.AWAITING_CUSTOMER_APPROVAL)
  ) {
    return (
      <>
        <LinkButton color={DarkBlue} onClick={() => setIsModalOpen(true)}>
          {t('invitationReceived')}
        </LinkButton>
        <InviteReceivedModal
          isOpen={isModalOpen}
          companyName={companyName}
          relationshipType={relationshipType}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return <InviteDropdown companyName={companyName} companyDuns={companyDuns} />;
};
