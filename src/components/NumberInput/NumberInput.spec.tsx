import { render } from '@testing-library/react';

import { NumberInput } from '.';

describe('NumberInput', () => {
  it('should render', () => {
    const { getByTestId, queryByTestId } = render(
      <NumberInput
        dataTestId="hello"
        id="hello"
        name="hello"
        value=""
        onChange={jest.fn()}
      />
    );
    expect(getByTestId('hello-wrapper')).toBeInTheDocument();
    expect(queryByTestId('hello-error')).not.toBeInTheDocument();
    expect(queryByTestId('hello-label')).not.toBeInTheDocument();
    expect(queryByTestId('hello-optional')).not.toBeInTheDocument();
  });

  it('should display an error message', () => {
    const errorMessage = 'Oopsy daisy';
    const { getByTestId } = render(
      <NumberInput
        dataTestId="hello"
        id="hello"
        name="hello"
        value=""
        onChange={jest.fn()}
        errorMessage={errorMessage}
      />
    );

    expect(getByTestId('hello-error')).toBeInTheDocument();
    expect(getByTestId('hello-error').textContent).toBe(errorMessage);
  });

  it('should display a label', () => {
    const label = 'well hello there';
    const { getByTestId } = render(
      <NumberInput
        dataTestId="hello"
        id="hello"
        name="hello"
        label={label}
        value=""
        onChange={jest.fn()}
      />
    );

    expect(getByTestId('hello-label').textContent).toContain(label);
    expect(getByTestId('hello-label-optional').textContent).toContain(
      'optional'
    );
  });

  it('should NOT display optional label when isRequired === true', () => {
    const label = 'well hello there';
    const { queryByTestId, getByTestId } = render(
      <NumberInput
        dataTestId="hello"
        id="hello"
        name="hello"
        label={label}
        value=""
        onChange={jest.fn()}
        isRequired
      />
    );

    expect(getByTestId('hello-label').textContent).toContain(label);
    expect(queryByTestId('hello-label-optional')).not.toBeInTheDocument();
  });
});
