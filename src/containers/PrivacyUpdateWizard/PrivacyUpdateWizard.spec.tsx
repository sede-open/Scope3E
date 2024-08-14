import { MutationTuple } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import * as targetFormMutations from 'containers/Modals/TargetForm/mutations';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { GraphQLError } from 'graphql';
import * as meMocks from 'mocks/me';
import {
  dataPrivacyWizardMock,
  updateEmissionMutationMock,
} from 'mocks/privacyUpdateWizard';
import I18nProvider from 'next-translate/I18nProvider';
import * as nextRouter from 'next/router';
import {
  CarbonIntensityMetricType,
  CorporateEmissionType,
  Scope2Type,
  TargetPrivacyType,
  TargetStrategyType,
  TargetType,
} from 'types/globalTypes';
import { SaveTargets, SaveTargetsVariables } from 'types/SaveTargets';
import redirect from 'utils/redirect';
import * as toast from 'utils/toast';
import { useTestRouter } from 'utils/useTestRouter';
import { PrivacyUpdateWizard } from '.';
import * as corporateEmissionFormNamespace from '../../../locales/en/corporateEmissionForm.json';
import * as dataPrivacyWizardNamespace from '../../../locales/en/dataPrivacyWizard.json';
import * as errorPageNamespace from '../../../locales/en/errorPage.json';
import * as targetFormFormNamespace from '../../../locales/en/targetForm.json';
import * as corporateEmissionFormSelectors from '../Modals/CorporateEmissionForm/selectors';
import * as targetFormSelectors from '../Modals/TargetForm/selectors';
import * as selectors from './selectors';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

/** This is so we can stub functions in specific tests, but not all */
jest.mock('containers/Modals/TargetForm/mutations', () => {
  const originalModule = jest.requireActual(
    'containers/Modals/TargetForm/mutations'
  );

  return {
    __esModule: true,
    ...originalModule,
  };
});
jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/redirect');

const corporateEmissionStub = {
  id: '7D72B370-4CA4-46C1-8B81-36B2AC15F26A',
  type: CorporateEmissionType.BASELINE,
  year: 2012,
  scope1: 1000000,
  scope2: 2000000,
  scope3: 3000000,
  scope2Type: Scope2Type.MARKET,
  offset: 20,
  examplePercentage: 0,
  headCount: 0,
  verificationFile: {
    id: 'FE74B34B-D7A2-43D0-93AD-8C43B5BEFFBB',
    originalFilename: 'https://some-file-store.com/abcdef',
  },
  carbonIntensities: [
    {
      intensityMetric: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
      intensityValue: 50,
    },
  ],
  corporateEmissionAccess: null,
};

const absoluteTargetStub = {
  scope1And2Year: 2040,
  scope1And2Reduction: 50,
  scope3Year: 2040,
  scope3Reduction: 30,
  strategy: TargetStrategyType.MODERATE,
  includeCarbonOffset: false,
  scope1And2PrivacyType: null,
  scope3PrivacyType: null,
};

const selectEmissionPrivacyTypeNo = async () => {
  const { findByTestId } = screen;
  const privateTypeNo = await findByTestId(
    corporateEmissionFormSelectors.privacyTypePrivate
  );
  fireEvent.click(privateTypeNo);
};

const selectLabelAndCheckInput = async (selector: any) => {
  const { findByTestId, getByTestId } = screen;

  const label = await getByTestId(`${selector}-label`);
  fireEvent.click(label);

  const input = await findByTestId(`${selector}-input`);
  expect(input).toBeChecked();
};

