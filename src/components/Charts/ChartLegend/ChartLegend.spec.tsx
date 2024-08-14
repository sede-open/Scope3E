import { fireEvent, render, waitFor } from '@testing-library/react';
import { ChartLegend } from '.';
import { IProps } from './types';

const basicLegend = {
  name: 'hello',
  colour: '#fff',
  isVisible: true,
};

const legendWithTooltip = {
  name: 'hello 2',
  colour: 'tomato',
  infoTooltipContent: 'hello 2 tooltip',
  isVisible: true,
};

const legendNotVisible = {
  name: 'hello 3',
  colour: 'orange',
  infoTooltipContent: 'hello 3 tooltip',
  isVisible: false,
};

const legends = [basicLegend, legendWithTooltip, legendNotVisible];

const setup = (overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    legends: [],
    ...overrides,
  };

  return render(<ChartLegend {...props} />);
};

describe('ChartLegend', () => {
  it('should render legend items', () => {
    const { getByText, queryByText } = setup({
      legends: [basicLegend, legendWithTooltip, legendNotVisible],
    });
    expect.assertions(legends.length);
    expect(getByText(legends[0].name)).toBeInTheDocument();
    expect(getByText(legends[1].name)).toBeInTheDocument();
    expect(queryByText(legends[2].name)).not.toBeInTheDocument();
  });

  it('should not render if isVisible prop is false', () => {
    const { queryByTestId } = setup({ legends: [legendNotVisible] });

    // assert legend item is not rendered
    expect(queryByTestId(legendNotVisible.name)).not.toBeInTheDocument();
  });

  it('should render if isVisible prop is true', () => {
    const { getByTestId } = setup({
      legends: [basicLegend, legendWithTooltip],
    });

    // assert legend item is rendered
    expect(getByTestId(basicLegend.name)).toBeInTheDocument();
    expect(getByTestId(legendWithTooltip.name)).toBeInTheDocument();
  });

  it('should render a tooltip for legend item', () => {
    const { getByTestId, getByText } = setup({ legends: [legendWithTooltip] });
    expect(getByTestId(`${legends[1].name}-tooltip-title`)).toBeInTheDocument();
    expect(getByText(legendWithTooltip.infoTooltipContent)).toBeInTheDocument();
  });

  it('should render a clickable legend item', async () => {
    const onClick = jest.fn();
    const { getByText } = setup({
      legends: [{ ...basicLegend, onClick }],
    });

    fireEvent.click(getByText(basicLegend.name));

    await waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
