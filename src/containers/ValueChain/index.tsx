import CogSpinner from 'components/CogSpinner';
import Modal from 'components/Modal';
import { Tab, TabList, TabsAlignment, TabSize } from 'components/Tabs';
import { CommunityBanner } from 'containers/CommunityBanner';
import { CloseModalType, ModalType } from 'context/ModalProvider/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useModal } from 'effects/useModal';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState } from 'react';
import { trackEvent } from 'utils/analytics';
import { COMMUNITY_BANNER_GO_TO_FORUM_BUTTON } from 'utils/analyticsEvents';
import { getEmissionYears } from 'utils/emissions';
import { displaySuccessMessage } from 'utils/toast';
import { AcceptAllocationForm } from './AcceptAllocationForm';
import {
  valueChainNavLinks,
  ValueChainRoutes,
  VALUE_CHAIN_ROUTE_PREFIX,
} from './constants';
import { Customers } from './Customers';
import { AllocateEmissionsForm } from './Customers/AllocateEmissionsForm';
import { DeleteAllocationForm } from './Customers/DeleteAllocationForm';
import { EmptyView } from './EmptyView';
import { EstimateYourFootprint, BuildYourSupplyChain } from './BannerContent';
import { PendingAllocations } from './PendingAllocations';
import { useCorporateEmissionsQuery } from './queries';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { Suppliers } from './Suppliers';
import { RequestAllocationForm } from './Suppliers/RequestAllocationForm';
import { NetworkSummary } from './NeworkSummary';
import { FormType, ModalState } from './types';
import { getYearOptionsWithEmissionsData } from './utils';

interface IProps {
  selectedTab: ValueChainRoutes;
}

