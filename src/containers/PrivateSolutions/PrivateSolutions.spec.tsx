import { MockedProvider } from '@apollo/client/testing';
import { within } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as privateSolutionsMock from 'mocks/privateSolutions';
import { SolutionInterestsSystemName } from 'types/globalTypes';
import { UserSolutionInterestsQuery_userSolutionInterests as UserSolutionInterests } from 'types/UserSolutionInterestsQuery';
import { PrivateSolutions } from '.';
import { MS_BOOKINGS_URL } from './constants';
import * as privateSolutionCardSelectors from './PrivateSolutionCard/selectors';
import * as selectors from './selectors';
import { Solutions } from './types';
import {
  getSelectedSolutionInterestsNames,
  getSolutionDetailRecommendedSolutions,
  getUserSolutionAlternatives,
} from './utils';

jest.mock('effects/useAuthenticatedUser');

const SelectedUserSolutionInterestMockList = privateSolutionsMock.getUserSolutionInterestsQueryMock(
  [
    {
      id: 'some-user-solution-interest-id-1',
      solutionInterest: {
        systemName: SolutionInterestsSystemName.CARBON_CAPTURE,
        id: 'some-solution-i-1',
      },
    },
    {
      id: 'some-user-solution-interest-id-2',
      solutionInterest: {
        systemName: SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY,
        id: 'some-solution-id-2',
      },
    },
    {
      id: 'some-user-solution-interest-id-3',
      solutionInterest: {
        systemName: SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
        id: 'some-solution-id-3',
      },
    },
    {
      id: 'some-user-solution-interest-id-4',
      solutionInterest: {
        systemName: SolutionInterestsSystemName.RECYCLING,
        id: 'some-solution-id-4',
      },
    },
  ]
);

