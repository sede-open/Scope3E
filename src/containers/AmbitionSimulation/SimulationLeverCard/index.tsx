import useTranslation from 'next-translate/useTranslation';

import { CongressBlue, TahitiGold, CannonPink, MidBlue } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { NumberInput } from 'components/NumberInput';
import { round } from 'utils/number';
import {
  getCarCurrentFuelOptions,
  getCarSwapFuelOptions,
  getElectrictyFuelOptions,
  getFuelUnit,
  getTruckCurrentFuelOptions,
  getTruckSwapFuelOptions,
  getTravelCurrentFuelOptions,
  getTravelSwapFuelOptions,
  getShippingCurrentFuelOptions,
  getShippingSwapFuelOptions,
  getDataCentreCurrentFuelOptions,
  getDataCentreSwapFuelOptions,
  SimulationLeverType,
} from 'containers/AmbitionSimulation/levers';

import { Mobility } from 'components/Glyphs/Mobility';
import { Truck } from 'components/Glyphs/Truck';
import { Travel } from 'components/Glyphs/Travel';
import { Shipping } from 'components/Glyphs/Shipping';
import { DataCentre } from 'components/Glyphs/DataCentre';
import { Electricity } from 'components/Glyphs/Electricity';

import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  type: SimulationLeverType;
  onChangeUnit: (payload: {
    type: SimulationLeverType;
    value: OptionType;
    fuelType: 'selectedCurrentFuel' | 'selectedSwapFuel';
  }) => void;
  onChangeUnitAmount: (payload: {
    value?: number | string;
    type: SimulationLeverType;
  }) => void;
  selectedCurrentFuel?: OptionType;
  selectedSwapFuel?: OptionType;
  percentageChange?: number;
  unitAmount?: number | string;
  disabled: boolean;
}

const getCardConfig = (lever: SimulationLeverType, t: any) => {
  switch (lever) {
    case 'mobilityLever':
      return {
        color: CongressBlue,
        icon: <Mobility />,
        title: 'mobility-lever',
        placeholder: 'Current fuel',
        currentFuelOptions: getCarCurrentFuelOptions(t),
        swapFuelOptions: getCarSwapFuelOptions(t),
      };
    case 'roadFreightLever':
      return {
        color: CongressBlue,
        icon: <Truck />,
        title: 'road-freight-lever',
        placeholder: 'Current fuel',
        currentFuelOptions: getTruckCurrentFuelOptions(t),
        swapFuelOptions: getTruckSwapFuelOptions(t),
      };
    case 'shippingLever':
      return {
        color: CongressBlue,
        icon: <Shipping />,
        title: 'shipping-lever',
        placeholder: 'Current fuel',
        currentFuelOptions: getShippingCurrentFuelOptions(t),
        swapFuelOptions: getShippingSwapFuelOptions(t),
      };
    case 'electricityLever':
      return {
        color: TahitiGold,
        icon: <Electricity />,
        title: 'electricity-lever',
        placeholder: 'Current source',
        currentFuelOptions: getElectrictyFuelOptions(t),
        swapFuelOptions: getElectrictyFuelOptions(t),
      };
    case 'travelLever':
      return {
        color: MidBlue,
        icon: <Travel />,
        title: 'travel-lever',
        placeholder: 'Current mode',
        currentFuelOptions: getTravelCurrentFuelOptions(t),
        swapFuelOptions: getTravelSwapFuelOptions(t),
      };
    default:
      return {
        color: CannonPink,
        icon: <DataCentre />,
        title: 'data-centre-lever',
        placeholder: 'Current system',
        currentFuelOptions: getDataCentreCurrentFuelOptions(t),
        swapFuelOptions: getDataCentreSwapFuelOptions(t),
      };
  }
};