export const ValueChain = ({ selectedTab }: IProps) => {
  const { t } = useTranslation();

  const {
    isValueChainCommunityBannerEnabled,
    isNetworkPageEnabled,
  } = useFlags();

  const { openModal } = useModal();

  const [showModal, setShowModal] = useState(true);

  const {
    canEditSupplyDashboard,
    company: userCompany,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;
  if (!companyId) {
    return null;
  }

  const {
    data: corporateEmissionsData,
    loading: isCorporateEmissionsDataLoading,
  } = useCorporateEmissionsQuery({ companyId });

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });
  const closeModal = () => {
    setModalState({
      isOpen: false,
    });
  };
  const onSuccess = () => {
    if (modalState.allocateEmissionsFormProps!.isEditing) {
      displaySuccessMessage({
        title: t('valueChain:allocation-form-toast-update-title-success'),
        subtitle: t('valueChain:allocation-form-toast-update-subtitle-success'),
      });
    } else if (showModal) {
      openModal({
        modalType: ModalType.EMISSION_ALLOCATION,
        onClose: (type) => {
          if (type === CloseModalType.LATER) {
            setShowModal(false);
          }
        },
      });
    } else {
      displaySuccessMessage({
        title: t('valueChain:allocation-form-toast-save-title-success'),
        subtitle: t('valueChain:allocation-form-toast-save-subtitle-success'),
      });
    }
    closeModal();
  };

  const allSelectYearOptions = getEmissionYears();

  const yearOptionsWithEmissionsData = corporateEmissionsData?.corporateEmissions
    ? getYearOptionsWithEmissionsData(corporateEmissionsData.corporateEmissions)
    : [];
  const shouldDisplayEmptyView =
    !isCorporateEmissionsDataLoading &&
    yearOptionsWithEmissionsData.length === 0;
  const shouldDisplayActiveState =
    !isCorporateEmissionsDataLoading && yearOptionsWithEmissionsData.length > 0;
  const onGoToForumClick = () => {
    trackEvent(COMMUNITY_BANNER_GO_TO_FORUM_BUTTON, {
      on: 'ValueChain',
    });
  };

  return (
    <StyledComponents.Wrapper data-testid={selectors.pageWrapper}>
      <StyledComponents.ValueChainIntroSection>
        {isNetworkPageEnabled ? (
          <>
            <StyledComponents.ValueChainBannerWoman $fullWidth={false}>
              <BuildYourSupplyChain />
            </StyledComponents.ValueChainBannerWoman>
            <StyledComponents.NetworkSummaryContainer>
              <NetworkSummary />
            </StyledComponents.NetworkSummaryContainer>
          </>
        ) : (
          <StyledComponents.ValueChainBannerGlobe $fullWidth>
            <EstimateYourFootprint />
          </StyledComponents.ValueChainBannerGlobe>
        )}
      </StyledComponents.ValueChainIntroSection>

      {isCorporateEmissionsDataLoading && <CogSpinner />}

      {shouldDisplayEmptyView && (
        <EmptyView shouldDisplayControls={canEditSupplyDashboard} />
      )}

      {shouldDisplayActiveState && (
        <>
          <TabList align={TabsAlignment.LEFT}>
            {valueChainNavLinks.map(({ label, link }) => (
              <Link
                key={link}
                href={`${VALUE_CHAIN_ROUTE_PREFIX}${link}`}
                passHref
              >
                <Tab
                  key={link}
                  data-testid={`tab-${link}`}
                  as="a"
                  align={TabsAlignment.LEFT}
                  size={TabSize.LARGE}
                  isSelected={selectedTab === link}
                  disabled={selectedTab === link}
                >
                  {t(label)}
                </Tab>
              </Link>
            ))}
          </TabList>

          <StyledComponents.TabContentContainer
            data-testid={selectors.tabContentContainer}
          >
            {selectedTab === ValueChainRoutes.PendingRequests && (
              <PendingAllocations setModalState={setModalState} />
            )}
            {selectedTab === ValueChainRoutes.Suppliers && (
              <Suppliers
                setModalState={setModalState}
                yearOptionsWithEmissionsData={yearOptionsWithEmissionsData}
              />
            )}
            {selectedTab === ValueChainRoutes.Customers && (
              <Customers
                setModalState={setModalState}
                yearOptions={yearOptionsWithEmissionsData}
              />
            )}
          </StyledComponents.TabContentContainer>
        </>
      )}

      {isValueChainCommunityBannerEnabled && (
        <StyledComponents.CommunityBannerWrapper>
          <CommunityBanner
            url="/tips-tricks"
            onGoToForumClick={onGoToForumClick}
          />
        </StyledComponents.CommunityBannerWrapper>
      )}

      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType === FormType.ALLOCATE_EMISSIONS && (
          <AllocateEmissionsForm
            allocation={modalState.allocateEmissionsFormProps!.allocation}
            isEditing={modalState.allocateEmissionsFormProps!.isEditing}
            onClose={closeModal}
            selectedYear={modalState.allocateEmissionsFormProps!.selectedYear}
            yearOptions={yearOptionsWithEmissionsData}
            onSuccess={onSuccess}
          />
        )}

        {modalState.formType === FormType.ACCEPT_ALLOCATION && (
          <AcceptAllocationForm
            isEditing={modalState.acceptAllocationFormProps!.isEditing}
            onClose={closeModal}
            allocation={modalState.acceptAllocationFormProps!.allocation}
          />
        )}

        {modalState.formType === FormType.DELETE_ALLOCATION && (
          <DeleteAllocationForm
            id={modalState.deleteAllocationFormProps!.id}
            onClose={closeModal}
          />
        )}

        {modalState.formType === FormType.REQUEST_ALLOCATION && (
          <RequestAllocationForm
            isEditing={modalState.requestAllocationFormProps!.isEditing}
            onClose={closeModal}
            allocation={modalState.requestAllocationFormProps!.allocation}
            selectedYear={modalState.requestAllocationFormProps!.selectedYear}
            yearOptions={allSelectYearOptions}
          />
        )}
      </Modal>
    </StyledComponents.Wrapper>
  );
};
