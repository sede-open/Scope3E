import { MailIcon } from 'components/Glyphs/MailIcon';
import Modal from 'components/Modal';
import { InviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm';
import {
  FormType,
  IModalState,
} from 'containers/AccountSettings/CompanyRelationships/OutgoingRelationships/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import { White } from 'styles/colours';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as StyledComponents from '../styledComponents';

interface IProps {
  relationshipType: CompanyRelationshipType;
}

export const InviteNewCompanyCard = ({ relationshipType }: IProps) => {
  const { t } = useTranslation();

  const {
    company: userCompany,
    canEditCompanyRelationships,
  } = useAuthenticatedUser();

  const companyId = userCompany?.id;

  if (!companyId || !canEditCompanyRelationships) {
    return null;
  }

  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
  });

  const closeModal = () => {
    setModalState({
      isOpen: false,
    });
  };

  const openInviteCompanyModal = useCallback(() => {
    setModalState({
      isOpen: true,
      formType: FormType.INVITE_COMPANY,
    });
  }, []);

  return (
    <StyledComponents.QuickConnectCardAlternate>
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === FormType.INVITE_COMPANY && (
          <InviteCompanyForm
            onClose={closeModal}
            companyId={companyId}
            relationshipType={relationshipType}
          />
        )}
      </Modal>
      <StyledComponents.CardFirstRow>
        <StyledComponents.CardIconContainer color="yellow">
          <MailIcon fill={White} />
        </StyledComponents.CardIconContainer>
      </StyledComponents.CardFirstRow>
      <StyledComponents.CardContent>
        <StyledComponents.CardTitle>
          {t('networkSettings:quick-connect-new-invite-card-title', {
            relationshipType: relationshipType.toLowerCase(),
          })}
        </StyledComponents.CardTitle>
        <StyledComponents.CardDescription>
          {t('networkSettings:quick-connect-new-invite-description')}
        </StyledComponents.CardDescription>
      </StyledComponents.CardContent>
      <StyledComponents.CardActionsContainer>
        <StyledComponents.CardConnectButton onClick={openInviteCompanyModal}>
          {t('networkSettings:quick-connect-invite-to-join')}
        </StyledComponents.CardConnectButton>
      </StyledComponents.CardActionsContainer>
    </StyledComponents.QuickConnectCardAlternate>
  );
};