export const SimulationLeverCard = ({
  type,
  percentageChange,
  onChangeUnit,
  selectedCurrentFuel,
  selectedSwapFuel,
  onChangeUnitAmount,
  unitAmount,
  disabled,
}: IProps) => {
  const { t } = useTranslation();
  const {
    color,
    icon,
    title,
    currentFuelOptions,
    swapFuelOptions,
    placeholder,
  } = getCardConfig(type, t);

  const setCurrentFuel = (value: OptionType) => {
    onChangeUnit({
      fuelType: 'selectedCurrentFuel',
      type,
      value,
    });
  };

  const setSwapFuel = (value: OptionType) => {
    onChangeUnit({
      fuelType: 'selectedSwapFuel',
      type,
      value,
    });
  };

  const setUnitAmount = (value?: number | string) => {
    onChangeUnitAmount({
      type,
      value,
    });
  };

  const roundedPercentageChange = round(percentageChange);
  const decreasedEmissions = (roundedPercentageChange ?? 0) < 0;

  const currentFuelUnit = getFuelUnit(
    selectedCurrentFuel?.value as string | undefined
  );

  return (
    <StyledComponents.Wrapper>
      <StyledComponents.CardIcon
        data-testid={selectors.getLeverIconTestId(type)}
        disabled={disabled}
        background={color}
      >
        {icon}
      </StyledComponents.CardIcon>
      <StyledComponents.Title
        data-testid={selectors.getLeverTitleTestId(type)}
        disabled={disabled}
        family={exampleBold}
        size="24px"
        as="h2"
      >
        {t(`ambitionSimulation:${title}`)}
      </StyledComponents.Title>

      <StyledComponents.CurrentFuelWrapper>
        <StyledComponents.SelectWraper
          data-testid={selectors.getCurrentFuelSelectTestId(type)}
        >
          <StyledComponents.SelectLabel
            data-testid={selectors.getCurrentFuelLabelTestId(type)}
            htmlFor={`${type}-currentFuel`}
          >
            {`${type} current fuel`}
          </StyledComponents.SelectLabel>
          <SingleSelect
            value={selectedCurrentFuel}
            inputId={`${type}-currentFuel`}
            name={`${type}-currentFuel`}
            options={currentFuelOptions}
            placeholder={placeholder}
            onChange={setCurrentFuel}
            isDisabled={disabled}
          />
        </StyledComponents.SelectWraper>
      </StyledComponents.CurrentFuelWrapper>
      <StyledComponents.InputContainer>
        <NumberInput
          dataTestId={selectors.getFuelQuantityTestId(type)}
          id={`${type}FuelQuantity`}
          name={`${type}FuelQuantity`}
          onChange={setUnitAmount}
          decimals={0}
          units={currentFuelUnit ? t(`common:${currentFuelUnit}`) : ''}
          value={unitAmount ?? ''}
          isRequired
          disabled={disabled}
        />
      </StyledComponents.InputContainer>

      <StyledComponents.SelectWraper>
        <StyledComponents.SelectLabel
          data-testid={selectors.getSwapFuelTestId(type)}
          htmlFor={`${type}-swapFuel`}
        >
          {`${type} swap fuel`}
        </StyledComponents.SelectLabel>
        <SingleSelect
          value={selectedSwapFuel}
          inputId={`${type}-swapFuel`}
          name={`${type}-swapFuel`}
          options={swapFuelOptions}
          placeholder="Swap for"
          onChange={setSwapFuel}
          isDisabled={disabled}
        />
      </StyledComponents.SelectWraper>

      <StyledComponents.PercentageChange
        data-testid={selectors.getEmissionChangePercentageTestId(type)}
        decreasedEmissions={decreasedEmissions}
        disabled={disabled}
      >
        {typeof percentageChange !== 'undefined' && (
          <>
            {Math.abs(roundedPercentageChange ?? 0)}
            {'% '}
            {decreasedEmissions || roundedPercentageChange === 0
              ? t('ambitionSimulation:emission-decrease')
              : t('ambitionSimulation:emission-increase')}
          </>
        )}
      </StyledComponents.PercentageChange>
    </StyledComponents.Wrapper>
  );
};

SimulationLeverCard.defaultProps = {
  percentageChange: undefined,
  selectedCurrentFuel: undefined,
  selectedSwapFuel: undefined,
  unitAmount: undefined,
};
