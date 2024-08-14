import Button from 'components/Button';
import { CardHeader } from 'components/CardHeader';
import Modal from 'components/Modal';
import { SortableTable } from 'components/SortableTable';
import { Text } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import { OptionsType } from 'react-select';
import { Scorpion } from 'styles/colours';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipWithSharedDataQuery_companyRelationships } from 'types/CompanyRelationshipWithSharedDataQuery';
import {
  AmbitionPrivacyStatus,
  CompanyRelationshipType,
  InviteStatus,
} from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  INVITE_YOUR_CUSTOMER_NETWORK_BUTTON_CLICKED,
  INVITE_YOUR_SUPPLIER_NETWORK_BUTTON_CLICKED,
} from 'utils/analyticsEvents';
import { CreateRelationshipForm } from '../CreateRelationshipForm';
import { InviteCompanyForm } from '../InviteCompanyForm';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';
import { CreateNetworkCardHeader } from './CreateNetworkCardHeader';
import { NetworkTableHeader } from './NetworkTableHeader';
import {
  FormType,
  IModalState,
  IProps,
  NetworkOptionType,
  TableColumnNames,
} from './types';
import {
  convertRowsToOptions,
  filterRowsByOptions,
  getNetworkTableHeaders,
  getTableHeaders,
  getTableRows,
  getTableRowsSharedData,
  sortCompanyRelationships,
} from './utils';

export const OutgoingRelationships = ({
  relationships,
  relationshipType,
}: IProps) => {
  const { t } = useTranslation();
  const { isNetworkPageEnabled } = useFlags();
  const { isCompanyOverviewEnabled } = useFlags();
  const [searchOptions, setSearchOptions] = useState<
    OptionsType<NetworkOptionType>
  >([]);

  const {
    company: userCompany,
    canEditCompanyRelationships,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId) {
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

  const reSendInvite = (
    relationship: CompanyRelationshipsQuery_companyRelationships
  ) => {
    setModalState({
      isOpen: true,
      formType: FormType.CREATE_RELATIONSHIP,
      formProps: {
        existingRelationship: relationship,
      },
    });
  };

  const openInviteCompanyModal = useCallback(() => {
    if (relationshipType === CompanyRelationshipType.CUSTOMER) {
      trackEvent(INVITE_YOUR_CUSTOMER_NETWORK_BUTTON_CLICKED);
    } else {
      trackEvent(INVITE_YOUR_SUPPLIER_NETWORK_BUTTON_CLICKED);
    }

    setModalState({
      isOpen: true,
      formType: FormType.INVITE_COMPANY,
    });
  }, []);

  const relationshipTypeKey = relationshipType.toLowerCase();
  const sortedRelationships = sortCompanyRelationships(
    relationships
  ) as CompanyRelationshipWithSharedDataQuery_companyRelationships[];
  const rows = isNetworkPageEnabled
    ? getTableRowsSharedData({
        canEditCompanyRelationships,
        companyRelationships: sortedRelationships,
        companyId,
        relationshipType,
        reSendInvite,
        t,
        isCompanyOverviewEnabled,
      })
    : getTableRows({
        canEditCompanyRelationships,
        companyRelationships: sortedRelationships,
        companyId,
        relationshipType,
        reSendInvite,
      });

  const filteredRows = filterRowsByOptions(rows, searchOptions);

  const totalRelations = sortedRelationships.filter(
    (relationship) => relationship.status === InviteStatus.APPROVED
  );

  const totalRelationsWithAmbitions = totalRelations.filter(
    (relationship) =>
      relationship.ambitionPrivacyStatus &&
      (relationship.ambitionPrivacyStatus === AmbitionPrivacyStatus.SHARED ||
        relationship.ambitionPrivacyStatus ===
          AmbitionPrivacyStatus.SHARED_SBTI)
  );

  const totalRelationsWithSBTI = totalRelationsWithAmbitions.filter(
    (relationship) =>
      relationship.ambitionPrivacyStatus === AmbitionPrivacyStatus.SHARED_SBTI
  );

  const dropdownOptions = convertRowsToOptions(rows, relationshipType, t);
  const hasRelationships = relationships.length > 0;

  const headers = isNetworkPageEnabled
    ? getNetworkTableHeaders()
    : getTableHeaders();
  return (
    <StyledComponents.RelationshipsCard withContent={hasRelationships}>
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === FormType.CREATE_RELATIONSHIP && (
          <CreateRelationshipForm
            companyId={companyId}
            existingRelationship={modalState.formProps?.existingRelationship}
            onClose={closeModal}
            openInviteCompanyModal={openInviteCompanyModal}
            relationshipType={relationshipType}
          />
        )}

        {modalState.formType === FormType.INVITE_COMPANY && (
          <InviteCompanyForm
            onClose={closeModal}
            companyId={companyId}
            relationshipType={relationshipType}
          />
        )}
      </Modal>

      {hasRelationships && isNetworkPageEnabled && (
        <NetworkTableHeader
          relationshipType={relationshipType}
          canEditCompanyRelationships={canEditCompanyRelationships}
          totalRelations={totalRelations.length}
          totalRelationsWithAmbitions={totalRelationsWithAmbitions.length}
          totalRelationsWithSBTI={totalRelationsWithSBTI.length}
          openInviteCompanyModal={openInviteCompanyModal}
          dropdownOptions={dropdownOptions}
          onDropdownValueChange={(value) =>
            setSearchOptions(
              (value as unknown) as OptionsType<NetworkOptionType>
            )
          }
          dropdownValues={searchOptions}
        />
      )}
      {!hasRelationships && isNetworkPageEnabled && (
        <CreateNetworkCardHeader
          canEditCompanyRelationships={canEditCompanyRelationships}
          relationshipType={relationshipType}
          openInviteCompanyModal={openInviteCompanyModal}
        />
      )}
      {!isNetworkPageEnabled && (
        <CardHeader>
          <StyledComponents.TextContainer>
            <StyledComponents.Title>
              {t(`companyRelationships:${relationshipTypeKey}-title`)}
            </StyledComponents.Title>
            <Text color={Scorpion}>
              {t(`companyRelationships:${relationshipTypeKey}-subtitle`)}
            </Text>
          </StyledComponents.TextContainer>
          {canEditCompanyRelationships && (
            <Button
              onClick={openInviteCompanyModal}
              data-testid={selectors.newInviteFormButton}
            >
              {t('companyRelationships:invite')}
            </Button>
          )}
        </CardHeader>
      )}
      {hasRelationships && (
        <SortableTable
          dataTestId={selectors.companyRelationshipsTable}
          defaultSortColumn={TableColumnNames.STATUS}
          headers={headers.map((header) => ({
            ...header,
            cell: t(header.cell).toUpperCase(),
          }))}
          rows={filteredRows}
        />
      )}
    </StyledComponents.RelationshipsCard>
  );
};
