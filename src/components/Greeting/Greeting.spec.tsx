import { render } from '@testing-library/react';
import { Greeting } from '.';

describe('Greeting', () => {
  it('should render', () => {
    const { getByTestId } = render(<Greeting />);
    const element = getByTestId('greeting-message');
    expect(element).toBeInTheDocument();
  });
});
