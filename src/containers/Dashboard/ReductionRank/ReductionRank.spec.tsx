import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import selectEvent from 'react-select-event';
import I18nProvider from 'next-translate/I18nProvider';
import getConfig from 'next/config';

import { trackEvent } from 'utils/analytics';
import {
  RANKING_TABLE_VERIFICATION_SELECTED,
  RANKING_TABLE_YEAR_SELECTED,
} from 'utils/analyticsEvents';
import { getSerialisedExpects } from 'utils/tests';
import { Environments } from 'utils/featureFlags';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as reductionRankMocks from 'mocks/reductionRank';
import { USER_COMPANY_ID } from 'mocks/constants';

import emissionRankTableNamespace from '../../../../locales/en/emissionRankTable.json';
import * as toggleOptionSelectors from '../../../components/ToggleOption/selectors';
import { NAME_PLACEHOLDER } from './ReductionRankRow';
import * as selectors from './selectors';
import { ReductionRank, VERIFICATION_SELECT_TOGGLE_ID } from '.';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/analytics');
jest.mock('next/config');

const PREVIOUS_YEAR = new Date().getFullYear() - 1;
const PREVIOUS_YEAR_MINUS_ONE = PREVIOUS_YEAR - 1;
const PREVIOUS_YEAR_MINUS_TWO = PREVIOUS_YEAR - 1;

