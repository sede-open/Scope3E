import { fireEvent, act, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import selectEvent from 'react-select-event';
import I18nProvider from 'next-translate/I18nProvider';

import * as toast from 'utils/toast';
import {
  EmissionAllocationDirection,
  EmissionAllocationMethod,
} from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { USER_COMPANY_ID } from 'mocks/constants';
import * as corporateEmissionsMocks from 'mocks/corporateEmissions';
import * as updateEmissionAllocationMocks from 'mocks/updateEmissionAllocation';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import * as categoriesMocks from 'mocks/categories';
import { formatInteger } from 'utils/number';
import * as modalFormSelectors from 'components/ModalForm/selectors';
import * as radioInputFieldSelectors from 'components/Form/Fields/RadioInputField/selectors';

import valueChainNamespace from '../../../../locales/en/valueChain.json';
import commonNamespace from '../../../../locales/en/common.json';
import { AcceptAllocationForm } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/toast');

const mockOnClose = jest.fn();
const corporateEmission = {
  id: 'emission-0',
  scope1: 1001,
  scope2: 1002,
  scope3: 1003,
  offset: 1000,
  year: 2020,
};
const corporateEmissionMock = corporateEmissionsMocks.getCorporateEmissions([
  corporateEmission,
]);

const emissionAllocation = {
  ...emissionAllocationsMocks.approvedEmissionAllocation,
  allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  emissions: 1000,
  category: null,
};

const emissionAllocationsMock = emissionAllocationsMocks.getApprovedEmissionAllocationsForYearMock(
  {
    emissionAllocations: [
      {
        ...emissionAllocation,
        emissions: 1,
      },
    ],
    year: 2020,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
  }
);

const setup = ({
  allocation = emissionAllocation,
  isEditing = false,
  mocks = [],
}: {
  allocation?: EmissionAllocationsQuery_emissionAllocations;
  isEditing?: boolean;
  mocks?: any[];
}) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider
        mocks={[
          categoriesMocks.categoriesMock,
          corporateEmissionMock,
          emissionAllocationsMock,
          ...mocks,
        ]}
        addTypename={false}
      >
        <AcceptAllocationForm
          allocation={allocation}
          isEditing={isEditing}
          onClose={mockOnClose}
        />
      </MockedProvider>
    </I18nProvider>
  );

const getFormattedEmissions = (emissions: number) =>
  `${formatInteger(emissions)} tCO2e`;
const getAllocationMethodString = (status: string) =>
  valueChainNamespace[
    `allocation-method-${status}` as keyof typeof valueChainNamespace
  ];

