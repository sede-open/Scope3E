import { TARGETS_DATA_QUERY } from 'containers/Dashboard/CarbonIntensity/queries';
import { SAVE_TARGETS_MUTATION } from 'containers/Modals/TargetForm/mutations';
import { TARGET_FORM_DATA_QUERY } from 'containers/Modals/TargetForm/queries';
import { GraphQLError } from 'graphql';
import {
  CarbonIntensityMetricType,
  CorporateEmissionType,
  TargetPrivacyType,
  SaveTargetsInput,
  Scope2Type,
  TargetStrategyType,
  TargetType,
  SaveTargetsTargetInstance,
} from 'types/globalTypes';
import { TargetFormDataQuery_corporateEmissions } from 'types/TargetFormDataQuery';
import {
  TargetsQueryVariables,
  TargetsQuery_targets_intensity as IntensityTarget,
} from 'types/TargetsQuery';
import { USER_COMPANY_ID } from './constants';

export const MOCK_ERROR_MESSAGE = 'some error message';

export const baselineYear = 2015;

export const intensityMock = {
  intensityMetric: CarbonIntensityMetricType.CUBIC_METRES,
  intensityValue: 20,
};

export const targetMock = {
  companyId: USER_COMPANY_ID,
  baselineScope1And2: baselineYear,
  baselineScope3: baselineYear,
  scope1And2Year: 2035,
  scope3Year: null,
  scope1And2Reduction: 20,
  scope3Reduction: null,
  strategy: TargetStrategyType.AGGRESSIVE,
  includeCarbonOffset: false,
  scope1And2PrivacyType: TargetPrivacyType.PRIVATE,
  scope3PrivacyType: TargetPrivacyType.PRIVATE,
};

export const absoluteTargetMock: SaveTargetsTargetInstance = {
  scope1And2Year: targetMock.scope1And2Year,
  scope3Year: targetMock.scope3Year,
  scope1And2Reduction: targetMock.scope1And2Reduction,
  scope3Reduction: targetMock.scope3Year,
  strategy: targetMock.strategy,
  includeCarbonOffset: targetMock.includeCarbonOffset,
  targetType: TargetType.ABSOLUTE,
  intensityMetric: undefined,
  scope1And2PrivacyType: targetMock.scope1And2PrivacyType,
  scope3PrivacyType: null,
};

export const intensityTargetMock: SaveTargetsTargetInstance = {
  ...absoluteTargetMock,
  intensityMetric: CarbonIntensityMetricType.CUBIC_METRES,
  targetType: TargetType.INTENSITY,
};

export const targetUpdateMock: Partial<SaveTargetsTargetInstance> = {
  scope3Year: 2040,
  scope3Reduction: 80,
  scope3PrivacyType: targetMock.scope3PrivacyType,
  strategy: TargetStrategyType.PASSIVE,
  includeCarbonOffset: true,
};

export const saveTargetsMock = (
  input?: SaveTargetsInput,
  errorMessage?: string
) => ({
  request: {
    query: SAVE_TARGETS_MUTATION,
    variables: {
      input: input ?? {
        companyId: targetMock.companyId,
        toSave: [],
      },
    },
  },
  result: {
    data: errorMessage ? undefined : { saveTargets: { success: true } },
    errors: errorMessage ? [new GraphQLError(errorMessage)] : undefined,
  },
});

export const absoluteTargetMockData = [
  {
    scope1And2Year: absoluteTargetMock.scope1And2Year,
    scope1And2Reduction: absoluteTargetMock.scope1And2Reduction,
    scope3Year: absoluteTargetMock.scope3Year,
    scope3Reduction: absoluteTargetMock.scope3Reduction,
    strategy: absoluteTargetMock.strategy,
    includeCarbonOffset: absoluteTargetMock.includeCarbonOffset,
    scope1And2PrivacyType: intensityTargetMock.scope1And2PrivacyType,
    scope3PrivacyType: intensityTargetMock.scope3PrivacyType,
  },
];

export const intensityTargetMockData = [
  {
    scope1And2Year: intensityTargetMock.scope1And2Year,
    scope1And2Reduction: intensityTargetMock.scope1And2Reduction,
    scope3Year: intensityTargetMock.scope3Year,
    scope3Reduction: intensityTargetMock.scope3Reduction,
    strategy: intensityTargetMock.strategy,
    includeCarbonOffset: intensityTargetMock.includeCarbonOffset,
    intensityMetric: intensityTargetMock.intensityMetric,
    scope1And2PrivacyType: intensityTargetMock.scope1And2PrivacyType,
    scope3PrivacyType: intensityTargetMock.scope3PrivacyType,
  },
];

export const getTargetFormDataMock = ({
  hasAbsoluteTarget = false,
  hasIntensityTarget = false,
  hasCarbonIntensity = false,
  corporateEmissions,
}: {
  hasAbsoluteTarget?: boolean;
  hasIntensityTarget?: boolean;
  hasCarbonIntensity?: boolean;
  corporateEmissions?: TargetFormDataQuery_corporateEmissions[];
}) => ({
  request: {
    query: TARGET_FORM_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      corporateEmissions: corporateEmissions ?? [
        {
          id: 'emissionId',
          type: CorporateEmissionType.BASELINE,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: baselineYear,
          verificationFile: null,
          carbonIntensities:
            hasIntensityTarget || hasCarbonIntensity ? [intensityMock] : [],
        },
        {
          id: 'emissionId2',
          type: CorporateEmissionType.ACTUAL,
          scope1: 1223,
          scope2: 1333,
          scope3: 1256,
          scope2Type: Scope2Type.MARKET,
          offset: 1000,
          examplePercentage: 5,
          headCount: 10,
          year: 2018,
          verificationFile: null,
          carbonIntensities: [],
        },
      ],
      targets: {
        absolute: hasAbsoluteTarget ? absoluteTargetMockData : [],
        intensity: hasIntensityTarget ? intensityTargetMockData : [],
      },
    },
  },
});

export const getIntensityTargetMock = (
  overrides: Partial<IntensityTarget> = {}
): IntensityTarget => ({
  intensityMetric:
    CarbonIntensityMetricType.MILLION_EURO_VALUE_ADDED_X_MILLION_KM_DISTANCE_TRAVELLED,
  scope1And2Year: 2030,
  scope1And2Reduction: 50,
  scope3Year: 2035,
  scope3Reduction: 40,
  strategy: TargetStrategyType.MODERATE,
  includeCarbonOffset: false,
  ...overrides,
});

export const getTargetsQueryData = (
  intensityOverrides: IntensityTarget[] = [],
  variables: Partial<TargetsQueryVariables>
) => ({
  request: {
    query: TARGETS_DATA_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
      ...variables,
    },
  },
  result: {
    data: {
      targets: {
        intensity: intensityOverrides,
      },
    },
  },
});
