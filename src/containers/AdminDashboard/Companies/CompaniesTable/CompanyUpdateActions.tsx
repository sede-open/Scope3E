import useTranslation from 'next-translate/useTranslation';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { CompanyStatus } from 'types/globalTypes';
import * as StyledComponents from 'containers/AdminDashboard/AdminDashboardTable/styledComponents';
import { ModalState, ModalType } from '../../types';
import * as selectors from '../../selectors';

export const CompanyUpdateActions = ({
  setModalState,
  company,
}: {
  setModalState: (state: ModalState) => void;
  company: Company;
}) => {
  const { t } = useTranslation();
  const isVettingInProgressStatus =
    company.status === CompanyStatus.VETTING_IN_PROGRESS;

  const onApproveCompany = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.APPROVE_COMPANY_CONFIRMATION_FORM,
      approveCompanyConfirmationFormProps: {
        company,
      },
    });
  };

  const onVetoConfirmation = async () => {
    setModalState({
      isOpen: true,
      formType: ModalType.VETO_COMPANY_CONFIRMATION_FORM,
      vetoCompanyConfirmationFormProps: {
        company,
      },
    });
  };

  return (
    <StyledComponents.ButtonContainer>
      {isVettingInProgressStatus && (
        <>
          <StyledComponents.TableButton
            data-testid={selectors.approveCompanyActionsBtn}
            onClick={onApproveCompany}
          >
            {t('common:approve')}
          </StyledComponents.TableButton>
          <div> / </div>
          <StyledComponents.TableButton
            data-testid={selectors.vetoCompanyActionsBtn}
            onClick={onVetoConfirmation}
          >
            {t('common:veto')}
          </StyledComponents.TableButton>
        </>
      )}
    </StyledComponents.ButtonContainer>
  );
};