describe('AcceptAllocationForm', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: USER_COMPANY_ID },
      canEditSupplyDashboard: true,
    }));
  });

  it('should display the allocation details', async () => {
    const { findByText } = setup({});

    expect(
      await findByText(emissionAllocation.supplier!.name)
    ).toBeInTheDocument();
    expect(
      await findByText(String(emissionAllocation.year))
    ).toBeInTheDocument();
    expect(
      await findByText(getFormattedEmissions(emissionAllocation.emissions))
    ).toBeInTheDocument();
    expect(
      await findByText(
        getAllocationMethodString(emissionAllocation.allocationMethod)
      )
    ).toBeInTheDocument();
  });

  it('should correctly display the new scope 3 value for both scope 3 total options', async () => {
    const { findByTestId } = setup({});

    expect(
      await findByTestId(selectors.addToTotalRadioSublabel)
    ).toHaveTextContent(
      getFormattedEmissions(
        emissionAllocation.emissions + corporateEmission.scope3
      )
    );

    expect(
      await findByTestId(selectors.includeInTotalRadioSublabel)
    ).toHaveTextContent(getFormattedEmissions(corporateEmission.scope3));
  });

  describe('when the allocation amount is less than than the current unallocated scope 3 emissions for that year', () => {
    it('should not disable the "Include in scope 3 total" option', async () => {
      const { findByTestId } = setup({});

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.includeInTotalRadio
          )
        )
      ).not.toHaveAttribute('disabled');
    });

    it('should not display the disabled "Include in scope 3 total" label state', async () => {
      const { queryByTestId } = setup({});

      await waitFor(() => {
        expect(
          queryByTestId(selectors.includeInTotalRadioSublabelDisabled)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when the allocation amount is greater than the current unallocated scope 3 emissions for that year', () => {
    it('should disable the "Include in scope 3 total" option', async () => {
      const { findByTestId } = setup({
        allocation: {
          ...emissionAllocation,
          emissions: 1003,
        },
      });

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.includeInTotalRadio
          )
        )
      ).toHaveAttribute('disabled');
    });

    it('should display the disabled "Include in scope 3 total" label state', async () => {
      const { queryByTestId } = setup({
        allocation: {
          ...emissionAllocation,
          emissions: 1003,
        },
      });

      await waitFor(() => {
        expect(
          queryByTestId(selectors.includeInTotalRadioSublabelDisabled)
        ).toBeInTheDocument();
      });
    });
  });

  it('should display the correct title and submit button text', async () => {
    const { findByTestId } = setup({
      allocation: emissionAllocation,
    });

    expect(
      await findByTestId(
        modalFormSelectors.getTitleSelector(selectors.allocateEmissionsForm)
      )
    ).toHaveTextContent('Accept allocation');
    expect(
      await findByTestId(selectors.allocateEmissionsSubmit)
    ).toHaveTextContent('Accept');
  });

  describe('when the allocation does not have a category set', () => {
    it('should default the category select value if a category is already set', async () => {
      const { findByTestId } = setup({
        allocation: emissionAllocation,
      });

      expect(
        await findByTestId(
          modalFormSelectors.getFormSelector(selectors.allocateEmissionsForm)
        )
      ).toHaveFormValues({
        emissionsCategory:
          categoriesMocks.categoriesMock.result.data.categories[0].id,
      });
    });
  });

  describe('when the allocation has a category set', () => {
    it('should default the category select value if a category is already set', async () => {
      const selectedCategory =
        categoriesMocks.categoriesMock.result.data.categories[2];
      const { findByTestId } = setup({
        allocation: {
          ...emissionAllocation,
          category: selectedCategory,
        },
      });

      expect(
        await findByTestId(
          modalFormSelectors.getFormSelector(selectors.allocateEmissionsForm)
        )
      ).toHaveFormValues({
        emissionsCategory: selectedCategory.id,
      });
    });
  });

  it('should display the correct new scope 3 values', async () => {
    const { findByTestId } = setup({
      allocation: emissionAllocation,
    });
    const addedValue = corporateEmission.scope3 + emissionAllocation.emissions;
    const includedValue = corporateEmission.scope3;

    expect(
      await findByTestId(selectors.addToTotalRadioSublabel)
    ).toHaveTextContent(
      `Your new scope 3 will be ${getFormattedEmissions(addedValue)}`
    );
    expect(
      await findByTestId(selectors.includeInTotalRadioSublabel)
    ).toHaveTextContent(
      `Your new scope 3 will be ${getFormattedEmissions(includedValue)}`
    );
  });

  it('should not display downstream categories', async () => {
    const { findByLabelText, queryAllByText, queryByText } = setup({
      allocation: emissionAllocation,
    });

    const categoryInput = await findByLabelText('Emissions category');

    await selectEvent.openMenu(categoryInput);

    const upstreamCategories = [0, 1, 2, 3, 4].map(async (index) =>
      expect(
        await queryAllByText(
          categoriesMocks.categoriesMock.result.data.categories[index].name
        )
      ).not.toHaveLength(0)
    );

    await Promise.all(upstreamCategories);

    const downstreamCategories = [5, 6, 7].map((index) =>
      expect(
        queryByText(
          categoriesMocks.categoriesMock.result.data.categories[index].name
        )
      ).not.toBeInTheDocument()
    );

    await Promise.all(downstreamCategories);
  });

  describe('when the form is successfully submitted', () => {
    const selectedCategory =
      categoriesMocks.categoriesMock.result.data.categories[3];
    const successMock = updateEmissionAllocationMocks.getAcceptEmissionAllocationMock(
      {
        addedToCustomerScopeTotal: false,
        allocationMethod: emissionAllocation.allocationMethod,
        categoryId: selectedCategory.id,
        customerEmissionId: corporateEmission.id,
        id: emissionAllocation.id,
        status: emissionAllocation.status,
      }
    );

    it('should display the success toast message', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const expectedSuccessToastPayload = {
        title: 'Scope 3 emissions sucessfully allocated',
        subtitle: 'Check your scope 3 detailed view in the emissions dashboard',
      };

      const { findByLabelText, findByTestId } = setup({ mocks: [successMock] });

      const categoryInput = await findByLabelText('Emissions category');
      await act(async () => {
        await selectEvent.select(categoryInput, selectedCategory.name);
      });

      const submitButton = await findByTestId(
        selectors.allocateEmissionsSubmit
      );
      await act(async () => {
        const includeInTotalRadioLabel = await findByTestId(
          radioInputFieldSelectors.getLabelSelector(
            selectors.includeInTotalRadio
          )
        );
        fireEvent.click(includeInTotalRadioLabel);

        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expectedSuccessToastPayload
        );
      });
    });

    it('should close the modal', async () => {
      const { findByLabelText, findByTestId } = setup({ mocks: [successMock] });

      const categoryInput = await findByLabelText('Emissions category');
      await act(async () => {
        await selectEvent.select(categoryInput, selectedCategory.name);
      });

      await act(async () => {
        const includeInTotalRadioLabel = await findByTestId(
          radioInputFieldSelectors.getLabelSelector(
            selectors.includeInTotalRadio
          )
        );
        fireEvent.click(includeInTotalRadioLabel);

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );

        fireEvent.submit(submitButton);
      });

      const submitButton = await findByTestId(
        selectors.allocateEmissionsSubmit
      );
      await act(async () => {
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockOnClose).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the form submission returns an error', () => {
    const selectedCategory =
      categoriesMocks.categoriesMock.result.data.categories[0];
    const errorMock = updateEmissionAllocationMocks.getAcceptEmissionAllocationMockError(
      {
        addedToCustomerScopeTotal: true,
        allocationMethod: emissionAllocation.allocationMethod,
        categoryId: selectedCategory.id,
        customerEmissionId: corporateEmission.id,
        id: emissionAllocation.id,
        status: emissionAllocation.status,
      }
    );

    it('should display the error displayErrorMessage toast', async () => {
      jest.spyOn(toast, 'displayErrorMessage');
      const expectedErrorToastPayload = {
        title: 'Something went wrong',
        subtitle: 'Please try again',
      };

      const { findByTestId } = setup({ mocks: [errorMock] });

      const submitButton = await findByTestId(
        selectors.allocateEmissionsSubmit
      );

      await act(async () => {
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expectedErrorToastPayload
        );
      });
    });

    it('should display the error message text in an InputError', async () => {
      const { findByTestId, getByTestId } = setup({ mocks: [errorMock] });

      const submitButton = await findByTestId(
        selectors.allocateEmissionsSubmit
      );

      await act(async () => {
        fireEvent.submit(submitButton);
      });

      await waitFor(() => {
        expect(
          getByTestId(selectors.allocateEmissionsApiError)
        ).toHaveTextContent(errorMock.result.errors[0].message);
      });
    });
  });

  describe('when the form is in edit mode', () => {
    it('should display the correct title and submit button text', async () => {
      const { findByTestId } = setup({
        allocation: emissionAllocation,
        isEditing: true,
      });

      expect(
        await findByTestId(
          modalFormSelectors.getTitleSelector(selectors.allocateEmissionsForm)
        )
      ).toHaveTextContent('Edit allocation');
      expect(
        await findByTestId(selectors.allocateEmissionsSubmit)
      ).toHaveTextContent('Update');
    });

    it.each`
      value    | radioName             | radioSelector
      ${true}  | ${'Add on top'}       | ${`${selectors.addToTotalRadio}-input`}
      ${false} | ${'Include in total'} | ${radioInputFieldSelectors.getInputSelector(selectors.includeInTotalRadio)}
      ${null}  | ${'Include in total'} | ${radioInputFieldSelectors.getInputSelector(selectors.includeInTotalRadio)}
    `(
      'should pre-select the "$radioName" radios when the addedToCustomerScopeTotal is "$value"',
      async ({
        value,
        radioSelector,
      }: {
        value: boolean | null;
        radioSelector: string;
      }) => {
        const { findByTestId } = setup({
          allocation: {
            ...emissionAllocation,
            addedToCustomerScopeTotal: value,
          },
          isEditing: true,
        });

        expect(await findByTestId(radioSelector)).toBeChecked();
      }
    );

    it.each`
      value    | addedValue                                                 | includedValue
      ${true}  | ${corporateEmission.scope3}                                | ${corporateEmission.scope3 - emissionAllocation.emissions}
      ${false} | ${corporateEmission.scope3 + emissionAllocation.emissions} | ${corporateEmission.scope3}
      ${null}  | ${corporateEmission.scope3 + emissionAllocation.emissions} | ${corporateEmission.scope3}
    `(
      'should display the correct new scope 3 values when the addedToCustomerScopeTotal is "$value"',
      async ({
        value,
        addedValue,
        includedValue,
      }: {
        value: boolean | null;
        addedValue: number;
        includedValue: number;
      }) => {
        const { findByTestId } = setup({
          allocation: {
            ...emissionAllocation,
            addedToCustomerScopeTotal: value,
          },
          isEditing: true,
        });

        expect(
          await findByTestId(selectors.addToTotalRadioSublabel)
        ).toHaveTextContent(
          `Your new scope 3 will be ${getFormattedEmissions(addedValue)}`
        );
        expect(
          await findByTestId(selectors.includeInTotalRadioSublabel)
        ).toHaveTextContent(
          `Your new scope 3 will be ${getFormattedEmissions(includedValue)}`
        );
      }
    );

    describe('when the form is successfully submitted', () => {
      it('should display the success toast message', async () => {
        const selectedCategory =
          categoriesMocks.categoriesMock.result.data.categories[3];
        const successMock = updateEmissionAllocationMocks.getAcceptEmissionAllocationMock(
          {
            addedToCustomerScopeTotal: false,
            allocationMethod: emissionAllocation.allocationMethod,
            categoryId: selectedCategory.id,
            customerEmissionId: corporateEmission.id,
            id: emissionAllocation.id,
            status: emissionAllocation.status,
          }
        );

        jest.spyOn(toast, 'displaySuccessMessage');
        const expectedSuccessToastPayload = {
          title: 'Scope 3 emissions sucessfully updated',
          subtitle:
            'Check your scope 3 detailed view in the emissions dashboard',
        };

        const { findByLabelText, findByTestId } = setup({
          isEditing: true,
          mocks: [successMock],
        });

        const categoryInput = await findByLabelText('Emissions category');
        await act(async () => {
          await selectEvent.select(categoryInput, selectedCategory.name);
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );
        await act(async () => {
          const includeInTotalRadioLabel = await findByTestId(
            radioInputFieldSelectors.getLabelSelector(
              selectors.includeInTotalRadio
            )
          );
          fireEvent.click(includeInTotalRadioLabel);

          fireEvent.submit(submitButton);
        });

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
            expectedSuccessToastPayload
          );
        });
      });
    });
  });
});
