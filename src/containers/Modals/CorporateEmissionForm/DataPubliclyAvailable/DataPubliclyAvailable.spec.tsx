import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';
import {
  DataPubliclyAvailable,
  DataPubliclyAvailableProps,
  EmissionPrivacyType,
} from '.';
import corporateEmissionForm from '../../../../../locales/en/corporateEmissionForm.json';
import { FormValues } from '../types';

interface WrapperProps {
  dataPubliclyAvailableProps?: Partial<DataPubliclyAvailableProps>;
  defaultValues?: Partial<FormValues>;
}

const Wrapper = ({
  dataPubliclyAvailableProps,
  defaultValues,
}: WrapperProps) => {
  const formMethods = useForm<FormValues>({ defaultValues });
  return (
    <I18nProvider
      namespaces={{
        corporateEmissionForm,
      }}
    >
      <FormProvider {...formMethods}>
        <DataPubliclyAvailable
          control={formMethods.control}
          {...dataPubliclyAvailableProps}
        />
      </FormProvider>
    </I18nProvider>
  );
};

describe('Data Publicly Available Input', () => {
  it('should render out privacy type options', async () => {
    const { queryByText } = render(<Wrapper />);
    const noOption = queryByText(
      corporateEmissionForm['privacy-type-option-no']
    );
    expect(noOption).not.toBeNull();
    const yesOption = queryByText(
      corporateEmissionForm['privacy-type-option-yes']
    );
    expect(yesOption).not.toBeNull();
  });

  it('should show type of data checkboxes and public link when privacy is yes', async () => {
    const { getByText, queryByText } = render(<Wrapper />);
    const yesOption = getByText(
      corporateEmissionForm['privacy-type-option-yes']
    );
    await userEvent.click(yesOption);
    const scope1And2 = queryByText(
      corporateEmissionForm['type-of-data-publicly-available-option-scope1-2']
    );
    const scope3 = queryByText(
      corporateEmissionForm['type-of-data-publicly-available-option-scope3']
    );
    const offset = queryByText(
      corporateEmissionForm['type-of-data-publicly-available-option-offset']
    );
    const intensity = queryByText(
      corporateEmissionForm['type-of-data-publicly-available-option-intensity']
    );
    const publicLink = queryByText(corporateEmissionForm['public-link-label']);
    expect(scope1And2).not.toBeNull();
    expect(scope3).not.toBeNull();
    expect(offset).not.toBeNull();
    expect(intensity).not.toBeNull();
    expect(publicLink).not.toBeNull();
  });

  it('should show public link error', () => {
    const publicLinkError: FieldError = {
      message: corporateEmissionForm['public-link-error'],
      type: 'required',
    };
    const { queryByText } = render(
      <Wrapper
        dataPubliclyAvailableProps={{ publicLinkError }}
        defaultValues={{ privacyType: EmissionPrivacyType.Public }}
      />
    );
    const error = queryByText(corporateEmissionForm['public-link-error']);
    expect(error).not.toBeNull();
  });

  it('should show public link error', () => {
    const privacyError: FieldError = {
      message: corporateEmissionForm['privacy-type-error'],
      type: 'required',
    };
    const { queryByText } = render(
      <Wrapper
        dataPubliclyAvailableProps={{ privacyError }}
        defaultValues={{ privacyType: EmissionPrivacyType.Private }}
      />
    );
    const error = queryByText(corporateEmissionForm['privacy-type-error']);
    expect(error).not.toBeNull();
  });
});
