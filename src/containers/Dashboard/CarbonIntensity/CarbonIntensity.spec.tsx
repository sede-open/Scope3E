import { render, waitFor } from '@testing-library/react';
import { getCorporateEmission } from 'mocks/corporateEmissions';
import { MockedProvider } from '@apollo/client/testing';

import { getIntensityTargetMock, getTargetsQueryData } from 'mocks/target';
import * as meMocks from 'mocks/me';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';

import { CarbonIntensity } from '.';
import { IProps } from '../../../components/CarbonIntensityGraph/types';
import * as selectors from './selectors';
import * as graphSelectors from '../../../components/CarbonIntensityGraph/selectors';

const meMock = meMocks.getGetMeMock();
const userCompanyId = meMock.result.data.me.company!.id;

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props = {
    baseline: getCorporateEmission(),
    emissions: [],
    ...overrides,
  };

  return render(
    <MockedProvider mocks={[meMock, ...mocks]} addTypename={false}>
      <AuthenticatedUserProvider>
        <CarbonIntensity {...props} />
      </AuthenticatedUserProvider>
    </MockedProvider>
  );
};

describe('CarbonIntensity', () => {
  describe('when user has not set an intensity target', () => {
    it('should render an empty state', async () => {
      const { findByTestId } = setup(undefined, [
        getTargetsQueryData(undefined, { companyId: userCompanyId }),
      ]);

      await waitFor(async () => {
        expect(
          await findByTestId(selectors.intensityTargetEmptyState)
        ).toBeInTheDocument();
      });
    });
  });

  describe('when user has set an intensity target', () => {
    it('should render the intensity graph', async () => {
      const intensityTarget = getIntensityTargetMock();

      const { findByTestId } = setup(undefined, [
        getTargetsQueryData([intensityTarget], { companyId: userCompanyId }),
      ]);

      expect(
        await findByTestId(graphSelectors.intensityTargetGraph)
      ).toBeInTheDocument();
    });
  });
});
