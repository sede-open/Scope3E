import { render } from '@testing-library/react';
import Icon from '.';

describe('Icon component', () => {
  it('should render an icon component with specified image and attributes', () => {
    const { getByTestId } = render(
      <Icon src="mock-image.svg" alt="Mock Image" size={20} />
    );
    const element = getByTestId('icon');

    expect(element).toHaveAttribute('src', 'mock-image.svg');
    expect(element).toHaveAttribute('alt', 'Mock Image');
    expect(element).toHaveAttribute('height', '20');
    expect(element).toHaveAttribute('width', '20');
  });
});
