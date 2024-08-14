import { useCallback, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  getEmissionPercentage,
  getGrossEmissions,
  getNetEmissions,
  getPercentileEmissions,
  getReductionPercentage,
  getTargetReductionForYear,
} from 'utils/emissions';
import { getCurrentYear } from 'utils/date';
import { ElectricityLocationGridNames } from 'utils/electricityGrid';
import { formatInteger, round } from 'utils/number';
import { exampleBold } from 'styles/fonts';
import { Tundora, Scorpion } from 'styles/colours';
import { useModal } from 'effects/useModal';
import { ModalType } from 'context/ModalProvider/types';
import { Text } from 'components/Text';
import { Tab, TabsAlignment, TabList, TabSize } from 'components/Tabs';
import CogSpinner from 'components/CogSpinner';
import { NumberInput } from 'components/NumberInput';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import Modal from 'components/Modal';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ContactUs } from 'components/ContactUs';

import { useSimulationData } from './queries';
import { SimulationLeverCard } from './SimulationLeverCard';
import {
  getEmissionChangeData,
  LeverDataType,
  SimulationLeverType,
} from './levers';
import { TotalLeverCard } from './TotalLeverCard/TotalLeverCard';
import { AmbitionEmptyState } from './AmbitionEmptyState';
import { EmissionsEmptyState } from './EmissionsEmptyState';

import * as StyledComponents from './styledComponents';
import { AmbitionSimulationRoutes } from './constants';
import { getGridLocationOptions } from './utils';
import * as selectors from './selectors';

interface ISimulationData {
  ambitionPercentage?: number;
  ambitionEmissions?: number;
  customPercentage?: number;
  customEmissions?: number;
  latestEmissions?: number;
  electricityLever?: LeverDataType;
  mobilityLever?: LeverDataType;
  roadFreightLever?: LeverDataType;
  travelLever?: LeverDataType;
  shippingLever?: LeverDataType;
  dataCentreLever?: LeverDataType;
}

const FIELD_KEYS = {
  CUSTOM_PERCENTAGE: 'customPercentage',
  SIMULATION_COUNTRY: 'simulationCountry',
};

interface SimulationCountryOptionType extends OptionType {
  value: ElectricityLocationGridNames;
}