const setup = (mocks: any[], interests?: SolutionInterestsSystemName[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PrivateSolutions
        interests={
          interests ?? [
            SolutionInterestsSystemName.BEHAVIOUR_CHANGE,
            SolutionInterestsSystemName.CARBON_CAPTURE,
            SolutionInterestsSystemName.FUEL_SWITCH,
            SolutionInterestsSystemName.RECYCLING,
          ]
        }
      />
    </MockedProvider>
  );

describe('PrivateSolutions', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: privateSolutionsMock.user.company.id },
    }));
  });

  it('should render the page banner', async () => {
    const { getByTestId } = setup([
      privateSolutionsMock.getUserSolutionInterestsQueryMock([
        {
          id: 'some-user-solution-interest-id',
          solutionInterest: {
            systemName: SolutionInterestsSystemName.CARBON_CAPTURE,
            id: 'some-solution-id',
          },
        },
      ]),
    ]);

    await waitFor(() => {
      expect(getByTestId(selectors.solutions)).toBeInTheDocument();
      expect(getByTestId(selectors.banner)).toBeInTheDocument();
      expect(getByTestId(selectors.bannerBtn)).toHaveAttribute(
        'href',
        MS_BOOKINGS_URL
      );
    });
  });

  describe('getSelectedSolutionInterestsNames', () => {
    it('should return selected user solution interests', () => {
      const fakeSolutionInterestsData = ([
        {
          id: 'some-id-one',
          solutionInterest: {
            id: 'another-id-one',
            systemName: 'some-interest-one',
          },
        },
        {
          id: 'some-id-two',
          solutionInterest: {
            id: 'another-id-two',
            systemName: 'some-interest-two',
          },
        },
        {
          id: 'some-id-three',
          solutionInterest: {
            id: 'another-id-three',
            systemName: 'some-interest-three',
          },
        },
        {
          id: 'some-id-four',
          solutionInterest: {
            id: 'another-id-four',
            systemName: 'some-interest-four',
          },
        },
        {
          id: 'some-id-five',
          solutionInterest: {
            id: 'another-id-five',
            systemName: 'some-interest-five',
          },
        },
        {
          id: 'some-id-six',
          solutionInterest: {
            id: 'another-id-six',
            systemName: 'some-interest-six',
          },
        },
      ] as unknown) as UserSolutionInterests[];

      const result = getSelectedSolutionInterestsNames(
        fakeSolutionInterestsData
      );

      const expectedResult = [
        'some-interest-one',
        'some-interest-two',
        'some-interest-three',
        'some-interest-four',
        'some-interest-five',
        'some-interest-six',
      ];

      const unexpectedResult = [
        'some-interest-one',
        'some-interest-twelve',
        'some-interest-three',
        'some-interest-nine',
        'some-interest-five',
        'some-interest-seven',
      ];

      expect(result).toEqual(expectedResult);
      expect(result).not.toEqual(unexpectedResult);
    });
  });

  // describe('getMappedSolutions', () => {
  //   const allSolutionInterestSystemNames = Object.keys(
  //     SolutionInterestsSystemName
  //   );
  //   const allMappedSolutions = [
  //     Solutions.TELEMATICS,
  //     Solutions.EMOBILITY,
  //     Solutions.VESSELS_SOFTWARE,
  //     Solutions.CO2_FLEET_EMISSION_COMPENSATION,
  //     Solutions.NATURE_BASED,
  //     Solutions.ENERGY_MANAGEMENT,
  //     Solutions.LO3_ENERGY_CONSUMPTION_TRACKING,
  //     Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS,
  //     Solutions.RENEWABLE_ENERGY_CERTIFICATES,
  //     Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT,
  //     Solutions.CO2_CAPTURE_TECHNOLOGY,
  //     Solutions.ADIP_ULTRA,
  //     Solutions.CANSOLV,
  //     Solutions.INSTA_FREIGHT,
  //     Solutions.LNG,
  //     Solutions.HYDROGEN,
  //     Solutions.SUSTAINABLE_AVIATION,
  //     Solutions.BLUE_HYDROGEN,
  //     Solutions.DECARBONISE_YOUR_FLEET,
  //     Solutions.RENEWABLE_NATURAL_GAS,
  //     Solutions.LONG_HAUL_BIO_LNG,
  //     Solutions.IMMERSION_COOLING,
  //     Solutions.MACHINE_MAX,
  //     Solutions.LUBRICANT_SOLUTIONS,
  //     Solutions.SUSTAINABLE_BITUMEN,
  //     Solutions.CORROSION_FREE_PIPELINES,
  //     Solutions.LEVERAGING_DISTRIBUTED_ENERGY,
  //     Solutions.I6_FUEL_MANAGEMENT,
  //     Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY,
  //     Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS,
  //     Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS,
  //     Solutions.RENEWABLE_POWER,
  //     Solutions.ONSITE_SOLAR,
  //     Solutions.BATTERY_STORAGE,
  //     Solutions.ONSITE_RENEWABLE_POWER_GENERATION,
  //   ];

  //   it.each`
  //     systemNames                                                      | expected                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | description
  //     ${['some-interest-one', 'some-interest-two']}                    | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ${'invalid solution interests'}
  //     ${[SolutionInterestsSystemName.RENEWABLE_HEAT]}                  | ${[Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS, Solutions.LEVERAGING_DISTRIBUTED_ENERGY, Solutions.RENEWABLE_POWER]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ${'Renewable heat'}
  //     ${[SolutionInterestsSystemName.CARBON_CAPTURE]}                  | ${[Solutions.CO2_CAPTURE_TECHNOLOGY, Solutions.ADIP_ULTRA, Solutions.CANSOLV, Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT]}                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ${'Carbon capture'}
  //     ${[SolutionInterestsSystemName.RENEWABLE_POWER]}                 | ${[Solutions.IMMERSION_COOLING, Solutions.ONSITE_SOLAR, Solutions.BATTERY_STORAGE, Solutions.ENERGY_MANAGEMENT, Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS, Solutions.LEVERAGING_DISTRIBUTED_ENERGY, Solutions.RENEWABLE_ENERGY_CERTIFICATES, Solutions.RENEWABLE_POWER, Solutions.ONSITE_RENEWABLE_POWER_GENERATION]}                                                                                                                                                                                                                                                              | ${'Renewable power'}
  //     ${[SolutionInterestsSystemName.FUEL_SWITCH]}                     | ${[Solutions.INSTA_FREIGHT, Solutions.LNG, Solutions.HYDROGEN, Solutions.EMOBILITY, Solutions.SUSTAINABLE_AVIATION, Solutions.BLUE_HYDROGEN, Solutions.RENEWABLE_ENERGY_CERTIFICATES, Solutions.DECARBONISE_YOUR_FLEET, Solutions.RENEWABLE_NATURAL_GAS, Solutions.LONG_HAUL_BIO_LNG]}                                                                                                                                                                                                                                                                                                 | ${'Fuel switch'}
  //     ${[SolutionInterestsSystemName.NATURE_BASED_SOLUTIONS]}          | ${[Solutions.DECARBONISE_YOUR_FLEET, Solutions.CO2_FLEET_EMISSION_COMPENSATION, Solutions.NATURE_BASED]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ${'Nature based solutions'}
  //     ${[SolutionInterestsSystemName.MATERIAL_AND_PROCESS_EFFICIENCY]} | ${[Solutions.IMMERSION_COOLING, Solutions.INSTA_FREIGHT, Solutions.MACHINE_MAX, Solutions.TELEMATICS, Solutions.LUBRICANT_SOLUTIONS, Solutions.HYDROGEN, Solutions.VESSELS_SOFTWARE, Solutions.SUSTAINABLE_BITUMEN, Solutions.CORROSION_FREE_PIPELINES, Solutions.ENERGY_MANAGEMENT, Solutions.LEVERAGING_DISTRIBUTED_ENERGY, Solutions.LO3_ENERGY_CONSUMPTION_TRACKING, Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS, Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT, Solutions.I6_FUEL_MANAGEMENT, Solutions.RENEWABLE_NATURAL_GAS, Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY]} | ${'Material and process efficiency'}
  //     ${[SolutionInterestsSystemName.BEHAVIOUR_CHANGE]}                | ${[Solutions.TELEMATICS, Solutions.EMOBILITY, Solutions.VESSELS_SOFTWARE, Solutions.CO2_FLEET_EMISSION_COMPENSATION, Solutions.NATURE_BASED, Solutions.ENERGY_MANAGEMENT, Solutions.LO3_ENERGY_CONSUMPTION_TRACKING, Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS, Solutions.RENEWABLE_ENERGY_CERTIFICATES, Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT]}                                                                                                                                                                                                                              | ${'Behaviour change'}
  //     ${[SolutionInterestsSystemName.RECYCLING]}                       | ${[Solutions.LUBRICANT_SOLUTIONS, Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ${'Recycling'}
  //     ${allSolutionInterestSystemNames}                                | ${allMappedSolutions}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ${'all solution interests'}
  //   `(
  //     'should return the correct array of Solutions for $description',
  //     ({
  //       systemNames,
  //       expected,
  //     }: {
  //       systemNames: SolutionInterestsSystemName[];
  //       expected: Solutions[];
  //     }) => {
  //       const solutionInterestsNames = (systemNames as unknown) as SolutionInterestsSystemName[];

  //       const result = getUserSolutionRecommendations(solutionInterestsNames);
  //       expect(result).toEqual(expected);
  //     }
  //   );
  // });

  describe('Recommended solutions', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: { id: privateSolutionsMock.user.company.id },
        })
      );
    });

    it('When the recommended solutions are more than 9, "show more recommendation" button is to be shown', async () => {
      const { getByTestId } = setup([SelectedUserSolutionInterestMockList]);

      await waitFor(() => {
        expect(
          getByTestId(selectors.showMoreRecommendations)
        ).toBeInTheDocument();
      });
    });

    it('When the "show more recommendation" button is clicked, it should display next set of solutions', async () => {
      const { getByTestId, findByTestId } = setup([
        SelectedUserSolutionInterestMockList,
      ]);

      expect(
        await findByTestId(selectors.showMoreRecommendations)
      ).toBeInTheDocument();

      const recommendedGrid = await findByTestId(
        selectors.recommendedSolutionsGrid
      );
      const visibleRecommendedSolutions = within(
        recommendedGrid
      ).getAllByTestId(privateSolutionCardSelectors.cardWrapper);

      expect(visibleRecommendedSolutions).toHaveLength(9);
      const showMoreRecommendationsButton = getByTestId(
        selectors.showMoreRecommendations
      );

      fireEvent.click(showMoreRecommendationsButton);

      const recommendedGridAfterClick = await findByTestId(
        selectors.recommendedSolutionsGrid
      );
      const visibleRecommendedSolutionsAfterClick = within(
        recommendedGridAfterClick
      ).getAllByTestId(privateSolutionCardSelectors.cardWrapper);

      expect(visibleRecommendedSolutionsAfterClick).toHaveLength(18);
    });

    it('When the recommended solutions is 25, then "show more recommendation" button not to appear again, after clicking it twice', async () => {
      const { getByTestId, findByTestId, queryByTestId } = setup([
        SelectedUserSolutionInterestMockList,
      ]);

      expect(
        await findByTestId(selectors.showMoreRecommendations)
      ).toBeInTheDocument();

      const recommendedGrid = await findByTestId(
        selectors.recommendedSolutionsGrid
      );
      const visibleRecommendedSolutions = within(
        recommendedGrid
      ).getAllByTestId(privateSolutionCardSelectors.cardWrapper);

      expect(visibleRecommendedSolutions).toHaveLength(9);

      const showMoreRecommendationsButton = getByTestId(
        selectors.showMoreRecommendations
      );

      fireEvent.click(showMoreRecommendationsButton);

      fireEvent.click(showMoreRecommendationsButton);

      const recommendedGridAfterClick = await findByTestId(
        selectors.recommendedSolutionsGrid
      );
      const visibleRecommendedSolutionsAfterClick = within(
        recommendedGridAfterClick
      ).getAllByTestId(privateSolutionCardSelectors.cardWrapper);

      expect(visibleRecommendedSolutionsAfterClick).toHaveLength(22);

      await waitFor(() => {
        expect(queryByTestId(selectors.showMoreRecommendations)).toBeNull();
      });
    });
  });
});

