import { render } from '@testing-library/react';

import { Alto, SilverChalice } from 'styles/colours';
import { SimulationLeverType } from 'containers/AmbitionSimulation/levers';

import * as selectors from '../selectors';
import { SimulationLeverCard, IProps } from '.';

const setup = (overrides: Partial<IProps> = {}) => {
  const props = {
    type: 'electricityLever' as SimulationLeverType,
    onChangeUnit: jest.fn(),
    onChangeUnitAmount: jest.fn(),
    disabled: false,
    ...overrides,
  };
  return render(<SimulationLeverCard {...props} />);
};

describe('SimulationLeverCard', () => {
  it('should render electricity lever', () => {
    const { getByTestId } = setup({
      type: 'electricityLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('electricityLever')).textContent
    ).toBe('ambitionSimulation:electricity-lever');
  });

  it('should render truck lever', () => {
    const { getByTestId } = setup({
      type: 'roadFreightLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('roadFreightLever')).textContent
    ).toBe('ambitionSimulation:road-freight-lever');
  });

  it('should render car lever', () => {
    const { getByTestId } = setup({
      type: 'mobilityLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('mobilityLever')).textContent
    ).toBe('ambitionSimulation:mobility-lever');
  });

  it('should render shipping lever', () => {
    const { getByTestId } = setup({
      type: 'shippingLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('shippingLever')).textContent
    ).toBe('ambitionSimulation:shipping-lever');
  });

  it('should render travel lever', () => {
    const { getByTestId } = setup({
      type: 'travelLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('travelLever')).textContent
    ).toBe('ambitionSimulation:travel-lever');
  });

  it('should render data centre lever', () => {
    const { getByTestId } = setup({
      type: 'dataCentreLever' as SimulationLeverType,
    });

    expect(
      getByTestId(selectors.getLeverTitleTestId('dataCentreLever')).textContent
    ).toBe('ambitionSimulation:data-centre-lever');
  });

  it('should display negative emission change', () => {
    const { getByTestId } = setup({
      type: 'electricityLever' as SimulationLeverType,
      percentageChange: -23,
    });

    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('23');
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('ambitionSimulation:emission-decrease');
  });

  it('should display emissions have not changed', () => {
    const { getByTestId } = setup({
      type: 'electricityLever' as SimulationLeverType,
      percentageChange: 0,
    });

    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('0');
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('ambitionSimulation:emission-decrease');
  });

  it('should display positive emission change', () => {
    const { getByTestId } = setup({
      type: 'electricityLever' as SimulationLeverType,
      percentageChange: 23,
    });

    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('23');
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      ).textContent
    ).toContain('ambitionSimulation:emission-increase');
  });

  it('should render a disabled state', () => {
    const { getByTestId } = setup({
      disabled: true,
      percentageChange: 23,
    });

    expect(
      getByTestId(selectors.getLeverIconTestId('electricityLever'))
    ).toHaveStyle(`background: ${Alto}`);
    expect(
      getByTestId(selectors.getLeverTitleTestId('electricityLever'))
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(
        selectors.getEmissionChangePercentageTestId('electricityLever')
      )
    ).toHaveStyle(`color: ${SilverChalice}`);
    expect(
      getByTestId(selectors.getFuelQuantityTestId('electricityLever'))
    ).toBeDisabled();
  });
});
