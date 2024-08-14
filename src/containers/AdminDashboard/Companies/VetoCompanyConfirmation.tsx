import { useCallback, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Text } from 'components/Text';
import { AlizarinCrimson, Tundora } from 'styles/colours';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';
import { TransText } from 'utils/TransText';
import { trackEvent } from 'utils/analytics';
import { NEW_COMPANY_REVIEWED } from 'utils/analyticsEvents';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { InputError } from 'components/InputError';
import Button from 'components/Button';
import { CompanyStatus } from 'types/globalTypes';

import { useVetoCompany } from '../mutations';
import * as selectors from '../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  onClose: () => void;
  companyToVeto?: Company;
}

export const VetoCompanyConfirmation = ({ companyToVeto, onClose }: IProps) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');
  const b = <b />;

  const [vetoCompany, { loading: isVetoCompanyLoading }] = useVetoCompany({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:delete-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:veto-company-confirmation-toast-success'),
      });
      trackEvent(NEW_COMPANY_REVIEWED, {
        reviewedType: CompanyStatus.VETOED,
        companyId: companyToVeto?.id,
      });
      onClose();
    },
  });

  const onSubmit = useCallback(async () => {
    if (companyToVeto) {
      await vetoCompany({
        variables: {
          input: { companyId: companyToVeto.id },
        },
      });
    }
  }, [companyToVeto]);

  return (
    <StyledComponents.ConfirmationContentWrapper
      isXl
      data-testid={selectors.vetoCompanyConfirmationWrapper}
    >
      <StyledComponents.HeadingContainer>
        <StyledComponents.Heading>
          {t('companiesAdminDashboard:veto-company-confirmation-title')}
        </StyledComponents.Heading>
      </StyledComponents.HeadingContainer>
      <StyledComponents.TextContainer>
        <Text as="p" color={Tundora}>
          <TransText
            text={t(
              'companiesAdminDashboard:veto-company-confirmation-text[0]',
              {
                name: companyToVeto?.name,
              }
            )}
            components={{
              b,
            }}
          />
        </Text>
        <Text as="p" color={AlizarinCrimson}>
          {t('companiesAdminDashboard:veto-company-confirmation-text[1]')}
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
          disabled={isVetoCompanyLoading}
          onClick={onClose}
        >
          {t('companiesAdminDashboard:cancel-veto-company')}
        </Button>
        <Button
          width="auto"
          type="button"
          color="primary"
          data-testid={selectors.vetoOnSubmit}
          disabled={isVetoCompanyLoading}
          onClick={onSubmit}
        >
          {t('companiesAdminDashboard:confirm-veto-company')}
        </Button>
      </StyledComponents.StyledCTAContainer>
    </StyledComponents.ConfirmationContentWrapper>
  );
};

VetoCompanyConfirmation.defaultProps = {
  companyToVeto: undefined,
};