describe('getUserSolutionAlternatives', () => {
  it('should return an array containing all privateSolutionsData objects when userSolutionRecommendations is empty', () => {
    const userSolutionRecommendations = ([] as unknown) as Solutions[];

    const result = getUserSolutionAlternatives(userSolutionRecommendations);

    const expectedResult = [
      Solutions.CO2_FLEET_EMISSION_COMPENSATION,
      Solutions.EMOBILITY,
      Solutions.HYDROGEN,
      Solutions.LNG,
      Solutions.LUBRICANT_SOLUTIONS,
      Solutions.NATURE_BASED,
      Solutions.SUSTAINABLE_AVIATION,
      Solutions.TELEMATICS,
      Solutions.VESSELS_SOFTWARE,
      Solutions.MACHINE_MAX,
      Solutions.INSTA_FREIGHT,
      Solutions.IMMERSION_COOLING,
      Solutions.SUSTAINABLE_BITUMEN,
      Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS,
      Solutions.CORROSION_FREE_PIPELINES,
      Solutions.ADIP_ULTRA,
      Solutions.SOLAR_SOLUTIONS,
      Solutions.BLUE_HYDROGEN,
      Solutions.DECARBONISE_YOUR_FLEET,
      Solutions.ONSITE_SOLAR,
      Solutions.BATTERY_STORAGE,
      Solutions.ENERGY_MANAGEMENT,
      Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS,
      Solutions.CANSOLV,
      Solutions.LEVERAGING_DISTRIBUTED_ENERGY,
      Solutions.LO3_ENERGY_CONSUMPTION_TRACKING,
      Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS,
      Solutions.RENEWABLE_ENERGY_CERTIFICATES,
      Solutions.RENEWABLE_POWER,
      Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT,
      Solutions.I6_FUEL_MANAGEMENT,
      Solutions.RENEWABLE_NATURAL_GAS,
      Solutions.ONSITE_RENEWABLE_POWER_GENERATION,
      Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY,
      Solutions.LONG_HAUL_BIO_LNG,
      Solutions.SIMULATION_TECHNOLOGY,
    ];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array containing privateSolutionsData objects when missing from userSolutionRecommendations', () => {
    const userSolutionRecommendations = ([
      Solutions.LUBRICANT_SOLUTIONS,
      Solutions.HYDROGEN,
      Solutions.VESSELS_SOFTWARE,
      Solutions.NATURE_BASED,
    ] as unknown) as Solutions[];

    const result = getUserSolutionAlternatives(userSolutionRecommendations);

    const expectedResult = [
      Solutions.CO2_FLEET_EMISSION_COMPENSATION,
      Solutions.EMOBILITY,
      Solutions.LNG,
      Solutions.SUSTAINABLE_AVIATION,
      Solutions.TELEMATICS,
      Solutions.MACHINE_MAX,
      Solutions.INSTA_FREIGHT,
      Solutions.IMMERSION_COOLING,
      Solutions.SUSTAINABLE_BITUMEN,
      Solutions.REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS,
      Solutions.CORROSION_FREE_PIPELINES,
      Solutions.ADIP_ULTRA,
      Solutions.SOLAR_SOLUTIONS,
      Solutions.BLUE_HYDROGEN,
      Solutions.DECARBONISE_YOUR_FLEET,
      Solutions.ONSITE_SOLAR,
      Solutions.BATTERY_STORAGE,
      Solutions.ENERGY_MANAGEMENT,
      Solutions.CORPORATE_POWER_PURCHASE_AGREEMENTS,
      Solutions.CANSOLV,
      Solutions.LEVERAGING_DISTRIBUTED_ENERGY,
      Solutions.LO3_ENERGY_CONSUMPTION_TRACKING,
      Solutions.INNOWATTS_CARBON_ENERGY_ANALYTICS,
      Solutions.RENEWABLE_ENERGY_CERTIFICATES,
      Solutions.RENEWABLE_POWER,
      Solutions.SUSTAINABLE_LAND_ASSET_ENHANCEMENT,
      Solutions.I6_FUEL_MANAGEMENT,
      Solutions.RENEWABLE_NATURAL_GAS,
      Solutions.ONSITE_RENEWABLE_POWER_GENERATION,
      Solutions.DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY,
      Solutions.LONG_HAUL_BIO_LNG,
      Solutions.SIMULATION_TECHNOLOGY,
    ];

    expect(result).toEqual(expectedResult);
  });
});

