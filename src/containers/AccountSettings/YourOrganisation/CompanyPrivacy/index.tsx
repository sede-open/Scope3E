import { ApolloError } from '@apollo/client';
import { CheckboxField } from 'components/Form/Fields/CheckboxField';
import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { Link } from 'components/Link';
import { TextBold, TextNormal } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useDebounce } from 'hooks/useDebounce';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { companyPrivacy_companyPrivacy as ICompanyPrivacyData } from 'types/companyPrivacy';
import { abcdLocaleToZendeskLocale, Locale } from 'utils/i18n';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { ZENDESK_SUPPLYCHAINS_HELPCENTRE_LINK } from '../../../../constants';
import * as StyledComponents from '../styledComponents';
import {
  useCreateCompanyPrivacyMutation,
  useUpdateCompanyPrivacyMutation,
} from './mutations';
import { useCompanyPrivacyQuery } from './queries';
import { selectors } from './selectors';

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxField>,
  'onChange'
> & {
  id: keyof ICompanyPrivacyData;
};

export const CompanyPrivacy = () => {
  const { t } = useTranslation();
  const { canSubmitDataPrivacyInfo } = useAuthenticatedUser();

  const onError = (error: ApolloError) => {
    console.debug({ error });
    displayErrorMessage({
      title: t('accountSettings:your-organisation-company-privacy-error'),
    });
  };

  const onCompleted = () => {
    displaySuccessMessage({
      title: t('accountSettings:your-organisation-company-privacy-success'),
    });
  };

  const { locale } = useRouter();

  const [formData, setFormData] = useState<ICompanyPrivacyData>({
    allPlatform: false,
    supplierNetwork: false,
    customerNetwork: false,
  });
  const { data: companyPrivacy } = useCompanyPrivacyQuery({
    onError,
    onCompleted: (data) => {
      if (!data?.companyPrivacy) return;
      setFormData({
        allPlatform: data.companyPrivacy.allPlatform,
        customerNetwork: data.companyPrivacy.customerNetwork,
        supplierNetwork: data.companyPrivacy.supplierNetwork,
      });
    },
  });

  const [createCompanyPrivacy] = useCreateCompanyPrivacyMutation({
    onError,
    onCompleted,
  });

  const [updateCompanyPrivacy] = useUpdateCompanyPrivacyMutation({
    onError,
    onCompleted,
  });

  const debounce = useDebounce();

  const updateForm = async (key: keyof ICompanyPrivacyData, value: boolean) => {
    const formValues: ICompanyPrivacyData =
      key === 'allPlatform' && value
        ? { allPlatform: true, supplierNetwork: true, customerNetwork: true }
        : { ...formData, [key]: value };
    setFormData(formValues);
    const saveFunction = companyPrivacy?.companyPrivacy
      ? updateCompanyPrivacy
      : createCompanyPrivacy;

    debounce(() => {
      saveFunction({
        variables: { input: formValues },
      });
    }, 1000);
  };

  const options: CheckboxProps[] = [
    {
      label: t(
        'accountSettings:your-organisation-company-privacy-option-platfrom'
      ),
      dataTestId: selectors.allPlatform,
      id: 'allPlatform',
      isChecked: formData.allPlatform,
    },
    {
      label: t(
        'accountSettings:your-organisation-company-privacy-option-supplier'
      ),
      dataTestId: selectors.supplierNetwork,
      id: 'supplierNetwork',
      isChecked: formData.supplierNetwork,
    },
    {
      label: t(
        'accountSettings:your-organisation-company-privacy-option-customer'
      ),
      dataTestId: selectors.customerNetwork,
      id: 'customerNetwork',
      isChecked: formData.customerNetwork,
    },
  ];

  const zendeskLocaleSuffix = locale
    ? abcdLocaleToZendeskLocale[locale as Locale]
    : abcdLocaleToZendeskLocale.en;
  const path = `${ZENDESK_SUPPLYCHAINS_HELPCENTRE_LINK}/${zendeskLocaleSuffix}`;

  return (
    <StyledComponents.YourOrganisationPanelWrapper>
      <StyledComponents.HeaderContainer>
        <TextBold>
          {t('accountSettings:your-organisation-company-privacy-header')}
        </TextBold>
      </StyledComponents.HeaderContainer>
      <StyledComponents.SubHeaderContainer>
        <TextNormal>
          <Trans
            components={[
              <Link
                href={path}
                target="_blank"
                rel="noreferrer"
                aria-label="Link to help center FAQ"
              />,
            ]}
            i18nKey="accountSettings:your-organisation-company-privacy-sub-header"
          />
        </TextNormal>
      </StyledComponents.SubHeaderContainer>
      <StyledComponents.PanelBodyContainer flexDirection="column">
        <StyledComponents.LabelContainer>
          <InputLabel>
            {t('accountSettings:your-organisation-company-privacy-question')}
          </InputLabel>
        </StyledComponents.LabelContainer>
        <FormField testIdPrefix={selectors.companyPrivacy}>
          {options.map((option) => {
            return (
              <CheckboxField
                key={option.id}
                dataTestId={option.dataTestId}
                id={option.id}
                label={option.label}
                isChecked={option.isChecked}
                isDisabled={!canSubmitDataPrivacyInfo}
                onChange={(value) => updateForm(option.id, value)}
              />
            );
          })}
        </FormField>
      </StyledComponents.PanelBodyContainer>
    </StyledComponents.YourOrganisationPanelWrapper>
  );
};
