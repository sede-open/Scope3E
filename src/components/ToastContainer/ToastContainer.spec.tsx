import { render } from '@testing-library/react';
import { ToastContainer } from '.';

describe('ToastContainer', () => {
  it('should exist in app', () => {
    const { getByTestId } = render(<ToastContainer />);
    const toastContainer = getByTestId('toast-container');
    expect(toastContainer).toBeTruthy();
  });
});