describe('getSolutionDetailRecommendedSolutions', () => {
  it('should return an array containing three alternative objects when selectedSolutionInterestsData is empty', () => {
    const selectedSolutionInterestsData = ([] as unknown) as UserSolutionInterests[];

    const result = getSolutionDetailRecommendedSolutions(
      selectedSolutionInterestsData,
      Solutions.EMOBILITY
    );

    const expectedResult = [
      Solutions.CO2_FLEET_EMISSION_COMPENSATION,
      Solutions.HYDROGEN,
      Solutions.LNG,
    ];

    expect(result).toEqual(expectedResult);
  });

  it('should return an array containing three selected recommended objects when selectedSolutionInterestsData has data', () => {
    const selectedSolutionInterestsData = ([
      {
        id: '36DABBB8-87C6-496E-A9A6-B2506AA0DDF6',
        solutionInterest: {
          id: '83689B0C-236A-4ED8-9E8D-28AEC9FBE7E2',
          systemName: 'CARBON_CAPTURE',
        },
      },
      {
        id: 'DA00976B-2AF0-4636-BA9C-A0E81526E20E',
        solutionInterest: {
          id: 'E2DE8213-B6F9-46A5-9AC4-35AA1CC3FB41',
          systemName: 'NATURE_BASED_SOLUTIONS',
        },
      },
    ] as unknown) as UserSolutionInterests[];

    const result = getSolutionDetailRecommendedSolutions(
      selectedSolutionInterestsData,
      Solutions.SUSTAINABLE_AVIATION
    );

    const expectedResult = [
      Solutions.CO2_FLEET_EMISSION_COMPENSATION,
      Solutions.NATURE_BASED,
      Solutions.ADIP_ULTRA,
    ];

    expect(result).toEqual(expectedResult);
  });
});
