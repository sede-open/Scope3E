import useTranslation from 'next-translate/useTranslation';

import { ModalContent } from 'components/ModalContent';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { getRoleTypeFromRoles } from 'utils/roleHelpers';

import * as StyledComponents from './styledComponents';
import * as selectors from '../../selectors';

interface IProps {
  company?: Company;
}

export const CompanyUsers = ({ company }: IProps) => {
  const { t } = useTranslation();

  if (!company) {
    return null;
  }

  return (
    <ModalContent
      dataTestId={selectors.companyUsersModal}
      title={t('companiesAdminDashboard:user-details')}
      subtitle={t('companiesAdminDashboard:company-has-users', {
        company: company.name,
        userCount: company.users.length,
      })}
    >
      {company.users.map((user) => {
        const role = getRoleTypeFromRoles(user.roles?.map((r) => r.name) ?? []);
        return (
          <StyledComponents.UserCard key={user.id}>
            <StyledComponents.UserCardLeft>
              <StyledComponents.UserName>
                {`${user.firstName} ${user.lastName}`}
              </StyledComponents.UserName>
              <StyledComponents.UserEmail>
                {user.email}
              </StyledComponents.UserEmail>
            </StyledComponents.UserCardLeft>
            <StyledComponents.UserRole>
              {t(`companiesAdminDashboard:${role}`)}
            </StyledComponents.UserRole>
          </StyledComponents.UserCard>
        );
      })}
    </ModalContent>
  );
};

CompanyUsers.defaultProps = {
  company: undefined,
};
