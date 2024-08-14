import { ModalState, ModalType } from 'containers/AdminDashboard/types';
import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';

import * as StyledComponents from './styledComponents';

interface IProps {
  company: Company;
  setModalState: (state: ModalState) => void;
}

export const CompanyUserDetails = ({ company, setModalState }: IProps) => {
  const { t } = useTranslation();

  if (company.users.length === 0) {
    return <div>--</div>;
  }

  if (company.users.length === 1) {
    const user = company.users[0];
    return (
      <>
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div>{user.email}</div>
      </>
    );
  }

  const handleUsersClick = useCallback(() => {
    setModalState({
      formType: ModalType.COMPANY_USER_DETAILS,
      isOpen: true,
      companyUserDetailsProps: { company },
    });
  }, [company]);

  return (
    <StyledComponents.MultipleUserButton
      type="button"
      onClick={handleUsersClick}
    >
      <StyledComponents.MultipleUserText>
        {`${company.users.length} ${t('companiesAdminDashboard:users')}`}
      </StyledComponents.MultipleUserText>
    </StyledComponents.MultipleUserButton>
  );
};
