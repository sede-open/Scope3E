import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';

import * as targetMocks from 'mocks/target';
import { USER_COMPANY_ID } from 'mocks/constants';
import * as meMocks from 'mocks/me';
import * as toast from 'utils/toast';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as radioInputFieldSelectors from 'components/Form/Fields/RadioInputField/selectors';

import { intensityTargetMock } from 'mocks/target';
import {
  SaveTargetsTargetInstance,
  TargetPrivacyType,
  TargetStrategyType,
} from 'types/globalTypes';
import * as selectors from './selectors';
import commonNamespace from '../../../../locales/en/common.json';
import formNamespace from '../../../../locales/en/form.json';
import targetFormNamespace from '../../../../locales/en/targetForm.json';
import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';
import { TargetFormContainer } from '.';
import { FormTargetType } from './types';

interface Form {
  targetType: FormTargetType;
  scope3Year?: boolean;
  data?: SaveTargetsTargetInstance;
}

const saveScope3ReductionPublicly = async (targetType: FormTargetType) => {
  const publicReductionDataTestId = `${targetType}[0].${radioInputFieldSelectors.getLabelSelector(
    selectors.scope3PrivacyTypePrivate
  )}`;
  const selector = screen.getByTestId(publicReductionDataTestId);
  fireEvent.click(selector);
  const input = await screen.findByTestId(
    `${targetType}[0].${radioInputFieldSelectors.getInputSelector(
      selectors.scope3PrivacyTypePrivate
    )}`
  );
  expect(input).toBeChecked();
};

const saveScope3Year = async (scope3Year: number, scope3Reduction: number) => {
  await selectEvent.select(
    await screen.findByLabelText(targetFormNamespace['scope-three-year-label']),
    scope3Year.toString()
  );

  fireEvent.change(
    await screen.findByTestId(selectors.scopeThreeReductionInput),
    {
      target: {
        value: scope3Reduction,
      },
    }
  );
};

