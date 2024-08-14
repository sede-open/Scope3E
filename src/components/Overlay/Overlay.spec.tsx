import { render } from '@testing-library/react';
import { Overlay } from '.';

describe('Overlay', () => {
  it('should when open, reposition Overlay element horizontally to be on display', () => {
    const { getByTestId } = render(<Overlay open>Overlay content</Overlay>);

    expect(getByTestId('overlay')).toHaveStyle('transform: translateX(0%)');
  });

  it('should when open is false, position Overlay element to NOT be on display', () => {
    const { getByTestId } = render(
      <Overlay open={false}>Overlay content</Overlay>
    );

    expect(getByTestId('overlay')).toHaveStyle('transform: translateX(-100%)');
  });
});