const setup = (mocks: any) =>
  render(
    <I18nProvider
      namespaces={{ emissionRankTable: emissionRankTableNamespace }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReductionRank />
      </MockedProvider>
    </I18nProvider>
  );

const company = {
  id: USER_COMPANY_ID,
  name: 'Some Company Ltd',
  primarySector: 'Primary company sector',
  secondarySector: 'Secondary company sector',
};

describe('ReductionRank', () => {
  beforeAll(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canEditSupplyDashboard: true,
      canViewSupplyDashboard: true,
      company,
    }));
  });

  it('should correctly render the ranking table', async () => {
    const rank = reductionRankMocks.getRank({
      primarySector: 'primary-sector',
      secondarySector: 'sub-sector',
      rank: 1,
      year: PREVIOUS_YEAR,
    });
    const { findByTestId } = setup([
      reductionRankMocks.getReductionRankQueryMock(PREVIOUS_YEAR, [rank]),
    ]);

    expect(await findByTestId(selectors.rankTableRowRank)).toHaveTextContent(
      `# ${rank.rank}`
    );
    expect(await findByTestId(selectors.rankTableRowCompany)).toHaveTextContent(
      NAME_PLACEHOLDER
    );
    expect(await findByTestId(selectors.rankTableRowSector)).toHaveTextContent(
      rank.primarySector!
    );
    expect(
      await findByTestId(selectors.rankTableRowReductionPercentage)
    ).toHaveTextContent(`${rank.reductionPercentage}%`);
    expect(
      await findByTestId(selectors.rankTableDataVerificationSector)
    ).toHaveTextContent('Yes');
  });

  describe('when rank does not have a primary sector', () => {
    it('should render "---" instead of the primary sector', async () => {
      const rank = reductionRankMocks.getRank({
        primarySector: null,
        secondarySector: 'sub-sector',
        rank: 1,
        year: PREVIOUS_YEAR,
      });
      const { findByTestId } = setup([
        reductionRankMocks.getReductionRankQueryMock(PREVIOUS_YEAR, [rank]),
      ]);

      expect(
        await findByTestId(selectors.rankTableRowSector)
      ).toHaveTextContent('---');
    });
  });

  it.each`
    year
    ${PREVIOUS_YEAR_MINUS_ONE}
    ${PREVIOUS_YEAR_MINUS_TWO}
  `(
    'should render the correct rows when the year select is updated ($year)',
    async ({ year }: { year: number }) => {
      const currentRank = reductionRankMocks.getRank({
        primarySector: 'primary-sector-a',
        rank: 1,
        secondarySector: 'sub-sector',
        year: PREVIOUS_YEAR,
      });

      const selectedYearRank = reductionRankMocks.getRank({
        primarySector: 'primary-sector-b',
        rank: 1,
        secondarySector: 'sub-sector',
        year,
      });

      const { findByTestId, getByLabelText } = setup([
        reductionRankMocks.getReductionRankQueryMock(PREVIOUS_YEAR, [
          currentRank,
        ]),
        reductionRankMocks.getReductionRankQueryMock(year, [selectedYearRank]),
      ]);

      expect(
        await findByTestId(selectors.rankTableRowSector)
      ).toHaveTextContent(currentRank.primarySector!);

      const selectedYearLabel = `${year - 1} – ${year}`;
      await act(async () => {
        await selectEvent.select(getByLabelText('Year'), selectedYearLabel);
      });

      const sectorCell = await findByTestId(selectors.rankTableRowSector);

      await waitFor(() => {
        expect(sectorCell).toHaveTextContent(selectedYearRank.primarySector!);

        // Assert analytics
        expect(trackEvent).toHaveBeenCalledWith(
          ...[
            RANKING_TABLE_YEAR_SELECTED,
            {
              companyId: company.id,
              companyName: company.name,
              yearRange: selectedYearLabel,
            },
          ]
        );
      });
    }
  );

  it('should render empty state', async () => {
    const { findByTestId, queryAllByTestId } = setup([
      reductionRankMocks.getReductionRankQueryMock(PREVIOUS_YEAR, []),
    ]);

    expect(await findByTestId(selectors.rankTableEmpty)).toBeInTheDocument();
    expect(queryAllByTestId(selectors.rankTableRowRank)).toHaveLength(0);
  });

  it.each`
    environment
    ${Environments.DEV}
    ${Environments.STAGING}
    ${Environments.PROD}
  `(
    'should not render the sector select in $environment',
    ({ environment }: { environment: string }) => {
      ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
        publicRuntimeConfig: {
          ENVIRONMENT: environment,
        },
      }));

      const rank = reductionRankMocks.getRank({
        primarySector: 'primary-sector',
        rank: 1,
        secondarySector: 'sub-sector',
        year: PREVIOUS_YEAR,
      });
      const { queryByLabelText } = setup([
        reductionRankMocks.getReductionRankQueryMock(PREVIOUS_YEAR, [rank]),
      ]);

      expect(queryByLabelText('Sector')).not.toBeInTheDocument();
    }
  );

  it('should render the correct rows when the data verification select is updated', async () => {
    const year = PREVIOUS_YEAR;
    const ranks = [
      reductionRankMocks.getRank({
        hasPreviousYearVerificationFile: true,
        hasVerificationFile: true,
        primarySector: company.primarySector,
        secondarySector: company.secondarySector,
        rank: 1,
        year,
      }),
      reductionRankMocks.getRank({
        hasPreviousYearVerificationFile: false,
        hasVerificationFile: true,
        primarySector: company.primarySector,
        secondarySector: company.secondarySector,
        rank: 2,
        year,
      }),
      reductionRankMocks.getRank({
        hasPreviousYearVerificationFile: true,
        hasVerificationFile: false,
        primarySector: company.primarySector,
        secondarySector: company.secondarySector,
        rank: 3,
        year,
      }),
      reductionRankMocks.getRank({
        hasPreviousYearVerificationFile: false,
        hasVerificationFile: false,
        primarySector: company.primarySector,
        secondarySector: company.secondarySector,
        rank: 4,
        year,
      }),
      reductionRankMocks.getRank({
        hasPreviousYearVerificationFile: true,
        hasVerificationFile: true,
        primarySector: company.primarySector,
        secondarySector: company.secondarySector,
        rank: 5,
        year,
      }),
    ];

    const expectedVerifiedRanks = ranks.filter(
      ({ hasPreviousYearVerificationFile, hasVerificationFile }) =>
        hasPreviousYearVerificationFile && hasVerificationFile
    );
    const expectedExcludedRanks = ranks.filter(
      ({ hasPreviousYearVerificationFile, hasVerificationFile }) =>
        !(hasPreviousYearVerificationFile && hasVerificationFile)
    );

    const { findByTestId, getByLabelText, queryByTestId } = setup([
      reductionRankMocks.getReductionRankQueryMock(year, ranks),
    ]);

    // Assert unfiltered table rows
    await getSerialisedExpects(
      ranks.map(({ rank }) => async () =>
        expect(
          await findByTestId(selectors.getRankTableRow(`rank-id-${rank}`))
        ).toBeInTheDocument()
      )
    );

    await act(async () => {
      await selectEvent.openMenu(getByLabelText('Data verification'));

      fireEvent.click(
        await within(
          await findByTestId(
            toggleOptionSelectors.getToggleOptionSelector(
              VERIFICATION_SELECT_TOGGLE_ID
            )
          )
        ).findByTestId(toggleOptionSelectors.checkboxSlider)
      );
    });

    // Assert analytics
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        ...[
          RANKING_TABLE_VERIFICATION_SELECTED,
          {
            companyId: company.id,
            companyName: company.name,
            selectedOption: 'On',
          },
        ]
      );
    });

    // Assert filtered table rows
    await getSerialisedExpects(
      expectedVerifiedRanks.map(({ rank }) => async () =>
        expect(
          await findByTestId(selectors.getRankTableRow(`rank-id-${rank}`))
        ).toBeInTheDocument()
      )
    );

    // Assert excluded table rows
    await getSerialisedExpects(
      expectedExcludedRanks.map(({ rank }) => async () =>
        expect(
          queryByTestId(selectors.getRankTableRow(`rank-id-${rank}`))
        ).not.toBeInTheDocument()
      )
    );

    await act(async () => {
      await selectEvent.openMenu(getByLabelText('Data verification'));

      fireEvent.click(
        await within(
          await findByTestId(
            toggleOptionSelectors.getToggleOptionSelector(
              VERIFICATION_SELECT_TOGGLE_ID
            )
          )
        ).findByTestId(toggleOptionSelectors.checkboxSlider)
      );
    });

    // Assert analytics
    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        ...[
          RANKING_TABLE_VERIFICATION_SELECTED,
          {
            companyId: company.id,
            companyName: company.name,
            selectedOption: 'all',
          },
        ]
      );
    });

    // Assert unfiltered table rows
    await getSerialisedExpects(
      ranks.map(({ rank }) => async () =>
        expect(
          await findByTestId(selectors.getRankTableRow(`rank-id-${rank}`))
        ).toBeInTheDocument()
      )
    );
  });
});
