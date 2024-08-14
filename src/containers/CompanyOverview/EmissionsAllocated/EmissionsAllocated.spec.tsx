import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { emissionAllocation } from 'mocks/corporateEmissionForm';
import { CompanyOverviewQuery_emissionsAllocatedToMyCompany as EmissionAllocation } from 'types/CompanyOverviewQuery';
import companyOverviewNamespace from '../../../../locales/en/companyOverview.json';
import { EmissionsAllocated, Props } from '.';

describe('EmissionsAllocated', () => {
  const setup = (props: Partial<Props>) => {
    const defaultProps: Props = {
      emissionAllocations: [],
      ...props,
    };
    return render(
      <I18nProvider
        namespaces={{
          companyOverview: companyOverviewNamespace,
        }}
      >
        <EmissionsAllocated {...defaultProps} />
      </I18nProvider>
    );
  };

  it('renders the empty view when no emission allocations are provided', () => {
    const { getByText } = setup({ emissionAllocations: [] });
    expect(
      getByText(companyOverviewNamespace.emissionsAllocatedToYourCompany)
    ).toBeInTheDocument();
    expect(
      getByText(companyOverviewNamespace.noEmissionsAllocated)
    ).toBeInTheDocument();
    expect(
      getByText(companyOverviewNamespace.hasNotAllocated)
    ).toBeInTheDocument();
  });
  it('renders the chart when emission allocations are provided', async () => {
    const { queryByText } = setup({
      emissionAllocations: [
        (emissionAllocation as unknown) as EmissionAllocation,
      ],
    });
    expect(
      queryByText(companyOverviewNamespace.emissionsAllocatedToYourCompany)
    ).toBeInTheDocument();
    expect(
      queryByText(companyOverviewNamespace.noEmissionsAllocated)
    ).not.toBeInTheDocument();
    expect(
      queryByText(companyOverviewNamespace.hasNotAllocated)
    ).not.toBeInTheDocument();
  });
});
