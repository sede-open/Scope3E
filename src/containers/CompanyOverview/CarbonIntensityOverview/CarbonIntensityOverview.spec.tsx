import { render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { intensityTargetMock } from 'mocks/target';
import { intensityTargetGraph } from 'components/CarbonIntensityGraph/selectors';
import { getCorporateEmission } from 'mocks/corporateEmissions';
import { CorporateEmissionType } from 'types/globalTypes';
import { TargetsQuery_targets_intensity as IntensityTarget } from 'types/TargetsQuery';
import companyOverviewNamespace from '../../../../locales/en/companyOverview.json';
import { CarbonIntensityOverview, Props } from '.';
import { EmptyView } from '../EmptyView';

describe('CarbonIntensityOverview', () => {
  const setup = (props: Partial<Props>) => {
    const defaultProps: Props = {
      target: undefined,
      emissions: [],
      emptyView: <EmptyView dataTestId="" />,
      ...props,
    };
    return render(
      <I18nProvider
        namespaces={{
          companyOverview: companyOverviewNamespace,
        }}
      >
        <CarbonIntensityOverview {...defaultProps} />
      </I18nProvider>
    );
  };

  it('renders the empty view when no target is provided', () => {
    const { getByText, queryByTestId } = setup({ target: undefined });
    expect(
      getByText(companyOverviewNamespace.carbonIntensityOverview)
    ).toBeInTheDocument();
    expect(getByText(companyOverviewNamespace.empty.title)).toBeInTheDocument();
    expect(
      getByText(companyOverviewNamespace.empty.privateDesc)
    ).toBeInTheDocument();
    expect(queryByTestId(intensityTargetGraph)).not.toBeInTheDocument();
  });
  it('renders empty view when no baseline year is provided', () => {
    const { getByText, queryByTestId } = setup({
      target: intensityTargetMock as IntensityTarget,
      emissions: [getCorporateEmission({ type: CorporateEmissionType.ACTUAL })],
    });
    expect(
      getByText(companyOverviewNamespace.carbonIntensityOverview)
    ).toBeInTheDocument();
    expect(getByText(companyOverviewNamespace.empty.title)).toBeInTheDocument();
    expect(
      getByText(companyOverviewNamespace.empty.privateDesc)
    ).toBeInTheDocument();
    expect(queryByTestId(intensityTargetGraph)).not.toBeInTheDocument();
  });
  it('renders the graph when the target and baseline year are provided', () => {
    const { getByText, getByTestId, queryByText } = setup({
      target: intensityTargetMock as IntensityTarget,
      emissions: [
        getCorporateEmission({ type: CorporateEmissionType.BASELINE }),
      ],
    });
    expect(
      getByText(companyOverviewNamespace.carbonIntensityOverview)
    ).toBeInTheDocument();
    expect(getByTestId(intensityTargetGraph)).toBeInTheDocument();
    expect(
      queryByText(companyOverviewNamespace.empty.title)
    ).not.toBeInTheDocument();
    expect(
      queryByText(companyOverviewNamespace.empty.privateDesc)
    ).not.toBeInTheDocument();
  });
});
