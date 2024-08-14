import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { getGetMeMock } from 'mocks/me';
import { updateCompanyPrivacyVariables } from 'types/updateCompanyPrivacy';
import { CompanyPrivacy } from '.';
import {
  COMPANY_PRIVACY_CREATE_MUTATION,
  COMPANY_PRIVACY_UPDATE_MUTATION,
} from './mutations';
import { COMPANY_PRIVACY_QUERY } from './queries';
import { selectors } from './selectors';

describe('CompanyPrivacy Component', () => {
  const mockQuery = {
    request: {
      query: COMPANY_PRIVACY_QUERY,
      variables: {},
    },
    result: {
      data: {
        companyPrivacy: {
          allPlatform: false,
          customerNetwork: true,
          supplierNetwork: false,
        },
      },
    },
  };

  const setup = (mocks: ReadonlyArray<MockedResponse>) => {
    return render(
      <MockedProvider mocks={mocks}>
        <AuthenticatedUserProvider>
          <CompanyPrivacy />
        </AuthenticatedUserProvider>
      </MockedProvider>
    );
  };

  it('should render the input data on load', async () => {
    const mocks: MockedResponse[] = [getGetMeMock(), mockQuery];
    const { getByTestId } = setup(mocks);
    await waitFor(() => {
      const customerNetwork = getByTestId(
        `${selectors.customerNetwork}-input-input`
      );
      expect(customerNetwork).toBeChecked();
    });
    const supplierNetwork = getByTestId(
      `${selectors.supplierNetwork}-input-input`
    );
    const allPlatform = getByTestId(`${selectors.allPlatform}-input-input`);
    expect(supplierNetwork).not.toBeChecked();
    expect(allPlatform).not.toBeChecked();
  });

  it('renders the checkboxes disabled of the user does not have a SUPPLIER_EDITOR permission', async () => {
    const meMock = getGetMeMock({
      canSubmitDataPrivacyInfo: false,
    });
    const mocks: MockedResponse[] = [meMock, mockQuery];
    const { getByTestId } = setup(mocks);

    await waitFor(() => {
      expect(
        getByTestId(`${selectors.allPlatform}-input-input`)
      ).toBeInTheDocument();
    });
    expect(
      getByTestId(`${selectors.customerNetwork}-input-input`)
    ).toBeDisabled();
    expect(
      getByTestId(`${selectors.supplierNetwork}-input-input`)
    ).toBeDisabled();
    expect(getByTestId(`${selectors.allPlatform}-input-input`)).toBeDisabled();
  });

  it('should update company privacy on input change', async () => {
    const user = userEvent.setup({
      advanceTimers: () => jest.runOnlyPendingTimers(),
    });
    const updateVariables: updateCompanyPrivacyVariables = {
      input: {
        customerNetwork: true,
        allPlatform: true,
        supplierNetwork: false,
      },
    };
    const mocks: MockedResponse[] = [
      getGetMeMock(),
      mockQuery,
      {
        request: {
          query: COMPANY_PRIVACY_UPDATE_MUTATION,
          variables: {
            updateVariables,
          },
        },
        result: {
          data: {
            companyPrivacy: updateVariables.input,
          },
        },
      },
    ];
    const { getByTestId } = setup(mocks);

    await waitFor(() => {
      const customerNetwork = getByTestId(
        `${selectors.customerNetwork}-input-input`
      );
      expect(customerNetwork).toBeChecked();
    });

    const allPlatformCheckbox = getByTestId(
      `${selectors.allPlatform}-input-input`
    );
    await act(async () => {
      await user.click(allPlatformCheckbox);
    });

    // Gives time for debounce to occur
    jest.useFakeTimers();
    setTimeout(() => {
      expect(allPlatformCheckbox).toBeChecked();
    }, 1300);
    jest.runAllTimers();
  });

  it('updates all the fields to true when the allPlatform checkbox is checked', async () => {
    const user = userEvent.setup({
      advanceTimers: () => jest.runOnlyPendingTimers(),
    });
    const updateVariables: updateCompanyPrivacyVariables = {
      input: {
        customerNetwork: true,
        allPlatform: true,
        supplierNetwork: true,
      },
    };
    const mocks: MockedResponse[] = [
      getGetMeMock(),
      mockQuery,
      {
        request: {
          query: COMPANY_PRIVACY_UPDATE_MUTATION,
          variables: {
            updateVariables,
          },
        },
        result: {
          data: {
            companyPrivacy: updateVariables.input,
          },
        },
      },
    ];
    const { getByTestId } = setup(mocks);

    await waitFor(() => {
      const customerNetwork = getByTestId(
        `${selectors.customerNetwork}-input-input`
      );
      expect(customerNetwork).toBeChecked();
    });

    const allPlatformCheckbox = getByTestId(
      `${selectors.allPlatform}-input-input`
    );
    await act(async () => {
      await user.click(allPlatformCheckbox);
    });

    // Gives time for debounce to occur
    jest.useFakeTimers();
    setTimeout(() => {
      expect(allPlatformCheckbox).toBeChecked();
    }, 1300);
    jest.runAllTimers();
  });

  it('should create company privacy on input change', async () => {
    const user = userEvent.setup({
      advanceTimers: () => jest.runOnlyPendingTimers(),
    });
    const createVariables: updateCompanyPrivacyVariables = {
      input: {
        customerNetwork: false,
        allPlatform: true,
        supplierNetwork: false,
      },
    };
    const mocks: MockedResponse[] = [
      getGetMeMock(),
      {
        request: {
          query: COMPANY_PRIVACY_QUERY,
          variables: {},
        },
        result: {
          data: undefined,
        },
      },
      {
        request: {
          query: COMPANY_PRIVACY_CREATE_MUTATION,
          variables: {
            createVariables,
          },
        },
        result: {
          data: {
            companyPrivacy: createVariables.input,
          },
        },
      },
    ];

    const { getByTestId } = setup(mocks);

    await waitFor(() => {
      expect(
        getByTestId(`${selectors.allPlatform}-input-input`)
      ).toBeInTheDocument();
    });
    const allPlatformCheckbox = getByTestId(
      `${selectors.allPlatform}-input-input`
    );

    await waitFor(() => {
      expect(allPlatformCheckbox).not.toBeDisabled();
    });

    await act(async () => {
      await user.click(allPlatformCheckbox);
    });

    // Gives time for debounce to occur
    jest.useFakeTimers();
    setTimeout(() => {
      expect(allPlatformCheckbox).toBeChecked();
    }, 1300);
    jest.runAllTimers();
  });
});
