import NextLink from 'next/link';
import { BuildingOfficeIcon } from 'components/Glyphs/BuildingOffice';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import { Spinner } from 'components/Spinner';
import { InviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm';
import { useCreateCompanyRelationshipMutation } from 'containers/AccountSettings/CompanyRelationships/mutations';
import {
  FormType,
  IModalState,
} from 'containers/AccountSettings/CompanyRelationships/OutgoingRelationships/types';

import { startCase } from 'lodash';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useDebouncedCallback from 'effects/useDebouncedCallback';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import {
  CompanyRelationshipRecommendationStatus,
  CompanyRelationshipType,
} from 'types/globalTypes';
import Button from 'components/Button';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { Link } from 'components/Link';
import { useUpdateCompanyRelationshipRecommendationStatus } from '../mutations';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';
import { QuickConnectCardColorType } from '../types';

export interface IProps {
  id: string;
  name: string;
  duns: string;
  deleteCard: () => void;
  color: QuickConnectCardColorType;
  relationshipType: CompanyRelationshipType;
  recommendedCompanyId?: string;
  sector: string | null;
  region: string | null;
  country: string | null;
}

export const QuickConnectCard = ({
  id,
  name,
  duns,
  deleteCard,
  color,
  relationshipType,
  recommendedCompanyId,
  sector,
  region,
  country,
}: IProps) => {
  const { t } = useTranslation();

  const {
    company: userCompany,
    canEditCompanyRelationships,
  } = useAuthenticatedUser();

  const [isDismissalLoading, setIsDismissalLoading] = useState(false);
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  if (!userCompany?.id || !canEditCompanyRelationships) {
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

  const delayLoadingEnd = useDebouncedCallback((cb: () => void) => {
    cb();
  }, 600);

  const createCompanyRelationshipMutationOptions = {
    onCompleted: () => {
      delayLoadingEnd(() => {
        setIsInviteLoading(false);
        setIsConnected(true);
        displaySuccessMessage({
          title: t('companyRelationships:form-toast-save-title-success'),
          subtitle: t('companyRelationships:form-toast-save-subtitle-success'),
        });
      });
    },
    onError: () => {
      setIsInviteLoading(false);
      displayErrorMessage({
        title: t('networkSettings:quick-connect-invite-error-title', { name }),
        subtitle: t('networkSettings:quick-connect-invite-error-subtitle'),
      });
    },
  };

  const [createCompanyRelationship] = useCreateCompanyRelationshipMutation(
    createCompanyRelationshipMutationOptions
  );

  const openInviteCompanyModal = useCallback(() => {
    if (!recommendedCompanyId) {
      setModalState({
        isOpen: true,
        formType: FormType.INVITE_COMPANY,
      });
    } else {
      if (isInviteLoading) {
        return;
      }
      const customerId =
        relationshipType === CompanyRelationshipType.CUSTOMER
          ? recommendedCompanyId
          : userCompany.id;
      const supplierId =
        relationshipType === CompanyRelationshipType.SUPPLIER
          ? recommendedCompanyId
          : userCompany.id;

      setIsInviteLoading(true);
      createCompanyRelationship({
        variables: {
          input: {
            customerId,
            supplierId,
            inviteType: relationshipType,
            note:
              'Hi, please accept this invitation to the example Supplier Energy Transition Hub.',
          },
        },
      });
    }
  }, []);

  const updateCompanyRelationshipRecommendationMutationOptions = {
    onCompleted: () => {
      delayLoadingEnd(() => {
        setIsDismissalLoading(false);
        deleteCard();
      });
    },
    onError: () => {
      delayLoadingEnd(() => setIsDismissalLoading(false));
      displayErrorMessage({
        title: t('networkSettings:quick-connect-dismiss-error-title'),
        subtitle: t('networkSettings:quick-connect-dismiss-error-subtitle'),
      });
    },
  };

  const [
    updateCompanyRelationshipRecommendationStatus,
  ] = useUpdateCompanyRelationshipRecommendationStatus(
    updateCompanyRelationshipRecommendationMutationOptions
  );

  const handleDismiss = () => {
    setIsDismissalLoading(true);
    if (isConnected) {
      delayLoadingEnd(() => {
        setIsDismissalLoading(false);
        deleteCard();
      });
    } else {
      updateCompanyRelationshipRecommendationStatus({
        variables: {
          id,
          status: CompanyRelationshipRecommendationStatus.DECLINED,
        },
      });
    }
  };

  const inviteButtonText = recommendedCompanyId
    ? t('networkSettings:quick-connect-invite-to-connect')
    : t('networkSettings:quick-connect-invite-to-join');

  const inviteLoadingButton = isInviteLoading ? (
    <StyledComponents.CardConnectButtonLoading disabled>
      <Spinner $size="16px" />
    </StyledComponents.CardConnectButtonLoading>
  ) : (
    <Button
      width="144px"
      maxHeight="16px"
      onClick={openInviteCompanyModal}
      color="secondary"
      disabled={isConnected}
    >
      {inviteButtonText}
    </Button>
  );

  const locationText = [region, country]
    .filter((text) => !!text)
    .map((str) => startCase(str?.toLowerCase()))
    .join(', ');

  return (
    <StyledComponents.QuickConnectCard>
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === FormType.INVITE_COMPANY && (
          <InviteCompanyForm
            onClose={closeModal}
            onCompleted={() => setIsConnected(true)}
            companyId={userCompany.id}
            relationshipType={relationshipType}
            initialCompany={{ duns, name }}
          />
        )}
      </Modal>
      {isDismissalLoading && (
        <StyledComponents.CardLoadingContainer>
          <Spinner $size="48px" />
        </StyledComponents.CardLoadingContainer>
      )}
      {!isDismissalLoading && (
        <>
          <StyledComponents.CardFirstRow>
            <StyledComponents.CardIconContainer color={color}>
              <BuildingOfficeIcon />
            </StyledComponents.CardIconContainer>
            <StyledComponents.CardDismiss
              onClick={handleDismiss}
              data-testid={`${selectors.cardDismissButton}-${id}`}
            >
              <Icon src="/cross.svg" alt={`Dismiss ${name}`} size={24} />
            </StyledComponents.CardDismiss>
          </StyledComponents.CardFirstRow>
          <StyledComponents.CardContent>
            <StyledComponents.CardTitle>
              {recommendedCompanyId ? (
                <NextLink href={`/company/${recommendedCompanyId}`}>
                  <Link href={`/company/${recommendedCompanyId}`}>{name}</Link>
                </NextLink>
              ) : (
                name
              )}
            </StyledComponents.CardTitle>
            {locationText && (
              <StyledComponents.CardLocationText>
                {locationText}
              </StyledComponents.CardLocationText>
            )}
            {sector && (
              <StyledComponents.CardSectorText>
                {sector}
              </StyledComponents.CardSectorText>
            )}
          </StyledComponents.CardContent>
          <StyledComponents.CardActionsContainer>
            {isConnected ? (
              <StyledComponents.CardConnectButtonCompleted>
                {t('networkSettings:quick-connect-invite-sent')}
              </StyledComponents.CardConnectButtonCompleted>
            ) : (
              inviteLoadingButton
            )}
          </StyledComponents.CardActionsContainer>
        </>
      )}
    </StyledComponents.QuickConnectCard>
  );
};