export const AmbitionSimulation = () => {
  const { t } = useTranslation();

  const { openModal } = useModal();

  const { company } = useAuthenticatedUser();

  if (!company) {
    return null;
  }

  const [isContactModalOpen, setContactModal] = useState(false);

  const toggleContactModal = useCallback(() => {
    setContactModal(!isContactModalOpen);
  }, [isContactModalOpen]);

  const { data, loading } = useSimulationData({
    companyId: company.id,
  });

  const openNewTargetModal = useCallback(() => {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });
  }, []);

  const ambitionYear = getCurrentYear() + 2;

  const [reductionTab, setReductionTab] = useState(
    AmbitionSimulationRoutes.Ambition
  );
  const [simulationData, setSimulationData] = useState<ISimulationData>({});

  const [simulationCountry, setSimulationCountry] = useState<
    SimulationCountryOptionType
  >({
    value: ElectricityLocationGridNames.UNITED_KINGDOM,
    label: t(`locations:${ElectricityLocationGridNames.UNITED_KINGDOM}`),
  });

  useEffect(() => {
    const simulationUpdates: Partial<ISimulationData> = {};

    if (data?.baseline && data?.target) {
      const { baseline, target } = data;
      const emissions = getTargetReductionForYear({
        baselineData: {
          year: baseline.year,
          scope1: baseline.scope1,
          scope2: baseline.scope2,
          scope3: baseline.scope3,
          offset: baseline.offset,
        },
        targetData: {
          scope1And2Year: target.scope1And2Year,
          scope1And2Reduction: target.scope1And2Reduction,
          scope3Year: target.scope3Year,
          scope3Reduction: target.scope3Reduction,
          strategy: target.strategy,
          includeCarbonOffset: target.includeCarbonOffset,
        },
        comparisonYear: ambitionYear,
      });

      simulationUpdates.ambitionEmissions = emissions?.totalTargetEmission;
    }

    if (data?.latestCorporateEmission) {
      simulationUpdates.latestEmissions = data?.target?.includeCarbonOffset
        ? getNetEmissions(data.latestCorporateEmission)
        : getGrossEmissions(data.latestCorporateEmission);
    }

    if (
      simulationUpdates.ambitionEmissions &&
      simulationUpdates.latestEmissions
    ) {
      simulationUpdates.ambitionPercentage = getReductionPercentage(
        simulationUpdates.latestEmissions,
        simulationUpdates.ambitionEmissions
      );

      // initial values for custom simulation
      simulationUpdates.customPercentage = simulationUpdates.ambitionPercentage;
      simulationUpdates.customEmissions = getPercentileEmissions(
        simulationUpdates.latestEmissions,
        simulationUpdates.ambitionPercentage
      );
    }

    setSimulationData({
      ...simulationData,
      ...simulationUpdates,
    });
  }, [data]);

  const setCustomPercentage = (value?: number | string) => {
    if (typeof value !== 'string') {
      const customEmissions = getPercentileEmissions(
        simulationData.latestEmissions ?? 0,
        value ?? 0
      );
      setSimulationData({
        ...simulationData,
        customPercentage: value,
        customEmissions,
      });
    }
  };

  const getSimulationDataUpdates = ({
    type,
    leverUpdates,
  }: {
    type: SimulationLeverType;
    leverUpdates: ISimulationData[typeof type];
  }) => {
    const { emissionChange, emissionReduction } = getEmissionChangeData({
      type,
      lever: {
        ...leverUpdates,
      },
      country: simulationCountry.value,
    });

    const percentageChange = getEmissionPercentage(
      simulationData.latestEmissions,
      emissionChange
    );

    return {
      emissionChange,
      emissionReduction,
      percentageChange,
    };
  };

  const updateLeverSimulationData = ({
    type,
    leverUpdates,
  }: {
    type: SimulationLeverType;
    leverUpdates: ISimulationData[typeof type];
  }) => {
    const {
      emissionChange,
      emissionReduction,
      percentageChange,
    } = getSimulationDataUpdates({ type, leverUpdates });

    setSimulationData({
      ...simulationData,
      [type]: {
        ...leverUpdates,
        emissionChange,
        percentageChange,
        emissionReduction,
      },
    });
  };

  const updateCountryLeversSimulationData = () => {
    const updatedSimulationData: Partial<ISimulationData> = {};
    ([
      'mobilityLever',
      'electricityLever',
      'travelLever',
      'roadFreightLever',
      'dataCentreLever',
    ] as SimulationLeverType[]).forEach((type) => {
      const currentLeverData = simulationData[type];
      const {
        emissionChange,
        emissionReduction,
        percentageChange,
      } = getSimulationDataUpdates({ type, leverUpdates: currentLeverData });

      updatedSimulationData[type] = {
        ...currentLeverData,
        emissionChange,
        emissionReduction,
        percentageChange,
      };
    });

    setSimulationData({
      ...simulationData,
      ...updatedSimulationData,
    });
  };

  const setLeverFuels = ({
    value,
    type,
    fuelType,
  }: {
    value: OptionType;
    type: SimulationLeverType;
    fuelType: 'selectedCurrentFuel' | 'selectedSwapFuel';
  }) => {
    const leverUpdates: ISimulationData[typeof type] = {
      ...(simulationData[type] ?? {}),
      [fuelType]: value,
    };

    updateLeverSimulationData({
      type,
      leverUpdates,
    });
  };

  const setLeverUnitAmount = ({
    value,
    type,
  }: {
    value?: number | string;
    type: SimulationLeverType;
  }) => {
    const leverUpdates: ISimulationData[typeof type] = {
      ...(simulationData[type] ?? {}),
      unitAmount: value,
    };

    updateLeverSimulationData({
      type,
      leverUpdates,
    });
  };

  const gridLocationOptions = getGridLocationOptions(t);

  const onChangeSimulationCountry = (newCountryOption: OptionType) => {
    setSimulationCountry(newCountryOption as SimulationCountryOptionType);
  };

  useEffect(() => {
    updateCountryLeversSimulationData();
  }, [simulationCountry]);

  const achievedPercentageChange =
    (simulationData.electricityLever?.percentageChange ?? 0) +
    (simulationData.mobilityLever?.percentageChange ?? 0) +
    (simulationData.roadFreightLever?.percentageChange ?? 0) +
    (simulationData.shippingLever?.percentageChange ?? 0) +
    (simulationData.dataCentreLever?.percentageChange ?? 0) +
    (simulationData.travelLever?.percentageChange ?? 0);

  const emissionReduction =
    (simulationData.electricityLever?.emissionChange ?? 0) +
    (simulationData.mobilityLever?.emissionChange ?? 0) +
    (simulationData.roadFreightLever?.emissionChange ?? 0) +
    (simulationData.shippingLever?.emissionChange ?? 0) +
    (simulationData.dataCentreLever?.emissionChange ?? 0) +
    (simulationData.travelLever?.emissionChange ?? 0);

  const emissionsChange =
    (simulationData.electricityLever?.emissionChange ?? 0) +
    (simulationData.mobilityLever?.emissionChange ?? 0) +
    (simulationData.roadFreightLever?.emissionChange ?? 0) +
    (simulationData.shippingLever?.emissionChange ?? 0) +
    (simulationData.dataCentreLever?.emissionChange ?? 0) +
    (simulationData.travelLever?.emissionChange ?? 0);

  const simulationEmissions =
    reductionTab === AmbitionSimulationRoutes.Ambition
      ? simulationData.ambitionEmissions ?? 0
      : simulationData.customEmissions ?? 0;

  const outstandingReductionsValue = simulationEmissions
    ? (simulationData.latestEmissions ?? 0) -
      simulationEmissions +
      emissionsChange
    : 0;
  const outstandingReductions =
    outstandingReductionsValue <= 0 ? 0 : outstandingReductionsValue;
  const desiredPercentageChange =
    ((reductionTab === AmbitionSimulationRoutes.Ambition
      ? simulationData.ambitionPercentage
      : simulationData.customPercentage) ?? 0) * -1;

  if (loading || !data) {
    return <CogSpinner />;
  }

  const areLeversDisabled =
    !data.latestCorporateEmission ||
    (!data.target && reductionTab === AmbitionSimulationRoutes.Ambition);

  const infoListEmissionData =
    reductionTab === AmbitionSimulationRoutes.Ambition
      ? simulationData.ambitionEmissions ?? 0
      : simulationData.customEmissions ?? 0;

  const commonReductionInfoItems = (
    <>
      <StyledComponents.ReductionInfoItem>
        <StyledComponents.ReductionInfoDt>
          {t('ambitionSimulation:desired-emission')}
        </StyledComponents.ReductionInfoDt>
        <StyledComponents.ReductionInfoDd
          data-testid={selectors.conditionalEmissions}
        >
          {formatInteger(infoListEmissionData) ?? ''} {t('common:unit-mt-co2')}
        </StyledComponents.ReductionInfoDd>
      </StyledComponents.ReductionInfoItem>

      <StyledComponents.ReductionInfoItem>
        <StyledComponents.ReductionInfoDt>
          {t('ambitionSimulation:latest-emission')}
        </StyledComponents.ReductionInfoDt>
        <StyledComponents.ReductionInfoDd
          data-testid={selectors.latestEmissions}
        >
          {formatInteger(simulationData.latestEmissions ?? 0)}{' '}
          {t('common:unit-mt-co2')}
        </StyledComponents.ReductionInfoDd>
      </StyledComponents.ReductionInfoItem>

      <StyledComponents.ReductionInfoItem isThin>
        <StyledComponents.ReductionInfoDt>
          <StyledComponents.ReductionInfoLabel
            htmlFor={FIELD_KEYS.SIMULATION_COUNTRY}
          >
            {t('ambitionSimulation:simulation-country')}
          </StyledComponents.ReductionInfoLabel>
        </StyledComponents.ReductionInfoDt>
        <StyledComponents.ReductionInfoDd
          data-testid={selectors.simulationCountry}
        >
          <StyledComponents.SimulationCountryContainer>
            <SingleSelect
              styles={{
                menu: (provided) => ({
                  ...provided,
                  right: 0,
                  width: '274px',
                  overflow: 'visible',
                }),
                control: (provided) => ({
                  ...provided,
                  background: 'none',
                  border: 'none',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginLeft: '2px',
                }),
              }}
              inputId={FIELD_KEYS.SIMULATION_COUNTRY}
              isSearchable
              removeValueContainerPadding
              name={FIELD_KEYS.SIMULATION_COUNTRY}
              onChange={onChangeSimulationCountry}
              options={gridLocationOptions}
              value={simulationCountry}
            />
          </StyledComponents.SimulationCountryContainer>
        </StyledComponents.ReductionInfoDd>
      </StyledComponents.ReductionInfoItem>
    </>
  );

  const getReductionTabContent = () => {
    if (reductionTab === AmbitionSimulationRoutes.Custom) {
      return (
        <StyledComponents.TabContent>
          <NumberInput
            dataTestId={selectors.customReductionPercentage}
            id={FIELD_KEYS.CUSTOM_PERCENTAGE}
            name={FIELD_KEYS.CUSTOM_PERCENTAGE}
            onChange={setCustomPercentage}
            decimals={1}
            units="%"
            value={simulationData.customPercentage ?? ''}
            isRequired
            isAllowed={({ floatValue }) => !floatValue || floatValue <= 100}
          />

          <StyledComponents.ReductionInfoList
            data-testid={selectors.customReductionInfoList}
          >
            {commonReductionInfoItems}
          </StyledComponents.ReductionInfoList>
        </StyledComponents.TabContent>
      );
    }
    if (!data.target) {
      return (
        <StyledComponents.TabContent>
          <AmbitionEmptyState openAmbitionModal={openNewTargetModal} />
        </StyledComponents.TabContent>
      );
    }
    return (
      <StyledComponents.TabContent>
        <Text size="12px" color={Scorpion}>
          {t('ambitionSimulation:simulation-year')}
        </Text>
        <StyledComponents.AmbitionYear data-testid={selectors.ambitionYear}>
          {ambitionYear}
        </StyledComponents.AmbitionYear>

        <StyledComponents.ReductionInfoList
          data-testid={selectors.ambitionInfoList}
        >
          <StyledComponents.ReductionInfoItem>
            <StyledComponents.ReductionInfoDt>
              {t('ambitionSimulation:desired-reduction')}
            </StyledComponents.ReductionInfoDt>
            <StyledComponents.ReductionInfoDd
              data-testid={selectors.ambitionReductionPercentage}
            >
              {round(simulationData.ambitionPercentage) ?? 0}%
            </StyledComponents.ReductionInfoDd>
          </StyledComponents.ReductionInfoItem>

          {commonReductionInfoItems}
        </StyledComponents.ReductionInfoList>
      </StyledComponents.TabContent>
    );
  };

  return (
    <>
      <StyledComponents.Wrapper data-testid={selectors.ambitionSimulation}>
        <Modal isOpen={isContactModalOpen} onClose={toggleContactModal}>
          <ContactUs onClose={toggleContactModal} />
        </Modal>

        <StyledComponents.Title
          as="h2"
          family={exampleBold}
          size="24px"
          color={Tundora}
        >
          {t('ambitionSimulation:page-title')}
        </StyledComponents.Title>

        <StyledComponents.ContentWrapper>
          <StyledComponents.SubWrapper>
            <StyledComponents.LeftContentWrapper>
              {!data.latestCorporateEmission && <EmissionsEmptyState />}
              {data.latestCorporateEmission && (
                <StyledComponents.ReductionContainer
                  data-testid={selectors.simulationTabs}
                >
                  <TabList align={TabsAlignment.FLEX_GROW}>
                    <Tab
                      data-testid={`tab-${AmbitionSimulationRoutes.Ambition}`}
                      align={TabsAlignment.FLEX_GROW}
                      size={TabSize.SMALL}
                      isSelected={
                        reductionTab === AmbitionSimulationRoutes.Ambition
                      }
                      disabled={
                        reductionTab === AmbitionSimulationRoutes.Ambition
                      }
                      onClick={() =>
                        setReductionTab(AmbitionSimulationRoutes.Ambition)
                      }
                    >
                      {t('ambitionSimulation:use-ambition')}
                    </Tab>
                    <Tab
                      data-testid={`tab-${AmbitionSimulationRoutes.Custom}`}
                      align={TabsAlignment.FLEX_GROW}
                      size={TabSize.SMALL}
                      isSelected={
                        reductionTab === AmbitionSimulationRoutes.Custom
                      }
                      disabled={
                        reductionTab === AmbitionSimulationRoutes.Custom
                      }
                      onClick={() =>
                        setReductionTab(AmbitionSimulationRoutes.Custom)
                      }
                    >
                      {t('ambitionSimulation:use-custom')}
                    </Tab>
                  </TabList>
                  {getReductionTabContent()}
                </StyledComponents.ReductionContainer>
              )}
              <StyledComponents.LeversWrapper>
                <SimulationLeverCard
                  type="mobilityLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.mobilityLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.mobilityLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.mobilityLever?.unitAmount}
                  percentageChange={
                    simulationData?.mobilityLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
                <SimulationLeverCard
                  type="roadFreightLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.roadFreightLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.roadFreightLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.roadFreightLever?.unitAmount}
                  percentageChange={
                    simulationData?.roadFreightLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
                <SimulationLeverCard
                  type="shippingLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.shippingLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.shippingLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.shippingLever?.unitAmount}
                  percentageChange={
                    simulationData?.shippingLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
                <SimulationLeverCard
                  type="electricityLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.electricityLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.electricityLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.electricityLever?.unitAmount}
                  percentageChange={
                    simulationData?.electricityLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
                <SimulationLeverCard
                  type="travelLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.travelLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.travelLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.travelLever?.unitAmount}
                  percentageChange={
                    simulationData?.travelLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
                <SimulationLeverCard
                  type="dataCentreLever"
                  onChangeUnit={setLeverFuels}
                  onChangeUnitAmount={setLeverUnitAmount}
                  selectedCurrentFuel={
                    simulationData?.dataCentreLever?.selectedCurrentFuel
                  }
                  selectedSwapFuel={
                    simulationData?.dataCentreLever?.selectedSwapFuel
                  }
                  unitAmount={simulationData?.dataCentreLever?.unitAmount}
                  percentageChange={
                    simulationData?.dataCentreLever?.percentageChange
                  }
                  disabled={areLeversDisabled}
                />
              </StyledComponents.LeversWrapper>
            </StyledComponents.LeftContentWrapper>
            <StyledComponents.OuterWrapper>
              <StyledComponents.FixedWrapper>
                <StyledComponents.RightContentWrapper>
                  <TotalLeverCard
                    toggleContactModal={toggleContactModal}
                    emissionReduction={emissionReduction}
                    outstandingReductions={outstandingReductions}
                    achievedPercentageChange={achievedPercentageChange}
                    desiredPercentageChange={desiredPercentageChange ?? 0}
                    disabled={areLeversDisabled}
                  />
                </StyledComponents.RightContentWrapper>
              </StyledComponents.FixedWrapper>
            </StyledComponents.OuterWrapper>
          </StyledComponents.SubWrapper>
        </StyledComponents.ContentWrapper>
      </StyledComponents.Wrapper>
    </>
  );
};
