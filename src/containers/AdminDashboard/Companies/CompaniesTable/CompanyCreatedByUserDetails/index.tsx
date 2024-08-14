import useTranslation from 'next-translate/useTranslation';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';

import * as StyledComponents from '../CompanyUserDetails/styledComponents';

interface IProps {
  company: Company;
}

function isHexadecimal(str: string): boolean {
  // Define a regular expression pattern for a hexadecimal string
  const hexRegex = /^[0-9A-Fa-f]+$/g;

  // Test the input string against the regular expression
  return hexRegex.test(str);
}

export const CompanyCreatedByUserDetails = ({ company }: IProps) => {
  const { t } = useTranslation();
  if (company.createdByUser === null) {
    return <div>--</div>;
  }

  if (company.createdByUser) {
    const CBuser = company.createdByUser;
    const emailAddress = isHexadecimal(CBuser.email) ? '--' : CBuser.email;
    return (
      <>
        <div>{`${CBuser.firstName} ${CBuser.lastName}`}</div>
        <div>{emailAddress}</div>
      </>
    );
  }

  return (
    <StyledComponents.MultipleUserButton type="button">
      <StyledComponents.MultipleUserText>
        {`${company.createdByUser} ${t('companiesAdminDashboard:users')}`}
      </StyledComponents.MultipleUserText>
    </StyledComponents.MultipleUserButton>
  );
};