const setup = (mocks: any, overrides: any = {}) => {
  const props = {
    closeModal: jest.fn(),
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        form: formNamespace,
        targetForm: targetFormNamespace,
        carbonIntensity: carbonIntensityNamespace,
      }}
    >
      <MockedProvider
        mocks={[meMocks.getGetMeMock(), ...mocks]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <TargetFormContainer {...props} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

const checkIsIntensityTarget = (targetType: FormTargetType) =>
  targetType === FormTargetType.INTENSITY;

const getTargetBase = (isIntensityTarget: boolean) =>
  isIntensityTarget
    ? targetMocks.intensityTargetMock
    : targetMocks.absoluteTargetMock;

const filloutForm = async ({ targetType, scope3Year, data }: Form) => {
  const isIntensityTarget = checkIsIntensityTarget(targetType);
  const targetBase = getTargetBase(isIntensityTarget);
  const targetMock = data || targetBase;
  const { findByLabelText, findByTestId, getByTestId } = screen;

  // intensity - intensity measure
  if (isIntensityTarget && intensityTargetMock.intensityMetric) {
    await selectEvent.select(
      await findByLabelText(targetFormNamespace['intensity-measure-label']),
      carbonIntensityNamespace[intensityTargetMock.intensityMetric]
    );
  }

  // 1 2 reduction year
  await selectEvent.select(
    await findByLabelText(targetFormNamespace['scope-one-and-two-year-label']),
    targetMock.scope1And2Year.toString()
  );
  // 1 2 reduction
  fireEvent.change(await findByTestId(selectors.scopeOneAndTwoReductionInput), {
    target: {
      value: targetMock.scope1And2Reduction,
    },
  });

  // carbon offsets

  expect(
    await findByTestId(selectors.carbonOffsetRadioLabel)
  ).toBeInTheDocument();

  if (targetMock.includeCarbonOffset) {
    fireEvent.click(
      await findByTestId(
        radioInputFieldSelectors.getLabelSelector(
          selectors.carbonOffsetIncludedBtn
        )
      )
    );

    expect(
      await findByTestId(
        radioInputFieldSelectors.getInputSelector(
          selectors.carbonOffsetIncludedBtn
        )
      )
    ).toBeChecked();
  } else {
    fireEvent.click(
      await findByTestId(
        radioInputFieldSelectors.getLabelSelector(
          selectors.carbonOffsetExcludedBtn
        )
      )
    );

    expect(
      await findByTestId(
        radioInputFieldSelectors.getInputSelector(
          selectors.carbonOffsetExcludedBtn
        )
      )
    ).toBeChecked();
  }

  // implementation approach
  if (targetMock.strategy === TargetStrategyType.AGGRESSIVE) {
    fireEvent.click(
      await findByTestId(
        radioInputFieldSelectors.getLabelSelector(selectors.aggressiveStrategy)
      )
    );

    expect(
      await findByTestId(
        radioInputFieldSelectors.getInputSelector(selectors.aggressiveStrategy)
      )
    ).toBeChecked();
  }

  // passive
  if (targetMock.strategy === TargetStrategyType.PASSIVE) {
    fireEvent.click(
      await findByTestId(
        radioInputFieldSelectors.getLabelSelector(selectors.passiveStrategy)
      )
    );
    expect(
      await findByTestId(
        radioInputFieldSelectors.getInputSelector(selectors.passiveStrategy)
      )
    ).toBeChecked();
  }

  // 1 2 public reduction
  const publicReductionDataTestId = `${targetType}[0].${radioInputFieldSelectors.getLabelSelector(
    selectors.scope1And2PrivacyTypePrivate
  )}`;
  const selector = getByTestId(publicReductionDataTestId);
  fireEvent.click(selector);

  expect(
    await findByTestId(
      `${targetType}[0].${radioInputFieldSelectors.getInputSelector(
        selectors.scope1And2PrivacyTypePrivate
      )}`
    )
  ).toBeChecked();

  // 3 reduction
  if (
    scope3Year &&
    targetMock.scope3Year !== null &&
    targetMock.scope3Year !== undefined &&
    targetMock.scope3Reduction !== null &&
    targetMock.scope3Reduction !== undefined
  ) {
    await saveScope3Year(targetMock.scope3Year, targetMock.scope3Reduction);
  }

  // 3 public reduction
  if (scope3Year && targetMock.scope3PrivacyType) {
    await saveScope3ReductionPublicly(targetType);
  }
};

describe('TargetForm', () => {
  const companyId = USER_COMPANY_ID;
  const errorMessage = 'Something went wrong';

  describe.each`
    targetType                  | addTargetBtnSelector
    ${FormTargetType.ABSOLUTE}  | ${selectors.addAbsoluteAmbitionBtn}
    ${FormTargetType.INTENSITY} | ${selectors.addIntensityAmbitionBtn}
  `('Create $targetType target', ({ targetType, addTargetBtnSelector }) => {
    const isIntensityTarget = checkIsIntensityTarget(targetType);
    const targetBase = getTargetBase(isIntensityTarget);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should complete required fields and submit a target and call successful toast message', async () => {
      const closeModal = jest.fn();
      jest.spyOn(toast, 'displaySuccessMessage');
      const { findByTestId } = setup(
        [
          targetMocks.getTargetFormDataMock({ hasCarbonIntensity: true }),
          targetMocks.saveTargetsMock({
            companyId,
            toSave: [targetBase],
          }),
        ],
        {
          closeModal,
        }
      );
      fireEvent.click(await findByTestId(addTargetBtnSelector));

      await filloutForm({ targetType });
      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      fireEvent.click(await findByTestId(selectors.submitBtn));
      await waitFor(() => {
        expect(closeModal).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-success'],
          })
        );
      });
    });

    it('should not be able click submit if all required fields have not been filled in', async () => {
      const closeModal = jest.fn();

      const { findByTestId } = setup(
        [targetMocks.getTargetFormDataMock({}), targetMocks.saveTargetsMock()],
        {
          closeModal,
        }
      );

      expect(await findByTestId(selectors.submitBtn)).toBeDisabled();
    });

    it('should display error messages for required fields', async () => {
      const closeModal = jest.fn();

      const { findByTestId, getByTestId } = setup(
        [targetMocks.getTargetFormDataMock({ hasCarbonIntensity: true })],
        {
          closeModal,
        }
      );

      fireEvent.click(await findByTestId(addTargetBtnSelector));

      expect(await findByTestId(selectors.submitBtn)).not.toBeDisabled();
      fireEvent.click(await findByTestId(selectors.submitBtn));

      expect(await findByTestId(selectors.strategyError)).toHaveTextContent(
        formNamespace['strategy-error-required']
      );

      expect(
        await findByTestId(selectors.includeCarbonOffsetError)
      ).toHaveTextContent(
        formNamespace['include-carbon-offset-error-required']
      );

      expect(
        await findByTestId(`${selectors.scopeOneAndTwoReductionInput}-error`)
      ).toHaveTextContent(formNamespace['error-required']);

      expect(
        await findByTestId(selectors.scopeOneAndTwoYearError)
      ).toHaveTextContent(formNamespace['error-required']);

      expect(
        getByTestId(selectors.scope1And2SharedReductionPubliclyError)
      ).toHaveTextContent(formNamespace['public-reduction-required']);
    });

    it('should call the error toast message when create API error', async () => {
      const closeModal = jest.fn();
      jest.spyOn(toast, 'displayErrorMessage');

      const { findByTestId } = setup(
        [
          targetMocks.getTargetFormDataMock({ hasCarbonIntensity: true }),
          targetMocks.saveTargetsMock(
            {
              companyId,
              toSave: [targetBase],
            },
            errorMessage
          ),
        ],
        {
          closeModal,
        }
      );

      fireEvent.click(await findByTestId(addTargetBtnSelector));

      await filloutForm({ targetType });

      expect(await findByTestId(selectors.submitBtn)).toBeInTheDocument();

      fireEvent.click(await findByTestId(selectors.submitBtn));

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-error'],
          })
        );
      });
    });
  });

  describe.each`
    targetType                  | getTargetsMockOptions
    ${FormTargetType.ABSOLUTE}  | ${{ hasAbsoluteTarget: true }}
    ${FormTargetType.INTENSITY} | ${{ hasIntensityTarget: true }}
  `('Update $targetType Target', ({ targetType, getTargetsMockOptions }) => {
    const isIntensityTarget = checkIsIntensityTarget(targetType);
    const targetBase = getTargetBase(isIntensityTarget);

    it('should submit target update and call a successful toast message', async () => {
      const closeModal = jest.fn();
      jest.spyOn(toast, 'displaySuccessMessage');

      const targetToSave = {
        ...targetBase,
        ...targetMocks.targetUpdateMock,
      };

      const { findByTestId } = setup(
        [
          targetMocks.getTargetFormDataMock(getTargetsMockOptions),
          targetMocks.saveTargetsMock({
            companyId,
            toSave: [targetToSave],
          }),
        ],
        {
          closeModal,
        }
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.carbonOffsetExcludedBtn
          )
        )
      ).toBeChecked();

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.aggressiveStrategy
          )
        )
      ).toBeChecked();

      await filloutForm({ targetType, scope3Year: true, data: targetToSave });

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);
      expect(await findByTestId(selectors.submitBtn)).toBeInTheDocument();

      fireEvent.click(await findByTestId(selectors.submitBtn));

      await waitFor(() => {
        expect(closeModal).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-success'],
          })
        );
      });
    });

    it('should populate existing form values', async () => {
      const closeModal = jest.fn();

      const {
        findAllByText,
        findByTestId,
        findByText,
        findByLabelText,
      } = setup([targetMocks.getTargetFormDataMock(getTargetsMockOptions)], {
        closeModal,
      });

      expect(
        await findAllByText(targetMocks.baselineYear.toString())
      ).toBeTruthy();

      expect(
        await findByText(targetMocks.targetMock.scope1And2Year.toString())
      ).toBeInTheDocument();

      expect(
        ((await findByTestId(
          selectors.scopeOneAndTwoReductionInput
        )) as HTMLInputElement).value
      ).toBe(targetMocks.targetMock.scope1And2Reduction.toString());

      // added selectEvent to prevent console error warning
      await selectEvent.select(
        await findByLabelText(targetFormNamespace['scope-three-year-label']),
        targetMocks.targetUpdateMock.scope3Year as number
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.carbonOffsetExcludedBtn
          )
        )
      ).toBeChecked();

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.aggressiveStrategy
          )
        )
      ).toBeChecked();

      expect(
        await findByTestId(
          `${targetType}[0].${radioInputFieldSelectors.getInputSelector(
            selectors.scope1And2PrivacyTypePrivate
          )}`
        )
      ).toBeChecked();
    });

    it('should call the error toast message when update API error', async () => {
      const closeModal = jest.fn();
      jest.spyOn(toast, 'displayErrorMessage');

      const targetToSave: SaveTargetsTargetInstance = {
        ...targetBase,
        scope3Year: targetMocks.targetUpdateMock.scope3Year as number,
        scope3Reduction: 0,
        scope3PrivacyType: TargetPrivacyType.PRIVATE,
      };

      const { findAllByText, findByTestId } = setup(
        [
          targetMocks.getTargetFormDataMock(getTargetsMockOptions),
          targetMocks.saveTargetsMock(
            {
              companyId,
              toSave: [targetToSave],
            },
            errorMessage
          ),
        ],
        {
          closeModal,
        }
      );

      await filloutForm({ targetType, data: targetToSave, scope3Year: true });

      expect(
        await findAllByText(targetMocks.baselineYear.toString())
      ).toBeTruthy();

      fireEvent.click(await findByTestId(selectors.submitBtn));

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: commonNamespace['save-toast-error'],
          })
        );
      });
    });

    describe('when scope 3 reduction has been entered', () => {
      describe('when scope 3 year has not been selected', () => {
        it('should display scope three year error message', async () => {
          const { findByTestId } = setup([
            targetMocks.getTargetFormDataMock(getTargetsMockOptions),
          ]);

          fireEvent.change(
            await findByTestId(selectors.scopeThreeReductionInput),
            {
              target: {
                value: 40,
              },
            }
          );

          fireEvent.click(await findByTestId(selectors.submitBtn));

          expect(await findByTestId(selectors.submitBtn)).toBeDisabled();
          expect(
            await findByTestId(selectors.scopeThreeYearError)
          ).toHaveTextContent(
            'This field is required if you want to add scope 3 reduction'
          );
        });
      });

      describe('when scope 3 reduction value is 0', () => {
        it('should successfully save', async () => {
          const closeModal = jest.fn();
          jest.spyOn(toast, 'displaySuccessMessage');

          const targetToSave = {
            ...targetBase,
            scope3Year: targetMocks.targetUpdateMock.scope3Year,
            scope3Reduction: 0,
            scope3PrivacyType: TargetPrivacyType.PRIVATE,
          };

          const { getByTestId } = setup(
            [
              targetMocks.getTargetFormDataMock(getTargetsMockOptions),
              targetMocks.saveTargetsMock({
                companyId,
                toSave: [targetToSave],
              }),
            ],
            {
              closeModal,
            }
          );

          await saveScope3Year(
            targetToSave.scope3Year as number,
            targetToSave.scope3Reduction
          );

          await saveScope3ReductionPublicly(targetType);

          fireEvent.click(getByTestId(selectors.submitBtn));

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
          });
        });
      });
    });

    describe('when scope 3 year has been entered', () => {
      describe('when scope reduction has been cleared', () => {
        it('should display an error', async () => {
          const { findByTestId, findByLabelText } = setup([
            targetMocks.getTargetFormDataMock(getTargetsMockOptions),
          ]);

          await selectEvent.select(
            await findByLabelText('Scope 3 year'),
            targetMocks.targetUpdateMock.scope3Year as number
          );

          fireEvent.change(
            await findByTestId(selectors.scopeThreeReductionInput),
            {
              target: {
                value: '',
              },
            }
          );

          fireEvent.click(await findByTestId(selectors.submitBtn));

          expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

          expect(
            await findByTestId(`${selectors.scopeThreeReductionInput}-error`)
          ).toHaveTextContent(
            'This field is required if you want to add scope 3 reduction'
          );
        });

        describe('when scope reduction has been entered', () => {
          it('should hide required error', async () => {
            const { findByTestId, findByLabelText, queryByTestId } = setup([
              targetMocks.getTargetFormDataMock(getTargetsMockOptions),
            ]);

            await selectEvent.select(
              await findByLabelText('Scope 3 year'),
              targetMocks.targetUpdateMock.scope3Year as number
            );

            fireEvent.change(
              await findByTestId(selectors.scopeThreeReductionInput),
              {
                target: {
                  value: '',
                },
              }
            );

            fireEvent.click(await findByTestId(selectors.submitBtn));

            expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

            expect(
              await findByTestId(`${selectors.scopeThreeReductionInput}-error`)
            ).toHaveTextContent(
              'This field is required if you want to add scope 3 reduction'
            );

            fireEvent.change(
              await findByTestId(selectors.scopeThreeReductionInput),
              {
                target: {
                  value: 100,
                },
              }
            );

            await waitFor(() => {
              expect(
                queryByTestId(`${selectors.scopeThreeReductionInput}-error`)
              ).not.toBeInTheDocument();
            });
          });
        });

        describe('when scope 3 year has also been cleared', () => {
          it('should hide required error', async () => {
            const { findByTestId, findByLabelText, queryByTestId } = setup([
              targetMocks.getTargetFormDataMock(getTargetsMockOptions),
            ]);

            await selectEvent.select(
              await findByLabelText('Scope 3 year'),
              targetMocks.targetUpdateMock.scope3Year as number
            );

            fireEvent.change(
              await findByTestId(selectors.scopeThreeReductionInput),
              {
                target: {
                  value: '',
                },
              }
            );

            fireEvent.click(await findByTestId(selectors.submitBtn));

            expect(await findByTestId(selectors.submitBtn)).toBeDisabled();

            expect(
              await findByTestId(`${selectors.scopeThreeReductionInput}-error`)
            ).toHaveTextContent(
              'This field is required if you want to add scope 3 reduction'
            );

            await selectEvent.clearAll(await findByLabelText('Scope 3 year'));

            await waitFor(() => {
              expect(
                queryByTestId(`${selectors.scopeThreeReductionInput}-error`)
              ).not.toBeInTheDocument();
            });
          });
        });
      });
    });

    describe('when provided reduction values are greater than 100', () => {
      it('should display error messages', async () => {
        const closeModal = jest.fn();

        const { findByTestId, findByLabelText } = setup(
          [targetMocks.getTargetFormDataMock(getTargetsMockOptions)],
          {
            closeModal,
          }
        );

        fireEvent.change(
          await findByTestId(selectors.scopeOneAndTwoReductionInput),
          {
            target: {
              value: 333,
            },
          }
        );

        fireEvent.click(await findByTestId(selectors.submitBtn));

        expect(
          await findByTestId(`${selectors.scopeOneAndTwoReductionInput}-error`)
        ).toHaveTextContent(formNamespace['error-max-percentage']);

        await selectEvent.select(
          await findByLabelText(targetFormNamespace['scope-three-year-label']),
          targetMocks.targetUpdateMock.scope3Year as number
        );

        fireEvent.change(
          await findByTestId(selectors.scopeThreeReductionInput),
          {
            target: {
              value: 444,
            },
          }
        );

        fireEvent.click(await findByTestId(selectors.submitBtn));

        expect(
          await findByTestId(`${selectors.scopeThreeReductionInput}-error`)
        ).toHaveTextContent(formNamespace['error-max-percentage']);
      });
    });

    it('should display error message if provided scopeOneAndTwoReduction value is null', async () => {
      const closeModal = jest.fn();

      const { findByTestId } = setup(
        [targetMocks.getTargetFormDataMock(getTargetsMockOptions)],
        {
          closeModal,
        }
      );

      fireEvent.change(
        await findByTestId(selectors.scopeOneAndTwoReductionInput),
        {
          target: {
            value: '',
          },
        }
      );

      fireEvent.click(await findByTestId(selectors.submitBtn));

      expect(
        await findByTestId(`${selectors.scopeOneAndTwoReductionInput}-error`)
      ).toHaveTextContent(formNamespace['error-required']);
    });
  });

  describe('Carbon Offset Radio Buttons', () => {
    it('should allow user to toggle the include carbon offsets btns', async () => {
      const { findByTestId } = setup(
        [targetMocks.getTargetFormDataMock({})],
        {}
      );

      fireEvent.click(await findByTestId(selectors.addAbsoluteAmbitionBtn));

      expect(
        await findByTestId(selectors.carbonOffsetRadioLabel)
      ).toBeInTheDocument();

      fireEvent.click(
        await findByTestId(
          radioInputFieldSelectors.getLabelSelector(
            selectors.carbonOffsetExcludedBtn
          )
        )
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.carbonOffsetExcludedBtn
          )
        )
      ).toBeChecked();

      fireEvent.click(
        await findByTestId(
          radioInputFieldSelectors.getLabelSelector(
            selectors.carbonOffsetIncludedBtn
          )
        )
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.carbonOffsetExcludedBtn
          )
        )
      ).not.toBeChecked();
      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.carbonOffsetIncludedBtn
          )
        )
      ).toBeChecked();
    });
  });

  describe('Strategy Implementation', () => {
    it('should allow user to toggle the strategy btns', async () => {
      const { findByTestId } = setup(
        [targetMocks.getTargetFormDataMock({})],
        {}
      );

      fireEvent.click(await findByTestId(selectors.addAbsoluteAmbitionBtn));

      expect(await findByTestId(selectors.strategyLabel)).toBeInTheDocument();

      fireEvent.click(
        await findByTestId(
          radioInputFieldSelectors.getLabelSelector(selectors.passiveStrategy)
        )
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(selectors.passiveStrategy)
        )
      ).toBeChecked();

      fireEvent.click(
        await findByTestId(
          radioInputFieldSelectors.getLabelSelector(selectors.moderateStrategy)
        )
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(selectors.passiveStrategy)
        )
      ).not.toBeChecked();
      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(selectors.moderateStrategy)
        )
      ).toBeChecked();

      fireEvent.click(
        await findByTestId(
          radioInputFieldSelectors.getLabelSelector(
            selectors.aggressiveStrategy
          )
        )
      );

      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(selectors.moderateStrategy)
        )
      ).not.toBeChecked();
      expect(
        await findByTestId(
          radioInputFieldSelectors.getInputSelector(
            selectors.aggressiveStrategy
          )
        )
      ).toBeChecked();
    });
  });

  describe('when there is no carbon intensity in the baseline', () => {
    it('displays alert message and does not display Add intensity target button', async () => {
      const { queryByTestId } = setup(
        [targetMocks.getTargetFormDataMock({ hasCarbonIntensity: false })],
        {}
      );
      await waitFor(() => {
        expect(
          queryByTestId(selectors.addIntensityAmbitionBtn)
        ).not.toBeInTheDocument();
        expect(queryByTestId(selectors.intensityAlert)).toBeInTheDocument();
        expect(
          queryByTestId(selectors.intensityAlertMessage)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Chart title', () => {
    it('display the correct title in the absolute target form', async () => {
      const { queryByText } = setup(
        [targetMocks.getTargetFormDataMock({ hasAbsoluteTarget: true })],
        {}
      );

      const absoluteFormChartTitle = 'Absolute ambition reduction (tCO2e)';

      await waitFor(() => {
        expect(queryByText(absoluteFormChartTitle)).toBeInTheDocument();
      });
    });

    it('display the correct title in the intensity target form', async () => {
      const { queryByText } = setup(
        [targetMocks.getTargetFormDataMock({ hasIntensityTarget: true })],
        {}
      );

      if (!intensityTargetMock.intensityMetric) {
        throw new Error('no intensity metric');
      }
      const chartTitleMetric = targetFormNamespace[
        'intensity-ambition-chart-title-metric'
      ].replace(
        '{{intensityMetric}}',
        carbonIntensityNamespace[intensityTargetMock.intensityMetric]
      );

      const intensityFormChartTitle = `${targetFormNamespace['intensity-ambition-chart-title']} ${chartTitleMetric}`;

      await waitFor(() => {
        expect(queryByText(intensityFormChartTitle)).toBeInTheDocument();
      });
    });
  });
});