describe('PrivacyUpdateWizard', () => {
  const setup = (mocks: any[] = []) => {
    return render(
      <I18nProvider
        namespaces={{
          dataPrivacyWizard: dataPrivacyWizardNamespace,
          errorPage: errorPageNamespace,
          corporateEmissionForm: corporateEmissionFormNamespace,
          targetForm: targetFormFormNamespace,
        }}
      >
        <MockedProvider mocks={mocks} addTypename={false}>
          <PrivacyUpdateWizard />
        </MockedProvider>
      </I18nProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(toast, 'displaySuccessMessage');
    jest.spyOn(toast, 'displayErrorMessage');

    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canSubmitDataPrivacyInfo: true,
      company: { id: meMocks.baseMe?.company?.id },
    }));
  });

  it('should render an error page when the API call fails', async () => {
    const { queryByText } = await setup([
      dataPrivacyWizardMock(
        { companyId: meMocks.baseMe?.company?.id },
        undefined,
        undefined,
        undefined,
        [new GraphQLError('Boom!')]
      ),
    ]);

    await waitFor(() => {
      expect(queryByText('Unexpected Error')).toBeInTheDocument();
      expect(queryByText('Boom!')).toBeInTheDocument();
    });
  });

  it('should redirect to the dashboard when a user has already completed their data privacy information', async () => {
    await setup([
      dataPrivacyWizardMock(
        { companyId: meMocks.baseMe?.company?.id },
        {
          isComplete: true,
          numCorporateEmissionAccessMissing: 0,
          numAbsoluteTargetPrivacyTypeMissing: 0,
          numIntensityTargetPrivacyTypeMissing: 0,
        }
      ),
    ]);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('when the user does not have permission to update data privacy information', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          canSubmitDataPrivacyInfo: false,
          company: { id: meMocks.baseMe?.company?.id },
        })
      );
    });

    it('should redirect to the forbidden page', async () => {
      await setup([
        dataPrivacyWizardMock(
          { companyId: meMocks.baseMe?.company?.id },
          {
            isComplete: true,
            numCorporateEmissionAccessMissing: 0,
            numAbsoluteTargetPrivacyTypeMissing: 0,
            numIntensityTargetPrivacyTypeMissing: 0,
          }
        ),
      ]);

      await waitFor(() => {
        expect(redirect).toHaveBeenCalledWith('/forbidden');
      });
    });
  });

  describe('when the wizard is rendering steps', () => {
    describe('when on the first step', () => {
      it('should not render a back button', async () => {
        const { findByTestId, queryByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [], intensity: [] }
          ),
        ]);

        expect(await findByTestId(selectors.nextButton)).toBeInTheDocument();
        expect(queryByTestId(selectors.backButton)).not.toBeInTheDocument();
      });
    });

    describe('when on the final step', () => {
      it('should display a save and exit button', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [], intensity: [] }
          ),
        ]);

        expect(await findByTestId(selectors.nextButton)).toHaveTextContent(
          dataPrivacyWizardNamespace['next-and-exit']
        );
      });

      it('should redirect to the dashboard on save', async () => {
        const push = jest.fn();

        jest
          .spyOn(nextRouter, 'useRouter')
          .mockImplementation(useTestRouter({ push }));

        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [], intensity: [] }
          ),
          updateEmissionMutationMock({
            id: corporateEmissionStub.id,
            scope1: corporateEmissionStub.scope1,
            scope2: corporateEmissionStub.scope2,
            scope2Type: corporateEmissionStub.scope2Type,
            scope3: corporateEmissionStub.scope3,
            offset: corporateEmissionStub.offset,
            headCount: corporateEmissionStub.headCount,
            year: corporateEmissionStub.year,
            verificationFileId: corporateEmissionStub.verificationFile.id,
            carbonIntensities: [
              {
                type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                value: 50,
              },
            ],
            corporateEmissionAccess: {
              scope1And2: false,
              scope3: false,
              carbonIntensity: false,
              carbonOffsets: false,
              publicLink: null,
            },
            type: corporateEmissionStub.type,
          }),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toBeInTheDocument();

        await act(async () => {
          await selectEmissionPrivacyTypeNo();
          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(push).toHaveBeenCalledWith({
          pathname: '/dashboard',
          query: { refetch: true },
        });
      });

      it('should call the success message toast', async () => {
        const push = jest.fn();

        jest
          .spyOn(nextRouter, 'useRouter')
          .mockImplementation(useTestRouter({ push }));

        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [], intensity: [] }
          ),
          updateEmissionMutationMock({
            id: corporateEmissionStub.id,
            scope1: corporateEmissionStub.scope1,
            scope2: corporateEmissionStub.scope2,
            scope2Type: corporateEmissionStub.scope2Type,
            scope3: corporateEmissionStub.scope3,
            offset: corporateEmissionStub.offset,
            headCount: corporateEmissionStub.headCount,
            year: corporateEmissionStub.year,
            verificationFileId: corporateEmissionStub.verificationFile.id,
            carbonIntensities: [
              {
                type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                value: 50,
              },
            ],
            corporateEmissionAccess: {
              scope1And2: false,
              scope3: false,
              carbonIntensity: false,
              carbonOffsets: false,
              publicLink: null,
            },
            type: corporateEmissionStub.type,
          }),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toBeInTheDocument();

        await act(async () => {
          await selectEmissionPrivacyTypeNo();
          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
          options: { autoClose: 2000 },
          title: 'common:save-toast-success',
        });
      });
    });

    describe('when the first step is an emission step', () => {
      it('should render emission related content', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [], intensity: [] }
          ),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['EMISSION-entity-type-header']
        );
        expect(
          await findByTestId(selectors.entityTypeDescription)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['EMISSION-entity-type-description']
        );
        expect(await findByTestId(selectors.stepTitle)).toHaveTextContent(
          `Is your ${corporateEmissionStub.year} data publicly available`
        );
        expect(await findByTestId(selectors.stepSubheader)).toHaveTextContent(
          dataPrivacyWizardNamespace['emission-step-subheader']
        );
      });
    });

    describe('when the first step is an absolute target step', () => {
      it('should render absolute ambition related content', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 0,
              numAbsoluteTargetPrivacyTypeMissing: 1,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [],
            { absolute: [absoluteTargetStub], intensity: [] }
          ),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['ABSOLUTE_AMBITION-entity-type-header']
        );
        expect(
          await findByTestId(selectors.entityTypeDescription)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace[
            'ABSOLUTE_AMBITION-entity-type-description'
          ]
        );
      });

      it('should pass all the correct args to the save target mutation', async () => {
        const saveTargets = jest.fn();
        jest
          .spyOn(targetFormMutations, 'useSaveTargets')
          .mockImplementation(
            () =>
              ([saveTargets, { loading: false }] as unknown) as MutationTuple<
                SaveTargets,
                SaveTargetsVariables
              >
          );

        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 0,
              numAbsoluteTargetPrivacyTypeMissing: 1,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [],
            {
              absolute: [absoluteTargetStub],
              intensity: [],
            }
          ),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['ABSOLUTE_AMBITION-entity-type-header']
        );

        await act(async () => {
          await selectLabelAndCheckInput(
            targetFormSelectors.scope1And2PrivacyTypePublic
          );
          await selectLabelAndCheckInput(
            targetFormSelectors.scope3PrivacyTypeScience
          );

          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(saveTargets).toHaveBeenCalledWith({
          variables: {
            input: {
              companyId: meMocks.baseMe?.company?.id,
              toSave: [
                {
                  scope1And2Year: 2040,
                  scope1And2Reduction: 50,
                  scope3Year: 2040,
                  scope3Reduction: 30,
                  strategy: TargetStrategyType.MODERATE,
                  includeCarbonOffset: false,
                  scope1And2PrivacyType: TargetPrivacyType.PUBLIC,
                  scope3PrivacyType: TargetPrivacyType.SCIENCE_BASED_INITIATIVE,
                  targetType: TargetType.ABSOLUTE,
                },
              ],
            },
          },
        });
      });
    });

    describe('when the first step is an intensity target step', () => {
      it('should render absolute ambition related content', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 0,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 1,
            },
            [],
            {
              absolute: [],
              intensity: [
                {
                  ...absoluteTargetStub,
                  intensityMetric:
                    CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                },
              ],
            }
          ),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['INTENSITY_AMBITION-entity-type-header']
        );
        expect(
          await findByTestId(selectors.entityTypeDescription)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace[
            'INTENSITY_AMBITION-entity-type-description'
          ]
        );
      });

      it('should pass all the correct args to the save target mutation', async () => {
        const saveTargets = jest.fn();
        jest
          .spyOn(targetFormMutations, 'useSaveTargets')
          .mockImplementation(
            () =>
              ([saveTargets, { loading: false }] as unknown) as MutationTuple<
                SaveTargets,
                SaveTargetsVariables
              >
          );

        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 0,
              numAbsoluteTargetPrivacyTypeMissing: 0,
              numIntensityTargetPrivacyTypeMissing: 1,
            },
            [],
            {
              absolute: [],
              intensity: [
                {
                  ...absoluteTargetStub,
                  intensityMetric:
                    CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                },
              ],
            }
          ),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['INTENSITY_AMBITION-entity-type-header']
        );

        await act(async () => {
          await selectLabelAndCheckInput(
            targetFormSelectors.scope1And2PrivacyTypePrivate
          );
          await selectLabelAndCheckInput(
            targetFormSelectors.scope3PrivacyTypePrivate
          );

          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(saveTargets).toHaveBeenCalledWith({
          variables: {
            input: {
              companyId: meMocks.baseMe?.company?.id,
              toSave: [
                {
                  scope1And2Year: 2040,
                  scope1And2Reduction: 50,
                  scope3Year: 2040,
                  scope3Reduction: 30,
                  strategy: TargetStrategyType.MODERATE,
                  includeCarbonOffset: false,
                  scope1And2PrivacyType: TargetPrivacyType.PRIVATE,
                  intensityMetric:
                    CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                  scope3PrivacyType: TargetPrivacyType.PRIVATE,
                  targetType: TargetType.INTENSITY,
                },
              ],
            },
          },
        });
      });
    });

    describe('when multiple steps are being rendered', () => {
      describe('when user is missing an emission and an absolute target', () => {
        it('should submit the emission then render the absolute target step', async () => {
          const { findByTestId } = await setup([
            dataPrivacyWizardMock(
              { companyId: meMocks.baseMe?.company?.id },
              {
                isComplete: false,
                numCorporateEmissionAccessMissing: 1,
                numAbsoluteTargetPrivacyTypeMissing: 1,
                numIntensityTargetPrivacyTypeMissing: 0,
              },
              [corporateEmissionStub],
              { absolute: [absoluteTargetStub], intensity: [] }
            ),
            updateEmissionMutationMock({
              id: corporateEmissionStub.id,
              scope1: corporateEmissionStub.scope1,
              scope2: corporateEmissionStub.scope2,
              scope2Type: corporateEmissionStub.scope2Type,
              scope3: corporateEmissionStub.scope3,
              offset: corporateEmissionStub.offset,
              headCount: corporateEmissionStub.headCount,
              year: corporateEmissionStub.year,
              verificationFileId: corporateEmissionStub.verificationFile.id,
              carbonIntensities: [
                {
                  type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                  value: 50,
                },
              ],
              corporateEmissionAccess: {
                scope1And2: false,
                scope3: false,
                carbonIntensity: false,
                carbonOffsets: false,
                publicLink: null,
              },
              type: corporateEmissionStub.type,
            }),
          ]);

          expect(
            await findByTestId(selectors.entityTypeHeader)
          ).toBeInTheDocument();

          await act(async () => {
            await selectEmissionPrivacyTypeNo();
            await fireEvent.click(await findByTestId(selectors.nextButton));
          });

          expect(
            await findByTestId(selectors.entityTypeHeader)
          ).toHaveTextContent(
            dataPrivacyWizardNamespace['ABSOLUTE_AMBITION-entity-type-header']
          );
        });
      });

      it('should advance the progress bar when a step is completed', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 1,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [absoluteTargetStub], intensity: [] }
          ),
          updateEmissionMutationMock({
            id: corporateEmissionStub.id,
            scope1: corporateEmissionStub.scope1,
            scope2: corporateEmissionStub.scope2,
            scope2Type: corporateEmissionStub.scope2Type,
            scope3: corporateEmissionStub.scope3,
            offset: corporateEmissionStub.offset,
            headCount: corporateEmissionStub.headCount,
            year: corporateEmissionStub.year,
            verificationFileId: corporateEmissionStub.verificationFile.id,
            carbonIntensities: [
              {
                type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                value: 50,
              },
            ],
            corporateEmissionAccess: {
              scope1And2: false,
              scope3: false,
              carbonIntensity: false,
              carbonOffsets: false,
              publicLink: null,
            },
            type: corporateEmissionStub.type,
          }),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toBeInTheDocument();

        await act(async () => {
          await selectEmissionPrivacyTypeNo();
          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        const progressBar = await findByTestId(selectors.progressBar);

        expect(await within(progressBar).findByText('50%'));
      });

      it('should allow the user to navigate back when on the second step', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 1,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [absoluteTargetStub], intensity: [] }
          ),
          updateEmissionMutationMock({
            id: corporateEmissionStub.id,
            scope1: corporateEmissionStub.scope1,
            scope2: corporateEmissionStub.scope2,
            scope2Type: corporateEmissionStub.scope2Type,
            scope3: corporateEmissionStub.scope3,
            offset: corporateEmissionStub.offset,
            headCount: corporateEmissionStub.headCount,
            year: corporateEmissionStub.year,
            verificationFileId: corporateEmissionStub.verificationFile.id,
            carbonIntensities: [
              {
                type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                value: 50,
              },
            ],
            corporateEmissionAccess: {
              scope1And2: false,
              scope3: false,
              carbonIntensity: false,
              carbonOffsets: false,
              publicLink: null,
            },
            type: corporateEmissionStub.type,
          }),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toBeInTheDocument();

        await act(async () => {
          await selectEmissionPrivacyTypeNo();
          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['ABSOLUTE_AMBITION-entity-type-header']
        );

        await act(async () => {
          await fireEvent.click(await findByTestId(selectors.backButton));
        });

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['EMISSION-entity-type-header']
        );
      });

      it('should not display a toast message if not the final step', async () => {
        const { findByTestId } = await setup([
          dataPrivacyWizardMock(
            { companyId: meMocks.baseMe?.company?.id },
            {
              isComplete: false,
              numCorporateEmissionAccessMissing: 1,
              numAbsoluteTargetPrivacyTypeMissing: 1,
              numIntensityTargetPrivacyTypeMissing: 0,
            },
            [corporateEmissionStub],
            { absolute: [absoluteTargetStub], intensity: [] }
          ),
          updateEmissionMutationMock({
            id: corporateEmissionStub.id,
            scope1: corporateEmissionStub.scope1,
            scope2: corporateEmissionStub.scope2,
            scope2Type: corporateEmissionStub.scope2Type,
            scope3: corporateEmissionStub.scope3,
            offset: corporateEmissionStub.offset,
            headCount: corporateEmissionStub.headCount,
            year: corporateEmissionStub.year,
            verificationFileId: corporateEmissionStub.verificationFile.id,
            carbonIntensities: [
              {
                type: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
                value: 50,
              },
            ],
            corporateEmissionAccess: {
              scope1And2: false,
              scope3: false,
              carbonIntensity: false,
              carbonOffsets: false,
              publicLink: null,
            },
            type: corporateEmissionStub.type,
          }),
        ]);

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toBeInTheDocument();

        await act(async () => {
          await selectEmissionPrivacyTypeNo();
          await fireEvent.click(await findByTestId(selectors.nextButton));
        });

        expect(
          await findByTestId(selectors.entityTypeHeader)
        ).toHaveTextContent(
          dataPrivacyWizardNamespace['ABSOLUTE_AMBITION-entity-type-header']
        );

        expect(toast.displaySuccessMessage).not.toHaveBeenCalled();
      });
    });
  });
});
