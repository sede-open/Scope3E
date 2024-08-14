import { NavigationGlobe } from 'components/Glyphs/NavigationGlobe';
import { MaterialSupport } from 'components/Glyphs/MaterialSupport';
import { AdminDashboardModalType } from 'containers/types';
import { CompanyStatus } from 'types/globalTypes';
import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';
import * as StyledComponents from '../styledComponents';

export const getAddUserOptions = (t: any) => [
  {
    label: (
      <StyledComponents.OptionContainer>
        <NavigationGlobe title="Navigation globe icon" />
        {t('usersAdminDashboard:external-user')}
      </StyledComponents.OptionContainer>
    ),
    value: AdminDashboardModalType.EXTERNAL_USER_FORM,
  },
  {
    label: (
      <StyledComponents.OptionContainer>
        <MaterialSupport title="Material support icon" />
        {t('usersAdminDashboard:internal-user')}
      </StyledComponents.OptionContainer>
    ),
    value: AdminDashboardModalType.INTERNAL_USER_FORM,
  },
];

export const getApprovedCompanyOptions = (
  companies: AdminCompaniesQuery_companies_data[]
) =>
  companies
    .filter(
      ({ status }) =>
        status === CompanyStatus.PENDING_USER_ACTIVATION ||
        status === CompanyStatus.ACTIVE
    )
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));
