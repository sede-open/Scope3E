import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { NEW_COMPANY_REVIEWED } from 'utils/analyticsEvents';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { Text } from 'components/Text';
import { TransText } from 'utils/TransText';
import { AlizarinCrimson, Tundora } from 'styles/colours';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { InputError } from 'components/InputError';
import Button from 'components/Button';
import { CompanyStatus } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';

import { useApproveCompany } from '../mutations';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  onClose: () => void;
  companyToApprove?: Company;
}

export const ApproveCompanyConfirmation = ({
  onClose,
  companyToApprove,
}: IProps) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');
  const b = <b />;

  const [
    approveCompany,
    { loading: isApproveCompanyLoading },
  ] = useApproveCompany({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:delete-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:approve-company-confirmation-toast-success'),
      });
      trackEvent(NEW_COMPANY_REVIEWED, {
        reviewedType: CompanyStatus.ACTIVE,
        companyId: companyToApprove?.id,
      });
      onClose();
    },
  });

  const onSubmit = useCallback(async () => {
    if (companyToApprove) {
      await approveCompany({
        variables: {
          input: { companyId: companyToApprove.id },
        },
      });
    }
  }, [companyToApprove]);

  return (
    <StyledComponents.ConfirmationContentWrapper
      isXl
      data-testid={selectors.approveCompanyConfirmationWrapper}
    >
      <StyledComponents.HeadingContainer>
        <StyledComponents.Heading>
          {t('companiesAdminDashboard:approve-company-confirmation-title')}
        </StyledComponents.Heading>
      </StyledComponents.HeadingContainer>
      <StyledComponents.TextContainer>
        <Text as="p" color={Tundora}>
          <TransText
            text={t(
              'companiesAdminDashboard:approve-company-confirmation-text[0]',
              {
                name: companyToApprove?.name,
              }
            )}
            components={{
              b,
            }}
          />
        </Text>
        <Text as="p" color={AlizarinCrimson}>
          {t('companiesAdminDashboard:approve-company-confirmation-text[1]')}
        </Text>
      </StyledComponents.TextContainer>
      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.companyApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>
      <StyledComponents.StyledCTAContainer>
        <Button
          width="auto"
          color="secondary"
          disabled={isApproveCompanyLoading}
          onClick={onClose}
        >
          {t('companiesAdminDashboard:cancel-approve-company')}
        </Button>
        <Button
          width="auto"
          type="button"
          color="primary"
          data-testid={selectors.approveOnSubmit}
          disabled={isApproveCompanyLoading}
          onClick={onSubmit}
        >
          {t('companiesAdminDashboard:confirm-approve-company')}
        </Button>
      </StyledComponents.StyledCTAContainer>
    </StyledComponents.ConfirmationContentWrapper>
  );
};

ApproveCompanyConfirmation.defaultProps = {
  companyToApprove: undefined,
};
