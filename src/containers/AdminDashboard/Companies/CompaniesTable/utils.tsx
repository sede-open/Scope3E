import moment from 'moment';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { Status } from 'components/Status';
import { CompanyStatus } from 'types/globalTypes';
import { ModalState } from '../../types';
import { CompanyUpdateActions } from './CompanyUpdateActions';
import * as StyledComponents from '../../AdminDashboardTable/styledComponents';

import { CompanyDisplayStatus } from './types';
import { CompanyUserDetails } from './CompanyUserDetails';
import { CompanyCreatedByUserDetails } from './CompanyCreatedByUserDetails';

export const companiesTableHeaders = [
  'companiesAdminDashboard:companies-table-header-company',
  'companiesAdminDashboard:companies-table-header-country',
  'companiesAdminDashboard:companies-table-header-user-details',
  'companiesAdminDashboard:companies-table-header-status',
  'companiesAdminDashboard:companies-table-header-actions',
];

export const getCompanyName = (company: Company) =>
  (
    <StyledComponents.NameContainer>
      {company.name}
    </StyledComponents.NameContainer>
  ) ?? '-';

export const getCompanyCountry = (company: Company) =>
  company.dnbCountry ?? '-';

export const getCompanyDisplayStatus = (status: CompanyStatus) => {
  switch (status) {
    case CompanyStatus.VETTING_IN_PROGRESS:
      return CompanyDisplayStatus.PENDING;
    case CompanyStatus.VETOED:
      return CompanyDisplayStatus.VETOED;
    case CompanyStatus.PENDING_USER_ACTIVATION:
      return CompanyDisplayStatus.PENDING_USER_ACTIVATION;
    default:
      return CompanyDisplayStatus.ACTIVE;
  }
};

export const getCompanyStatus = (company: Company) => {
  const displayStatus = getCompanyDisplayStatus(company.status);

  let pendingSince = '';
  if (displayStatus === CompanyDisplayStatus.PENDING) {
    pendingSince = moment(new Date(company.updatedAt)).format('D MMMM YYYY');
  }

  return (
    <Status
      status={displayStatus}
      statusSuffix={pendingSince}
      translationNamespace="companiesAdminDashboard"
      statusControls={null}
      key={company.id}
    />
  );
};

export const getInviteeDetails = (
  company: Company,
  setModalState: (state: ModalState) => void
) => (
  <StyledComponents.DetailsContainer key={company.id}>
    <CompanyUserDetails company={company} setModalState={setModalState} />
  </StyledComponents.DetailsContainer>
);

export const getCreatedByUserDetails = (company: Company) => {
  return (
    <StyledComponents.DetailsContainer key={company.id}>
      <CompanyCreatedByUserDetails company={company} />
    </StyledComponents.DetailsContainer>
  );
};

export const getCompanyActions = (
  setModalState: (state: ModalState) => void,
  company: Company
) => <CompanyUpdateActions setModalState={setModalState} company={company} />;

export interface GetTableRowProps {
  setModalState: (state: ModalState) => void;
  companiesList: Company[];
}

export const getCompaniesTableRows = ({
  companiesList,
  setModalState,
}: GetTableRowProps) =>
  companiesList.map((company) => [
    getCompanyName(company),
    getCompanyCountry(company),
    getInviteeDetails(company, setModalState),
    // getCreatedByUserDetails(company),
    getCompanyStatus(company),
    getCompanyActions(setModalState, company),
  ]);
