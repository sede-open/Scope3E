import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import RedirectTo from 'components/RedirectTo';
import CogSpinner from 'components/CogSpinner';
import Modal from 'components/Modal';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import { ModalState, ModalType } from '../types';
import { CompaniesTable } from './CompaniesTable/CompaniesTable';
import { useAdminCompaniesQuery } from '../queries';
import { VetoCompanyConfirmation } from './VetoCompanyConfirmation';
import { ApproveCompanyConfirmation } from './ApproveCompanyConfirmation';
import { CompanyUsers } from './CompanyUsers';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../selectors';
import {
  getActiveCompanies,
  getPendingUserActivationCompanies,
  getVetoedCompanies,
  getVettingInProgressCompanies,
} from './utils';

export const CompaniesDashboard = () => {
  const LIMIT = 1000;
  const { t } = useTranslation();
  const { canViewCompaniesAdminDashboard } = useAuthenticatedUser();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  const selectedCompany =
    modalState.approveCompanyConfirmationFormProps?.company ||
    modalState.vetoCompanyConfirmationFormProps?.company;

  const {
    data: companiesAdminDashboardData,
    fetchMore,
    loading: isDashboardDataLoading,
  } = useAdminCompaniesQuery({
    offset: 0,
    limit: LIMIT,
  });

  useEffect(() => {
    if (
      companiesAdminDashboardData &&
      companiesAdminDashboardData.companies.total >
        companiesAdminDashboardData.companies.data.length
    ) {
      fetchMore({
        variables: {
          offset: companiesAdminDashboardData.companies.data.length,
          limit: LIMIT,
        },
      });
    }
  }, [companiesAdminDashboardData, LIMIT, fetchMore]);

  if (!canViewCompaniesAdminDashboard) {
    return <RedirectTo url="/forbidden" />;
  }

  if (isDashboardDataLoading) {
    return <CogSpinner />;
  }

  if (!companiesAdminDashboardData) {
    return null;
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
    });
  };

  const filteredVettingInProgressCompanies = getVettingInProgressCompanies(
    companiesAdminDashboardData.companies.data
  );

  const filteredVetoedCompanies = getVetoedCompanies(
    companiesAdminDashboardData.companies.data
  );
  const filteredPendingUserActivationCompanies = getPendingUserActivationCompanies(
    companiesAdminDashboardData.companies.data
  );
  const filteredActiveCompanies = getActiveCompanies(
    companiesAdminDashboardData.companies.data
  );

  const filteredCompanies = [
    ...filteredVettingInProgressCompanies,
    ...filteredPendingUserActivationCompanies,
    ...filteredVetoedCompanies,
    ...filteredActiveCompanies,
  ];

  return (
    <div data-testid={selectors.companiesDashboard}>
      <StyledComponents.Header>
        <StyledComponents.Heading>
          {t('companiesAdminDashboard:companies-dashboard-heading')}
        </StyledComponents.Heading>
        <StyledComponents.Subtitle>
          {t('companiesAdminDashboard:companies-dashboard-subtitle')}
        </StyledComponents.Subtitle>
      </StyledComponents.Header>
      <CompaniesTable
        companiesList={filteredCompanies}
        setModalState={setModalState}
      />
      <Modal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.formType ===
          ModalType.APPROVE_COMPANY_CONFIRMATION_FORM && (
          <ApproveCompanyConfirmation
            companyToApprove={selectedCompany}
            onClose={closeModal}
          />
        )}
        {modalState.formType === ModalType.VETO_COMPANY_CONFIRMATION_FORM && (
          <VetoCompanyConfirmation
            companyToVeto={selectedCompany}
            onClose={closeModal}
          />
        )}
        {modalState.formType === ModalType.COMPANY_USER_DETAILS && (
          <CompanyUsers company={modalState.companyUserDetailsProps?.company} />
        )}
      </Modal>
    </div>
  );
};
export default CompaniesDashboard;
